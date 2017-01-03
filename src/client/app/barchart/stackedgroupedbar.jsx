import React from 'react';
import * as d3 from 'd3';

const margin = {
  top: 40,
  right: 10,
  bottom: 20,
  left: 10
};  

class StackedGroupedBar extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      width: this.props.width || 960,
      innerWidth: (this.props.width || 960) - margin.left - margin.right,
      height: this.props.height || 500,
      innerHeight: (this.props.height ||500) - margin.top - margin.bottom,
      data: this.props.data || null,
      dataSet: null

    }
    this.sampleData = this.sampleData.bind(this);
    this.bumps = this.bumps.bind(this);

  }

  sampleData() {
    let m = 58, n = 4, xz, yz, y01z, yMax, y1Max, dataSet;
    xz = d3.range(m);
    yz = d3.range(n).map(()=> this.bumps(m));
    y01z = d3.stack().keys(d3.range(n))(d3.transpose(yz));
    yMax = d3.max(yz, y => d3.max(y));
    y1Max = d3.max(y01z, y => d3.max(y, d => d[1]));
    dataSet = {
      m: m,
      n: n,
      xz: xz,
      yz: yz,
      y01z: y01z,
      yMax: yMax,
      y1Max: y1Max
    };
    this.setState({ dataSet: dataSet });
  }

  componentWillMount() {
    if (!this.state.data) {
      this.sampleData();
    } else {
      this.setUpData();
    }
  }

  setUpData() {
    var m, n, xz, yz, y01z, yMax, y1Max, dataSet, transposedData = [], data = this.state.data;
    m = data['x-ticks'] || 25;
    xz = data['x-axis'] || d3.range(m);
    yz = data.data;
    n = Object.keys(yz).length;

    for (let i = 0; i < m; i++) {
      let entry = {};
      for (let key in yz) {
        entry[key] = yz[key][i]
      }
      transposedData.push(entry);
    }

    y01z = d3.stack().keys(Object.keys(yz)).order(d3.stackOrderNone).offset(d3.stackOffsetNone)(transposedData);
    yMax = d3.max(Object.keys(yz), y => d3.max(yz[y]));
    y1Max = d3.max(y01z, y => d3.max(y, d => d[1]));
    dataSet = {
        m: m,
        n: n,
        xz: xz,
        yz: yz,
        y01z: y01z,
        yMax: yMax,
        y1Max: y1Max
      };

    this.setState({ dataSet: dataSet });
  }

  componentDidMount() {
    var svg, g, x, y, color, series, rect, timeout, data = this.state.dataSet;

       svg = d3.select('.stackedgrouped');
         g = svg.append('g')
              .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
         x = d3.scaleBand().domain(d3.range(data.m)).rangeRound([0, this.state.innerWidth]).padding(0.08);
         y = d3.scaleLinear().domain([0, data.y1Max]).range([this.state.innerHeight, 0]);
     color = d3.scaleOrdinal().domain(d3.range(data.n)).range(d3.schemeCategory20c);
    series = g.selectAll('.series').data(data.y01z).enter().append('g')
              .attr('fill', (d, i) => color(i))
              .attr('id', d => d.index);
      rect = series.selectAll('rect').data(d => d).enter().append('rect')
              .attr('x', (d, i) => x(i))
              .attr('y', this.state.innerHeight)
              .attr('width', x.bandwidth())
              .attr('height', 0);

    rect.transition().delay((d, i) => i * 10)
      .attr('y', d => y(d[1]))
      .attr('height', d => y(d[0]) - y(d[1]));

    g.append('g').attr('class', 'axis axis--x')
      .attr('transform', 'translate(0,' + this.state.innerHeight + ')')
    .call(d3.axisBottom(x).tickSize(1).tickPadding(6).tickFormat(d => data.xz[d]));

    d3.selectAll('input').on('change', changed);

    timeout = d3.timeout(() => {
      d3.select('input[value="grouped"]').property('checked', true).dispatch('change');
    }, 2000);

    function changed() {
      console.log('changed');
      timeout.stop();
      if (this.value === 'grouped') {
        transitionGrouped();
      } else {
        transitionStacked();
      }
    }

    function transitionGrouped() {
      y.domain([0, data.yMax]);

      rect.transition()
          .duration(500)
          .delay((d, i) => i * 10)
          .attr('x', (d, i, g) => x(i) + x.bandwidth() / data.n * g[0].parentNode.__data__.index)
          .attr('width', x.bandwidth() / data.n)
        .transition()
          .attr('y', d => y(d[1] - d[0]))
          .attr('height', d => y(0) - y(d[1] - d[0]));
    }

    function transitionStacked() {
      y.domain([0, data.y1Max]);

      rect.transition()
          .duration(500)
          .delay((d, i) => i * 10)
          .attr('y', d => y(d[1]))
          .attr('height', d => y(d[0]) - y(d[1]))
        .transition()
          .attr('x', (d, i) => x(i))
          .attr('width', x.bandwidth());
    }

  }

  bumps(m) { //only used for sampleData
    var values = [], i, j, w, x, y, z;

    for (i = 0; i < m; i++) {
      values[i] = 0.1 + 0.1 * Math.random();
    }

    for (j = 0; j < 5; j++) {
      x = 1 / (0.1 + Math.random());
      y = 2 * Math.random() - 0.5;
      z = 10 / (0.1 + Math.random());
      for (i = 0; i < m; i++) {
        w = (i / m - y) * z;
        values[i] += x * Math.exp(-w * w);
      }
    }

    for (i = 0; i < m; i++) {
      values[i] = Math.max(0, values[i]);
    }

    return values;
  }

  render() {
    return (
      <div>
        <form>
          <label><input type='radio' name='mode' value='grouped'/>Grouped</label>
          <label><input type='radio' name='mode' value='stacked' defaultChecked/>Stacked</label>
        </form>
        <svg
        className='stackedgrouped'
        width={this.state.width}
        height={this.state.height}>
        </svg>
      </div>
    );
  }
}

export default StackedGroupedBar;