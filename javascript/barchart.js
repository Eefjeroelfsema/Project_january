// define barchartfunction, which can be called from the map script
var barChartFunction;

function makeBarchart(){

  // import data
  var data = '../data/data_distribution.json'
  var requests = [d3.json(data)]
  var format = d3.format(",");


  Promise.all(requests).then(function(response) {
    // overal function barchart, which kan be called from the map javascript
    function barchart(year, countryk, update, fullname){

      // deinfe margin, h and w of svg for the map
      var svg = d3.select("#piechart"),
          margin = {top:10 , right: 10, bottom: 120, left: 50},
          height = 500;
          width = 600;

      // make x scale
      var xScale = d3.scaleLinear()
          .domain([0, 10])
          .range([margin.left, width - margin.right]);

      // make y scale
      var yScale = d3.scaleLinear()
          .domain([0, 30])
          .range([height - margin.bottom, margin.top]);

      // define colors (the same as piechart) for the sectors
      var color = ['#845EC2','#D65DB1', '#FF9671','#FF6F91', '#FFC75F', '#F9F871', '#008F7A', '#008E9B', '#0081CF', '#C4FCEF'];

      // if update, given when the function is calles, is False. First barchart is made
      if (update == 'False'){
        // bar_chart function is called
        firstBarchart(response[0], countryk, year, svg, xScale, yScale, height, width, margin, barPadding, color)
      }
      // if update is True, a barchart is already made and now updated with different data
      else{
        updateBarchart(response[0], countryk, year, svg, xScale, yScale, height, width, margin, barPadding, color)
      }
    }
    function firstBarchart(data, country_id, year, svg, xScale, yScale, h, w, margin, barPadding, color){

      // make the svg for the map
      var svg = d3.select("#piechart")
          .append("svg")
          .attr("width", w)
          .attr("height", h)
          .append('g')
          .attr('transform', 'translate(0, -0)');

      // make lists to put data in and sectornames
      dataList = []

      // put the data specific for that country and year in a list
      Object.keys(data[country_id][year]).forEach(function(key) {
        if(key!= "TOT"){
          dataList.push(Number(data[country_id][year][key]));
        }
        else {
          total = data[country_id][year][key];
        }
      });

      makeAxis(svg, h, w, margin, yScale)

      keyLists = keyList
      // make barchart
      svg.selectAll(".bar")
         .data(dataList)
         .enter()
         .append("rect")
         .attr("class", "bar")
         .attr("x", function(d, i) {
           return xScale(i)
         })
         .attr("y", function(d) {
           return yScale(d)
         })
         .attr("width", (w - margin.left - margin.right) / (10) )
         .attr("height", function(d) {
           return (h - margin.bottom - yScale(d));
         })
         .style("fill", function(d,i){
           return color[i]
         })
         // add sector and percentage on top of barchart when mouseover
         .on('mouseover', function(d,i){
           svg.append('text')
              .attr('class', 'sector')
              .attr('x', 90)
              .attr('y', 60)
              .attr('text-anchor', 'left')
              .text('Total spend on ' + keyList[i] + ': ' +Math.round(d * 100) / 100 + '% of GDP')
            })

          .on('mouseout', function(d,i){
            d3.select(this)
            svg.selectAll('.sector').remove()
         })

         makeText(svg, h, w, margin, total)

    }
    function makeAxis(svg, h, w, margin, yScale){

      keyList = keyList()

      // add sectors under the x-axis
      const xScale = d3.scaleBand()
            .range([0, w-margin.left - margin.right])
            .domain(keyList.map((s) => s))

      // add scales to x-axis
      var xAxis = d3.axisBottom()
          .scale(xScale)

      // append group and insert axis
      svg.append("g")
         .attr("class", 'axistext')
         .attr("transform", "translate(" + margin.left + ", " + (h- margin.bottom) + ")")
         .call(xAxis)

      // rotate the labels in the x-axis
      svg.selectAll("text")
         .style("text-anchor", "start")
         .attr("transform", "rotate(40)")

     // add scales to y-axis
     var yAxis = d3.axisLeft()
         .scale(yScale);

    // append group and insert axis
    svg.append("g")
       .attr("class", 'axistext')
       .attr("transform", "translate(" + margin.left + "," + 0 + ")")
       .call(yAxis);

    }
    function makeText(svg, h, w, margin, total){

      // add total spendings in top of the barchart
      svg.append('text')
         .attr('class', 'title')
         .attr('x', 90)
         .attr('y', 40)
         .attr('text-anchor', 'left')
         .text('Total spend: ' + Math.round(total * 100) / 100 + '% of GDP')

    }
    function updateBarchart(data, country_id, year, svg, xScale, yScale, h, w, margin, barPadding, color){

      dataList = []
      console.log(country_id)
      Object.keys(data[country_id][year]).forEach(function(key) {
        if(key!= "TOT"){
        dataList.push(Number(data[country_id][year][key]))
      }
      });

      var bars = svg.selectAll(".bar").data(dataList)

      // update barchart with new data
      bars.enter()
          .append("rect")
          .attr("class", "bar")
          .attr("x", function(d, i) {
            return xScale(i)
          })
          .attr("y", function(d) {
            return yScale(d) //Height minus data value
          })
          .attr("width", (w - margin.left - margin.right) / (10) )
          .attr("height", function(d) {
            return (h - margin.bottom - yScale(d));
          })
          .style("fill", function(d,i){
            return color[i]
          })

      // make the update look smooth with a transistion and attrTween
      bars.transition().duration(1500)
          .attr("y", function(d) {
            return yScale(d) //Height minus data value
          })
          .attr("height", function(d) {
            return (h - margin.bottom - yScale(d));
          })

      // Remove old bars
      bars.exit().remove();

      // makeAxis(svg, h, w, margin, yScale)

    };

  barchart('1995', 'AUT', 'False')
  barChartFunction = barchart;
  }).catch(function(e){
    throw(e);
  })

}
