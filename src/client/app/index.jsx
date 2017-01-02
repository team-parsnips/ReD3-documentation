import React from 'react';
import {render} from 'react-dom';
import {Router, Route, Link, browserHistory} from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';

import Main from './Main.jsx';
import Navigation from './Navigation.jsx';

import Voronoi from './voronoi/voronoi.jsx';
import SunBurst from './sunburst/sunburst.jsx';
import SequenceSunBurst from './sunburst/sequence.jsx';
import DndTree from './dnd-tree/dndTree.jsx';
import ZoomableMap from './zoomableMap/zoomableMap.jsx';
import HierarchialEdgeBundle from './hierarchical/hierarchical.jsx';

class App extends React.Component {
  render () {
    return (    
      <Router history={browserHistory}>
        <Route component={Navigation}>
          <Route path='/' component={Main}/>
        </Route>
      </Router>
    );
  }
}

injectTapEventPlugin();
render(<App/>, document.getElementById('app'));