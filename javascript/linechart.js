function makeLinechart() {

  // import data
  var data = '../data/data.json'
  var format = d3.format(",");
  var request = [d3.json(data)]

  Promise.all(request).then(function(response) {

    // define data from response
    var data = response[0]

    // deinfe margin, h and w of svg for the linechart
    var svg = d3.select("#linechart"),
        margin = {top:40 , right: 30, bottom: 10, left: 30},
        height = 550;
        width = 700;
        barPadding = 1;

    // make the svg for the linechart
    var svg = d3.select("#linechart")
        .append("svg")
        .attr("width", width)
        .attr("height", height)
        .append('g')
        .attr('transform', 'translate(0, -0)');

    // make xscale
    var xScale = d3.scaleLinear()
        .domain([1995, 2018])
        .range([margin.left, width - margin.right]);

    // make yscale
    var yScale = d3.scaleLinear()
        .domain([-35, 10])
       .range([height - margin.top, margin.bottom]);

    // put the values of each country in a list in a dictionary under the countryname
    countryValues = {}
    response[0].forEach(function(d) {
      values = []
      for(i = 1995; i <= 2017; i++){
        values.push(Number(d[i]))
      }
        countryValues[d['country']] = values;
    });

    // make a list of all the years in the dataset
    years = []
    for(i = 1995; i <= 2017; i++){
      years.push(i)
    }

    // make the begin axis of the linechart
    make_axis(svg, xScale, yScale, height, width, margin)

    // for each country in the dataset, draw the historical budget deficit line
    for(i = 0 ; i <= 22; i++){
      // find the countryname and give to the line
      country = response[0][i].country
      countryline(svg, xScale, yScale, years, countryValues, country)
    }

    // update function
    d3.select("#objectID").on("change", change)
      function change() {

        for(i=0; i<=22; i++){
        var u = d3.select('#linechart')
            .selectAll('path', 'circle')
            .data(response[0][i]);

        u.exit().remove();
        }

        // get value of buttonvalue
        var index = d3.select("#objectID").node().value;

        index = index.toString();
        // if this is true, add 1 line of 1 country
        if(index!= 30){
          country = response[0][index].country

          // make new yScale, such that the y_axis can be updated
          yScale = updateyScale(countryValues[country], height, margin)

          // draw the line by calling this function
          countryline(svg, xScale, yScale, years, countryValues, country)

          // add x_axis
          make_axis(svg, xScale, yScale, height, width, margin)
        }
        // if index = 30, all the countrylines should be drawed
        else{
          // make yScale for all the countries
          var yScale = d3.scaleLinear()
              .domain([-35, 10])
              .range([height - margin.top, margin.bottom]);
          make_axis(svg, xScale, yScale, height, width, margin)

          // loop over all the countries in the dataset
          for(i=0; i<=22; i++){
            country = response[0][i].country

            // draw the line of the country you loop over
            countryline(svg, xScale, yScale, years, countryValues, country)
          }
        }
      }

    d3.selectAll(".m")
      .data(response[0])
      .on("click", function(d) {})

  }).catch(function(e){
  throw(e);
  })

  function countryline(svg, xScale, yScale, years, countryValues, specificCountry){

    // make variable line
    var line = d3.line()
        .x(function(d, i) { return xScale(years[i]); }) // set the x values for the line generator
        .y(function(d) { return yScale(d); }) // set the y values for the line generator
        .curve(d3.curveMonotoneX) // apply smoothing to the line

    // add line to svg with correct data
    svg.append("path")
       .datum(countryValues[specificCountry]) // 10. Binds data to the line
       .attr("class", "line") // Assign a class for styling
       .style("stroke", "SlateGrey")
       .attr("d", line) // 11. Calls the line generator
       // when mouse is on the line, turn red
       .on('mouseover', function (d, i) {
         d3.select(this)
           .style("stroke", "Red")
         // show the country you hoover over in the svg
         svg.append("text")
            .attr('x', 430)
            .attr('y', 70)
            .attr('font-size', '2em')
            .attr("class", 'countryname')
            .text( fullnameCountry(specificCountry) );
      })
      // when mouse leaves the line, turn grey again
      .on('mouseout', function (d) {
        d3.select(this)
          .style("stroke", "SlateGrey")
        svg.selectAll('.countryname').remove()
      })

  }
  function make_axis(svg, xScale, yScale, h, w, margin) {

    // remove titles from previous scatterplot
    svg.selectAll('g')
       .attr('class', 'title')
       .remove()

    var xAxis = d3.axisBottom()
        .scale(xScale)
        .tickFormat(d3.format(".0f"));

    var yAxis = d3.axisLeft()
        .scale(yScale)

    // append group and insert axis
    var gX = svg.append("g")
        .attr("transform", "translate(" + 0 + "," +(h - margin.top) + ")")
        .call(xAxis)

      // append group and insert axis
    var gY = svg.append("g")
        .attr("transform", "translate(" + margin.left + "," +  0 + ")")
        .call(yAxis);

  }
  function updateyScale(countryValues, height, margin){

    // define minimum and maximum of the dataset
    var minimum = Math.min(...countryValues)
    var maximum = Math.max(...countryValues)

    // make yScale
    var yScale = d3.scaleLinear()
        .domain([minimum, maximum])
        .range([height - margin.top, margin.bottom]);

    return yScale

  }
  function fullnameCountry(countryname){

    // this function makes of short names, full countrynames
    if (countryname == 'AUT'){
      return 'Austria'
    }
    else if (countryname == 'BEL'){
      return 'Belgium'
    }
    else if (countryname == 'CZE'){
      return 'Czech Republic'
    }
    else if (countryname == 'DNK'){
      return 'Denmark'
    }
    else if (countryname == 'FIN'){
      return 'Finland'
    }
    else if (countryname == 'FRA'){
      return 'France'
    }
    else if (countryname == 'DEU'){
      return 'Germany'
    }
    else if (countryname == 'GRC'){
      return 'Greece'
    }
    else if (countryname == 'HUN'){
      return 'Hungary'
    }
    else if (countryname == 'IRL'){
      return 'Ireland'
    }
    else if (countryname == 'ITA'){
      return 'Italy'
    }
    else if (countryname == 'LUX'){
      return 'Luxembourg'
    }
    else if (countryname == 'NLD'){
      return 'The Netherlands'
    }
    else if (countryname == 'POL'){
      return 'Poland'
    }
    else if (countryname == 'PRT'){
      return 'Portugal'
    }
    else if (countryname == 'SVK'){
      return 'Slovakia'
    }
    else if (countryname == 'ESP'){
      return 'Spain'
    }
    else if (countryname == 'SWE'){
      return 'Sweden'
    }
    else if (countryname == 'GBR'){
      return 'United Kingdom'
    }
    else if (countryname == 'EST'){
      return 'Estonia'
    }
    else if (countryname == 'SVN'){
      return 'Slovenia'
    }
    else if (countryname == 'LVA'){
      return 'Latvia'
    }
    else if (countryname == 'LTU'){
      return 'Lithuania'
    }


  }

}
