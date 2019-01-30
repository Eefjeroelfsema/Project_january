var pieChartfunction;

function makePiechart(){

  // import data
  var data = '../data/data_distribution.json'
  var format = d3.format(",");
  var request = [d3.json(data)]

  // define width, height and radius for the piechart
  var width = 425,
      height = 500,
      radius = (width) / 2;

  // make the svg for the piechart, class: piech1
  var vis = d3.select("#piechart")
      .append("svg:svg")              //create the SVG element inside the <body>
      .attr("width", width)           //set the width and height of our visualization (these will be attributes of the <svg> tag
      .attr("height", height)
      .append("svg:g")                //make a group to hold our pie chart
      .attr("transform", "translate(" + radius + "," + radius + ")")
      .attr("class", 'piech1')

  Promise.all(request).then(function(response) {
    // overal function piechart, which kan be called from the map javascript
    function piechart(year, country, update, fullname){

      // get data from response
      var data = response[0]

      // define the arc of the piechart
      var arc = d3.arc()              //this will create <path> elements for us using arc data
          .innerRadius(90)
          .outerRadius(radius*0.9)

      // define arc2 of the piechart, to make the chart bigger when you hoover over the piechart
      var arc2 = d3.arc()
          .innerRadius(90)
          .outerRadius(radius)

      // define variable pie, which calculates which angle to make
      var pie = d3.pie()           //this will create arc data for us given a list of values
          .sort(null)
          .value(function(d) { return d; });

      // define colors for the piechart
      var color = ['#845EC2','#D65DB1', '#FF9671','#FF6F91', '#FFC75F', '#F9F871', '#008F7A', '#008E9B', '#0081CF', '#C4FCEF'];

      // if called in the beginning, make piechart
      if(update == 'False'){
          firstPiechart(response[0], country, year, vis, width, height, radius, pie, arc, arc2, color, fullname)
      }
      // if function called from javascript map, update piechart
      else{
          updatePiechart(response[0], country, year, vis, width, height, radius, pie, arc, arc2, color, fullname)
      }
    }
    function firstPiechart(data, country, year, vis, width, height, radius, pie, arc, arc2, color, fullname){

      // make lists to put data in and sectornames
      keyList = ['Defence', 'Health', "Housing and community amenities", "Public order and safety", "Economic affairs", "General public services", "Recreation, culture and religion", "Social protection", "Environmental protection", "Education", "Defence", "Health", "Housing and community amenities", "Public order and safety", "Economic affairs", "General public services", "Recreation, culture and religion", "Social protection", "Environmental protection", "Education"]
      dataList = []

      // define variable total where all the data is added up to
      var total = 0

      // put the data specific for that country and year in a list
      Object.keys(data[country][year]).forEach(function(key) {
        if(key!= "TOT"){
          total = total + parseFloat(data[country][year][key])
          dataList.push(parseFloat(data[country][year][key]))
        }});

      // make paths for the piechart
      var path = vis.datum(dataList).selectAll(".pad")
          .data(pie)

      // make piechart in svg
      path.enter().append("path")
          .attr("class", "pad")
          .attr("fill", function(d, i) { return color[i]; })
          .attr("d", arc)
          .each(function(d) { this._current = d; });


      // when you hoover over the piechart
      d3.selectAll(".pad")
        .on('mouseover', function(d,i){
      d3.select(this).attr("d", arc2)
        // calcualte percentage of a sector
        var percent = Math.round(10000 * d.value / total) / 100;
        // add in the middle the name of the sector
      vis.append("text")
         .attr("text-anchor", "middle")
         .attr('font-size', '0.8em')
         .attr("class", 'percentage')
         .attr('y', 15)
         .text(keyList[i]);
      // add percentage below the sector
      vis.append("text")
         .attr("text-anchor", "middle")
         .attr('font-size', '0.8em')
         .attr("class", 'percentage')
         .attr('y', 35)
         .text(percent + '%');
         })

         // remove the percentage and the name of the sector when the house is out of the chart
         .on('mouseout', function(d,i){
           d3.select(this).attr("d", arc)
           vis.selectAll('.percentage').remove()
        })

      // remove the country and year from previous piechart
      vis.selectAll(".countrytext").remove()
      // add new country in the middle of the piechart
      vis.append("text")
         .attr("class", "countrytext")
         .attr("text-anchor", "middle")
         .attr('font-size', '1.5em')
         .attr('y', -25)
         .text(fullname);
    // add new year in the middle of the piechart
     vis.append("text")
        .attr("class", "countrytext")
        .attr("text-anchor", "middle")
        .attr('font-size', '1.2em')
        .attr('y', -5)
        .text(year);

    }
    function updatePiechart(data, country, year, vis, width, height, radius, pie, arc, arc2, color,fullname){

      // make lists to put data in and sectornames from the update
      keyList = ['Defence', 'Health', "Housing and community amenities", "Public order and safety", "Economic affairs", "General public services", "Recreation, culture and religion", "Social protection", "Environmental protection", "Education", "Defence", "Health", "Housing and community amenities", "Public order and safety", "Economic affairs", "General public services", "Recreation, culture and religion", "Social protection", "Environmental protection", "Education"]
      dataList = []

      // define variable total where all the data is added up to
      var total = 0

      // put the data specific for that country and year in a list
      Object.keys(data[country][year]).forEach(function(key) {
      if(key!= "TOT"){
        total = total + parseFloat(data[country][year][key])
        dataList.push(parseFloat(data[country][year][key]))
      }});

      // make new paths with the new data
      var path = vis.datum(dataList).selectAll(".pad")
          .data(pie)
      // update the piechart
      path.enter().append("path")
          .attr("class", ".pad")
          .attr("fill", function(d, i) { console.log(i);return color[i]; })
          .attr("d", arc)
          .each(function(d) { this._current = d; });

      // make the update look smooth with a transistion and attrTween
      path.transition().duration(1500).attrTween("d", arcTween);

      // when you hoover over the piechart
      d3.selectAll(".pad")
        .on('mouseover', function(d,i){
          d3.select(this).attr("d", arc2)
          // calcualte percentage of a sector
          var percent = Math.round(10000 * d.value / total) / 100;
          // add in the middle the name of the sector
          vis.append("text")
             .attr("text-anchor", "middle")
             .attr('font-size', '0.8em')
             .attr("class", 'percentage')
             .attr('y', 15)
             .text(keyList[i]);
          // add percentage below the sector
          vis.append("text")
             .attr("text-anchor", "middle")
             .attr('font-size', '0.8em')
             .attr("class", 'percentage')
             .attr('y', 35)
             .text(percent + '%');
            })
         // remove the percentage and the name of the sector when the house is out of the chart
         .on('mouseout', function(d,i){
           d3.select(this).attr("d", arc)
           vis.selectAll('.percentage').remove()
        })
      // remove the country and year from previous piechart
      vis.selectAll(".countrytext").remove()
      // add new country in the middle of the piechart
      vis.append("text")
         .attr("class", "countrytext")
         .attr("text-anchor", "middle")
         .attr('font-size', '1.5em')
         .attr('y', -25)
         .text(fullname);
     // add new year in the middle of the piechart
     vis.append("text")
        .attr("class", "countrytext")
        .attr("text-anchor", "middle")
        .attr('font-size', '1.2em')
        .attr('y', -5)
        .text(year);
    }
    function arcTween(a) {
      var radius = 425/2
      var arc = d3.arc()              //this will create <path> elements for us using arc data
          .innerRadius(90)
          .outerRadius(radius*0.9)

      var i = d3.interpolate(this._current, a);
      this._current = i(0);
      return function(t) {
          return arc(i(t));
      };
    }

    // call function piechart before clicking on a country, so you can open the modal directly
    piechart('1995', 'AUT', 'False', 'Austria')

    // give global variable (defined on line 1), the function piechart
    pieChartfunction = piechart
  }).catch(function(e){
    throw(e);
  })
}
