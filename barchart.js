
// var data = 'data.json'
var data = 'data_distribution.json'

var requests = [d3.json(data)]
var format = d3.format(",");

Promise.all(requests).then(function(response) {

    console.log(response[0])

    var svg = d3.select("#histogram")
        .append("svg")
        .attr("width", 700)
        .attr("height", 550)

    // define hight and width of svg and bar-chart
    // deinfe margin, h and w of svg for the map
        margin = {top:0 , right: 50, bottom: 20, left: 50},
        height = 550 - margin.left - margin.right,
        width = 700 - margin.top - margin.bottom,

    g = svg.append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // make the svg for the map


    barPadding = 1;


    var x_scale = d3.scaleLinear()
        .domain([0, 11])
        .range([margin.left, width]);

    // make y_scale
    var y_scale = d3.scaleLinear()
      .domain([0, 60])
      .range([height, margin.bottom]);

    bar_chart(response[0], 'AUT', '2000', svg, x_scale, y_scale, height, width, margin, barPadding)
    makeAxis(x_scale, y_scale, height, width, margin)
    make_titles(svg, height, width, margin)

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
      if(key!= "TOT"){
        console.log(key)
      data_in_list.push(Number(data[country][year][key]))
      console.log(key, data[country][year][key])};
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
    .attr("width", (w) / (10))
    // define height of each bar
    .attr("height", function(d) {
      return (h - y_scale(d));
    })
    // if mouse is in barchart, show height in activity feature
    .on('mouseover', tip.show)
    .on('mouseout', tip.hide)
  }

  function makeAxis(x_scale, y_scale, h, w, margin){
    // add scales to x-axis
    var x_axis = d3.axisBottom()
      .scale(x_scale);

    // append group and insert axis
    svg.append("g")
      .attr("transform", "translate(" + 0 + ", " + 470 + ")")
      .call(x_axis);

    // add scales to y-axis
   var y_axis = d3.axisLeft()
      .scale(y_scale);

    // append group and insert axis
    svg.append("g")
      .attr("transform", "translate(" + 0 + "," + 0 + ")")
      .call(y_axis);

  }

  function make_titles(svg, h, w, margin, name){

      // // remove titles from previous scatterplot
      // svg.selectAll('text')
      //   .attr('class', 'title')
      //   .remove()

      // add scatterplot title
      svg.append('text')
        .attr('class', 'title')
        .attr('x', w / 2)
        .attr('y', 40)
        .attr('text-anchor', 'middle')
        .text(name)

      // add x-as title
      svg.append('text')
        .attr('class', 'title')
        .attr('x', w -250)
        .attr('y', h - 10)
        .attr('text-anchor', 'middle')
        .text('Sectors')

      // add y-as title
      svg.append('text')
        .attr('class', 'title')
        .attr('x', -150)
        .attr('y', 20)
        .attr("transform", "rotate(-90)")
        .attr('text-anchor', 'middle')
        .text('Government spendings in % of GDP')

  }

}).catch(function(e){
  throw(e);
})
