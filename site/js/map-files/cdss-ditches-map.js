// South Platte Data Platform - Map of ditches and their diversion points in the South Platte and Metro Basins

//id='mapbox2'

var ditches_map = (function(){

	var map = L.map('mapbox2', {scrollWheelZoom: false}).setView([40.072, -104.348], 9);
	
	// Add in outdoors base layer
	var outdoors = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/outdoors-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia3Jpc3RpbnN3YWltIiwiYSI6ImNpc3Rjcnl3bDAzYWMycHBlM2phbDJuMHoifQ.vrDCYwkTZsrA_0FffnzvBw', {
		maxZoom: 18,
		attribution: 'Created by the <a href="http://openwaterfoundation.org">Open Water Foundation. </a>' + 
		'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
			'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="http://mapbox.com">Mapbox</a>',
		id: 'mapbox.outdoors'
	});
	outdoors.addTo(map);
	
	// Add in satellite base layer
	var satellite = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v9/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoia3Jpc3RpbnN3YWltIiwiYSI6ImNpc3Rjcnl3bDAzYWMycHBlM2phbDJuMHoifQ.vrDCYwkTZsrA_0FffnzvBw', {
		maxZoom: 18,
		attribution: 'Created by the <a href="http://openwaterfoundation.org">Open Water Foundation. </a>' + 
		'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
			'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="http://mapbox.com">Mapbox</a>',
		id: 'mapbox.satellite'
	});	
	
	// Add in streets base layer
	var streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v10/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia3Jpc3RpbnN3YWltIiwiYSI6ImNpc3Rjcnl3bDAzYWMycHBlM2phbDJuMHoifQ.vrDCYwkTZsrA_0FffnzvBw', {
		maxZoom: 18,
		attribution: 'Created by the <a href="http://openwaterfoundation.org">Open Water Foundation. </a>' + 
		'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
			'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="http://mapbox.com">Mapbox</a>',
		id: 'mapbox.streets'
	});	
	
	// Create an object that contains the satellite, outdoors and streets base layers
	var baseMaps = {
		"Outdoors": outdoors,
		"Satellite": satellite,
		"Streets": streets
	};
	// Create layer control that allows for switching between base maps		
	L.control.layers(baseMaps, null, {position: 'topleft'}).addTo(map);
	
		
	// Add in IBCC basins layer
	basin1 = L.geoJson(basins, {
	  color: 'black',
	  weight: 1,
	  fillOpacity: 0
	}).addTo(map)		
		
	// Control that shows diversion info on hover -- creates an info box
	var info = L.control();
	info.onAdd = function (map) {
		this._div = L.DomUtil.create('div', 'info'); // Creates a div with a class named "info"
		this.update();
		return this._div;
	};
	// Method used to update the control based on feature properties passed
	info.update = function (props) {
		this._div.innerHTML = '<h5>South Platte and Metro Basin Ditch Diversions</h5>' +  (props ?
			'<b>Name: </b>' + ((props.Structure_) ? props.Structure_ : "") + '<br/>' + 
			'<b>WDID: </b>' + ((props.WDID) ? props.WDID : "") + '<br />' + 
			'<b>Type: </b>' + ((props.Structur_1) ? props.Structur_1 : "") + '<br />' +			
			'<b>Website: </b>' + ((props.More_Infor) ? hasHttp(props.More_Infor) : "") + '<br/>' + 
			'<b>Water Source: </b>' + ((props.Water_Sour) ? props.Water_Sour : "") + '<br />' +		
			'<b>County: </b>' + ((props.County) ? props.County : "") + '<br />' +			
			'<b>Water District: </b>' + ((props.WD) ? props.WD : "") + '<br />' +
			'<b>Status: </b>' + ((props.CIU_Code) ? props.CIU_Code : "")
			: 'Hover on a circle for more information.  Click on a circle to allow following links.');
	};
	info.addTo(map);

	function hasHttp(url){
		if(url == "") return "";
		var pattern = /^((http|https|ftp):\/\/)/;

		if(!pattern.test(url)) {
		    url = "http://" + url;
		}

		console.log(url)
		return url;
	}
	
	// Highlight a point when it is hovered over on the map
	function highlightFeature(e) {
		var layer = e.target;

		layer.setStyle({
			weight: 4,
			color: '#252525',
			dashArray: '',
			fillOpacity: 0.7
		});

		if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
			layer.bringToFront();
		}
		info.update(layer.feature.properties);
	}
	
	// Create variable for markers
	var ditchMarkers;
	
	// Reset the color after hovering over
	function resetHighlight(e) {
		ditchMarkers.resetStyle(e.target);
		info.update();
	} 	
	
	function onEachFeature(feature, layer) {
		layer.on({
			mouseover: highlightFeature,
			mouseout: resetHighlight
		});
	}

	// Create function of color based on water source
	function styleditch(feature) {
	   var colorditch;
	   var point = feature.properties.Water_Sour;
	   
	   return getditchcolor(point);
	}
	function getditchcolor(point){
		if      (point === "SOUTH PLATTE RIVER")   				colorditch = "#a6cee3";
	    else if (point === "CACHE LA POUDRE RIVER") 			colorditch = "#1f78b4";	
	    else if (point === "BOULDER CREEK") 					colorditch = "#b2df8a";
	    else if (point === "SAINT VRAIN CREEK") 				colorditch = "#33a02c";
	    else if (point === "CLEAR CREEK") 						colorditch = "#fb9a99";
	    else if (point === "BIG THOMPSON RIVER") 				colorditch = "#e31a1c";
	    else if (point === "TARRYALL CREEK") 					colorditch = "#fdbf6f";
	    else if (point === "NORTH FORK SOUTH PLATTE RIVER") 	colorditch = "#ff7f00";
	    else if (point === "BEAR CREEK") 						colorditch = "#cab2d6";	
	    else if (point === "SOUTH BOULDER CREEK") 				colorditch = "#6a3d9a";			
	    else                                                	colorditch = "black";
	    return colorditch;
	}
	
	ditchMarkers = L.geoJson(ditchpoints, {		
		pointToLayer: function(feature, latlng) {	
		return L.circleMarker(latlng, { 
			 fillColor: styleditch(feature),
			 color: styleditch(feature),
			 weight: 1, 
			 radius: 5,
			 fillOpacity: 0.8
			});
		},
			onEachFeature: onEachFeature
	});
	
	// Add popup to markers
	ditchMarkers.bindPopup(function(d){
		var props = d.feature.properties;
		var str =
		'<b>Name: </b>' + ((props.Structure_) ? props.Structure_ : "") + '<br/>' + 
		'<b>WDID: </b>' + ((props.WDID) ? props.WDID : "") + '<br />' +
		'<b>Type: </b>' + ((props.Structure_1) ? props.Structure_1 : "") + '<br />' +
		"<b>Website: </b><a href='" + ((props.More_Infor) ? hasHttp(props.More_Infor) : "") + "' target='_blank'>" + ((props.More_Infor) ? hasHttp(props.More_Infor) : "") + "</a> <i style='font-size:9px;' class='fa fa-external-link'></i><br/>" + 
		'<b>Water Source: </b>' + ((props.Water_Sour) ? props.Water_Sour : "") + '<br />' +	
		'<b>County: </b>' + ((props.County) ? props.County : "") + '<br />' +				
		'<b>Water District: </b>' + ((props.WD) ? props.WD : "") + '<br />' +
		'<b>Status: </b>' + ((props.CIU_Code) ? props.CIU_Code : "");		
		return str
	})
	
	// Add markers to map
	ditchMarkers.addTo(map);
			
	// Add a legend to the map
    var legend = L.control ({position: 'bottomright'});
    legend.onAdd = function (map) {
	   var div = L.DomUtil.create('div', 'info legend'),
	       categories = ['SOUTH PLATTE RIVER', 'CACHE LA POUDRE RIVER', 'BOULDER CREEK', 'SAINT VRAIN CREEK', 'CLEAR CREEK', 'BIG THOMPSON RIVER', 
		   'TARRYALL CREEK', 'NORTH FORK SOUTH PLATTE RIVER', 'BEAR CREEK', 'SOUTH BOULDER CREEK', 'Other'],
		   labels = ['South Platte River', 'Cache la Poudre River', 'Boulder Creek', 'St. Vrain Creek', 'Clear Creek', 'Big Thompson River', 
		   'Tarryall Creek', 'North Fork South Platte River', 'Bear Creek', 'South Boulder Creek', 'Other'];

	   div.innerHTML = "<h6>Ditch Water Source </h6>";
	   for (var i = 0; i < categories.length; i++) {
	        div.innerHTML += 
			   '<i class="circle" style="background:' + getditchcolor(categories[i]) + '"></i>  ' +
			   (labels[i] ? labels[i] + '<br>' : '+');
	   }   
       return div;
	}; 
   legend.addTo(map);

    // Add a scroll button to the map
	var scrollbutton = L.control({position: 'topleft'});
	scrollbutton.onAdd = function (map) {
		var div = L.DomUtil.create('div', 'scrollbutton');
		div.innerHTML = "<image id='scrollbutton' src='images/mouse.svg' class='scrollbutton-tooltip'" +
						" style='width:20px; cursor:pointer;' onclick='ditches_map.scrollButtonClickFunction()'></image>";
		return div;
	};
	scrollbutton.addTo(map);		
	function scrollButtonClick(){
	 	if (map.scrollWheelZoom.enabled()) {
	    	map.scrollWheelZoom.disable();
	    	var title = "Click to toggle mouse scroll wheel behavior.<br> [ x ] Mouse scroll pages forward/back. <br> [ &nbsp; ] Mouse scroll zooms map."
			mousetooltip.setContent(title)
	  	}
	  	else {
	    	map.scrollWheelZoom.enable();
	    	var title = "Click to toggle mouse scroll wheel behavior.<br> [ &nbsp; ] Mouse scroll pages forward/back. <br> [ x ] Mouse scroll zooms map."
			mousetooltip.setContent(title)
	    }
	}
	
   	// Return function that needs to be accessed by the DOM 
	return{
		scrollButtonClickFunction: scrollButtonClick,
		maplayer: map
	}

	// Show the current latitude and longitude of the mouse cursor.
	// 'º' used for the degree character when the latitude and longitude of the cursor is displayed
	L.control.mousePosition({position: 'bottomleft',lngFormatter: function(num) {
			var direction = (num < 0) ? 'W' : 'E';
			var formatted = Math.abs(L.Util.formatNum(num, 6)) + 'º ' + direction;
			return formatted;
	},
	latFormatter: function(num) {
			var direction = (num < 0) ? 'S' : 'N';
			var formatted = Math.abs(L.Util.formatNum(num, 6)) + 'º ' + direction;
			return formatted;
	}}).addTo(map);
	
	// Show the scale in km and miles
	L.control.scale({position: 'bottomleft',imperial: true}).addTo(map);
	
})();