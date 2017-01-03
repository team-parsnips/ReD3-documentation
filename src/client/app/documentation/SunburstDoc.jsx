import React, {Component} from 'react';
import Sunburst from '../sunburst/sunburst.jsx';

class SunburstDoc extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="container">
        <h2>Sunburst</h2>
        <Sunburst />
      </div>
    )
  }
}

export default SunburstDoc;