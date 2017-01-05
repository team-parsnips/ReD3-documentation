import React, {Component} from 'react';
import {Card, CardMedia, CardText} from 'material-ui/Card';

const styles = {
  container: { textAlign: 'center', paddingTop: 200
  }
};

class Main extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <h2>Main Page</h2>
          <Card style={styles.container}>
           <CardMedia>
             <img src="./ReD3-logo.png" />
           </CardMedia>
           <CardText>
             A set of React components that implement D3 charts
           </CardText>
          </Card>
      </div>
    )
  }
}

export default Main;
