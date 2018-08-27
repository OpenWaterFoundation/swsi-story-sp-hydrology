#!/bin/bash
#
# Copy the site/* contents to the stories.openwaterfoundation.org website.
# - replace all the files on the web with local files
# - only copy specific website files such as index.html so as to not clobber other content loaded separately

# Set --dryrun to test before actually doing
dryrun=""
#dryrun="--dryrun"
s3Folder="s3://stories.openwaterfoundation.org/co/swsi-story-sp-hydrology"

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

# Sync first, then copy specific files
aws s3 sync ../site ${s3Folder} ${dryrun} --delete --profile "$awsProfile"

# Update content of index.html to use versioned files
# - put the variable definitions first because all are used in index.html update
styleCssOrig="style.css"
styleCssWithVersion="style.${version}.css"
customLeafletCssOrig="custom-leaflet-style.css"
customLeafletCssWithVersion="custom-leaflet-style.${version}.css"
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
plotlyExampleJsOrig="plotly-example.js"
plotlyExampleJsWithVersion="plotly-example.${version}.js"
statemodNodesMapJsOrig="statemod-nodes-map.js"
statemodNodesMapJsWithVersion="statemod-nodes-map.${version}.js"
# List alphabetically to simplify insertions
cat ../site/index.html | sed -e "s/${cdssActiveStreamgagesMapJsOrig}/${cdssActiveStreamgagesMapJsWithVersion}/g" | sed -e "s/${cdssDitchesMapJsOrig}/${cdssDitchesMapJsWithVersion}/g" | sed -e "s/${styleCssOrig}/${styleCssWithVersion}/g" | sed -e "s/${customLeafletCssOrig}/${customLeafletCssWithVersion}/g" | sed -e "s/${fileParserJsOrig}/${fileParserJsWithVersion}/g" | sed -e "s/${plotlyExampleJsOrig}/${plotlyExampleJsWithVersion}/g" | sed -e "s/${statemodNodesMapJsOrig}/${statemodNodesMapJsWithVersion}/g" > ${tmpBuildFolder}/index.html
aws s3 cp ${tmpBuildFolder}/index.html ${s3Folder}/index.html ${dryrun} --profile "$awsProfile"
aws s3 cp ../site/css/${styleCssOrig} ${s3Folder}/css/${styleCssWithVersion} ${dryrun} --profile "$awsProfile"
aws s3 cp ../site/css/${customLeafletCssOrig} ${s3Folder}/css/${customLeafletCssWithVersion} ${dryrun} --profile "$awsProfile"
# General
aws s3 cp ../site/js/${fileParserJsOrig} ${s3Folder}/js/${fileParserJsWithVersion} ${dryrun} --profile "$awsProfile"
# Map-files
aws s3 cp ../site/js/map-files/${cdssActiveStreamgagesMapJsOrig} ${s3Folder}/js/map-files/${cdssActiveStreamgagesMapJsWithVersion} ${dryrun} --profile "$awsProfile"
aws s3 cp ../site/js/map-files/${cdssDitchesMapJsOrig} ${s3Folder}/js/map-files/${cdssDitchesMapJsWithVersion} ${dryrun} --profile "$awsProfile"
aws s3 cp ../site/js/map-files/${plotlyExampleJsOrig} ${s3Folder}/js/map-files/${plotlyExampleJsWithVersion} ${dryrun} --profile "$awsProfile"
aws s3 cp ../site/js/map-files/${statemodNodesMapJsOrig} ${s3Folder}/js/map-files/${statemodNodesMapJsWithVersion} ${dryrun} --profile "$awsProfile"
