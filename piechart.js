
var data = 'data_distribution.json'
var format = d3.format(",");
var request = [d3.json(data)]

Promise.all(request).then(function(response) {

  var width = 960,
    height = 500,
    radius = height / 2;

  var svg = d3.select("#piechart")
    .append("svg")
    .attr("width", width)
    .attr("height", height)
    .append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

  var country = 'AUT'
  var year = '2000'

  make_piechart(response[0], country, year, svg, width, height, radius)

function make_piechart(data, country, year, svg, width, height, radius){

  data_in_list = []
  Object.keys(data[country][year]).forEach(function(key) {
    if(key!= "TOT"){
      console.log(key)
    data_in_list.push(parseFloat(data[country][year][key]))
    console.log(key, data[country][year][key])};
  });

  console.log(data_in_list)

  var color = d3.scaleOrdinal()
    .range(["#98abc5"]);

  var arc = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);

  var labelArc = d3.arc()
    .outerRadius(radius - 40)
    .innerRadius(radius - 40);

  var pie = d3.pie()
    .sort(null)
    .value(function(d) { return d; });

  var g = svg.selectAll(".arc")
    .data(data_in_list)
    .enter()
    .append("g")
    .attr("class", "arc");

  g.append("path")
    .attr("d", arc)
    .style("fill", function(d) {
      console.log(d); return "Black"; });

  // g.append("text")
  //   .attr("transform", function(d) { return "translate(" + labelArc.centroid(d) + ")"; })
  //   .attr("dy", ".35em")
  //   .text(function(d) { return d.data; });

          }
        })
