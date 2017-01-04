import React from 'react';
import * as d3 from 'd3';


class ScatterPlot extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      width: 960,
      height: 500,
      options: {
        // styles here!
      }
    }
  }

  componentDidMount() {
    var margin = {top: 20, right: 20, bottom: 30, left: 40};
    var width = this.state.width;
    var height = this.state.height;

    var svg = d3.select(".scatter-plot").append("svg")
    .attr("width", width)
    .attr("height", height);

    var width = svg.attr("width") - margin.left - margin.right,
    height = svg.attr("height") - margin.top - margin.bottom,
    g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.tsv("/tsvData", function(error, data) {
      if (error) throw error;

      data.forEach(function(d) {
        var datum = d["sepalLength sepalWidth petalLength petalWidth species"].split(' ');
        d.sepalLength = +datum[0];
        d.sepalWidth = +datum[1];
        d.species = datum[4];
      });

      var x = d3.scaleLinear()
          .domain(d3.extent(data, function(d) { return d.sepalWidth; }))
          .range([0, width]);

      var y = d3.scaleLinear()
          .domain(d3.extent(data, function(d) { return d.sepalLength; }))
          .range([height, 0]);

      g.append("g")
          .attr("transform", "translate(0," + height + ")")
          .attr("class", "x-axis")
          .call(d3.axisBottom(x)
              .ticks(13, "s"))
          .append("text")
          .attr("class", "label")
          .attr("x", width)
          .attr("y", -6)
          .style("text-anchor", "end")
          .text("Sepal Width (cm)");

      g.append("g")
          .attr("transform", "translate(" + x + ",0)")
          .attr("class", "y-axis")
          .call(d3.axisLeft(y)
              .ticks(9, 's'));
              // .tickFormat(d3.format(".0s")));

      g.selectAll(".dot")
          .data(data)
          .enter().append("circle")
          .attr("class", "dot")
          .attr("r", 3.5)
          .attr("cx", function(d) { return x(d.sepalWidth); })
          .attr("cy", function(d) { return y(d.sepalLength); })
          // .style("fill", function(d) { return color(d.species); });

      var legend = svg.selectAll(".legend")
          .data(color.domain())
        .enter().append("g")
          .attr("class", "legend")
          .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

      legend.append("rect")
          .attr("x", width - 18)
          .attr("width", 18)
          .attr("height", 18)
          .style("fill", color);

      legend.append("text")
          .attr("x", width - 24)
          .attr("y", 9)
          .attr("dy", ".35em")
          .style("text-anchor", "end")
          .text(function(d) { return d; });
    });



    // var margin = {top: 20, right: 20, bottom: 30, left: 40},
    //     width = 960 - margin.left - margin.right,
    //     height = 500 - margin.top - margin.bottom;

    // // declare range for the x and y axes
    // // var x = d3.scalePoint().range([0, width]);
    // // var y = d3.scalePoint().range([height, 0]);

    // var color = d3.scaleOrdinal(d3.schemeCategory10);

    // var valueline = d3.line()
    //   .x(function(d) { return x(d.sepalWidth); })
    //   .y(function(d) { return y(d.sepalLength); });

    // var svg = d3.select("svg")
    //     .append("g")
    //     .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    // d3.tsv("/tsvData", function(error, data) {
    //   if (error) throw error;

    //   data.forEach(function(d) {
    //     var datum = d["sepalLength sepalWidth petalLength petalWidth species"].split(' ');
    //     d.sepalLength = +datum[0];
    //     d.sepalWidth = +datum[1];
    //     d.species = datum[4];
    //   });

    //   var x = d3.scalePoint()
    //   .range([0, width])
    //   .domain(d3.extent(data, function(d) { return d.sepalWidth; }));

    //   var y = d3.scalePoint()
    //   .range([height, 0])
    //   .domain(d3.extent(data, function(d) { return d.sepalLength; }));

    //   // x.domain(d3.extent(data, function(d) { return d.sepalWidth; }));
    //   // y.domain(d3.extent(data, function(d) { return d.sepalLength; }));

    //   console.log('x', x);
    //   console.log('y', y);

    //   svg.append("g")
    //       .attr("class", "x-axis")
    //       .attr("transform", "translate(0," + height + ")")
    //       .call(d3.axisBottom(x));
    //         // .ticks(20, 's'));

    //   // svg.append("g")
    //   //     .attr("class", "x axis")
    //   //     .attr("transform", "translate(0," + height + ")")
    //   //     .call(xAxis)
    //   //   .append("text")
    //   //     .attr("class", "label")
    //   //     .attr("x", width)
    //   //     .attr("y", -6)
    //   //     .style("text-anchor", "end")
    //   //     .text("Sepal Width (cm)");

    //   svg.append("g")
    //     .attr("class", "y-axis")
    //     .call(d3.axisLeft(y));
    //         // .ticks(20)
    //         // .tickFormat(d3.formatPrefix(".1", 1e6)));

    //   // svg.append("g")
    //   //     .attr("class", "y axis")
    //   //     .call(yAxis)
    //   //   .append("text")
    //   //     .attr("class", "label")
    //   //     .attr("transform", "rotate(-90)")
    //   //     .attr("y", 6)
    //   //     .attr("dy", ".71em")
    //   //     .style("text-anchor", "end")
    //   //     .text("Sepal Length (cm)")

    //   svg.selectAll(".dot")
    //       .data(data)
    //     .enter().append("circle")
    //       .attr("class", "dot")
    //       .attr("r", 3.5)
    //       .attr("cx", function(d) { return x(d.sepalWidth); })
    //       .attr("cy", function(d) { return y(d.sepalLength); })
    //       .style("fill", function(d) { return color(d.species); });

    //   var legend = svg.selectAll(".legend")
    //       .data(color.domain())
    //     .enter().append("g")
    //       .attr("class", "legend")
    //       .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

    //   legend.append("rect")
    //       .attr("x", width - 18)
    //       .attr("width", 18)
    //       .attr("height", 18)
    //       .style("fill", color);

    //   legend.append("text")
    //       .attr("x", width - 24)
    //       .attr("y", 9)
    //       .attr("dy", ".35em")
    //       .style("text-anchor", "end")
    //       .text(function(d) { return d; });
    // });

  }

  render() {
    return (
      <div className="scatter-plot"></div>
    );
  }

}

export default ScatterPlot;