import React from 'react';
import * as d3 from 'd3';
import * as topojson from "topojson";

class ZoomableCountiesMap extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      width: 960,
      height: 500,
      centered: null,
      path: null,
      projection: null,
      us: null,

    }
    this.click = this.click.bind(this);

  }

  componentDidMount() {
    var svg, projection, path, background, g, us;



    svg = d3.select('.zoomableMap');
    projection = d3.geoAlbersUsa()
    .scale(1070).translate([480, 250]);
    path = d3.geoPath().projection(projection);
    background = svg.append('rect')
                    .attr('width', this.state.width)
                    .attr('height', this.state.height)
                    .attr('fill', 'none')
                    .attr('pointer-events', 'all')
                  .on('click', this.click);
    g = svg.append('g').attr('id', 'whole-map');

    

    d3.json('usamap', (err, us) => {
      if (err) {
        throw err;
      }
      this.setState({us: us});
      g.append('g')
        .attr('class', 'states')
        .attr('fill', '#aaa')
      .selectAll('path').data(topojson.feature(us, us.objects.states).features)
      .enter().append('path')
        .attr('d', path)
      .on('click', this.click);

      g.append('path')
        .datum(topojson.mesh(us, us.objects.states, (a, b) => {return (a !== b ); }))
          .attr('class', 'state-borders')
          .attr('d', path)
          .attr('fill', 'none')
          .attr('stroke', '#fff')
          .attr('stroke-width', '1.5px')
          .attr('stroke-linejoin', 'round')
          .attr('stroke-linecap', 'round')
          .attr('pointer-events', 'none');
    });

    
    this.setState({
      projection: projection,
      path: path,
      g: g
    });


  }

  click(d, i) {
    var x, y, k, path = this.state.path, us = this.state.us;

    if (d && this.state.centered !== d) {
      this.setState({ centered: d });
      let centroid = this.state.path.centroid(d);
      drawCounties();
      x = centroid[0];
      y = centroid[1];
      if (i === 4 || i === 43) {
        k = 2.5;
      } else {
        k = 4;
      }
    } else {
      this.setState({ centered: null });
      x = this.state.width/ 2;
      y = this.state.height / 2;
      k = 1;
      d3.selectAll('.county-borders').remove();
      d3.select('#whole-map').selectAll('path')
        .classed('active', false);
    }

    this.state.g.selectAll('path')
      .classed('active', (this.state.centered) && (x => { return (x === this.state.centered); }));

    d3.selectAll('.states path').attr('fill', '#aaa');
    d3.select('.active').attr('fill', 'orange');


    d3.select('#whole-map').transition().duration(750)
      .attr('transform', 'translate(' + this.state.width / 2 + ',' + this.state.height / 2 + ')scale(' + k + ')translate(' + -x + ',' + -y + ')')
      .style('stroke-width', 1.5 / k + 'px');

    function drawCounties() {
      d3.select('#whole-map').append('path')
          .datum(topojson.mesh(us, us.objects.counties, (a, b) => {return (a !== b ); }))
            .attr('class', 'county-borders')
            .attr('d', path)
            .attr('fill', 'none')
            .attr('stroke', '#fff')
            .attr('stroke-width', '0.5px');    
    }
  }

  render() {
    return (
      <div>
        <svg
        width={this.state.width}
        height={this.state.height}
        className='zoomableMap'
        >
        </svg>
      </div>
    );
  }

}

export default ZoomableCountiesMap;