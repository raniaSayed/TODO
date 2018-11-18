import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import TodoList from './Todo';

class Login extends Component {
  constructor() {

    super();
    this.state = {
      user: {}
    }
  }

  getUser(username, password) {
    var user = window.localStorage.getItem('user');
    user = (user == 'undefined' || user == null) ? false : JSON.parse(user);
    if (user) {
      var isAuth = this.isAuth(user, username, password);
      if (isAuth) {
        user.loggedIn = true;
        window.localStorage.setItem('user', JSON.stringify(user));
        this.setState({ user: user });
        return user;
      }
    }
    return false;
  }


  isAuth(user, username, password) {
    if (user.username == username
      && user.password == password) {
      return true;
    }
    return false;


  }

  handleLogin(e) {
    e.preventDefault();
    if (this.getUser(this.refs.username.value, this.refs.password.value)) {
      //refresh page to reload localstorage
      window.location.reload();

      //back to home
      const history = this.props.history;
      history.push('/');

    } else {
      alert('invalid username or password!');
    }

  }

  render() {

    return (
      <div className="commentForm vert-offset-top-2">
        <div className="clearfix">
          <h3> Login Form</h3>

          <form className="todoForm form-horizontal" onSubmit={this.handleLogin.bind(this)}>
            <div className="form-group">
              <label htmlFor="username" className="col-md-3 control-label">Username</label>
              <div className="col-md-9">
                <input type="text" id="username" ref="username" className="form-control" placeholder="Username" />
              </div>
              <hr />
              <label htmlFor="pasword" className="col-md-3 control-label">Password</label>
              <div className="col-md-9">
                <input type="password" id="password" ref="password" className="form-control" placeholder="Pasword" />
              </div>
              <hr />
              <hr />

              <div className="col-md-3 col-md-offset-2 text-right">
                <input type="submit" value="Login" className="btn btn-primary" />
              </div>
            </div>
          </form>
        </div>
      </div>

    );
  }
}

export default Login;
