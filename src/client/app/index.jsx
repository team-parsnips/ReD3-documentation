import React from 'react';
import {render} from 'react-dom';
import {Router, Route, Link, browserHistory} from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';


import Main from './documentation/Main.jsx';
import Navigation from './documentation/Navigation.jsx';
import Start from './documentation/Start.jsx';
import VoronoiDoc from './documentation/VoronoiDoc.jsx';
import SunburstDoc from './documentation/SunburstDoc.jsx';
import ZoomMapDoc from './documentation/ZoomMapDoc.jsx';
import HierarchicalDoc from './documentation/HierarchicalDoc.jsx';
import DndTreeDoc from './documentation/DndTreeDoc.jsx';

class App extends React.Component {
  render () {
    return (    
      <Router history={browserHistory}>
        <Route component={Navigation}>
          <Route path='/' component={Main}/>
          <Route path='/start' component={Start}/>
          <Route path='/voronoi' component={VoronoiDoc}/>
          <Route path='/sunburst' component={SunburstDoc}/>
          <Route path='/zoommap' component={ZoomMapDoc}/>
          <Route path='/hierarchical' component={HierarchicalDoc}/>
          <Route path='/dndtree' component={DndTreeDoc}/>
        </Route>
      </Router>
    );
  }
}

injectTapEventPlugin();
render(<App/>, document.getElementById('app'));