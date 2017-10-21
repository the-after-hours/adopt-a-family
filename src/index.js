import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from  'react-router-dom';
import App from './components/App';
import './devBuild/styles/index.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import customTheme from './theme';

ReactDOM.render(
  <Router>
    <MuiThemeProvider muiTheme={customTheme}>
      <App />
    </MuiThemeProvider>
  </Router>,
  document.getElementById('root')
);