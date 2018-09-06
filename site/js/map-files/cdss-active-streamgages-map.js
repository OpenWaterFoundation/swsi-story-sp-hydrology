// South Platte Data Platform - Map of active streamgages in the South Platte and Metro Basins
// color-coded by data source (dwr, usgs or other)

//id='mapbox1'

var streamgages_map = (function(){

	var map = L.map('mapbox1', {scrollWheelZoom: false}).setView([40.072, -104.348], 9);
	
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
		
	// Control that shows streamgage info on hover -- creates an info box
	var info = L.control();
	info.onAdd = function (map) {
		this._div = L.DomUtil.create('div', 'info'); // Creates a div with a class named "info"
		this.update();
		return this._div;
	};
	// Method used to update the control based on feature properties passed
	info.update = function (props) {
		this._div.innerHTML = '<h5>South Platte and Metro Basin Active Streamgages</h5>' +  (props ?
			'<b>Station Name: </b>' + ((props.Station_Name) ? props.Station_Name : "") + '<br/>' + 
			'<b>Source: </b>' + ((props.Data_Source) ? props.Data_Source : "") + '<br />' +
			'<b>Website: </b>' + ((props.Website) ? hasHttp(props.Website) : "") + '<br/>' + 
			'<b>DWR ID: </b>' + ((props.dwrabbrev) ? props.dwrabbrev : "") + '<br />' +		
			'<b>USGS ID: </b>' + ((props.usgsstatid) ? props.usgsstatid : "") + '<br />' +		
			'<b>WDID: </b>' + ((props.WDID) ? props.WDID : "") + '<br />' +				
			'<b>Water District: </b>' + ((props.Water_District) ? props.Water_District : "")
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
	var streamgageMarkers;
	
	// Reset the color after hovering over
	function resetHighlight(e) {
		streamgageMarkers.resetStyle(e.target);
		info.update();
	} 	
	
	function onEachFeature(feature, layer) {
		layer.on({
			mouseover: highlightFeature,
			mouseout: resetHighlight
		});
	}

	// Create function of color based on data source
	function stylegage(feature) {
	   var colorgage;
	   var point = feature.properties.Data_Source;
	   
	   return getgagecolor(point);
	}
	function getgagecolor(point){
		if      (point === "Co. Division of Water Resources")   colorgage = "blue";
	    else if (point === "U.S. Geological Survey") 			colorgage = "orange";		   
	    else                                                	colorgage = "red";
	    return colorgage;
	}
	
	streamgageMarkers = L.geoJson(streamgages, {		
		pointToLayer: function(feature, latlng) {	
		return L.circleMarker(latlng, { 
			 fillColor: stylegage(feature),
			 color: stylegage(feature),
			 weight: 1, 
			 radius: 7,
			 fillOpacity: 0.8
			});
		},
			onEachFeature: onEachFeature
	});
	
	// Add popup to markers
	streamgageMarkers.bindPopup(function(d){
		var props = d.feature.properties;
		var str =
		'<b>Station Name: </b>' + ((props.Station_Name) ? props.Station_Name : "") + '<br/>' + 
		'<b>Source: </b>' + ((props.Data_Source) ? props.Data_Source : "") + '<br />' +
		"<b>Website: </b><a href='" + ((props.Website) ? hasHttp(props.Website) : "") + "' target='_blank'>" + ((props.Website) ? hasHttp(props.Website) : "") + "</a> <i style='font-size:9px;' class='fa fa-external-link'></i><br/>" + 
		'<b>DWR ID: </b>' + ((props.dwrabbrev) ? props.dwrabbrev : "") + '<br />' +		
		'<b>USGS ID: </b>' + ((props.usgsstatid) ? props.usgsstatid : "") + '<br />' +		
		'<b>WDID: </b>' + ((props.WDID) ? props.WDID : "") + '<br />' +				
		'<b>Water District: </b>' + ((props.Water_District) ? props.Water_District : "");
		return str
	})
	
	// Add markers to map
	streamgageMarkers.addTo(map);
			
	// Add a legend to the map
    var legend = L.control ({position: 'bottomright'});
    legend.onAdd = function (map) {
	   var div = L.DomUtil.create('div', 'info legend'),
	       categories = ['Co. Division of Water Resources', 'U.S. Geological Survey', 'Other'],
		   labels = ['Co. Division of Water Resources', 'U.S. Geological Survey', 'Other'];

	   div.innerHTML = "<h6>Streamgage Data Source </h6>";
	   for (var i = 0; i < categories.length; i++) {
	        div.innerHTML += 
			   '<i class="circle" style="background:' + getgagecolor(categories[i]) + '"></i>  ' +
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
						" style='width:20px; cursor:pointer;' onclick='streamgages_map.scrollButtonClickFunction()'></image>";
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