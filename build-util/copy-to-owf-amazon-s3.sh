#!/bin/bash
#
# Copy the site/* contents to the stories.openwaterfoundation.org website.
# - replace all the files on the web with local files
# - only copy specific website files such as index.html so as to not clobber other content loaded separately

# Set --dryrun to test before actually doing
dryrun=""
#dryrun="--dryrun"
s3Folder="s3://stories.openwaterfoundation.org/co/swsi-story-sp-hydrology"
# runMode indicates what the script should do
# - upload = prep and upload to Amazon S3,
#   used when uploading to OWF website
# - prepUpload = prep the site for upload but don't do it,
#   used when creating the site folder for southplattebasin.com
runMode="upload"

# Make sure that this is being run from the build-util folder
pwd=`pwd`
dirname=`basename ${pwd}`
if [ ! ${dirname} = "build-util" ]
        then
        echo "Must run from build-util folder"
        exit 1
fi

if [ "$1" == "" ]
	then
	echo ""
	echo "Usage:  $0 AmazonConfigProfile"
	echo ""
	echo "Copy the site files to the Amazon S3 static website folder:  $s3Folder"
	echo ""
	exit 0
fi

if [ "$1" == "prep-upload" ]
        then
        # Prep the website for upload in the tmp-build folder but do not actually do the upload.
        # - the site can then be uploaded to southplattebasin.com
        # - don't actually do the upload
        runMode="prepUpload"
fi

awsProfile="$1"

# Get the version to append to files
versionFile="../site/VERSION.txt"
version=`cat "${versionFile}"`
if [ -z "${version}" ]
        then
        echo ""
        echo "No ${versionFile} version file to modify filenames for caching- cannot continue."
        exit 1
fi

# Folder used for temporary files, mainly renamed files to prevent caching
tmpBuildFolder="tmp-build"
if [ ! -e "${tmpBuildFolder}" ]
        then
        echo ""
        echo "No temporary build folder ${tmpBuildFolder} - cannot continue."
        exit 1
fi

# First clean out the contents of the "tmp-build" folder
echo "Remove files from ${tmpBuildFolder}"
rm -rf ${tmpBuildFolder}/*

# Copy the entire site into the "tmp-build" folder
echo "Copy ../site to ${tmpBuildFolder}"
cp -r ../site/* ${tmpBuildFolder}


# Update content of index.html to use versioned files
# - put the variable definitions first because all are used in index.html update
owfStyleCssOrig="owf-style.css"
owfStyleCssWithVersion="owf-style.${version}.css"
customLeafletStyleCssOrig="custom-leaflet-style.css"
customLeafletStyleCssWithVersion="custom-leaflet-style.${version}.css"
mapCssOrig="map.css"
mapCssWithVersion="map.${version}.css"
# JavaScript files that need versioned
# -don't include /map-files because slash messes up sed command
fileParserJsOrig="fileparser.js"
fileParserJsWithVersion="fileparser.${version}.js"
# JavaScript map page files that need versioned
# -don't include /map-files because slash messes up sed command
# Muni...
cdssActiveStreamgagesMapJsOrig="cdss-active-streamgages-map.js"
cdssActiveStreamgagesMapJsWithVersion="cdss-active-streamgages-map.${version}.js"
cdssDitchesMapJsOrig="cdss-ditches-map.js"
cdssDitchesMapJsWithVersion="cdss-ditches-map.${version}.js"
statemodNodesMapJsOrig="statemod-nodes-map.js"
statemodNodesMapJsWithVersion="statemod-nodes-map.${version}.js"
swrfMapJsOrig="swrf-map.js"
swrfMapJsWithVersion="swrf-map.${version}.js"
transbasinDiversionsMapJsOrig="transbasin-diversions-map.js"
transbasinDiversionsMapJsWithVersion="transbasin-diversions-map.${version}.js"
watershedMapJsOrig="watershed-map.js"
watershedMapJsWithVersion="watershed-map.${version}.js"
# List alphabetically to simplify insertions
#
# Replace references in index.html with files that have versions
echo "Update index.html with versioned references"
cat ../site/index.html | sed -e "s/${cdssActiveStreamgagesMapJsOrig}/${cdssActiveStreamgagesMapJsWithVersion}/g" | sed -e "s/${cdssDitchesMapJsOrig}/${cdssDitchesMapJsWithVersion}/g" | sed -e "s/${customLeafletStyleCssOrig}/${customLeafletStyleCssWithVersion}/g" | sed -e "s/${fileParserJsOrig}/${fileParserJsWithVersion}/g" | sed -e "s/${mapCssOrig}/${mapCssWithVersion}/g" | sed -e "s/${owfStyleCssOrig}/${owfStyleCssWithVersion}/g" | sed -e "s/${statemodNodesMapJsOrig}/${statemodNodesMapJsWithVersion}/g" | sed -e "s/${transbasinDiversionsMapJsOrig}/${transbasinDiversionsMapJsWithVersion}/g" | sed -e "s/${watershedMapJsOrig}/${watershedMapJsWithVersion}/g" > ${tmpBuildFolder}/index.html

# Copy the original files and add version to the filename
echo "Copy versioned files to ${tmpBuildFolder}"

cp ../site/css/${customLeafletStyleCssOrig} ${tmpBuildFolder}/css/${customLeafletStyleCssWithVersion} 
cp ../site/css/${mapCssOrig} ${tmpBuildFolder}/css/${mapCssWithVersion} 
cp ../site/css/${owfStyleCssOrig} ${tmpBuildFolder}/css/${owfStyleCssWithVersion} 
# General
cp ../site/js/${fileParserJsOrig} ${tmpBuildFolder}/js/${fileParserJsWithVersion} 
# Map-files
cp ../site/js/map-files/${cdssActiveStreamgagesMapJsOrig} ${tmpBuildFolder}/js/map-files/${cdssActiveStreamgagesMapJsWithVersion} 
cp ../site/js/map-files/${cdssDitchesMapJsOrig} ${tmpBuildFolder}/js/map-files/${cdssDitchesMapJsWithVersion} 
cp ../site/js/map-files/${statemodNodesMapJsOrig} ${tmpBuildFolder}/js/map-files/${statemodNodesMapJsWithVersion} 
cp ../site/js/map-files/${swrfMapJsOrig} ${tmpBuildFolder}/js/map-files/${swrfMapJsWithVersion} 
cp ../site/js/map-files/${transbasinDiversionsMapJsOrig} ${tmpBuildFolder}/js/map-files/${transbasinDiversionsMapJsWithVersion} 
cp ../site/js/map-files/${watershedMapJsOrig} ${tmpBuildFolder}/js/map-files/${watershedMapJsWithVersion} 

# Create zip folder if runMode = prepUpload
if [ "$runMode" == "prepUpload" ]
        then
        # Zip files using 7zip
        echo "Zip site files"
        7z a -tzip swsi-story-sp-hydrology.zip ${tmpBuildFolder}/*
fi

if [ "$runMode" == "upload" ]
        then
        # Sync the tmp-build folder to Amazon S3
        aws s3 sync ${tmpBuildFolder} ${s3Folder} ${dryrun} --delete --profile "$awsProfile"
fi
