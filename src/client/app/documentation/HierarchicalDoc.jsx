import React, {Component} from 'react';
import HierarchicalEdgeBundle from '../hierarchical/hierarchical.jsx';

class HierarchicalDoc extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div className="container">
        <h2>Hierarchical Edge Bundle</h2>
        <HierarchicalEdgeBundle />
      </div>
    )
  }
}

export default HierarchicalDoc;