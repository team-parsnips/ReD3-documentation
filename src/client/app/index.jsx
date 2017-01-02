import React from 'react';
import {render} from 'react-dom';


import Voronoi from './voronoi/voronoi.jsx';
import SunBurst from './sunburst/sunburst.jsx';
import SequenceSunBurst from './sunburst/sequence.jsx';
import DndTree from './dnd-tree/dndTree.jsx';
import ZoomableMap from './zoomableMap/zoomableMap.jsx';
import CirclePacking from './circlePacking/circlePacking.jsx';

class App extends React.Component {
  render () {
    return (    
      <div>
        <Voronoi />
        <SunBurst />
        <SequenceSunBurst />
        <DndTree />
        <ZoomableMap />
        <CirclePacking />
      </div>
    );
  }
}

render(<App/>, document.getElementById('app'));