import React from 'react';
import * as d3 from 'd3';

class HierarchicalEdgeBundle extends React.Component {
  constructor() {
    super();
  }

  componentDidMount() {

    var diameter = 960,
        radius = diameter / 2,
        innerRadius = radius - 120;

    var cluster = d3.cluster()
        .size([360, innerRadius])

    var bundle = d3.curveBundle();

    var line = d3.radialLine()
        .angle(d => d.x)
        .radius(d => d.y)
        .curve(d3.curveBundle.beta(0.95));

    var svg = d3.select("#hierarchical").append("svg")
        .attr("width", diameter)
        .attr("height", diameter)
      .append("g")
        .attr("transform", "translate(" + radius + "," + radius + ")");

    var link = svg.append("g").selectAll(".link"),
        node = svg.append("g").selectAll(".node");

    d3.json('/hierarchicaldata', function(err, root) {
      if (err) throw err;

      var hierarchy = packageHierarchy(root);

      var hierarchy2 = d3.hierarchy(hierarchy);

      var nodes = cluster(hierarchy2);
      console.log('nodes', nodes);

      var links = packageImports(nodes);
      console.log('links', links);

      link = link
          .data(links)
        .enter().append("path")
          .attr("class", "link")
          .attr("d", d => line(d.source.path(d.target)));
          

      node = node
          .data(nodes.descendants().filter(function(n) { return !n.children; }))
        .enter().append("text")
          .attr("class", "node")
          .attr("dy", ".31em")
          .attr("transform", function(d) { 
            return "rotate(" + (d.x - 90) + ")translate(" + (d.y + 8) + ",0)" + (d.x < 180 ? "" : "rotate(180)"); })
          .style("text-anchor", function(d) { return d.x < 180 ? "start" : "end"; })
          .text(function(d) { return d.data.key; })
          .on("mouseover", mouseovered)
          .on("mouseout", mouseouted);
    });

    function mouseovered(d) {
      node
          .each(function(n) { n.target = n.source = false; });

      link
          .classed("link--target", function(l) { if (l.target === d) return l.source.source = true; })
          .classed("link--source", function(l) { if (l.source === d) return l.target.target = true; })
        .filter(function(l) { return l.target === d || l.source === d; })
          .each(function() { this.parentNode.appendChild(this); });

      node
          .classed("node--target", function(n) { return n.target; })
          .classed("node--source", function(n) { return n.source; });
    }

    function mouseouted(d) {
      link
          .classed("link--target", false)
          .classed("link--source", false);

      node
          .classed("node--target", false)
          .classed("node--source", false);
    }

    d3.select(self.frameElement).style("height", diameter + "px");

    // Lazily construct the package hierarchy from class names.
    function packageHierarchy(classes) {
      var map = {};

      function find(name, data) {
        var node = map[name], i;
        if (!node) {
          node = map[name] = data || {name: name, children: []};
          if (name.length) {
            node.parent = find(name.substring(0, i = name.lastIndexOf(".")));
            node.parent.children.push(node);
            node.key = name.substring(i + 1);
          }
        }
        return node;
      }

      classes.forEach(function(d) {
        find(d.name, d);
      });

      return map[""];
    }

    // Return a list of imports for the given array of nodes.
    function packageImports(nodes) {
      var map = {};
      var imports = [];
      // Compute a map from name to node.
      nodes.descendants().forEach(function(d) {
        map[d.data.name] = d;
      });
      // For each import, construct a link from the source to target node.
      nodes.descendants().forEach(function(d) {
        if (d.data.imports) {
         d.data.imports.forEach((i) => {
            imports.push({source: map[d.data.name], target: map[i]});
          });
        }
      });
      return imports;
    }

  }

  render() {
    return (
      <div id={"hierarchical"}>
      </div>
    )
  }
}

export default HierarchicalEdgeBundle;