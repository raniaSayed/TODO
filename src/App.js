import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Todo from './Components/Todo';
import AddTodo from './Components/AddTodo';
import EditTodo from './Components/EditTodo';
import TodoList from './Components/TodoList';
import './App.css';

//remaining filter by tag // regiser + login
class App extends Component {
  constructor(){
    super();
    this.state = {
    }
  }



  handleRemoveTodo(nodeId){
    console.log(nodeId);
		var todos = this.state.todos;
		todos = todos.filter(function (todo) {

			return todo.id !== nodeId;
		});
    this.setState({todos});

    //set in local storage
    this.setTodos(todos);

		return;
	}


  render() {
    
    return (
     
          <Router>
          <div>    
            <Route  path="/register" component={Todo}  />
            <Route  path="/login" component={Todo}  />
            
            <Route exact path="/" component={Todo}  />
            <Route path="/about" component={AddTodo} />
            <Route path="/edit/:id"  component={EditTodo} />
          </div>
        </Router>
    );
  }
}

export default App;
