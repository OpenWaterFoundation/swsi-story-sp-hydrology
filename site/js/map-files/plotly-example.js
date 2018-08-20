// Plotly TimeSeries Test

//id='chart'

var plotly_chart = (function(){


<div id="chart"></div>
<script>
	// Plotly uses d3 to read straight from CSV files
	// rows is an array containing each row of data being read in by the csv file
	Plotly.d3.csv('data-files/small-precip-data.csv',function(rows){
		// First series that will be plotted on the timeseries chart
		var trace = {
			type: 'scatter',	// type of plot
			mode: 'lines',	// how the data will be plotted (line, bar, etc.)
			x: rows.map(function(row){	// x data points (grabs data points under the 'Date' column)
				return row['Date']
			}),
			y: rows.map(function(row){	// y data points (grabs data points under the '053005' column)
				return row['053005']
			}),
			line: {
				width: 1	// line width
			},
			name: '053005'	// name of series
		};

		// Second series that will be plotted on the timeseries chart
		var trace2 = {
			type: 'scatter',	// type of plot
			mode: 'lines',	// how the data will be plotted (line, bar, etc.)
			x: rows.map(function(row){	// x data points (grabs data points under the 'Date' column)
				return row['Date']
			}),
			y: rows.map(function(row){	// y data points (grabs data points under the '058839' column)
				return row['058839']
			}),
			line: {
				width: 1	// line width
			},
			name: '058839'	// name of series
		};

		// Third series that will be plotted on the timeseries chart
		var trace3 = {
			type: 'scatter',	// type of plot
			mode: 'lines',	// how the data will be plotted (line, bar, etc.)
			x: rows.map(function(row){	// x data points (grabs data points under the 'Date' column)
				return row['Date']
			}),
			y: rows.map(function(row){	// y data points (grabs data points under the '054054' column)
				return row['054054']
			}),
			line: {
				width: 1	// line width
			},
			name: '054054'	// name of series
		};

		// Fourth series that will be plotted on the timeseries chart
		var trace4 = {
			type: 'scatter',	// type of plot
			mode: 'lines',	// how the data will be plotted (line, bar, etc.)
			x: rows.map(function(row){	// x data points (grabs data points under the 'Date' column)
				return row['Date']
			}),
			y: rows.map(function(row){	// y data points (grabs data points under the '051060 column')
				return row['051060']
			}),
			line: {
				width: 1	// line width
			},
			name: '051060'	// name of series
		};

		// Chart Options
		var layout = {
			yaxis: {
				title: 'Precipitation'	// y axis title
			},
			xaxis: {
				title: 'Date',	// x axis title
				showgrid: false, // show grid on x-axis
			},
		};
		// Plot series with chart options
		Plotly.plot(document.getElementById('chart'),[trace, trace2, trace3,trace4],layout,{showLink: false});
	});
</script>
})();