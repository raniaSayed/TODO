import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import AddTodo from './AddTodo';
import EditTodo from './EditTodo';
import TodoList from './TodoList';
import FilterTodo from './FilterTodo';

class Todo extends Component {
  constructor(){
    super();
    this.state = {
      todos:[],
      completedTodos:[],
      filteredTodos:[]
    }
  }

  setTodos(todos){
    window.localStorage.setItem('todos', JSON.stringify(todos));
  }

  getTodos(){
    //load it from local storage

    if(this.state.completedTodos.length > 0){
      return this.state.completedTodos;
    }
    if(this.state.filteredTodos.length > 0){
      return this.state.filteredTodos;
    }

    if(this.state.todos!==[]){
      var todoStorage = window.localStorage.getItem('todos');
      this.state.todos= (todoStorage=='undefined' || todoStorage ==null )?[] : JSON.parse(todoStorage);
      console.log(this.state.todos);
    }
    console.log( this.state.todos);
    
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

  handleToggleCompleted(){
    var todos = this.state.todos;
    console.log(this.state.completedTodos);
    
    if(this.state.completedTodos.length == 0){
      todos = todos.filter(function (todo) {
        console.log(todo.complete);
        
        return todo.complete == 'true';
      });
      
      this.setState({completedTodos:todos});    
    }else{
      this.setState({completedTodos:[]});    

    }
    // console.log(todos);

    //set in local storage
    // this.setTodos(completedTodos);
  }

  handleFilterByTag(tag){
    console.log('tag');
    console.log(tag);
    var todos = this.state.todos;
    console.log(this.state.filteredTodos);
    var re = new RegExp(tag, 'i');

    // if(this.state.filteredTodos.length == 0){
      todos = todos.filter(function (todo) {
        
        // return todo.task == 'true';
        return todo.tag.match(re)
      });
      
      this.setState({filteredTodos:todos});    
    // }

  }
  
  render() {
    
    return (
      <div className="well">
            <h1 className="vert-offset-top-0">To do:</h1>
            <FilterTodo filterByTag={this.handleFilterByTag.bind(this)} 
             onChange={this.handleToggleCompleted.bind(this)}  />
            <AddTodo addNode={this.handleAddTodo.bind(this)} />

            <TodoList data={this.getTodos()} removeNode={this.handleRemoveTodo.bind(this)} toggleComplete={this.handleToggleComplete.bind(this)} />
		</div>
    );
  }
}

export default Todo;
