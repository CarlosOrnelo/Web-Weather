import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import './sass/style.css';
import 'react-toastify/dist/ReactToastify.css';
import Home from './routes/home';
import reportWebVitals from './reportWebVitals';
import { ToastContainer } from 'react-toastify';


ReactDOM.render(
  <React.StrictMode>
    <Router >
      <Switch>
        <Route path='/home' component={Home} />
        <Redirect from='/' to='/home' component={Home} />
      </Switch>
    </Router>
    <ToastContainer />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
