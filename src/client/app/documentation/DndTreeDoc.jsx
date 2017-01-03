import React, {Component} from 'react';
import DndTree from '../dnd-tree/dndTree.jsx';

class DndTreeDoc extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <h2>Drag 'n Drop Tree</h2>
        <DndTree />
      </div>
    )
  }
}

export default DndTreeDoc;