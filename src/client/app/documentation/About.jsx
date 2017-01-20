import React, {Component} from 'react';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';


class About extends Component {
  constructor() {
    super();
  }

  render() {
    return (
      <div>
        <h1 style={{fontFamily: 'Linden Hill'}}>Meet The Team</h1>
        <Card style={{height: 'auto', width: '70%', margin: 'auto'}}>
          <CardMedia>
            <img src="/teamSnips" />
          </CardMedia>
          <CardText>
            <p>Emerson Hum: from Oregon and is DEADLY affraid of birds (not a joke..)</p>
            <p>Vy Trinh: from Florida and is a cooking momma on the low</p>
            <p>Rober Oh: from NorCal and is a killa bboy (catch him at your local jamz??)</p>
          </CardText>
        </Card>
      </div>
    )
  }
}

export default About;