import React, {Component} from 'react';
import Pie from '../pie/pie.jsx';

class PieDoc extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <h2>Pie Chart</h2>
        <Pie group='age' count='population'/>
      </div>
    )
  }
}

export default PieDoc;