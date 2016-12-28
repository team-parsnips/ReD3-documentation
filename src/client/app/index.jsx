import React from 'react';
import {render} from 'react-dom';


import Voronoi from './voronoi/voronoi.jsx';
import SunBurst from './sunburst/sunburst.jsx';
import DndTree from './dnd-tree/dndTree.jsx';
import ZoomableMap from './zoomableMap/zoomableMap.jsx';

class App extends React.Component {
  render () {
    return (    
      <div>
        <ZoomableMap />
      </div>
    );
  }
}

render(<App/>, document.getElementById('app'));
      // <Voronoi />
      // <SunBurst />
      // <DndTree />