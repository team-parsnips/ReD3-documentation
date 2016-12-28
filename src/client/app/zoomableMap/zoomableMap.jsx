import React from 'react';
import * as d3 from 'd3';
import * as topojson from "topojson";

class ZoomableMap extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      width: 960,
      height: 500,
      centered: null,
      options: {
        // 'polyFill': this.props.polyFill || 'none',

      }
    }
    this.click = this.click.bind(this);

  }

  componentDidMount() {
    var svg, projection, path, background, g, us;



    svg = d3.select('.zoomableMap');
    projection = d3.geoAlbersUsa()
    .scale(1070).translate([480, 250]);
    path = d3.geoPath().projection(projection);
    // console.log(path);
    // path = d3.geoPath(projection);
    // console.log(projection);
    // background = svg.append('rect')
    //                 .attr('width', this.state.width)
    //                 .attr('height', this.state.height)
    //                 .attr('fill', 'none')
    //                 .attr('pointer-events', 'all')
    //               .on('click', this.click);
    g = svg.append('g');

    

    d3.json('usamap', (err, us) => {
      console.log(err);
      if (err) {
        throw err;
      }
      console.log(topojson.feature(us, us.objects.states));
      g.append('g')
        .attr('id', 'states')
        .attr('fill', '#aaa')
      .selectAll('path').data(topojson.feature(us, us.objects.states).features)
      .enter().append('path')
        .attr('d', path)
      .on('click', this.click);

      g.append('path')
        // .datum({type: 'FeatureCollection', features: topojson.feature(us, us.objects.states).features})
        .datum(topojson.mesh(us, us.objects.states, (a, b) => {return (a !== b ); }))
          .attr('id', 'state-borders')
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
    });


  }

  click(d) {
    // var x, y, k;

    // if (d && this.state.centered !== d) {
    //   let centroid = this.state.path.centroid(d);
    //   x = centroid[0];
    //   y = centroid[1];
    //   k = 4;
    //   this.setState({ centered: d });
    // } else {
    //   x = this.state.width / 2;
    //   y = this.state.height / 2;
    //   k = 1;
    //   this.setState({ centered: null });
    // }

    // d3.select('#temp').selectAll('path')
    //   .classed('active', d => { return (d === this.state.centered); });

    // d3.select('.active').attr('fill', 'orange');

    // d3.select('#temp').transition().duration(750)
    //   .attr('transform', 'translate(' + this.state.width / 2 + ',' + this.state.height / 2 + ')scale(' + k + ')translate(' + -x + ',' + -y + ')')
    //   .style('stroke-width', 1.5 / k + 'px');

  }

  render() {
    return (
      <div>
        <svg
        width={this.state.width}
        height={this.state.height}
        className='zoomableMap'>
        </svg>
      </div>
    );
  }

}

export default ZoomableMap;