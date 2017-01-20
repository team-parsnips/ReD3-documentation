import React from 'react';
import * as d3 from 'd3';


class ScatterPlot extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {

    var margin, width, height, svg, g, color;

    margin = {top: 20, right: 20, bottom: 30, left: 40};
    width  = this.props.width;
    height = this.props.height;

    svg    = d3.select(".scatter-plot").append("svg")
    .attr("width", width)
    .attr("height", height);

    width  = svg.attr("width") - margin.left - margin.right;
    height = svg.attr("height") - margin.top - margin.bottom,
    g      = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    color  = d3.scaleOrdinal(d3.schemeCategory10);

    function genScatterPlot(data) {

      var x, y, legend;

      data.forEach(function(d) {
        var datum     = d["sepalLength sepalWidth petalLength petalWidth species"].split(' ');
        d.sepalLength = +datum[0];
        d.sepalWidth  = +datum[1];
        d.species     = datum[4];
      });

      x = d3.scaleLinear()
            .domain(d3.extent(data, function(d) { return d.sepalWidth; }))
            .range([0, width]);

      y = d3.scaleLinear()
            .domain(d3.extent(data, function(d) { return d.sepalLength; }))
            .range([height, 0]);

      g.append("g")
            .attr("transform", "translate(0," + height + ")")
            .attr("class", "x-axis")
          .call(d3.axisBottom(x)
            .ticks(13, "s"));

      g.append("text")             
            .attr("transform",
                  "translate(" + (width/2) + " ," + 
                                 (height + margin.top + 7) + ")")
          .style("text-anchor", "right")
          .style('font', '10px sans-serif')
          .text("Sepal Width (cm)");

      g.append("g")
            .attr("transform", "translate(" + x + ",0)")
            .attr("class", "y-axis")
          .call(d3.axisLeft(y)
              .ticks(9, 's'));

      g.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left)
            .attr("x",0 - (height / 2))
            .attr("dy", "1em")
          .style("text-anchor", "middle")
          .style('font', '10px sans-serif')
          .text("Sepal Length (cm)");     

      g.selectAll(".dot")
          .data(data)
          .enter().append("circle")
            .attr("class", "dot")
            .attr("r", 3.5)
            .attr("cx", function(d) { return x(d.sepalWidth); })
            .attr("cy", function(d) { return y(d.sepalLength); })
          .style("fill", function(d) { return color(d.species); });

      legend = svg.selectAll(".legend")
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
    }

    genScatterPlot(this.props.data);

  }

  render() {
    return (
      <div className="scatter-plot"></div>
    );
  }
}

export default ScatterPlot;