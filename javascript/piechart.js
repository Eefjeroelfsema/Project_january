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
          .innerRadius(80)
          .outerRadius(radius*0.9)

      // define arc2 of the piechart, to make the chart bigger when you hoover over the piechart
      var arc2 = d3.arc()
          .innerRadius(80)
          .outerRadius(radius)

      // define variable pie, which calculates which angle to make
      var pie = d3.pie()           //this will create arc data for us given a list of values
          .sort(null)
          .value(function(d) { return d; });

      // define colors for the piechart
      var color = ['#e6194B', '#3cb44b', '#ffe119', '#4363d8', '#f58231', '#911eb4', '#42d4f4', '#f032e6', '#bfef45', '#fabebe'];

      // if called in the beginning, make piechart
      if(update == 'False'){
          make_piechart(response[0], country, year, vis, width, height, radius, pie, arc, arc2, color, fullname)
      }
      // if function called from javascript map, update piechart
      else{
          updatePiechart(response[0], country, year, vis, width, height, radius, pie, arc, arc2, color, fullname)
      }
    }
    function make_piechart(data, country, year, vis, width, height, radius, pie, arc, arc2, color, fullname){

      // make lists to put data in and sectornames
      keys_in_list = []
      data_in_list = []

      // define variable total where all the data is added up to
      var total = 0

      // put the data specific for that country and year in a list
      Object.keys(data[country][year]).forEach(function(key) {
        if(key!= "TOT"){
          total = total + parseFloat(data[country][year][key])
          data_in_list.push(parseFloat(data[country][year][key]))
          // change short names to full names of the
          if (key == "GRALPUBSER"){
            keys_in_list.push("General public services")
          }
          else if(key == "DEF"){
            keys_in_list.push("Defence")
          }
          else if(key == "HEALTH"){
            keys_in_list.push("Health")
          }
          else if(key == "PUBORD"){
            keys_in_list.push("Public order and safety")
          }
          else if(key == "ECOAFF"){
            keys_in_list.push("Economic affairs")
          }
          else if(key == "ENVPROT"){
            keys_in_list.push("Environmental protection")
          }
          else if(key == "HOUCOMM"){
            keys_in_list.push("Housing and community amenities")
          }
          else if(key == "SOCPROT"){
            keys_in_list.push("Social protection")
          }
          else if(key == "RECULTREL"){
            keys_in_list.push("Recreation, culture and religion")
          }
          else if(key == "EDU"){
            keys_in_list.push("Education")
          }
        }});

      // make paths for the piechart
      var path = vis.datum(data_in_list).selectAll(".pad")
          .data(pie)

      // make piechart in svg
      path.enter().append("path")
          .attr("class", "pad")
          .attr("fill", function(d, i) { console.log(i);return color[i]; })
          .attr("d", arc)
          .each(function(d) { this._current = d; });


      // when you hoover over the piechart
      d3.selectAll(".pad")
        .on('mouseover', function(d,i){
      d3.select(this).attr("d", arc2)
        // calcualte percentage of a sector
        var percent = Math.round(10000 * d.value / total) / 100;
        // add in the middle the percentage and the name of the sector
      vis.append("text")
         .attr("text-anchor", "middle")
         .attr('font-size', '0.8em')
         .attr("class", 'percentage')
         .attr('y', 20)
         .text(keys_in_list[i] + percent + '%');
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
      keys_in_list = []
      data_in_list = []

      // define variable total where all the data is added up to
      var total = 0

      // put the data specific for that country and year in a list
      Object.keys(data[country][year]).forEach(function(key) {
      if(key!= "TOT"){
        total = total + parseFloat(data[country][year][key])
        data_in_list.push(parseFloat(data[country][year][key]))
        // change short names to full names of the
        if (key == "GRALPUBSER"){
          keys_in_list.push("General public services")
        }
        else if(key == "DEF"){
          keys_in_list.push("Defence")
        }
        else if(key == "HEALTH"){
          keys_in_list.push("Health")
        }
        else if(key == "PUBORD"){
          keys_in_list.push("Public order and safety")
        }
        else if(key == "ECOAFF"){
          keys_in_list.push("Economic affairs")
        }
        else if(key == "ENVPROT"){
          keys_in_list.push("Environmental protection")
        }
        else if(key == "HOUCOMM"){
          keys_in_list.push("Housing and community amenities")
        }
        else if(key == "SOCPROT"){
          keys_in_list.push("Social protection")
        }
        else if(key == "RECULTREL"){
          keys_in_list.push("Recreation, culture and religion")
        }
        else if(key == "EDU"){
          keys_in_list.push("Education")
        }
      }});

      // make new paths with the new data
      var path = vis.datum(data_in_list).selectAll(".pad")
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
      // add in the middle the percentage and the name of the sector
      vis.append("text")
         .attr("text-anchor", "middle")
         .attr('font-size', '0.8em')
         .attr("class", 'percentage')
         .attr('y', 20)
         .text(keys_in_list[i] + percent + '%');
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
          .innerRadius(80)
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
