import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import AddTodo from './AddTodo';
import EditTodo from './EditTodo';
import TodoList from './TodoList';

class Todo extends Component {
  constructor(){
    super();
    this.state = {
      todos:[]
    }
  }

  setTodos(todos){
    window.localStorage.setItem('todos', JSON.stringify(todos));
  }

  getTodos(){
    //load it from local storage

    var todoStorage = window.localStorage.getItem('todos');
    this.state.todos= (todoStorage=='undefined' || todoStorage ==null )?[] : JSON.parse(todoStorage);
    console.log(this.state.todos);
    return this.state.todos;
  }




  componentWillMount(){
    if(this.state.todos === []){
      this.setTodos(this.state.todos);
    }
  }

  componentDidMount(){
    this.getTodos();
  }

  componentDidUpdate(){

    // this.setTodos(this.state.todos);
  }

  handleAddTodo(todo){
    let todos = this.state.todos;
    todos.push(todo);
    this.setState({todos:todos});
    this.setTodos(this.state.todos);

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

	handleToggleComplete(nodeId) {
		var todos = this.state.todos;
		for (var i in todos) {
			if (todos[i].id == nodeId) {
				todos[i].complete = todos[i].complete === 'true' ? 'false' : 'true';
				break;
			}
		}
    this.setState({todos});
    //alter data in local storage
    this.setTodos(todos);
		return;
  }
  
  render() {
    
    return (
      <div className="well">
            <h1 className="vert-offset-top-0">To do:</h1>
            <AddTodo addNode={this.handleAddTodo.bind(this)} />

            <TodoList data={this.getTodos()} removeNode={this.handleRemoveTodo.bind(this)} toggleComplete={this.handleToggleComplete.bind(this)} />
		</div>
    );
  }
}

export default Todo;
