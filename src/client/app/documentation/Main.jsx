import React, {Component} from 'react';
import {Card, CardMedia, CardText} from 'material-ui/Card';

const styles = {
  container: {
    width: '100%',
    height: '500px',
    background: '#006064',
    display: 'flex',
    'justify-content': 'center',
    'align-items': 'center'
  },
  logo: {
    height: '200px',
    width: '200px',
    margin: '0 auto',
  }, 
  text: {
    color: 'white',
    'font-size': '25px'
  }
};

class Main extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
          <Card style={styles.container}>
           <CardMedia mediaStyle={styles.logo}>
             <img src="./ReD3-logo.png" />
           </CardMedia>
           <CardText style={styles.text}>
             A set of React components that implement D3 charts
           </CardText>
          </Card>
      </div>
    )
  }
}

export default Main;
