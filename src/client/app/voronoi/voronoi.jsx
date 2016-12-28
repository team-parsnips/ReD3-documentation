import React from 'react';
import * as d3 from 'd3';


class Voronoi extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      dataSet: null,
      dataSet0: null,
      width: 960,
      height: 500,
      voronoi: null,
      polygon: null,
      link: null,
      site: null,
      options: {
        'polyFill': this.props.polyFill || 'none',

      }
    }
    this.redraw = this.redraw.bind(this);
    this.moved = this.moved.bind(this);
  }

  sampleData() {
    let width = this.state.width;
    let height = this.state.height;
    return d3.range(100).map(d => {
      return [Math.random() * width, Math.random() * height];
    });
  }

  componentWillMount() {
    this.setState({dataSet: this.sampleData()});
  }

  componentDidMount() {
    const linksStyle = {
      'stroke': '#000',
      'stroke-opacity': '0.2'
    }

    const polygonsStyle = {
      'fill': 'none',
      'stroke': '#000'
    }

    const sitesStyle = {
      'fill': '#000',
      'stroke': '#fff'
    }

    let svg     = d3.select('.voronoi');
    let voronoi = d3.voronoi().extent([[-1, -1], [960 + 1, 500 + 1]]);
    let polygon = svg.append('g').attr('className', 'polygon')
                  .selectAll('path').data(voronoi.polygons(this.state.dataSet))
                  .enter().append('path').attr('fill', 'none').attr('stroke', '#000')
                  .call(this.redrawPolygon);
    let link    = svg.append('g').attr('className', 'links')
                  .selectAll('line').data(voronoi.links(this.state.dataSet))
                  .enter().append('line').attr('stroke', '#000').attr('stroke-opacity', '0.3') 
                  .call(this.redrawLink);
    let site    = svg.append('g').attr('className', 'sites')
                  .selectAll('circle').data(this.state.dataSet)
                  .enter().append('circle').attr('r', 2.5).attr('fill', '#000').attr('stroke', '#fff')
                  .call(this.redrawSite);
    
    this.setState({
      voronoi: voronoi,
      polygon: polygon,
      link: link,
      site: site
    });


  }

  moved(e) {
    let temp = this.state.dataSet;
    temp[0] = [e.clientX, e.clientY];
    this.setState({dataSet: temp});
    this.redraw();
  }

  redraw() {
    let diagram = this.state.voronoi(this.state.dataSet);
    this.setState({polygon: this.state.polygon.data(diagram.polygons()).call(this.redrawPolygon)});
    // console.log(diagram.links());
    this.setState({link: this.state.link.data(diagram.links())});
    this.setState({link: this.state.link.exit().remove()});
    this.setState({link: this.state.link.enter().append('line').merge(this.state.link).call(this.redrawLink)});
    this.setState({site: this.state.site.data(this.state.dataSet).call(this.redrawSite)});
  }

  redrawPolygon(polygon) {
    polygon.attr('d', d => { return (d ? "M" + d.join("L") + "Z" : null); });
  }

  redrawLink(link) {
    link.attr('x1', d => d.source[0])
        .attr('y1', d => d.source[1])
        .attr('x2', d => d.target[0])
        .attr('y2', d => d.target[1]);
  }

  redrawSite(site) {
    site.attr('cx', d => d[0])
        .attr('cy', d => d[1]);
  }


  render() {
    return (
      <div>
        <svg
        width={this.state.width}
        height={this.state.height}
        className='voronoi'
        onMouseMove={this.moved}>
        </svg>
      </div>
    );
  }

}

export default Voronoi;