// South Platte Data Platform - Map of Transbasin Diversions

//id='mapbox5'

var transbasin_diversions_map = (function(){

	var map = L.map('mapbox5', {scrollWheelZoom: false}).setView([40.172, -105.348], 9);
	var outdoors = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/outdoors-v9/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1Ijoia3Jpc3RpbnN3YWltIiwiYSI6ImNpc3Rjcnl3bDAzYWMycHBlM2phbDJuMHoifQ.vrDCYwkTZsrA_0FffnzvBw', {
		maxZoom: 18,
		attribution: 'Created by the <a href="http://openwaterfoundation.org">Open Water Foundation. </a>' + 
		'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
			'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
			'Imagery © <a href="http://mapbox.com">Mapbox</a>',
		id: 'mapbox.outdoors'
	}).addTo(map);

	var satellite = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v9/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1Ijoia3Jpc3RpbnN3YWltIiwiYSI6ImNpc3Rjcnl3bDAzYWMycHBlM2phbDJuMHoifQ.vrDCYwkTZsrA_0FffnzvBw', {
        maxZoom: 18,
        attribution: 'Created by the <a href="http://openwaterfoundation.org">Open Water Foundation. </a>' + 
        'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
            '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
            'Imagery © <a href="http://mapbox.com">Mapbox</a>',
        id: 'mapbox.satellite'
    }); 

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
		
	// Control that shows transbasin diversion info on hover -- creates an info box
	var info = L.control();
	info.onAdd = function (map) {
		this._div = L.DomUtil.create('div', 'info'); // Creates a div with a class named "info"
		this.update();
		return this._div;
	};
	// Method used to update the control based on feature properties passed
	info.update = function (props) {
		this._div.innerHTML = '<h5>Transbasin Diversions that Divert Water into the South Platte Basin</h5>' +  (props ?
			'<b>Name: </b>' + props.TransbasinDiversionName + '<br/>' + 
			'<b>Source Stream(s): </b>' + props.Source_GNIS_Name_CSV + '<br />' +
			'<b>Source IBCC Basin: </b>' + props.Source_IBCCBasin + '<br />' +			
			'<b>Destination Stream(s): </b>' + props.Destination_GNIS_Name			
			: 'Hover on a circle for more information.');
	};
	info.addTo(map);

	
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
	
	// Create variable for diversions
	var transbasinMarkers;
	
	// Reset the color after hovering over
	function resetHighlight(e) {
		transbasinMarkers.resetStyle(e.target);
		info.update();
	} 	
	
	function onEachFeature(feature, layer) {
		layer.on({
			mouseover: highlightFeature,
			mouseout: resetHighlight
		});
	}

	// Create function of color based on node type
	function stylenode(feature) {
	   var colornode;
	   var point = feature.properties.Source_IBCCBasin;
	   
	   return getnodecolor(point);
	}
	function getnodecolor(point){
		if      (point === "North Platte")     colornode = "red";		   
	    else                                colornode = "blue";
	    return colornode;
	}
	
	transbasinMarkers = L.geoJson(transbasin, {		
		pointToLayer: function(feature, latlng) {	
		return L.circleMarker(latlng, { 
			 fillColor: stylenode(feature),
			 color: stylenode(feature),
			 weight: 1, 
			 radius: 7,
			 fillOpacity: 0.8
			});
		},
			onEachFeature: onEachFeature
	}).addTo(map);
	
			
	// Add a legend to the map
    var legend = L.control ({position: 'bottomright'});
    legend.onAdd = function (map) {
	   var div = L.DomUtil.create('div', 'info legend'),
	       categories = ['North Platte', 'Colorado'],
		   labels = ['North Platte', 'Colorado'];

	   div.innerHTML = "<h6>Exporting Basin</h6>";
	   for (var i = 0; i < categories.length; i++) {
	        div.innerHTML += 
			   '<i class="circle" style="background:' + getnodecolor(categories[i]) + '"></i>  ' +
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
						" style='width:20px; cursor:pointer;' onclick='transbasin_diversions_map.scrollButtonClickFunction()'></image>";
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

	var baseMaps = {
        "Outdoors": outdoors,
        "Satellite": satellite,
        "Streets": streets,
        "Streets & Satellite": streetsatellite
    }
        
    L.control.layers(baseMaps, null, {position:'topleft'}).addTo(map);

   	// Return function that need to be accessed by the DOM 
	return{
		scrollButtonClickFunction: scrollButtonClick,
		maplayer: map
	}
		
})();