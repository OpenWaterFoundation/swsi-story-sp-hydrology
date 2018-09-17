# Agricultural entities analyses
# Uses the Structures dataset from CDSS
# Focus on South Platte Basin

#Set working directory
setwd ("C:\\Users\\kms\\southplattedataplatform\\git-repos\\swsi-story-sp-hydrology\\analysis\\")

#Load required package
require(data.table)
require(dplyr)
require(tidyr)
require(curl)
require(stringr)

rm(list=ls())

# 1) Read in data
# Read in structures for Division 1 (points)
structures = read.csv("structures-southplatte.csv", 
header = TRUE)
head(structures)

############################################################################################
# 2) Statistics for Structures
# a) Total number of structures associated with each water source
(structure_watersource = structures %>%
  group_by(watersrc) %>%
  tally(sort=TRUE) %>%
  rename(Water_Source = watersrc))

# b) Total number of ditches associated with each water source
(ditch_watersource = structures %>%
  filter(structtype == "Ditch") %>%
  group_by(watersrc) %>%
  tally(sort=TRUE) %>%
  rename(Water_Source = watersrc) %>%
  rename(Number_of_Structures = n) %>%
  filter(Number_of_Structures > 9))  #Show only those streams with 10 or more diversion structures
# Export table to csv for use in "Hydrology Concepts - Diversion Headgates and Measuring Diversions"
# page of Hydrology story
write.csv(ditch_watersource, file="..\\site\\data\\ditch-watersources.csv", row.names=FALSE)

#############################################################################################








