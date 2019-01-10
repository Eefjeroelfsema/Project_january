function makeLinechart() {

var data = 'data.json'
var format = d3.format(",");
var request = [d3.json(data)]

Promise.all(request).then(function(response) {

  // deinfe margin, h and w of svg for the map
  var svg = d3.select("#linechart"),
      margin = {top:0 , right: 0, bottom: 0, left: 0},
      height = 550;
      width = 700;

  // make the svg for the map
  var svg = d3.select("#linechart")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append('g')
      .attr('transform', 'translate(0, -0)');

  var x_scale = d3.scaleLinear()
      .domain([1995, 2018])
      .range([margin.left, width - margin.right]);

  // make y_scale
  var y_scale = d3.scaleLinear()
    .domain([-40, 10])
    .range([height - margin.top, margin.bottom]);

    country_values = {}
    response[0].forEach(function(d) {
      values = []
      for(i = 1995; i <= 2017; i++){

        values.push(Number(d[i]))
      }
      country_values[d['country']] = values;
    });

      years = []
      for(i = 1995; i <= 2017; i++){
        years.push(i)
      }

      colours = ["Aqua", "Blue", "BlueViolet", "Chartreuse", "Crimson", "DarkGoldenRod", "Yellow", "Violet", "Thistle", "SlateGrey",
      "Salmon", "SaddleBrown", "Purple", "Pink", "PaleTurquoise", "Navy", "DeepPink", "DarkSlateGray", "Black", "Khaki",
      "LightSeaGreen", "RosyBrown", "SeaShell"]
      for(i = 0 ; i <= 22; i++){
        country = response[0][i].country
        console.log(country)
        countryline(svg, x_scale, y_scale, years, country_values, country, colours[i])

      }




}).catch(function(e){
  throw(e);
})


function countryline(svg, x_scale, y_scale, years, country_values, specific_country, colour){

  var line = d3.line()
  .x(function(d, i) { return x_scale(years[i]); }) // set the x values for the line generator
  .y(function(d) { return y_scale(d); }) // set the y values for the line generator
  .curve(d3.curveMonotoneX) // apply smoothing to the line

  svg.append("path")
    .datum(country_values[specific_country]) // 10. Binds data to the line
    .attr("class", "line") // Assign a class for styling
    .style("stroke", colour)
    .attr("d", line); // 11. Calls the line generator

  svg.selectAll("circle")
    .data(country_values)
    .enter()
    .append("circle")
    .attr("cx", function(d) {
      return x_scale(years[i]);
    })
    .attr("cy", function(d) {
      return y_scale(country_values[specific_country][i])})
    .attr("r", 5)


  // svg.selectAll(".dot")
  //   .data(country_values[specific_country])
  // .enter().append("circle") // Uses the enter().append() method
  //   .attr("class", "dot") // Assign a class for styling
  //   .attr("cx", function(d, i) { return x_scale(years[i]) })
  //   .attr("cy", function(d) { return y_scale(d) })
  //   .attr("r", 5)
  //     .on("mouseover", function(a, b, c) {
  // 			console.log(a)
  //       this.attr('class', 'focus')
	// 	})
  //     .on("mouseout", function() {  })

}
}
