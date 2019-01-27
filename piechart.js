var pieChartfunction;

function makePiechart(){

  var data = 'data_distribution.json'
  var format = d3.format(",");
  var request = [d3.json(data)]

  var width = 425,
      height = 425,
      radius = (height) / 2;

  var vis = d3.select("#piechart")
      .append("svg:svg")              //create the SVG element inside the <body>
      .attr("width", width)           //set the width and height of our visualization (these will be attributes of the <svg> tag
      .attr("height", height)
      .append("svg:g")                //make a group to hold our pie chart
      .attr("transform", "translate(" + radius + "," + radius + ")")
      .attr("class", 'piech1')

  Promise.all(request).then(function(response) {
    function piechart(year, country, update){

      var arc = d3.arc()              //this will create <path> elements for us using arc data
          .innerRadius(70)
          .outerRadius(radius*0.9)

      var arc2 = d3.arc()
          .innerRadius(70)
          .outerRadius(radius)

      var pie = d3.pie()           //this will create arc data for us given a list of values
          .sort(null)
          .value(function(d) { return d; });

      var color = ["Aqua","BlueViolet","Chocolate", "Crimson", "Darkgreen", "DarkSlateGray", "LightCoral", "#e78ac3","#a6d854","#ffd92f"];

      var data = response[0]
      data_in_list = []
      var total = 0
      Object.keys(data[country][year]).forEach(function(key) {
        if(key!= "TOT"){
          total = total + parseFloat(data[country][year][key])
          data_in_list.push(parseFloat(data[country][year][key]))
      }});


      if(update == 'False'){
          make_piechart(response[0], country, year, vis, width, height, radius, pie, arc, arc2, color)
      }
      else{
          updatePiechart(response[0], country, year, vis, width, height, radius, pie, arc, arc2, color)
      }
      // updatePiechart(response[0], country, year, vis, width, height, radius, arc, pie, color, arcs)
    }
    function make_piechart(data, country, year, vis, width, height, radius, pie, arc, arc2, color){

      keys_in_list = []
      data_in_list = []

      var total = 0
      Object.keys(data[country][year]).forEach(function(key) {
        if(key!= "TOT"){
          total = total + parseFloat(data[country][year][key])
          data_in_list.push(parseFloat(data[country][year][key]))
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


      var path = vis.datum(data_in_list).selectAll(".pad")
          .data(pie)

      path.enter().append("path")
          .attr("class", "pad")
          .attr("fill", function(d, i) { console.log(i);return color[i]; })
          .attr("d", arc)
          .each(function(d) { this._current = d; });


      d3.selectAll(".pad")
        .on('mouseover', function(d,i){
      d3.select(this).attr("d", arc2)
      var percent = Math.round(10000 * d.value / total) / 100;
      vis.append("text")
         .attr("text-anchor", "middle")
         .attr('font-size', '0.8em')
         .attr("class", 'percentage')
         .attr('y', 0)
         .text(keys_in_list[i] + percent + '%');
         })
         .on('mouseout', function(d,i){
           d3.select(this).attr("d", arc)
           vis.selectAll('.percentage').remove()
        })

      vis.selectAll(".countrytext").remove()
      vis.append("text")
         .attr("class", "countrytext")
         .attr("text-anchor", "middle")
         .attr('font-size', '1.5em')
         .attr('y', -25)
         .text(country + year);

    }
    function updatePiechart(data, country, year, vis, width, height, radius, pie, arc, arc2, color){

      keys_in_list = []
      data_in_list = []
      var total = 0

      Object.keys(data[country][year]).forEach(function(key) {
      if(key!= "TOT"){
        total = total + parseFloat(data[country][year][key])
        data_in_list.push(parseFloat(data[country][year][key]))
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

      var path = vis.datum(data_in_list).selectAll(".pad")
          .data(pie)
      path.enter().append("path")
          .attr("class", ".pad")
          .attr("fill", function(d, i) { console.log(i);return color[i]; })
          .attr("d", arc)
          .each(function(d) { this._current = d; });


      path.transition().duration(1500).attrTween("d", arcTween);


      d3.selectAll(".pad")
        .on('mouseover', function(d,i){
      d3.select(this).attr("d", arc2)
      var percent = Math.round(10000 * d.value / total) / 100;
      vis.append("text")
         .attr("text-anchor", "middle")
         .attr('font-size', '0.8em')
         .attr("class", 'percentage')
         .attr('y', 0)
         .text(keys_in_list[i] + percent + '%');
         })
         .on('mouseout', function(d,i){
           d3.select(this).attr("d", arc)
           vis.selectAll('.percentage').remove()
        })

      vis.selectAll(".countrytext").remove()
      vis.append("text")
         .attr("class", "countrytext")
         .attr("text-anchor", "middle")
         .attr('font-size', '1.5em')
         .attr('y', -25)
         .text(country + year);
    }
    function arcTween(a) {
      var radius = 425/2
      var arc = d3.arc()              //this will create <path> elements for us using arc data
          .innerRadius(70)
          .outerRadius(radius*0.9)

      var i = d3.interpolate(this._current, a);
      this._current = i(0);
      return function(t) {
          return arc(i(t));
      };
    }
    piechart('1995', 'AUT', 'False')
    pieChartfunction = piechart
  }).catch(function(e){
    throw(e);
  })
}
