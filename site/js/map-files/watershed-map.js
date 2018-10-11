// South Platte Data Platform - Map of HUC10 watersheds and state water districts in the Basin

//id='mapbox6'

var watershed_map = (function(){

	var map = L.map('mapbox6', {scrollWheelZoom: false}).setView([39.872, -104.148], 8);
	
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

	var streetsatellite = L.tileLayer('https://api.mapbox.com/v4/mapbox.streets-satellite/{z}/{x}/{y}.png?access_token=pk.eyJ1Ijoia3Jpc3RpbnN3YWltIiwiYSI6ImNpc3Rjcnl3bDAzYWMycHBlM2phbDJuMHoifQ.vrDCYwkTZsrA_0FffnzvBw', {
        maxZoom: 18,
        attribution: 'Created by the <a href="http://openwaterfoundation.org">Open Water Foundation. </a>' + 
        'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
            '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery © <a href="http://mapbox.com">Mapbox</a>',
        id: 'mapbox.streets-satellite'
    });
		
	// Add in IBCC basins layer
	basin1 = L.geoJson(basins, {
	  color: 'black',
	  weight: 1,
	  fillOpacity: 0
	}).addTo(map)		


	// Control that shows watershed info on hover -- creates an info box
	var info = L.control();
	info.onAdd = function (map) {
		this._div = L.DomUtil.create('div', 'info'); // Creates a div with a class named "info"
		this.update();
		return this._div;
	};
	// Method used to update the control based on feature properties passed
	info.update = function (props) {
	  if(props && props.HUC10){		
		this._div.innerHTML = '<h5>HUC10 Watersheds and Water Districts</h5>' +  (props ?
			'<b>Watershed Name: </b>' + (props.NAME) + '<br/>' + 
			'<b>HUC10 Code: </b>' + (props.HUC10) + '<br />' + 
			'<b>Area (square km): </b>' + (props.AREASQKM)
			: 'Hover on a polygon for more information');
	  }
	  else {
		this._div.innerHTML = '<h5>HUC10 Watersheds and Water Districts</h5>' +  (props ?
			'<b>District Name: </b>' + (props.NAME) + '<br/>' + 
			'<b>District Number: </b>' + (props.DISTRICT)
			: 'Hover on a polygon for more information');
	  }			
	};
	info.addTo(map);
	
	// Add in layer for HUC10 watersheds
	var huc10 = L.geoJson(sphuc10, {
			 color: 'blue',
			 weight: 2,
			 fillOpacity: 0.3,
			onEachFeature: onEachFeature1
	}).addTo(map);

	// Add in layer for state water districts
	var waterdistrict = L.geoJson(spwaterdistricts, {
			 color: '#004d00',
			 weight: 2,
			 fillOpacity: 0.3,
			onEachFeature: onEachFeature2
	});

	// Highlight a polygon when it is hovered over on the map
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
		
	function onEachFeature1(feature, layer) {
		layer.on({
			mouseover: highlightFeature,
			mouseout: resetHighlight1
		});
	}

	function onEachFeature2(feature, layer) {
		layer.on({
			mouseover: highlightFeature,
			mouseout: resetHighlight2
		});
	}
	
	// Reset the color after hovering over
	function resetHighlight1(e) {
		huc10.resetStyle(e.target);
		info.update();
	} 
	
	// Reset the color after hovering over	
	function resetHighlight2(e) {
		waterdistrict.resetStyle(e.target);
		info.update();
	} 	
	
map.attributionControl.addAttribution('Data &copy; <a href="https://www.usgs.gov/core-science-systems/ngp/national-hydrography/watershed-boundary-dataset?qt-science_support_page_related_con=4#qt-science_support_page_related_con">Watershed Boundary Dataset</a>');
		
    // Add a scroll button to the map
	var scrollbutton = L.control({position: 'topleft'});
	scrollbutton.onAdd = function (map) {
		var div = L.DomUtil.create('div', 'scrollbutton');
		div.innerHTML = "<image id='scrollbutton' src='images/mouse.svg' class='scrollbutton-tooltip'" +
						" style='width:20px; cursor:pointer;' onclick='watershed_map.scrollButtonClickFunction()'></image>";
		return div;
	};
	scrollbutton.addTo(map);		

	// Create an object that contains the satellite, outdoors and streets base layers
	var baseMaps = {
		"Outdoors": outdoors,
		"Satellite": satellite,
		"Streets": streets,
		"Streets & Satellite": streetsatellite
	};
	// Create an object that contains the 2 watershed layers
	var watershedlayers = {
		"HUC10 Watersheds": huc10,
		"State Water Districts": waterdistrict,
	};
	// Create layer control that allows for switching between base maps	and switching between watershed layers	
	L.control.layers(baseMaps, null, {position: 'topleft'}).addTo(map);
	L.control.layers(watershedlayers, null, {position: 'topleft'}).addTo(map);	

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