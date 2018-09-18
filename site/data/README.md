# data #

The `data` folder contains several of the data files needed to create the visualizations shown in the Hydrology story.  Data sources are 
provided.  Any data processing that was required is described within the file descriptions below.

The folder contains the following files:

* [cdss-mapviewer-active-streamgages.csv](#cdss-mapviewer-active-streamgagescsv)
* [cdss-mapviewer-active-streamgages.geojson](#cdss-mapviewer-active-streamgagesgeojson)
* [cdss-structures-ditches-southplatte.csv](#cdss-structures-ditches-southplattecsv)
* [cdss-structures-ditches-southplatte.geojson](#cdss-structures-ditches-southplattegeojson)
* [CO-DWR-SourceWaterRouteFramework-Division01-20180228-reduced.geojson](#CO-DWR-SourceWaterRouteFramework-Division01-20180228-reducedgeojson)
* [Colorado-IBCC-Basins-WGS84.geojson](#Colorado-IBCC-Basins-WGS84geojson)
* [ditch-watersources.csv](#ditch-watersourcescsv)
* [north-sterling-canal-story.json](#north-sterling-canal-storyjson)
* [southplatte-transbasin-diversions.csv](#southplatte-transbasin-diversionscsv)
* [southplatte-transbasin-diversions.geojson](#southplatte-transbasin-diversionsgeojson)
* [statemod-node-network.csv](#statemod-node-networkcsv)
* [statemod-node-network.geojson](#statemod-node-networkgeojson)
* [timeline.json](#timelinejson)
* [transbasin-diversions-average-annual-diverted.csv](#transbasin-diversions-average-annual-divertedcsv)


## cdss-mapviewer-active-streamgages.csv ##
This file contains all of the active streamgages in the South Platte Basin and was obtained from the [CDSS Map Viewer](https://gis.colorado.gov/dnrviewer/Index.html?viewer=mapviewer). 
"Active Gage-Stream" was selected from the Surface Water Current Conditions layer.  All gages were selected in the state and exported in CSV format.  The TSTool 
command file, [streamgage-locations.TSTool](https://github.com/OpenWaterFoundation/swsi-story-sp-hydrology/blob/master/analysis/streamgage-locations.TSTool), 
then filtered the data to only include gages in the South Platte Basin and exported the data into GEOJSON format.  

While this file is not directly used in visualizations, it is contained within the repository because it is essentially a copy of 
cdss-mapviewer-active-streamgages.geojson but is in a format that may be more readily viewed and used by others.

## cdss-mapviewer-active-streamgages.geojson ##
This file contains all of the active streamgages in the South Platte Basin and was obtained from the [CDSS Map Viewer](https://gis.colorado.gov/dnrviewer/Index.html?viewer=mapviewer). 
"Active Gage-Stream" was selected from the Surface Water Current Conditions layer.  All gages were selected in the state and exported in CSV format.  The TSTool 
command file, [streamgage-locations.TSTool](https://github.com/OpenWaterFoundation/swsi-story-sp-hydrology/blob/master/analysis/streamgage-locations.TSTool), 
then filtered the data to only include gages in the South Platte Basin and exported the data into GEOJSON format.

This file is used for the map shown on the 'Hydrology Concepts - Streamgages and Measuring Flows' page, in which streamgages are color-coded based on data 
source (USGS, DWR or other).

## cdss-structures-ditches-southplatte.csv ##
This file comes from the [Structures](https://dnrweb.state.co.us/cdss/Structures?submitButton=Submit&SelectedGeoValue=waterDivisionDiv&SelectedWaterDivisionId=1&SelectedStructureId=1) 
dataset from CDSS by selecting the South Platte Water Division and selecting "Ditch" as the Structure Type.  Data were exported in CSV format.  No additional 
processing of the dataset was required.  

While this file is not directly used in visualizations, it is contained within the repository because it is essentially a copy of 
cdss-structures-ditches-southplatte.geojson but is in a format that may be more readily viewed and used by others.

## cdss-structures-ditches-southplatte.geojson ##
This file comes from the [Structures](https://dnrweb.state.co.us/cdss/Structures?submitButton=Submit&SelectedGeoValue=waterDivisionDiv&SelectedWaterDivisionId=1&SelectedStructureId=1) 
dataset from CDSS by selecting the South Platte Water Division and selecting "Ditch" as the Structure Type.  Data were exported in CSV format. 
The CSV file was then imported into QGIS and saved in GEOJSON format.

This file is used for the map shown on the 'Hydrology Concepts - Diversion Headgates and Measuring Diversions' page, in which diversions are color-coded 
by their water source.

## CO-DWR-SourceWaterRouteFramework-Division01-20180228-reduced.geojson ##
This file contains a portion of the Source Water Route Framework (SWRF) within the South Platte Basin.  The file comes from the 
[Open Water Foundation's processing](http://data.openwaterfoundation.org/co/cdss-data-spatial-bybasin/) 
of [Colorado's Decision Support Systems (CDSS) Geographic Information System Data](http://cdss.state.co.us/GIS/Pages/GISDataHome.aspx).  OWF 
developed a tool using open source QGIS software that splits CDSS spatial data layers to provide datasets for specific water divisions (basins) or districts.
The resulting smaller datasets, provided in useful formats, are easier to work with and benefit the Colorado water community.

This file is used for the map shown on the 'Hydrology Tools - Source Water Route Framework' page.  The file size for the entire 
South Platte Basin portion of the SWRF is 25 MB, so OWF opted to display a smaller portion so that the map doesn't load slowly. 

## Colorado-IBCC-Basins-WGS84.geojson ##
This file contains the boundaries for each Interbasin Compact Committee (IBCC) basin in Colorado.  The file was accessed from OWF's 
[owf-data-co-roundtable-basins](https://github.com/OpenWaterFoundation/owf-data-co-roundtable-basins) repository that contains basic 
information regarding each basin.  The file was originally downloaded from the Colorado Water Conservation Board (CWCB)'s 
[Data Viewer](https://gis.colorado.gov/dnrviewer/Index.html?viewer=cwcbviewer) as a shapefile.  It was opened in QGIS and the coordinate reference system 
was converted to WGS 84 so that the map could be properly viewed in web applications.  The shapefile was then saved in GeoJSON format.

This file is used in most of the maps within the Hydrology story to indicate basin boundaries.

## ditch-water-sources.csv ##
This file comes from the [Structures](https://dnrweb.state.co.us/cdss/Structures/) dataset from CDSS.  The R script, [agricultural-analyses.R](https://github.com/OpenWaterFoundation/swsi-story-sp-hydrology/blob/master/analysis/agricultural-analyses.R) 
calculated the total number of ditches associated with each water source.  Those water sources with 10 or more ditches were saved in this file.  See the 
README in the `analysis` folder for data processing steps.  

This file is used for the table on the 'Hydrology Concepts - Diversion Headgates and Measuring Diversions' page.

## north-sterling-canal-story.json ##
This file is the basis for the page titled 'North Sterling Irrigation District'.  This page uses the [StoryMapJS](https://storymap.knightlab.com/) 
template developed by the Northwestern University Knight Lab.  StoryMapJS, a JavaScript library, is a spatial story-telling tool that 
points users to locations on a map as they progress through a story.  The story is configured through a JSON file.  The basic components of each 'slide' 
of the file include a title, some text, location coordinates in decimal degrees and an image, video or other type of medium.  The images within this 
file are from Google Earth.  Data regarding crops grown in the district are from the [CDSS Division 1 Irrigated Lands 2015](https://www.colorado.gov/pacific/cdss/division-1-south-platte) 
GIS data layer.

## southplatte-transbasin-diversions.csv ##
This file contains information about transbasin diversions in the South Platte Basin and comes from the Open Water Foundation's 
[transbasin diversions dataset](https://github.com/OpenWaterFoundation/owf-data-co-transbasin-diversions).  The file within the repository, 
[Colorado-Transbasin-Diversions.csv](https://github.com/OpenWaterFoundation/owf-data-co-transbasin-diversions/blob/master/data/Colorado-Transbasin-Diversions.csv), 
was filtered to only include diversions that put water into the South Platte Basin.  See the transbasin diversions repository for information about how 
the data were collected and sources of information.

While this file is not directly used in visualizations, it is contained within the repository because it is essentially a copy of 
southplatte-transbasin-diversions.geojson but is in a format that may be more readily viewed and used by others.

## southplatte-transbasin-diversions.geojson ##
This file contains information about transbasin diversions in the South Platte Basin and comes from the Open Water Foundation's 
[transbasin diversions dataset](https://github.com/OpenWaterFoundation/owf-data-co-transbasin-diversions).  The file within the repository, 
[Colorado-Transbasin-Diversions.csv](https://github.com/OpenWaterFoundation/owf-data-co-transbasin-diversions/blob/master/data/Colorado-Transbasin-Diversions.csv), 
was filtered to only include diversions that put water into the South Platte Basin.  See the transbasin diversions repository for information about how 
the data were collected and sources of information.  The CSV file was imported into QGIS and converted to GEOJSON format.

This file is used for the map shown on the 'Transbasin Diversions' page.

## statemod-node-network.csv ##
This file contains information about nodes in the South Platte StateMod model, including locations.  Data were processed using the 
[statemod-analyses.TSTool](https://github.com/OpenWaterFoundation/swsi-story-sp-hydrology/blob/master/analysis/statemod-analyses.TSTool) 
command file.  See the README in the `analysis` folder for data processing steps. 

While this file is not directly used in visualizations, it is contained within the repository because it is essentially a copy of 
statemod-node-network.geojson but is in a format that may be more readily viewed and used by others.

## statemod-node-network.geojson ##
This file contains information about nodes in the South Platte StateMod model, including locations.  Data were processed using the 
[statemod-analyses.TSTool](https://github.com/OpenWaterFoundation/swsi-story-sp-hydrology/blob/master/analysis/statemod-analyses.TSTool) 
command file.  See the README in the `analysis` folder for data processing steps.

This file is used for the map shown on the 'Modeling Concepts - CDSS and StateMod' page.

## timeline.json ##
This file is the basis for the page titled 'Timeline of Addressing Water Supply Issues in the South Platte Basin' page.  This page uses the 
[TimelineJS](https://timeline.knightlab.com/) template developed by the Northwestern University Knight Lab.  TimelineJS, a JavaScript library, 
is a chronological story-telling tool that points each slide of the story to a date on a timeline.  The timeline is configured through a JSON 
file.  The basic components of each 'slide' of the file include a date, title, some text and an image, video or other type of medium.  Sources 
for images used in the timeline are included in the captions below each image.

## transbasin-diversions-average-annual-diverted.csv ##
This file lists the average annual amount of water diverted by transbasin diversions that divert water into the South Platte Basin.  This file 
comes from OWF's [transbasin diversions dataset](https://github.com/OpenWaterFoundation/owf-data-co-transbasin-diversions).  The file within the repository, 
[Transbasin-Diversions-Average-Annual-Diverted.csv](https://github.com/OpenWaterFoundation/owf-data-co-transbasin-diversions/blob/master/data/Transbasin-Diversions-Average-Annual-Diverted.csv) 
was directly copied into the Hydrology story repository.  Data-processing occurred in the 
[Process-time-series-data.TSTool](https://github.com/OpenWaterFoundation/owf-data-co-transbasin-diversions/blob/master/analysis/Process-time-series-data.TSTool) 
command file.

This file is used for the table shown on the 'Transbasin Diversions' page.










