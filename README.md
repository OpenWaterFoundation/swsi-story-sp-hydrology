# swsi-story-sp-hydrology #

This repository contains the "South Platte and Metro Basin Hydrology" story and all of its associated content. This story provides a summary 
of South Platte and Metro Basin hydrology in order to provide background for understanding water resources issues in the Basin, including the 
need for storage. The purpose of the story is to provide general context regarding the hydrology of the Basin and to provide links to useful 
datasets and resources.

The Hydrology story was created with the [fullPage.js](https://alvarotrigo.com/fullPage/) JavaScript library.  
See the story [deployed on the Open Water Foundation (OWF)'s website](http://stories.openwaterfoundation.org/co/swsi-story-sp-hydrology/).


## Repository Contents ##

The repository contains the following:

```text
analysis/             Folder containing data files from external sources and R scripts used to process the data files
build-util/           Folder containing useful scripts to view, build, and deploy documentation
site/                 Folder containing the static website and all of the data in the website
  css/                Folder containing CSS (cascading style sheet) files used to style the story 
  data/               Folder containing data used to create visualizations, such as maps
  images/             Folder containing images used within the story
  js/                 Folder containing JavaScript files used within the story, including copies of third-party libraries and local code
  visualizations/     Folder containing CSS, JavaScript and data files used to create many of the hydrograph visualizations in the story
  webfonts/           Folder containing fonts used within the story
  index.html          The landing page (website) for the story
  VERSION.txt         Text file that provides the date of the last update of the story 
.gitattributes        Typical Git configuration file for repository attributes, in particular handling of line-ending and binary files
.gitignore            Typical Git configuration file to ignore files that should not be committed to the repository
README.md             This file; an explanation of repository contents, data files and sources

```


## Data Sources for Hydrology Story ##
The table below lists each page of the Hydrology story and the data, if applicable, used to create the visualization within that page.  Any 
data processing steps are summarized in the README files either in the `site/data` folder, the `site/visualizations` folder or the `analysis` 
folder.

Page Number | Page Name | Data Files | Data Source
--- | --- | --- | ---
1 | South Platte and Metro Basin Hydrology | None | None
2 | Hydrology Concepts - The Hydrologic Cycle | None | None
3 | Hydrology Concepts - Hydrographs | boulder-creek-hydrographs.csv | [CDSS HydroBase](https://dnrweb.state.co.us/cdss/)
4 | Hydrology Concepts - Variability | natural-flows-annual-duration-selectlocations.csv | [StateMod](https://www.colorado.gov/pacific/cdss/surface-water-statemod) Natural Flow time series
5 | Hydrology Concepts - Water Resources System | None | None
6 | North Sterling Irrigation District | irrigated-lands-2015-wdid0100687.geojson | [CDSS Division 1 Irrigated Lands 2015](https://www.colorado.gov/pacific/cdss/division-1-south-platte)
7 | Hydrology Concepts - Streamgages and Measuring Flows | cdss-mapviewer-active-streamgages.geojson | [CDSS Map Viewer](https://gis.colorado.gov/dnrviewer/Index.html?viewer=mapviewer)
8 | Hydrology Concepts - Diversion Headgates and Measuring Diversions | cdss-structures-ditches-southplatte.geojson, ditch-watersources.csv | [CDSS Structures](https://www.colorado.gov/pacific/cdss/gis-data-category) shapefile
9 | Hydrology Concepts - Groundwater and Measuring Water Level and Pumping | None | None
10 | Hydrology Concepts - Return Flows | None | None 
11 | Hydrology Concepts - Natural, Regulated and Available Flows | natural-regulated-available-flows-06696000.csv, natural-regulated-available-flows-06764000.csv | [StateMod](https://www.colorado.gov/pacific/cdss/surface-water-statemod) Natural Flow, River Outflow and Available Flow time series
12 | Modeling Concepts - Point Flow Models | None | None
13 | Modeling Concepts - CDSS and StateMod | statemod-node-network.geojson | [StateMod](https://www.colorado.gov/pacific/cdss/surface-water-statemod) SP2016.rin file and [CDSS HydroBase](https://dnrweb.state.co.us/cdss/)
14 | Water Demands - Agriculture | crop-irrigation-requirements.csv | [CSU Extension Fact Sheet: Seasonal Water Needs and Opportunities for Limited Irrigation for Colorado Crops](http://extension.colostate.edu/topic-areas/agriculture/seasonal-water-needs-and-opportunities-for-limited-irrigation-for-colorado-crops-4-718/)
15 | Water Demands - Agriculture | ag-diversion-hydrographs.csv | [CDSS HydroBase](https://dnrweb.state.co.us/cdss/)
16 | Water Demands - Municipalities and Industry | municipal-indoor-outdoor-demand.csv | [StateMod](https://www.colorado.gov/pacific/cdss/surface-water-statemod) Total Demand time series
17 | Water Demands - Environment and Recreation | envr-rec-flows-example.csv | [CDSS HydroBase](https://dnrweb.state.co.us/cdss/) and [South Platte BIP Appendix D-2 - Environmental and Recreational Assessment Methodology and Framework](https://www.colorado.gov/pacific/sites/default/files/Appendix%20D%20-%20Environmental%20and%20Recreational%20Assessment%20Methodology%20and%20Framework.pdf)
18 | Water Demands - Administering and Managing Demands | None | None
19 | Storage - Snowpack and SNOTEL Stations | None | None
20 | Storage - Reservoirs | reservoirs-initial-storage-examples.csv | [StateMod](https://www.colorado.gov/pacific/cdss/surface-water-statemod) Initial Storage time series
21 | Storage - Groundwater | None | None
22 | Transbasin Diversions | southplatte-transbasin-diversions.geojson, transbasin-diversions-average-annual-diverted.csv | [CDSS HydroBase](https://dnrweb.state.co.us/cdss/)
23 | Drought | None | None
24 | Climate Change | None | None
25 | Hydrology Tools - Source Water Route Framework | CO-DWR-SourceWaterRouteFramework-Division01-20180228-reduced.geojson | [CDSS](https://www.colorado.gov/pacific/cdss/gis-data-category)
26 | Hydrology Tools - CDSS SNODAS Tools | None | None
27 | Hydrology Tools - Surface Water Supply Index (SWSI) | None | None
28 | Hydrology Tools - Drought Monitor | None | None
29 | Timeline of Addressing Water Supply Issues in the South Platte Basin | None | None
30 | Summary | None | None
31 | Resources | None | None
32 | Sources | None | None


## Contributing ##

The Open Water Foundation has created this story during the South Platte Data Platform project.
If you use the repository and have comments, please contact the maintainers and/or use the GitHub issues to provide feedback.

## Maintainers ##

Kristin Swaim (@kswaim, kristin.swaim@openwaterfoundation.org) is the primary maintainer at the Open Water Foundation.

Steve Malers (@smalers, steve.malers@openwaterfoundation.org) is the secondary contact.

## Contributors ##

None yet, other than OWF staff.