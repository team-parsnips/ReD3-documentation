import React from 'react';
import {render} from 'react-dom';


import Voronoi from './voronoi/voronoi.jsx';
import SunBurst from './sunburst/sunburst.jsx';
import SequenceSunBurst from './sunburst/sequence.jsx';

class App extends React.Component {
  render () {
    return (
      <div>
      <Voronoi />
      <SequenceSunBurst />
      </div>
    );
  }
}

render(<App/>, document.getElementById('app'));