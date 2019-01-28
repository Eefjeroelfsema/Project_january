function makeLinechart() {

  var data = '../data/data.json'
  var format = d3.format(",");
  var request = [d3.json(data)]

  Promise.all(request).then(function(response) {

    var data = response[0]
    // deinfe margin, h and w of svg for the map
    var svg = d3.select("#linechart"),
        margin = {top:40 , right: 30, bottom: 10, left: 30},
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
        .domain([-35, 10])
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

    make_axis(svg, x_scale, y_scale, height, width, margin)

    for(i = 0 ; i <= 22; i++){
      country = response[0][i].country
      countryline(svg, x_scale, y_scale, years, country_values, country)
    }

    d3.select("#objectID").on("change", change)
      function change() {

        for(i=0; i<=22; i++){
        var u = d3.select('#linechart')
            .selectAll('path', 'circle')
            .data(response[0][i]);
  
        u.exit().remove();
        }

        var index = d3.select("#objectID").node().value;

        index = index.toString();

        if(index!= 30){
          country = response[0][index].country
          y_scale = updateyScale(country_values[country], height, margin)
          countryline(svg, x_scale, y_scale, years, country_values, country)
          make_axis(svg, x_scale, y_scale, height, width, margin)
        }
        else{
          for(i=0; i<=22; i++){
            country = response[0][i].country

            // make y_scale
            var y_scale = d3.scaleLinear()
                .domain([-35, 10])
                .range([height - margin.top, margin.bottom]);

            countryline(svg, x_scale, y_scale, years, country_values, country)
            make_axis(svg, x_scale, y_scale, height, width, margin)
          }
        }
      }

    d3.selectAll(".m")
      .data(response[0])
      .on("click", function(d) {})


  }).catch(function(e){
  throw(e);
  })


  function countryline(svg, x_scale, y_scale, years, country_values, specific_country){

    var line = d3.line()
        .x(function(d, i) { return x_scale(years[i]); }) // set the x values for the line generator
        .y(function(d) { return y_scale(d); }) // set the y values for the line generator
        .curve(d3.curveMonotoneX) // apply smoothing to the line

    var tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .html(function(d) {
          return "<strong>Country: </strong><span class='details'>" + specific_country + "<br></span>" + "<strong>Budget deficit in %: </strong><span class='details'>"  +  + "<br></span>" + "<strong>Year: </strong><span class='details'>" + years[i] + "<br></span>";
        })

    svg.call(tip);


    svg.append("path")
       .datum(country_values[specific_country]) // 10. Binds data to the line
       .attr("class", "line") // Assign a class for styling
       .style("stroke", "SlateGrey")
       .attr("d", line) // 11. Calls the line generator
       .on('mouseover', function (d, i) {
         d3.select(this)
           .style("stroke", "Red")
         tip.show
      })
      .on('mouseout', function (d) {
        tip.hide(d)
        d3.select(this)
          .style("stroke", "SlateGrey")
      })

  }
  function make_axis(svg, x_scale, y_scale, h, w, margin) {

    // remove titles from previous scatterplot
    svg.selectAll('g')
       .attr('class', 'title')
       .remove()

    var xAxis = d3.axisBottom()
        .scale(x_scale)
        .tickFormat(d3.format(".0f"));

    var yAxis = d3.axisLeft()
        .scale(y_scale)

    // append group and insert axis
    var gX = svg.append("g")
        .attr("transform", "translate(" + 0 + "," +(h - margin.top) + ")")
        .call(xAxis)

      // append group and insert axis
    var gY = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," +  0 + ")")
        .call(yAxis);

  }
  function updateyScale(country_values, height, margin){

    var minimum = Math.min(...country_values)
    var maximum = Math.max(...country_values)

    console.log(minimum)
    console.log(maximum)

    // make y_scale
    var y_scale = d3.scaleLinear()
        .domain([minimum, maximum])
        .range([height - margin.top, margin.bottom]);

    return y_scale

  }


}
