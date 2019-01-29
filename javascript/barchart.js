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
      var x_scale = d3.scaleLinear()
          .domain([0, 10])
          .range([margin.left, width - margin.right]);

      // make y scale
      var y_scale = d3.scaleLinear()
          .domain([0, 30])
          .range([height - margin.bottom, margin.top]);

      // if update, given when the function is calles, is False. First barchart is made
      if (update == 'False'){
        // bar_chart function is called
        bar_chart(response[0], countryk, year, svg, x_scale, y_scale, height, width, margin, barPadding)
      }
      // if update is True, a barchart is already made and now updated with different data
      else{
        updateBarchart(response[0], countryk, year, svg, x_scale, y_scale, height, width, margin, barPadding)
      }
    }
    function bar_chart(data, country_id, year, svg, x_scale, y_scale, h, w, margin, barPadding){

      // make the svg for the map
      var svg = d3.select("#piechart")
          .append("svg")
          .attr("width", w)
          .attr("height", h)
          .append('g')
          .attr('transform', 'translate(0, -0)');

      // make lists to put data in and sectornames
      key_in_list = []
      data_in_list = []

      // put the data specific for that country and year in a list
      Object.keys(data[country_id][year]).forEach(function(key) {
        if(key!= "TOT"){
          data_in_list.push(Number(data[country_id][year][key]))

          // change short names to full names of the sectors
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
        }
      });

      // make barchart
      svg.selectAll(".bar")
         .data(data_in_list)
         .enter()
         .append("rect")
         .attr("class", "bar")
         .attr("x", function(d, i) {
           return x_scale(i)
         })
         .attr("y", function(d) {
           return y_scale(d)
         })
         .attr("width", (w - margin.left - margin.right) / (10) )
         .attr("height", function(d) {
           return (h - margin.bottom - y_scale(d));
         })

      // add sectors under the x-axis
      const xScale = d3.scaleBand()
            .range([0, w-margin.left - margin.right])
            .domain(keys_in_list.map((s) => s))

      // add scales to x-axis
      var x_axis = d3.axisBottom()
          .scale(xScale)

      // append group and insert axis
      svg.append("g")
         .attr("transform", "translate(" + margin.left + ", " + (h- margin.bottom) + ")")
         .call(x_axis)

      // rotate the labels in the x-axis
      svg.selectAll("text")
         .style("text-anchor", "start")
         .attr("transform", "rotate(40)")

     // add scales to y-axis
     var y_axis = d3.axisLeft()
         .scale(y_scale);

    // append group and insert axis
    svg.append("g")
       .attr("transform", "translate(" + margin.left + "," + 0 + ")")
       .call(y_axis);

    }
    function make_titles(svg, h, w, margin, name){

      // add title title
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

      var bars = svg.selectAll(".bar").data(data_in_list)

      // update barchart with new data
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

          // make the update look smooth with a transistion and attrTween

      bars.transition().duration(1500)
          .attr("y", function(d) {
            return y_scale(d) //Height minus data value
          })
          .attr("height", function(d) {
            return (h - margin.bottom - y_scale(d));
          })

      // Remove old ones
      bars.exit().remove();
    };
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

  barchart('1995', 'AUT', 'False')
  barChartFunction = barchart;
  }).catch(function(e){
    throw(e);
  })

}
