function makeMap() {

// var data = 'data.json'
var world_countries = 'world_countries.json'
var data = 'data.json'

var requests = [d3.json(world_countries), d3.json(data)]
var format = d3.format(",");

Promise.all(requests).then(function(response) {
  dataset = response[1]
  console.log(response)
  data = response[0]
  // var gdp_forecast = response[1]

  // deinfe margin, h and w of svg for the map
  var svg= d3.select("#map"),
      margin = {top:0 , right: 0, bottom: 0, left: 0},
      height = 550;
      width = 650;

  // make the svg for the map
  var svg = d3.select("#map")
      .append("svg")
      .attr("width", width)
      .attr("height", height)
      .append('g')
      .attr('class', 'map')
      .attr('transform', 'translate(0, -0)');

    // make title of map
    svg.append('text')
      .attr('class', 'title')
      .attr('x', width / 2)
      .attr('y', 20)
      .attr('text-anchor', 'middle')
      .text('Map of the world with GDP forecast ')

      map(svg, data, dataset, '2017', height, width, margin);

}).catch(function(e){
  throw(e);
})


function map(svg, data, dataset, year, height, width, margin){
  // this function draws the map

    // Set tooltips
    var tip = d3.tip()
              .attr('class', 'd3-tip')
              .offset([-10, 0])
              .html(function(d) {
                return "<strong>Country: </strong><span class='details'>" + d.properties.name + "<br></span>" + "<strong>Forecast gdp: </strong><span class='details'>"  + format(d.deficit) + "<br></span>" + "<strong>Year: </strong><span class='details'>" + year + "<br></span>";
              })

    // make color range for the different percentages of gdp forecasts
    var color = d3.scaleThreshold()
      .domain([-5,-3,-1,1,3,5,7,9,11])
      .range(["rgb(222,235,247)", "rgb(198,219,239)", "rgb(158,202,225)", "rgb(107,174,214)", "rgb(66,146,198)","rgb(33,113,181)","rgb(8,81,156)","rgb(8,48,107)","rgb(3,19,43)"])


    var path = d3.geoPath();

    var projection = d3.geoMercator()
                  .scale(450)
                  .translate([width / 3.5, height/0.7]);

    var path = d3.geoPath().projection(projection);

    svg.call(tip);

    // // find for the year the gdp forecast values of all countries in dataset to display on the map
     deficit_byID = {}
     dataset.forEach(function(d) { deficit_byID[d['country']] = +d[year]; });
     data.features.forEach(function(d) { d.deficit = deficit_byID[d.id] });

     console.log(deficit_byID)

    // start drawing the map with the data
    svg.append("g")
        .attr("class", "countries")
        .attr('transform', 'translate(0, 32)')
      .selectAll("path")
        .data(data.features)
      .enter().append("path")
        .attr("d", path)
        // determine gdp color per country
        .style("fill", function(d) { return color(deficit_byID[d.id])})
        .style('stroke', 'white')
        .style('stroke-width', 1.5)
        .style("opacity",1)
        // tooltips
        .style("stroke","white")
        .style('stroke-width', 0.3)
        .on('mouseover',function(d){
              tip.show(d);
            d3.select(this)
                    .style("opacity", 1)
                    .style("stroke","white")
                    .style("stroke-width",3);
                })
                .on('mouseout', function(d){
                  tip.hide(d);

                  d3.select(this)
                    .style("opacity", 1)
                    .style("stroke","white")
                    .style("stroke-width",0.3);
                });

}
};
