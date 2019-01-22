var barChartFunction;

function makeBarchart(){
// var data = 'data.json'
var data = 'data_distribution.json'

var requests = [d3.json(data)]
var format = d3.format(",");


Promise.all(requests).then(function(response) {
  function barchart(year, countryk, update){
    console.log(update);


    console.log(response[0])
    console.log(countryk)
    // deinfe margin, h and w of svg for the map
    var svg = d3.select("#piechart"),
        margin = {top:10 , right: 10, bottom: 30, left: 50},
        height = 300;
        width = 700;

    barPadding = 1;

    var x_scale = d3.scaleLinear()
        .domain([0, 10])
        .range([margin.left, width - margin.right]);

    // make y_scale
    var y_scale = d3.scaleLinear()
      .domain([0, 30])
      .range([height - margin.bottom, margin.top]);

      console.log(update)
      if (update == 'False'){
        console.log('hi')
        bar_chart(response[0], countryk, year, svg, x_scale, y_scale, height, width, margin, barPadding)
        make_titles(svg, height, width, margin)}
      else{
          updateBarchart(response[0], countryk, year, svg, x_scale, y_scale, height, width, margin, barPadding)
          // makeAxis(response[0], svg, countryk, x_scale, y_scale, height, width, margin)

      }

  function bar_chart(data, country_id, year, svg, x_scale, y_scale, h, w, margin, barPadding){

    // make the svg for the map
    var svg = d3.select("#piechart")
        .append("svg")
        .attr("width", w)
        .attr("height", h)
        .append('g')
        .attr('transform', 'translate(0, -0)');

    // make tip for interactivity feature
    var tip = d3.tip()
      .attr('class', 'd3-tip')
      .offset([-10, 0])
      .html(function(d, i) {
        return "<strong>Suicide rate:</strong> <span style='color:red'>" + d + "</span>";
      })

    key_in_list = []
    data_in_list = []
    console.log(country_id)
    Object.keys(data[country_id][year]).forEach(function(key) {
      if(key!= "TOT"){
      key_in_list.push(key)
      data_in_list.push(Number(data[country_id][year][key]))
    }
    });

    svg.call(tip)
    // built barchart
    svg.selectAll(".bar")
    .data(data_in_list)
    .enter()
    .append("rect")
    .attr("class", "bar")
    // x-values are the years
    .attr("x", function(d, i) {
      return x_scale(i)
      })
    // y-values are the suicide_rates
    .attr("y", function(d) {
      return y_scale(d) //Height minus data value
    })
    // define width
    .attr("width", (w - margin.left - margin.right) / (10) )
    // define height of each bar
    .attr("height", function(d) {
      return (h - margin.bottom - y_scale(d));
    })
    // if mouse is in barchart, show height in activity feature
    .on('mouseover', tip.show)
    .on('mouseout', tip.hide)


    const xScale = d3.scaleBand()
      .range([0, w-margin.left - margin.right])
      .domain(key_in_list.map((s) => s))

    // add scales to x-axis
    var x_axis = d3.axisBottom()
      .scale(xScale)

    // append group and insert axis
    svg.append("g")
      .attr("transform", "translate(" + margin.left + ", " + (h - margin.bottom) + ")")
      .call(x_axis)

    // add scales to y-axis
   var y_axis = d3.axisLeft()
      .scale(y_scale);

    // append group and insert axis
    svg.append("g")
      .attr("transform", "translate(" + margin.left + "," + 0 + ")")
      .call(y_axis);

  }

  function makeAxis(data, svg, country_id, x_scale, y_scale, h, w, margin){

    console.log('assen')
    key_in_list = []
    Object.keys(data[country_id][year]).forEach(function(key) {
      if(key!= "TOT"){
      key_in_list.push(key)
    }
  });

  console.log(key_in_list)

    const xScale = d3.scaleBand()
      .range([0, w-margin.left - margin.right])
      .domain(key_in_list.map((s) => s))

    // add scales to x-axis
    var x_axis = d3.axisBottom()
      .scale(xScale)

    // append group and insert axis
    svg.append("g")
      .attr("transform", "translate(" + margin.left + ", " + (h - margin.bottom) + ")")
      .call(x_axis)

    // add scales to y-axis
   var y_axis = d3.axisLeft()
      .scale(y_scale);

    // append group and insert axis
    svg.append("g")
      .attr("transform", "translate(" + margin.left + "," + 0 + ")")
      .call(y_axis);

  }

  function make_titles(svg, h, w, margin, name){


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
        .attr('y', h - 2)
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

  function updateBarchart(data, country_id, year, svg, x_scale, y_scale, h, w, margin, barPadding){

    data_in_list = []
    console.log(country_id)
    Object.keys(data[country_id][year]).forEach(function(key) {
      if(key!= "TOT"){
      data_in_list.push(Number(data[country_id][year][key]))
    }
  });
    console.log(country_id)

    var bars = svg.selectAll(".bar").data(data_in_list)

    // Add bars for new data
    bars.enter()
      .append("rect")
      .attr("class", "bar")
      .attr("x", function(d, i) {
        return x_scale(i)
        })
      .attr("y", function(d) {
        return y_scale(d) //Height minus data value
      })
      .attr("width", (w - margin.left - margin.right) / (10) )
      .attr("height", function(d) {
        return (h - margin.bottom - y_scale(d));
      })

    // Update old ones, already have x / width from before
    bars.transition().duration(250)
      .attr("y", function(d) {
        return y_scale(d) //Height minus data value
      })
      .attr("height", function(d) {
        return (h - margin.bottom - y_scale(d));
      })

    // Remove old ones
    bars.exit().remove();
};
}
barchart('1995', 'AUT', 'False')
barChartFunction = barchart;
}).catch(function(e){
  throw(e);
})

}
