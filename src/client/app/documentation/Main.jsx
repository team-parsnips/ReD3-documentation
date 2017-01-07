import React, {Component} from 'react';
import { Link } from 'react-router';
import {Card, CardMedia, CardText, CardHeader} from 'material-ui/Card';


const styles = {
  container: {
    width: '100%',
    height: '500px',
    background: 'linear-gradient(#006064, #607D8B)',
    display: 'flex',
    'justify-content': 'center',
    'align-items': 'center'
  },

  logo: {
    height: '230px',
    width: '230px',
    margin: '0 auto',
  }, 

  text: {
    color: 'white',
    'font-size': '25px'
  },

  smallContainer: {
    width: '33%',
    height: '300px',
    float: 'left',
    background: '#FAFAFA'
  },

  costumCard: {
    height: '120px',
    width: '120px',
    margin: '0 auto',
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
               <img src="/getting-started.png" />
             </CardMedia>
            </Card>
          </Link>
          <Card style={styles.smallContainer}>
            <CardHeader
              title="Customization" />
           <CardMedia mediaStyle={styles.costumCard}>
             <img src="/costumization.png" />
           </CardMedia>
          </Card>
          <Link to="/stackedgroupedbar">
            <Card style={styles.smallContainer}>
              <CardHeader
                title="Components" />
             <CardMedia mediaStyle={styles.logo}>
               <img src="/components.png" />
             </CardMedia>
            </Card>
          </Link>
        </div>
      </div>
    )
  }
}

export default Main;
