import React, {Component} from 'react';
import CirclePacking from '../circlePacking/circlePacking.jsx';
import Codepen from './Codepen.jsx';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
  from 'material-ui/Table';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';
// <Codepen user="Rob0h" hash="JEozrY" />

const propTable = [
  {
    name: 'Lorem',
    type: 'Ipsum',
    default: 'Dolor',
    description: 'Sit',
  },
  {
    name: 'consectetur',
    type: 'adipiscing',
    default: 'elit',
    description: 'donec',
  },
]

class CirclePackingDoc extends Component {
  constructor() {
    super();
    this.state = {data: window.flare}
  }

  render() {
    return (
      <div>
        <h2>Zoomable Circle Packing</h2>
        <Divider />
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi. Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque. Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
        </p>

        <Card>
          <CardHeader
            title="Example Zoomable Circle Packing"
            subtitle="Subtitle"/>
          <CardMedia>
            <CirclePacking 
              height='960'
              width='960'
              data={this.state.data}
            />
          </CardMedia>
        </Card>

        <h3>Zoomable Circle Packing Properties</h3>
        <Table>
          <TableHeader displaySelectAll= {false} adjustForCheckbox = {false} >
            <TableRow>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Type</TableHeaderColumn>
              <TableHeaderColumn>Default</TableHeaderColumn>
              <TableHeaderColumn>Description</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox = {false} >
            {propTable.map((row, index) => (
              <TableRow key={index}>
                <TableRowColumn>{row.name}</TableRowColumn>
                <TableRowColumn>{row.type}</TableRowColumn>
                <TableRowColumn>{row.default}</TableRowColumn>
                <TableRowColumn>{row.description}</TableRowColumn>
              </TableRow>
            ))}
          </TableBody>
        </Table>

      </div>
    )
  }
}

export default CirclePackingDoc;