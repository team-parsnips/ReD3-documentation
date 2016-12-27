import React from 'react';
import {render} from 'react-dom';


import Voronoi from './voronoi/voronoi.jsx';
import SunBurst from './sunburst/sunburst.jsx';

class App extends React.Component {
  render () {
    return (
      <div>
      <Voronoi />
      <SunBurst />
      </div>
    );
  }
}

render(<App/>, document.getElementById('app'));