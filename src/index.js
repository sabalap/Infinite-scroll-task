import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from "react-router-dom";
import {SingleUserProvider} from "./context/single_user_context";
ReactDOM.render(
  <SingleUserProvider>
  <Router>
    <App />
  </Router>
  </SingleUserProvider>,
  document.getElementById('root')
);
