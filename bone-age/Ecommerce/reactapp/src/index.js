import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

function setRootBackgroundColor(color) {
  const root = document.getElementsByTagName('html')[0];
  root.style.backgroundColor = color;
}

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
setRootBackgroundColor('#f2f2f2');

reportWebVitals();