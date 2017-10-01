import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from  'react-router-dom';
import App from './components/App';
import './styles/index.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

const customTheme = getMuiTheme({
  'palette': {
    'primary1Color': '#006064',
    'primary2Color': '#1a237e',
    'accent1Color': '#bf360c',
    'pickerHeaderColor': '#00838f'
  }
});

ReactDOM.render(
  <Router>
    <MuiThemeProvider muiTheme={customTheme}>
      <App />
    </MuiThemeProvider>
  </Router>,
  document.getElementById('root')
);