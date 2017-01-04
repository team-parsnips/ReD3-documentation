import React, {Component} from 'react';
import ScatterPlot from '../scatterPlot/scatterPlot.jsx';

class ScatterPlotDoc extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <h2>Scatter Plot</h2>
        <ScatterPlot />
      </div>
    )
  }
}

export default ScatterPlotDoc;