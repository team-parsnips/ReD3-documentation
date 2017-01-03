import React, {Component} from 'react';
import { Link } from 'react-router';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import {deepOrange500} from 'material-ui/styles/colors';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import Divider from 'material-ui/Divider';
import MenuItem from 'material-ui/MenuItem';
import ArrowDropDown from 'material-ui/svg-icons/navigation/arrow-drop-down';
import FlatButton from 'material-ui/FlatButton';

const styles = {
  container: { textAlign: 'center', paddingTop: 200
  }
};

const muiTheme = getMuiTheme({
  palette: { accent1Color: deepOrange500 }
});

const linkStyle = {
  color:'white',
  'textDecoration':'none'
};

class Navigation extends Component {
  constructor() {
    super();
    this.state = {
      open: false
    }
  }

  handleDrawerToggle = () => this.setState({open: !this.state.open});
  handleClose = () => this.setState({open: false});

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div>
          <AppBar
            onLeftIconButtonTouchTap={this.handleDrawerToggle}
            iconElementRight={<FlatButton href="https://github.com/team-parsnips/ReD3" label="GitHub" />} />
          <Drawer
            docked={false}
            open={this.state.open}
            onRequestChange={this.handleClose}>
            <Link to="/" style={linkStyle}>
              <MenuItem>ReD3</MenuItem>
            </Link>
            <Divider />
            <Link to="/start" style={linkStyle}>
              <MenuItem>Get Started</MenuItem>
            </Link>
            <MenuItem 
              primaryText="Components"
              rightIcon={<ArrowDropDown />} 
              menuItems={[
                <Link to="/voronoi" style={linkStyle}>
                  <MenuItem primaryText="Voronoi" />
                </Link>,
                <Link to="/sunburst" style={linkStyle}>
                  <MenuItem primaryText="SunBurst" />
                </Link>,
                <Link to="/zoommap" style={linkStyle}>
                  <MenuItem primaryText="Zoomable Map" />
                </Link>,
                <Link to="/hierarchical" style={linkStyle}>
                  <MenuItem primaryText="Hierarchical" />
                </Link>,
                <Link to="/dndtree" style={linkStyle}>
                  <MenuItem primaryText="Dnd Tree" />
                </Link>,
              ]}/>
            <Divider />
            <a href="https://github.com/team-parsnips/ReD3" style={linkStyle}>
              <MenuItem>GitHub</MenuItem>
            </a>
          </Drawer>
          <div className="container">
            {this.props.children}
          </div>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default Navigation;