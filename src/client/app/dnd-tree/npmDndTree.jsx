import React from 'react';
import * as d3 from 'd3';


class NpmDndTree extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    var height, width, svg, g, tree, stratify;

    height   = +this.props.height;
    width    = +this.props.width;

    svg      = d3.select(".npmDndTree")
                .attr('height', height)
                .attr('width', width);

    g        = svg.append("g")
                .attr("transform", "translate(40,0)");

    tree     = d3.cluster()
              .size([height, width - 160]);

    stratify = d3.stratify()
              .parentId(function(d) { return d.id.substring(0, d.id.lastIndexOf(".")); });

    function makeTree (data) {
      console.log('data inside of tree', data);
      var root, treeRoot, link, node;

      root = stratify(data)
        .sort(function(a, b) { return (a.height - b.height) || a.id.localeCompare(b.id); });

      tree(root);

      link = g.selectAll(".link")
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

      node = g.selectAll(".node")
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
          .style('text-shadow', '0 1px 0 #fff');
    };

    console.log('height', this.props.height);
    console.log('width', this.props.width);
    console.log('data', this.props.data);

    return makeTree(this.props.data);
  }

  render() {
    return (
      <div>
        <svg className='npmDndTree'></svg>
      </div>
    );
  }
}


export default NpmDndTree;


// NpmDndTre.propTypes = {
//   height: React.PropTypes.number.isRequired, 
//   width: React.PropTypes.number.isRequired, 
//   data: React.PropTypes.array.isRequired
// };