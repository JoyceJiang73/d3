// @TODO: YOUR CODE HERE!
d3.csv("assets/data/data.csv").then(Data => {

    console.log(Data);

    Data.forEach(d=>{
        d.healthcare=+d.healthcare;
        d.poverty=+d.poverty;
        d.smokes=+d.smokes;
        d.age=+d.age
    });

    // Define SVG area dimensions
var svgWidth = 600;
var svgHeight = 400;

// Define the chart's margins as an object
var margin = {
  top: 60,
  right: 60,
  bottom: 60,
  left: 60
};

// Define dimensions of the chart area
var chartWidth = svgWidth - margin.left - margin.right;
var chartHeight = svgHeight - margin.top - margin.bottom;

// Select body, append SVG area to it, and set its dimensions
var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

// Append a group area, then set its margins
var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

  var xScale = d3.scaleLinear()
    .domain(d3.extent(Data, d => d.poverty))
    .range([0, chartWidth]);

  // Configure a linear scale with a range between the chartHeight and 0
  var yScale = d3.scaleLinear()
    .domain(d3.extent(Data, d => d.healthcare))
    .range([chartHeight, 0]);

  // Create two new functions passing the scales in as arguments
  // These will be used to create the chart's axes
  var bottomAxis = d3.axisBottom(xScale);
  var leftAxis = d3.axisLeft(yScale);

  var line = d3.line()
  .x(d => xScale(d.poverty))
  .y(d => yScale(d.healthcare));

// Append an SVG path and plot its points using the line function
//chartGroup.append("path")
  // The drawLine function returns the instructions for creating the line for forceData
//  .data([Data])
//  .attr("d", line)
//  .attr("fill", "none")
//  .attr("stroke", "red");

var circlesGroup = chartGroup.selectAll("circle")
    .data(Data)
    .enter()
    .append("circle")
    .attr("cx", d => xScale(d.poverty))
    .attr("cy", d => yScale(d.healthcare))
    .attr("r", 8)
    .attr("fill", "blue")
    .attr("opacity", ".8");

    var textGroup = chartGroup.selectAll("text")
    .data(Data)
    .enter()
    .append("text")
    .attr("x", d => xScale(d.poverty-0.15))
    .attr("y", d => yScale(d.healthcare-0.25))
    .attr("font-family", "sans-serif")
    .attr('font-size',8)
    .attr("fill", "white")
    .html(d=>d.abbr)
    


// Append an SVG group element to the chartGroup, create the left axis inside of it
chartGroup.append("g")
  .classed("axis", true)
  .call(leftAxis);

// Append an SVG group element to the chartGroup, create the bottom axis inside of it
// Translate the bottom axis to the bottom of the page
chartGroup.append("g")
  .classed("axis", true)
  .attr("transform", `translate(0, ${chartHeight})`)
  .call(bottomAxis);

var labelsGroup = chartGroup.append("g")
  .attr("transform", `translate(${chartWidth / 2}, ${chartHeight + 20})`);

var xLabel = labelsGroup.append("text")
  .attr("x", 0)
  .attr("y", 20)
  .attr("value", "proverty") // value to grab for event listener
  .classed("active", true)
  .text("In Proverty (%)");

// append y axis
chartGroup.append("text")
  .attr("transform", "rotate(-90)")
  .attr("y", 0 - margin.left)
  .attr("x", 0 - (chartHeight / 2))
  .attr("dy", "1em")
  .classed("axis-text", true)
  .text("Lacks Healthcare (%)");

});