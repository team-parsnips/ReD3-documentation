import React, {Component} from 'react';
import ZoomableCountiesMap from '../ZoomableMap/zoomableCountiesMap.jsx';

class ZoomCountiesMapDoc extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <h2>Zoomable Counties Map</h2>
        <ZoomableCountiesMap />
      </div>
    )
  }
}

export default ZoomCountiesMapDoc;