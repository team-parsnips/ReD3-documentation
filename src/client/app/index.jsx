import React from 'react';
import {render} from 'react-dom';
import {Router, Route, browserHistory} from 'react-router';
import injectTapEventPlugin from 'react-tap-event-plugin';
import routes from './modules/routes';

class App extends React.Component {
  render () {
    return (    
      <Router routes={routes} history={browserHistory} />
    );
  }
}

injectTapEventPlugin();
render(<App/>, document.getElementById('app'));