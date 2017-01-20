import React, {Component} from 'react';
import DndTree from '../dnd-tree/dndTree.jsx';
import NpmDndTree from '../dnd-tree/npmDndTree.jsx'
import Codepen from './Codepen.jsx';

import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import {Table, TableBody, TableFooter, TableHeader, TableHeaderColumn, TableRow, TableRowColumn}
  from 'material-ui/Table';
import Divider from 'material-ui/Divider';
import FlatButton from 'material-ui/FlatButton';
import Toggle from 'material-ui/Toggle';

import * as d3 from 'd3';


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

            
class DndTreeDoc extends Component {
  constructor() {
    super();
    this.state = {data: window.data};
  }

  render() {
    return (
      <div>
        <h2>Drag 'n Drop Tree</h2>
        <Divider />
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi. Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque. Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
        </p>

        <Card>
          <CardHeader
            title="Example Drag 'n Drop Tree"
            subtitle="Subtitle"/>
          <CardMedia>
          <div>
             <NpmDndTree 
              height='2000'
              width='960'
              data={this.state.data}
            />

          </div>
          </CardMedia>
        </Card>

        <h3>Drag 'n Drop Tree Properties</h3>
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

export default DndTreeDoc;