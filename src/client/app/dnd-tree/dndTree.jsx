import React from 'react';
import * as d3 from 'd3';

class DndTree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: 960,
      height: 2000,
      data: null,
      options: {
        // styles and specifics here!
      }
    }
  }

  componentDidMount() {
    var svg = d3.select(".dndTree");
    var g = svg.append("g").attr("transform", "translate(40,0)");

    var height = this.state.height;
    var width = this.state.width;

    var tree = d3.cluster()
    .size([height, width - 160]);

    var stratify = d3.stratify()
    .parentId(function(d) { return d.id.substring(0, d.id.lastIndexOf(".")); });
    return d3.csv("/data", (error, data) => {
      if (error) throw error;

      var root = stratify(data)
        .sort(function(a, b) { return (a.height - b.height) || a.id.localeCompare(b.id); });

      tree(root);

      var link = g.selectAll(".link")
        .data(root.descendants().slice(1))
        .enter().append("path")
        .attr("class", "link")
        .attr('fill', 'none')
        .attr("d", function(d) {
          return "M" + d.y + "," + d.x
              + "C" + (d.parent.y + 100) + "," + d.x
              + " " + (d.parent.y + 100) + "," + d.parent.x
              + " " + d.parent.y + "," + d.parent.x;
        })
        .style('fill', 'none')
        .style('stroke', '#555')
        .style('stroke-opacity', '0.4')
        .style('stroke-width', '1.5px');

      var node = g.selectAll(".node")
        .data(root.descendants())
        .enter().append("g")
        .attr("class", function(d) { return "node" + (d.children ? " node--internal" : " node--leaf"); })
        .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

      node.append("circle")
        .attr("r", 2.5)
        .style('fill', '#999');

      node.append("text")
        .attr("dy", 3)
        .attr("x", function(d) { return d.children ? -8 : 8; })
        .style("text-anchor", function(d) { return d.children ? "end" : "start"; })
        .text(function(d) { return d.id.substring(d.id.lastIndexOf(".") + 1); })
        .style('font', '10px sans-serif');

      // adding styles here  
      d3.selectAll('.node--internal circle')
      .style('fill', '#555');

      d3.selectAll('.node--internal text')
        .style({
          'text-shadow': '0 1px 0 #fff'
        });
    });
  }

  render() {
    return (
      <div>
        <svg 
          width={this.state.width}
          height={this.state.height}
          className='dndTree'
        ></svg>
      </div>
    );
  }

}

export default DndTree;