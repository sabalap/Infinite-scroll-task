import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {SingleUserProvider} from "./context/single_user_context"

ReactDOM.render(
  <SingleUserProvider>
  <App />
  </SingleUserProvider>,
  document.getElementById('root')
);
