
var data = 'data_distribution.json'
var format = d3.format(",");
var request = [d3.json(data)]

Promise.all(request).then(function(response) {

  var width = 500,
    height = 500,
    radius = height / 2;

  var vis = d3.select("#piechart")
    .append("svg:svg")              //create the SVG element inside the <body>
    .attr("width", width)           //set the width and height of our visualization (these will be attributes of the <svg> tag
    .attr("height", height)
    .append("svg:g")                //make a group to hold our pie chart
    .attr("transform", "translate(" + radius + "," + radius + ")")

  var country = 'AUT'
  var year = '2002'

  make_piechart(response[0], country, year, vis, width, height, radius)

function make_piechart(data, country, year, svg, width, height, radius){

  keys_in_list = []
  data_in_list = []

  console.log(data[country]['2007'])
  Object.keys(data[country][year]).forEach(function(key) {
    if(key!= "TOT"){

    data_in_list.push(parseFloat(data[country][year][key]))
    keys_in_list.push(key)
  }});

  console.log(data_in_list)


  var arc = d3.arc()              //this will create <path> elements for us using arc data
    .outerRadius(radius)
    .innerRadius(100);

  var pie = d3.pie()           //this will create arc data for us given a list of values
    .value(function(d) { return d; });

  const color = d3.scaleOrdinal(["Aqua","BlueViolet","Chocolate", "Crimson", "Darkgreen", "DarkSlateGray", "LightCoral",
         "#e78ac3","#a6d854","#ffd92f"]);

  var arcs = vis.selectAll("g.slice")     //this selects all <g> elements with class slice (there aren't any yet)
    .data(pie(data_in_list))                          //associate the generated pie data (an array of arcs, each having startAngle, endAngle and value properties)
    .enter()                            //this will create <g> elements for every "extra" data element that should be associated with a selection. The result is creating a <g> for every object in the data array
    .append("svg:g")                //create a group to hold each slice (we will have a <path> and a <text> element associated with each slice)
    .attr("class", "slice");    //allow us to style things in the slices (like text)

    arcs.append("svg:path")
      .attr("fill", function(d, i) { return color(i); } ) //set the color for each slice to be chosen from the color function defined above
      .attr("d", arc);                                    //this creates the actual SVG path using the associated data (pie) with the arc drawing function

    arcs.append("text")
      .attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })
      .data(keys_in_list)
      .attr("dy", ".35em")
      .text(function(d) { return d; });
};
})
