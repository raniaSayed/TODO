import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Todo from './Components/Todo';
import AddTodo from './Components/AddTodo';
import EditTodo from './Components/EditTodo';
import TodoList from './Components/TodoList';
import Login from './Components/Login';
import Register from './Components/Register';
import './App.css';

function Logout() {
  var user = window.localStorage.getItem('user');
  user = (user == 'undefined' || user == null) ? false : JSON.parse(user);
  if(user){
       user.loggedIn = false;
       window.localStorage.setItem('user', JSON.stringify(user));

  }

  // window.localStorage.removeItem('user');
  window.location.reload();

  //back to home
  const history = this.props.history;
  history.push('/');
}

//remaining filter by tag // regiser + login
class App extends Component {
  constructor() {
    super();
    this.state = {
    }
  }



  handleRemoveTodo(nodeId) {
    var todos = this.state.todos;
    todos = todos.filter(function (todo) {

      return todo.id !== nodeId;
    });
    this.setState({ todos });

    //set in local storage
    this.setTodos(todos);

    return;
  }


  getAuthUser() {
    var user = window.localStorage.getItem('user');
    user = (user == 'undefined' || user == null) ? false : JSON.parse(user);
    if (user.loggedIn) {
      this.state.user = user;
    } else {
      this.state.user = false;
    }
    return this.state.user;
  }

  isAuth() {
    var user = this.getAuthUser();
    if (!user || !user.loggedIn) {
      return false;
    }
    return true;
  }




  render() {

    //if not authenticated user => not allowed to use todos
    if (!this.isAuth()) {
      return (
        <Router>
          <div>

            <Link to="/register">Register</Link>
            &nbsp;&nbsp;&nbsp;

              <Link to="/login">Login</Link>
            <hr />

            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />

          </div>
        </Router>
      );
    }


    return (

      <Router>
        <div>

          <Link to="/logout">Logout</Link>

          <Route path="/logout" component={Logout} />
          <Route exact path="/" component={Todo} />
          <Route path="/about" component={AddTodo} />
          <Route path="/edit/:id" component={EditTodo} />
        </div>
      </Router>
    );
  }
}

export default App;
