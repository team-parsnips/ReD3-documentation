import React from 'react';
import * as d3 from 'd3';

class Pie extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: this.props.width || 960,
      height: this.props.height || 500,
      group: this.props.group,
      count: this.props.count,
    }
  }

  componentDidMount() {
    var context = this;

    var radius = Math.min(this.state.width, this.state.height) / 2;
    var colors = d3.scaleOrdinal(d3.schemeCategory20);

    var arc = d3.arc()
          .outerRadius(radius - 10)
          .innerRadius(0);

    var labelArc = d3.arc()
          .outerRadius(radius - 40)
          .innerRadius(radius - 40);

    var pie = d3.pie()
          .value(d => d[context.state.count]);

    var svg = d3.select('#pie').append('svg')
          .attr('width', this.state.width)
          .attr('height', this.state.height)
        .append('g')
          .attr('transform', 'translate(' + this.state.width / 2 + ',' + this.state.height / 2 + ')');

    d3.csv('/csvData', (err, data) => {
      if (err) throw err;

      var g = svg.selectAll('.arc')
            .data(pie(data))
          .enter().append('g')
            .attr('class', arc);

      g.append('path')
            .attr('d', arc)
            .style('fill', d => colors(d.data[context.state.group]));

      g.append('text')
            .attr('transform', d => 'translate(' + labelArc.centroid(d) + ')')
            .attr("dy", ".35em")
            .text(d => d.data[context.state.group]);
            
            
    })
  }

  render() {
    return (
      <div id='pie'>
      </div>
    )
  }
}

export default Pie;