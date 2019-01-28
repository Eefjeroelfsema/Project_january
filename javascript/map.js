function makeMap() {

  // var data = 'data.json'
  var world_countries = '../data/world_countries.json'
  var data = '../data/data.json'

  var requests = [d3.json(world_countries), d3.json(data)]
  var format = d3.format(",");

  Promise.all(requests).then(function(response) {

    dataset = response[1]
    console.log(response)
    data = response[0]
    // var gdp_forecast = response[1]

    // deinfe margin, h and w of svg for the map
    var svg = d3.select("#map"),
        margin = {top:0 , right: 0, bottom: 0, left: 0},
        height = 550;
        width = 600;

    // make the svg for the map
    var svg = d3.select("#map")
        .append("svg")
        .attr('id', 'testSVG')
        .attr("width", width)
        .attr("height", height)
        .append('g')
        .attr('class', 'map')
        .attr('transform', 'translate(20, 0)');

    // Set tooltips
    var tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .html(function(d) {
          return "<strong>Country: </strong><span class='details'>" + d.properties.name + "<br></span>" + "<strong>Budget deficit in % of GDP: </strong><span class='details'>"  + format(d.deficit) + "<br></span>";
        });

    var path = d3.geoPath();

    var projection = d3.geoMercator()
        .scale(450)
        .translate([width / 3.5, height/0.7]);

    var path = d3.geoPath().projection(projection);

    var color = d3.scaleThreshold()
        .domain(["-10","-9","-8","-7","-6","-5","-4","-3","-2","-1","0","1","2","3","4","5"])
        .range(['#ff0000','#ff2b18','#ff4029','#ff5038','#ff5d47','#fe6a55','#fc7564','#ff7e00','#ff8d00','#ff9900','#ffa500','#dda100','#bb9d00','#989700','#749000','#4c8800','#008000'])


    map(svg, data, dataset, '1995', height, width, margin, color, tip, path);
    makeText(svg,'1995')


    d3.selectAll("path")
      .on("click", function(d) {
        console.log(d.properties['name'])
        pieChartfunction('1995', d.id, 'True', d.properties['name'])
        barChartFunction('1995', d.id, 'True', d.properties['name'])
        modal.style.display = "block";    })

    // Setting slider
    var dataTime = d3.range(0, 22).map(function(d) {
        return new Date(1995 + d, 10, 3);
      });


    var sliderTime = d3
        .sliderBottom()
        .min(d3.min(dataTime))
        .max(d3.max(dataTime))
        .step(1000 * 60 * 60 * 24 * 365)
        .width(550)
        .tickFormat(d3.timeFormat('%Y'))
        .on('onchange', val => {
          updateMap(svg, data, dataset, val, height, width, margin, color, tip, path)
          makeText(svg,val.getFullYear())
          d3.select('#mapyear').text(d3.timeFormat('%Y')(val));
          d3.selectAll("path")
            .on("click", function(d) {
              pieChartfunction(val.getFullYear(), d.id, 'True', d.properties['name'])
              barChartFunction(val.getFullYear(), d.id, 'True', d.properties['name'])
              modal.style.display = "block";
            })
          });

    var gTime = d3
        .select('div#slider-time')
        .append('svg')
        .attr('width', 610)
        .attr('height', 80)
        .append('g')
        .attr('transform', 'translate(20,20)');


    gTime.call(sliderTime);

    }).catch(function(e){
    throw(e);
  })


  function map(svg, data, dataset, year, height, width, margin, color, tip, path){
    // this function draws the map

    svg.call(tip);

     // // find for the year the gdp forecast values of all countries in dataset to display on the map
    deficit_byID = {}
    dataset.forEach(function(d) { deficit_byID[d['country']] = +d[year]; });
    data.features.forEach(function(d) { d.deficit = deficit_byID[d.id] });

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


  var linear = d3.scaleOrdinal()
      .domain(["<-10","-10 : -9","-9-8","-7","-6","-5","-4","-3","-2","-1","0","1","2","3","4","5"])
      .range(['#ff0000','#ff2b18','#ff4029','#ff5038','#ff5d47','#fe6a55','#fc7564','#ff7e00','#ff8d00','#ff9900','#ffa500','#dda100','#bb9d00','#989700','#749000','#4c8800','#008000'])

  d3.select('#testSVG')
    .append("g")
    .attr("class", "legendLinear")
    .attr("transform", "translate(10,200)");

  var legendLinear = d3.legendColor()
    .shapeWidth(25)
    .cells([0,1,5,10,50,100,250,500,1000,2500,3500])
    .orient('vertical')
    .scale(linear);

  svg = d3.select('#testSVG');

  svg.select(".legendLinear")
    .call(legendLinear);


    //
    // // d3.select('g')
    // //   .append("g")
    // //   .attr("class", "legendLinear")
    // //   .attr("transform", "translate(10,270)");
    //
    // var legendLinear = d3.legendColor()
    //     .shapeWidth(25)
    //     .cells(["-10","-9","-8","-7","-6","-5","-4","-3","-2","-1","0","1","2","3","4","5"])
    //     .orient('vertical')
    //     .scale(linear);
    //
    // // svg = d3.select('g');
    //
    // k = d3.select("#map")
    //
    // console.log(legendLinear);
    //
    // k.call(legendLinear)


      }

  function updateMap(svg, data, dataset, val, height, width, margin, color, tip, path){

    year = val.getFullYear()
    // // find for the year the gdp forecast values of all countries in dataset to display on the map
    deficit_byID = {}
    dataset.forEach(function(d) { deficit_byID[d['country']] = +d[year]; });
    data.features.forEach(function(d) { d.deficit = deficit_byID[d.id] });

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

  function makeText(svg,year){
    // remove titles from previous scatterplot
    svg.selectAll('text')
       .attr('class', 'title')
       .remove()

    // add y-as title
    svg.append('text')
       .attr('class', 'title')
       .attr('x', 50)
       .attr('y', 50)
       .attr("transform", "rotate(0)")
       .attr('text-anchor', 'middle')
       .text(year)

    }

};
