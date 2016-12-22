import React from 'react';
import {render} from 'react-dom';


import Voronoi from './voronoi/voronoi.jsx';

class App extends React.Component {
  render () {
    return (
      <div>
      <Voronoi />
      </div>
    );
  }
}

render(<App/>, document.getElementById('app'));