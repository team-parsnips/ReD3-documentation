import React, {Component} from 'react';
import Voronoi from '../voronoi/voronoi.jsx';

class VoronoiDoc extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="container">
        <h2>Voronoi</h2>
        <Voronoi />
      </div>
    )
  }
}

export default VoronoiDoc;