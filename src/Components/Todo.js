import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import AddTodo from './AddTodo';
import EditTodo from './EditTodo';
import TodoList from './TodoList';
import FilterTodo from './FilterTodo';

class Todo extends Component {
  constructor() {
    super();
    this.state = {
      todos: [],
      completedTodos: [],
      filteredTodos: [],
      wellStyle: {
        margin: "0%",
        width: "max-content"
      },
      user: {}
    }
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


  setTodos(todos) {
    window.localStorage.setItem('todos', JSON.stringify(todos));
  }

  getTodos() {

    //check if any filteration criteria applied
    if (this.state.completedTodos.length > 0) {
      return this.state.completedTodos;
    }
    if (this.state.filteredTodos.length > 0) {
      return this.state.filteredTodos;
    }

    //load it from local storage
    if (this.state.todos !== []) {
      var todoStorage = window.localStorage.getItem('todos');
      this.state.todos = (todoStorage == 'undefined' || todoStorage == null) ? [] : JSON.parse(todoStorage);
    }
    //get only auth user todos
    var authTodos = this.state.todos.filter((todo) => todo.userId == this.state.user.id)
    this.state.todos = authTodos;
    return authTodos;
  }

  componentWillMount() {
    if (this.state.todos === []) {
      this.setTodos(this.state.todos);
    }
  }

  componentDidMount() {
    this.getTodos();
    this.getAuthUser();
  }

  handleAddTodo(todo) {
    let todos = this.state.todos;
    todos.push(todo);
    this.setState({ todos: todos });
    this.setTodos(this.state.todos);

  }

  handleRemoveTodo(nodeId) {
    var filteredTodos = this.state.completedTodos;
    var completedTodos = this.state.filteredTodos;

    //if delete when filter by completed
    if (completedTodos.length > 0) {

      completedTodos = completedTodos.filter(function (todo) {
        return (todo.id !== nodeId);
      });
    }

    //if delete when filter by tag name

    if (filteredTodos.length > 0) {

      filteredTodos = filteredTodos.filter(function (todo) {
        return todo.id !== nodeId;
      });


    }
    //anyway delete from main todos
    var todos = this.state.todos;

    todos = todos.filter(function (todo) {
      return todo.id !== nodeId;
    });
    // }
    this.setState({ todos: todos, filteredTodos: filteredTodos, completedTodos: completedTodos });

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
    this.setState({ todos });

    //alter data in local storage
    this.setTodos(todos);
    return;
  }

  handleToggleCompleted() {
    var todos = this.state.todos;

    if (this.state.completedTodos.length == 0) {
      todos = todos.filter(function (todo) {

        return todo.complete == 'true';
      });

      this.setState({ completedTodos: todos });
    } else {
      this.setState({ completedTodos: [] });

    }
  }

  handleFilterByTag(tag) {
    var todos = this.state.todos;
    var re = new RegExp(tag, 'i');

    todos = todos.filter(function (todo) {

      return todo.tag.match(re)
    });

    if (todos.length === this.state.todos.length) {
      this.setState({ filteredTodos: [] });
      this.getTodos();
    }
    else {
      this.setState({ filteredTodos: todos });
    }

  }

  render() {

    return (
      <div className="well" style={this.state.wellStyle}>
        <h1 className="vert-offset-top-0">
       
          Todo List:
          <hr />
          Hello {this.getAuthUser().username}
          </h1>

        <FilterTodo filterByTag={this.handleFilterByTag.bind(this)}
          onChange={this.handleToggleCompleted.bind(this)} />
        <AddTodo user={this.state.user} addNode={this.handleAddTodo.bind(this)} />

        <TodoList data={this.getTodos()} removeNode={this.handleRemoveTodo.bind(this)} toggleComplete={this.handleToggleComplete.bind(this)} />
      </div>
    );
  }
}

export default Todo;
