import React, {Component} from 'react';
import CirclePacking from '../circlePacking/circlePacking.jsx';

class CirclePacking extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <h2>Zoomable Circle Packing</h2>
        <CirclePacking />
      </div>
    )
  }
}

export default CirclePackingDoc;