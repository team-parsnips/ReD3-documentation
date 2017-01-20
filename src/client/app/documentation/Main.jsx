import React, {Component} from 'react';
import { Link } from 'react-router';
import {Card, CardMedia, CardText, CardHeader} from 'material-ui/Card';


const styles = {
  container: {
    width: '100%',
    height: '500px',
    background: 'linear-gradient(#006064, #607D8B)',
    display: 'flex',
    'justifyContent': 'center',
    'alignItems': 'center'
  },

  logo: {
    height: '170px',
    width: '170px',
    margin: 'auto',
    marginTop: '15%'
  }, 

  text: {
    color: 'white',
    'fontSize': '25px'
  },

  smallContainer: {
    width: '33%',
    height: '300px',
    float: 'left',
    background: '#FAFAFA'
  },

  customCard: {
    height: '100px',
    width: '100px',
    margin: 'auto',
    marginTop: '12%'
  },

  div: {
    padding: '100px',
    overflow: 'hidden'
  }
};

class Main extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
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
        <div style={styles.div}>
          <Link to="/start">
            <Card style={styles.smallContainer}>
              <CardHeader
                title="Getting Started"
                style={styles.cardHeader} />
             <CardMedia mediaStyle={styles.logo}>
               <img src="./gettingStarted" />
             </CardMedia>
            </Card>
          </Link>
          <Card style={styles.smallContainer}>
            <CardHeader
              title="Customization" />
           <CardMedia mediaStyle={styles.customCard}>
             <img src="./customization" />
           </CardMedia>
          </Card>
          <Link to="/stackedgroupedbar">
            <Card style={styles.smallContainer}>
              <CardHeader
                title="Components" />
             <CardMedia mediaStyle={styles.logo}>
               <img src="./components" />
             </CardMedia>
            </Card>
          </Link>
        </div>
      </div>
    )
  }
}

export default Main;
