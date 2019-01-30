function makeMap() {

  // import data
  var world_countries = '../data/world_countries.json'
  var data = '../data/data.json'

  var requests = [d3.json(world_countries), d3.json(data)]
  var format = d3.format(",");

  Promise.all(requests).then(function(response) {

    // define data from response
    dataset = response[1]
    data = response[0]

    // deinfe margin, h and w of svg for the map
    var svg = d3.select("#map"),
        margin = {top:0 , right: 0, bottom: 0, left: 0},
        height = 550;
        width = 600;

    // make the svg for the map and add id: map
    var svg = d3.select("#map")
        .append("svg")
        .attr('id', 'testSVG')
        .attr("width", width)
        .attr("height", height)
        .append('g')
        .attr('class', 'map')
        .attr('transform', 'translate(50, 0)');

    // Set tooltip
    var tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .html(function(d) {
          return "<strong>Country: </strong><span class='details'>" + d.properties.name + "<br></span>" + "<strong>Budget deficit in percentage of GDP: </strong><span class='details'>"  + Math.round(d.deficit * 100) / 100 + '%' + "<br></span>";
        });

    // zoom in on the worldmap
    var projection = d3.geoMercator()
        .scale(450)
        .translate([width / 3.5, height/0.7]);

    // call the zoom in the map
    var path = d3.geoPath().projection(projection);

    // define colors of the countries in worldmap, by their budget deficit
    var color = d3.scaleThreshold()
        .domain(["-10","-9","-8","-7","-6","-5","-4","-3","-2","-1","0","1","2","3","4","5"])
        .range(['#ff0000','#ff2b18','#ff4029','#ff5038','#ff5d47','#fe6a55','#fc7564','#ffa500', '#ffc66f', '#ffd188','#dbd498','#b7c37d','#93b361','#6fa346','#479229','#008000'])

    // call function map and add the year in the svg
    map(svg, data, dataset, '1995', height, width, margin, color, tip, path);
    // put year in the left top corner of the svg
    makeText(svg,'1995')

    // make click-on fucntion
    d3.selectAll("path")
      .on("click", function(d) {
        // there is no data of Romenia, Croatia, Bulgaria and Cyprus
        if(d.id != 'ROU' && d.id != 'HRV' && d.id != 'CYP' && d.id != 'BGR'){
        // when on-click, update piechart and barchart
        pieChartfunction('1995', d.id, 'True', d.properties['name'])
        barChartFunction('1995', d.id, 'True', d.properties['name'])
        // open modal
        modal.style.display = "block";    }
      })

    // setting slider
    var dataTime = d3.range(0, 22).map(function(d) {
        return new Date(1995 + d, 10, 3);
      });

    // make slider, add specifics
    var sliderTime = d3
        .sliderBottom()
        .min(d3.min(dataTime))
        .max(d3.max(dataTime))
        .step(1000 * 60 * 60 * 24 * 365)
        .width(550)
        .tickFormat(d3.timeFormat('%Y'))
        .on('onchange', val => {
          // when slider is slided, update map with the new information + adjust year in svg
          updateMap(svg, data, dataset, val, height, width, margin, color, tip, path)
          // put year in the left top corner of the svg
          makeText(svg,val.getFullYear())
          d3.select('#mapyear').text(d3.timeFormat('%Y')(val));
          // difine on click function when slider is slided
          d3.selectAll("path")
            .on("click", function(d) {
              // there is no data of Romenia, Croatia, Bulgaria and Cyprus
              if(d.id != 'ROU' && d.id != 'HRV' && d.id != 'CYP' && d.id != 'BGR'){
                // update piechartfunction and barchart in the modal                pieChartfunction(val.getFullYear(), d.id, 'True', d.properties['name'])
                barChartFunction(val.getFullYear(), d.id, 'True', d.properties['name'])
                modal.style.display = "block";}
            })
          });

    // add slider to svg, dfine width and hight
    var gTime = d3
        .select('div#slider-time')
        .append('svg')
        .attr('width', 610)
        .attr('height', 80)
        .append('g')
        .attr('transform', 'translate(20,20)');

    // call slider
    gTime.call(sliderTime);

    }).catch(function(e){
    throw(e);
  })


  function map(svg, data, dataset, year, height, width, margin, color, tip, path){
    /**
     This Function draws the first map, when the page is loaded.
     Parameters:
     - svg
     - data: budget deficit data of countries
     - dataset: country map information
     - year: start year '1995'
     - height, widht, margin of the svg
     - color: which budget deficit gets which colour
     - tooltip
     - path: how is the map zoomed in
     */

    svg.call(tip);

     // find the country and budget deficit for the specific year
    deficitById = {}
    dataset.forEach(function(d) { deficitById[d['country']] = +d[year]; });
    data.features.forEach(function(d) { d.deficit = deficitById[d.id] });

    // draw the map
    svg.append("g")
       .attr("class", "countries")
       .attr('transform', 'translate(0, 32)')
       .selectAll("path")
       .data(data.features)
       .enter().append("path")
       .attr("d", path)
        // determine color per country based on the budget deficit that year
       .style("fill", function(d) { return color(deficitById[d.id])})
       .style('stroke', 'white')
       .style('stroke-width', 1.5)
       .style("opacity",1)
        // tooltips
       .style("stroke","white")
       .style('stroke-width', 0.3)
       .on('mouseover',function(d){
          // add tooltip
          tip.show(d);
          d3.select(this)
            .style("opacity", 1)
            .style("stroke","black")
            .style("stroke-width",2);
        })
        .on('mouseout', function(d){
          tip.hide(d);

        d3.select(this)
          .style("opacity", 1)
          .style("stroke","white")
          .style("stroke-width",0.3);
        });

    // add range and domain for legend
    var linear = d3.scaleOrdinal()
        .domain(["No data","<-10","-10 to -9","-9 to -8","-7 to -6","-6 to -5","-5 to-4","-4 to -3","-3 to -2","-2 to -1","-1 to 0","0 to 1","1 to 2","2 to 3","3 to 4","4 to 5",">5"])
        .range(['#000000','#ff0000','#ff2b18','#ff4029','#ff5038','#ff5d47','#fe6a55','#fc7564','#ffa500', '#ffc66f', '#ffd188','#dbd498','#b7c37d','#93b361','#6fa346','#479229','#008000'])

    // append g in svg for legend
    d3.select('#testSVG')
      .append("g")
      .attr("class", "legendLinear")
      .attr("transform", "translate(10,200)");

    var legendLinear = d3.legendColor()
      .shapeWidth(25)
      .orient('vertical')
      .scale(linear);

    svg = d3.select('#testSVG');

    // add legend in svg
    svg.select(".legendLinear")
      .call(legendLinear);

    }
  function updateMap(svg, data, dataset, val, height, width, margin, color, tip, path){
    /**
     This Function updates the map when the slider is slided.
     Parameters:
     - svg
     - data: budget deficit data of countries
     - dataset: country map information
     - year: which the slider returns (val data)
     - height, widht, margin of the svg
     - color: which budget deficit gets which colour
     - tooltip
     - path: how is the map zoomed in
     */

    // get fullyear from val
    year = val.getFullYear()

    // find the country and budget deficit for the specific year
    deficitById = {}
    dataset.forEach(function(d) { deficitById[d['country']] = +d[year]; });
    data.features.forEach(function(d) { d.deficit = deficitById[d.id] });

    // draw the map with new data
    svg.append("g")
       .attr("class", "countries")
       .attr('transform', 'translate(0, 32)')
       .selectAll("path")
       .data(data.features)
       .enter().append("path")
       .attr("d", path)
       // determine color per country based on the budget deficit that year
       .style("fill", function(d) { return color(deficitById[d.id])})
       .style('stroke', 'white')
       .style('stroke-width', 1.5)
       .style("opacity",1)
        // tooltips
       .style("stroke","white")
       .style('stroke-width', 0.3)
       // add tooltip
       .on('mouseover',function(d){
          tip.show(d);
          d3.select(this)
                  .style("opacity", 1)
                  .style("stroke","black")
                  .style("stroke-width",2);
              })
        .on('mouseout', function(d){
          tip.hide(d);

    d3.select(this)
      .style("opacity", 1)
      .style("stroke","white")
      .style("stroke-width",0.3);
      });

    }
  function makeText(svg,year){
    /**
     This Function puts the year in the left corner of the svg:
     - svg
     - year: the year the slider returns
     */

    // remove year from previous map update
    svg.selectAll('text')
       .attr('class', 'title')
       .remove()

    // add year to the svg
    svg.append('text')
       .attr('font-size', '3em')
       .attr('x', 20)
       .attr('y', 70)
       .attr('text-anchor', 'middle')
       .attr('class', 'title')
       .text(year)
    }

};
