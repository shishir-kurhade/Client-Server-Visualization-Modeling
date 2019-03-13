/* Function to clear visualization and reset parameters */
function ClearCanvas()
{
	d3.select("svg").remove();
	document.getElementById('c_id').value = 1.0;
	document.getElementById("preprocessing_id").value = false;
};

/* Function to draw a visualization with user inputs */
function DrawROC()
{
var c = document.getElementById('c_id').value;
var preprocessing = document.getElementById("preprocessing_id").value;

	d3.select("svg").remove();
var data = d3.json("http://127.0.0.1:5000/?preprocessing="+preprocessing+"&c="+c).then(function(data) {
	console.log("http://127.0.0.1:5000/?preprocessing="+preprocessing+"&c="+c);
	console.log(data);
	
var width = 700;
var height = 700;
var margin = {
  top: 55,
  left: 55,
  right: 55,
  bottom: 55
};

//anything inside bracket will be selected
var svg = d3.select("body")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

var xScale = d3.scaleLinear() //Continuous Scale
  .domain([0,1])
  .range([margin.left, width - margin.right]) //Rounds values of
 

var yScale = d3.scaleLinear() //Continuous Scale
  .domain([0, 1])
  .range([height - margin.bottom, margin.top]);

var xAxis = svg.append("g")
  .attr("transform", `translate(0,${height-margin.bottom})`)
  .call(d3.axisBottom().scale(xScale));

var xlabel = svg.append("text") // text label for the x axis
  .attr("x", 265)
  .attr("y", 700)
  .style("text-anchor", "middle")
  .text("FPR");


var yAxis = svg.append("g")
  .attr("transform", `translate(${margin.left},0)`)
  .call(d3.axisLeft().scale(yScale));

var ylabel = svg.append("text") // text label for the x axis
  .attr("x", -400)
  .attr("y", 15)
  .style("text-anchor", "middle")
  .attr("transform", "rotate(-90)")
  .text("TPR");

var title = svg.append("text") // text label for the x axis
  .attr("x", 300)
  .attr("y", 30)
  .attr("font-size", "40px")
  .attr("fill", "gray")
  .style("text-anchor", "middle")
  .text("ROC curve");

var line = d3.line() //logic for drawing line
    .x(function(d) { return xScale(d['fpr']); })
    .y(function(d) { return yScale(d['tpr']); });
	
var path = svg.append('path').datum(data).attr('d', line(data)) //draw line path
	.attr("fill", "none")
	.attr("stroke", "steelblue")
	.attr("stroke-linejoin", "round")
	.attr("stroke-linecap", "round")
	.attr("stroke-width", 1.5);


var ran = svg.append("line") //Draw the random reference line
    .attr("x1", margin.left)
	.attr("x2",width-margin.right)
	.attr("y1",height - margin.bottom)
	.attr("y2",margin.right)
	.attr("stroke", "black")
	.attr("stroke-linejoin", "round")
	.attr("stroke-linecap", "round")
	.attr("stroke-width", 1.5);
	
	
  
});


};
