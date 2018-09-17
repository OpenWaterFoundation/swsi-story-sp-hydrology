# analysis #

The `analysis` folder contains original data files as well as R scripts and TSTool command files that process the files to create datasets that are used and 
visualized in the Hydrology story.

The folder contains the following data-processing files:

* [agricultural-analyses.R](#agricultural-analyses.R)
* [agricultural-hydrographs.TSTool](#agricultural-hydrographs.TSTool)
* [envr-rec-hydrographs.TSTool](#envr-rec-hydrographs.TSTool)
* [streamgage-locations.TSTool](#streamgage-locations.TSTool)
* [statemod-analyses.TSTool](#statemod-analyses.TSTool)

## agricultural-analyses.R ##
This R script processes agricultural datasets available from [Colorado's Decision Support Systems (CDSS)](https://www.colorado.gov/cdss). 
Data-processing steps are summarized below:

* The Structures dataset from CDSS is read in to the script ([structures-southplatte.csv](https://github.com/OpenWaterFoundation/swsi-story-sp-hydrology/blob/master/analysis/structures-southplatte.csv)).  
* The total number of structures associated with each water source is calculated -- these calculations are currently not in use.
* The total number of ditches associated with each water source is calculated.  Those water sources with 10 or more ditches are saved and exported to CSV format as 
[data/ditch-watersources.csv](https://github.com/OpenWaterFoundation/swsi-story-sp-hydrology/blob/master/site/data/ditch-watersources.csv).  This file is used for 
the table on the 'Hydrology Concepts - Diversion Headgates and Measuring Diversions' page.


## agricultural-hydrographs.TSTool ##
This TSTool command file downloads water diversion data from CDSS's HydroBase for example ditches in the South Platte Basin.  Data-processing 
steps are summarized below:

* Daily diversion totals are downloaded for Brantner Ditch (WDID 0200809), Riverside Canal (WDID 0100503), Big Thompson Ditch and Manufacturing 
Company Ditch (WDID 0400503), S Boulder Canon Ditch (WDID 0600593) and Harmony Ditch 1 (WDID 6400511).
* The period of record for all of the ditches is shortened from 2000 through 2017.
* The time series are put into table format and exported to CSV format as [visualizations/data/ag-diversion-hydrographs.csv](https://github.com/OpenWaterFoundation/swsi-story-sp-hydrology/blob/master/site/visualizations/data/ag-diversion-hydrographs.csv). 
This file is used for the visualization shown on the 'Water Demands - Agriculture' page. 


## envr-rec-hydrographs.TSTool ##
This TSTool command file replicates example hydrographs shown on pg. 72, Figure 5-27 of the South Platte Basin Implementation Plan, Appendix 
D-2: Environmental and Recreational Assessment Methodology and Framework.  The example shows a hydrograph of the South Platte River below 
Chatfield Reservoir in 2004 as well as environmental and recreational flow recommendations.  Data processing steps are summarized below:

* Daily streamgage data are downloaded for the South Platte River below Chatfield Reservoir (WDID PLACHACO) from CDSS's HydroBase.  The period of 
record is changed to 2000-2017.
* An environmental flushing flow time series is created; flows of 268 cfs for days in May and June are added.
* A recreational minimum flow time series is created; flows of 100 cfs for days in May, June and July are added.
* An environmental minimum flow time series is created; flows of 160 cfs for days from May through September and 35 cfs for days from October 
through April are added.
* Each time series is converted to table format and then exported to CSV format as [visualizations/data/envr-rec-flows-example.csv](https://github.com/OpenWaterFoundation/swsi-story-sp-hydrology/blob/master/site/visualizations/data/envr-rec-flows-example.csv). 
This file is used for the visualization shown on the 'Water Demands - Environment and Recreation' page.
* Data for an example heatmap visualization showing how often instream flows are met -- NOT YET IMPLEMENTED, may be created in a later version 
of the story.


## streamgage-locations.TSTool ##
This TSTool command file takes active streamgages from the CDSS Map Viewer and converts the data into GEOJSON format to be used in a map.  It also 
downloads daily streamgage data from an example gage to show the hydrologic variability within a year and between years.  Data-processing steps 
are summarized below:

* The file [cdss-mapviewer-active-streamgages.csv](https://github.com/OpenWaterFoundation/swsi-story-sp-hydrology/blob/master/site/data/cdss-mapviewer-active-streamgages.csv) 
is read in and filtered to only include gages in the South Platte Basin.
* The table is exported to GEOJSON format as [cdss-mapviewer-active-streamgages.geojson](https://github.com/OpenWaterFoundation/swsi-story-sp-hydrology/blob/master/site/data/cdss-mapviewer-active-streamgages.geojson). 
This file is used for the map shown on the 'Hydrology Concepts - Streamgages and Measuring Flows' page.
* Daily streamgage data are downloaded for Boulder Creek near Longmont (WDID 06730500) from CDSS's HydroBase.  The years 1995, 2002, 2006, 2010 and 
2011 are selected to represent a range of hydrologic conditions (much below normal to much above normal).  Time series are converted to table format.
* The separate tables for the selected years are merged together and then exported to CSV format as [visualizations/data/boulder-creek-hydrographs.csv](https://github.com/OpenWaterFoundation/swsi-story-sp-hydrology/blob/master/site/visualizations/data/boulder-creek-hydrographs.csv). 
This file is used for the visualization shown on the 'Hydrology Concepts - Hydrographs' page.


## statemod-analyses.TSTool ##
This TSTool command file processes StateMod output files.  Prior to processing the output files, the [StateMod application](https://www.colorado.gov/pacific/cdss/statemod) 
(model version 15.00.01) was downloaded from the CDSS website, as well as [South Platte StateMod model input files](https://www.colorado.gov/pacific/cdss/surface-water-statemod). 
The model was run according to the [User's Manual](https://dnrweblink.state.co.us/cwcb/0/edoc/200079/StateMod_Version_15_Documentation.pdf?searchid=0e5e1a87-186a-43a6-ad33-47150c12ec2f). 
Only the relevant files used for the Hydrology story are saved in the `analysis` folder.  The following StateMod output files were used:

* [SP2016.rin](https://github.com/OpenWaterFoundation/swsi-story-sp-hydrology/blob/master/analysis/SP2016.rin) - lists the StateMod nodes in order; 
used to establish the network of nodes
* [SP2016_BFx.xbm](https://github.com/OpenWaterFoundation/swsi-story-sp-hydrology/blob/master/analysis/SP2016_BFx.xbm) - natural flows file
* [SP2016_H.b43](https://github.com/OpenWaterFoundation/swsi-story-sp-hydrology/blob/master/analysis/SP2016_H.b43) - StateMod binary output 
file for diversions, in a format usable for TSTool
* [SP2016_H.b44](https://github.com/OpenWaterFoundation/swsi-story-sp-hydrology/blob/master/analysis/SP2016_H.b44) - StateMod binary output 
file for reservoirs, in a format usable for TSTool
* [SP2016_H.xou.csv](https://github.com/OpenWaterFoundation/swsi-story-sp-hydrology/blob/master/analysis/SP2016_H.xou.csv) - the preliminary station 
request file, converted to CSV format; this file provides the node types

Data-processing steps are summarized below:

### Establish the Node Network ###
* The SP2016.rin file is read in.  This file lists the nodes in order and will establish the node network.
* The SP2016_H.xou.csv file is read in.  This is the preliminary station request file, which gives the node types.  This file was converted to 
CSV format first so that it could be read into TSTool.
* The node network and node type tables are joined together.
* The Stations and Structures tables from the HydroBase datastore are accessed to get latitude and longitude data for nodes, where available. 
These data are joined to the node network table.
* The node network is exported to CSV format as [data/statemod-node-network.csv](https://github.com/OpenWaterFoundation/swsi-story-sp-hydrology/blob/master/site/data/statemod-node-network.csv). 
This file is for reference only.
* The node network is exported to GEOJSON format as [data/statemod-node-network.geojson](https://github.com/OpenWaterFoundation/swsi-story-sp-hydrology/blob/master/site/data/statemod-node-network.geojson). 
This file is used for the map shown on the 'Modeling Concepts - CDSS and StateMod' page.

### Natural Flows ###
* The natural flows file (SP2016_BFx.xbm) is read in.
* Data are exported to Date Value format (.dv) to allow for faster loading of data for subsequent analyses.
* Monthly volumes are converted to average annual volumes.
* Average annual data are linked to the node network table in order to obtain the node network for just natural flow nodes
* Average annual data are exported to CSV format as [natural-flows-average-annual.csv](https://github.com/OpenWaterFoundation/swsi-story-sp-hydrology/blob/master/analysis/natural-flows-average-annual.csv). 
This file is for reference only.
* The natural flow node network is exported to CSV format as [natural-flow-node-network.csv](https://github.com/OpenWaterFoundation/swsi-story-sp-hydrology/blob/master/analysis/natural-flow-node-network.csv). 
This file is for reference only.

### Diversions ###
* The SP2016_H.b43 file is read in.  This is the binary output file for diversions that is in a usable format for TSTool.
* Time series data for total demand, available flow and river outflow are exported to Date Value format (.dv) to allow for faster loading of data 
for subsequent analyses.
* Time series data for natural flow, available flow and river outflow are output into table format and combined into one table.
* Two locations (South Platte River near Lake George and South Platte River at Julesburg) are selected from the dataset.
* The selected locations are exported to CSV format as [visualizations/data/natural-regulated-available-flows-06696000.csv](https://github.com/OpenWaterFoundation/swsi-story-sp-hydrology/blob/master/site/visualizations/data/natural-regulated-available-flows-06696000.csv) 
and [visualizations/data/natural-regulated-available-flows-06764000.csv](https://github.com/OpenWaterFoundation/swsi-story-sp-hydrology/blob/master/site/visualizations/data/natural-regulated-available-flows-06764000.csv). 
These files are used for the visualization shown on the 'Hydrology Concepts - Natural, Regulated and Available Flows' page. 
* Total demand for Denver, Aurora and Boulder are selected from the total-demand.dv file.  Each municipality has a time series for 
indoor demand and outdoor demand.
* Indoor and outdoor demand are summed together for each location.
* Data are exported to CSV format as [visualizations/data/municipal-indoor-outdoor-demand.csv](https://github.com/OpenWaterFoundation/swsi-story-sp-hydrology/blob/master/site/visualizations/data/municipal-indoor-outdoor-demand.csv). 
This file is used for the visualization shown on the 'Water Demands - Municipalities and Industry' page.

### Reservoirs ###
* The SP2016_H.b44 file is read in.  This is the binary output file for reservoirs that is in a usable format for TSTool.
* Time series data for initial storage are exported to Date Value format (.dv) to allow for faster loading of data 
for subsequent analyses.
* Initial storage time series data are selected for Eleven Mile Canyon, Chatfield, North Sterling and Carter reservoirs and output to table format.
* Total capacity time series are created for each reservoir, based on information obtained from websites and reports.  These are added to the table.
* Data are exported to CSV format as [visualizations/data/reservoirs-initial-storage-examples.csv](https://github.com/OpenWaterFoundation/swsi-story-sp-hydrology/blob/master/site/visualizations/data/reservoirs-initial-storage-examples.csv). 
This file is used for the visualization shown on the 'Storage - Reservoirs' page.
 

