import React, {Component} from 'react';
import ZoomableMap from '../ZoomableMap/zoomableMap.jsx';

class ZoomMapDoc extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <h2>Zoomable Map</h2>
        <ZoomableMap />
      </div>
    )
  }
}

export default ZoomMapDoc;