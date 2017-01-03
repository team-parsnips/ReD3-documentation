import React from 'react';
import * as d3 from 'd3';


class ScatterPlot extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      width: 960,
      height: 960,
      options: {
        // styles here!
      }
    }
  }

  componentDidMount() {
    var margin = {top: 20, right: 20, bottom: 30, left: 40},
        width = 960 - margin.left - margin.right,
        height = 500 - margin.top - margin.bottom;

    var x = d3.scaleLinear()
      .range([0, width]);

    var y = d3.scaleLinear()
      .range([height, 0]);

    var color = d3.scaleOrdinal(d3.schemeCategory10);

    var valueline = d3.line()
      .x(function(d) { return x(d.close); })
      .y(function(d) { return y(d.close); })

    var svg = d3.select(".scatter-plot").append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    d3.tsv("/tsvData", function(error, data) {
      if (error) throw error;

      // console.log ('data', data);

      data.forEach(function(d) {
        var datum = d["sepalLength sepalWidth petalLength petalWidth species"].split(' ');
        d.sepalLength = +datum[0];
        d.sepalWidth = +datum[1];
        d.species = datum[4];
      });

      x.domain(d3.extent(data, (d) => { d.sepalWidth }));
      y.domain(d3.extent(data, (d) => { d.sepalLength }));

      svg.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(valueline.x)
        .append("text")
          .attr("class", "label")
          .attr("x", width)
          .attr("y", -6)
          .style("text-anchor", "end")
          .text("Sepal Width (cm)");

      svg.append("g")
          .attr("class", "y axis")
          .call(valueline.y)
        .append("text")
          .attr("class", "label")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text("Sepal Length (cm)")

      svg.selectAll(".dot").data(data)
          .enter().append("circle")
          .attr("class", "dot")
          .attr("r", 3.5)
          .attr("cx", (d) => { x(d.sepalWidth); })
          .attr("cy", (d) => { y(d.sepalLength); })
          .style("fill", (d) => { color(d.species); });

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
  }

  render() {
    return (
      <div className='scatter-plot'></div>
    );
  }

}

export default ScatterPlot;