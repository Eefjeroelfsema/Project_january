
// var data = 'data.json'
var data = 'data_distribution.json'

var requests = [d3.json(data)]
var format = d3.format(",");

Promise.all(requests).then(function(response) {

    console.log(response[0])

    // define hight and width of svg and bar-chart
    // deinfe margin, h and w of svg for the map
    var svg = d3.select("#histogram"),
        margin = {top:40 , right: 30, bottom: 10, left: 30},
        height = 550;
        width = 700;

    // make the svg for the map
    var svg = d3.select("#histogram")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append('g')
        .attr('transform', 'translate(0, -0)');

    barPadding = 1;
    // define max and min of dataset
    var min_year = 2007
    var max_year = 2016


    var x_scale = d3.scaleLinear()
        .domain([0, 10])
        .range([margin.left, width - margin.right]);

    // make y_scale
    var y_scale = d3.scaleLinear()
      .domain([0, 50])
      .range([height - margin.top, margin.bottom]);

    bar_chart(response[0], 'AUT', '2016', svg, x_scale, y_scale, height, width, margin, barPadding)



  function bar_chart(data, country, year, svg, x_scale, y_scale, h, w, margin, barPadding){

    // make tip for interactivity feature
    var tip = d3.tip()
      .attr('class', 'd3-tip')
      .offset([-10, 0])
      .html(function(d, i) {
        return "<strong>Suicide rate:</strong> <span style='color:red'>" + d + "</span>";
      })

    data_in_list = []
    Object.keys(data[country][year]).forEach(function(key) {
      data_in_list.push(Number(data[country][year][key]))
      console.log(key, data[country][year][key]);
    });

    svg.call(tip)
    console.log(data_in_list)
    // built barchart
    svg.selectAll(".bar")
    .data(data_in_list)
    .enter()
    .append("rect")
    .attr("class", "bar")
    // x-values are the years
    .attr("x", function(d, i) {
      console.log(x_scale(i))
      return x_scale(i)
      })
    // y-values are the suicide_rates
    .attr("y", function(d) {
      console.log(y_scale(d))
      return y_scale(d)  //Height minus data value
    })
    // define width
    .attr("width", (w - margin.left) / (10))
    // define height of each bar
    .attr("height", function(d) {
      console.log(h-y_scale(d))
      return (h - y_scale(d));
    })
    // if mouse is in barchart, show height in activity feature
    .on('mouseover', tip.show)
    .on('mouseout', tip.hide)
  }


}).catch(function(e){
  throw(e);
})
