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
        <Pie width={960} height={500} group='age' count='population'/>
      </div>
    )
  }
}

export default PieDoc;