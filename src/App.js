import React, { Component } from 'react';
import AddTodo from './Components/AddTodo';
import TodoList from './Components/TodoList';
import './App.css';

class App extends Component {
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
    this.state.todos= todoStorage=='undefined'?[] : JSON.parse(todoStorage);

    console.log(this.state.todos);
  }




  componentWillMount(){
  }

  componentDidMount(){
    this.getTodos();
  }

  componentDidUpdate(){

    // this.setTodos(this.state);
  }

  handleAddTodo(todo){
    let todos = this.state.todos;
    todos.push(todo);
    this.setState({todos:todos});
    this.setTodos(this.state.todos);

  }

  handleRemoveTodo(nodeId){
		var todos = this.state.todos;
		todos = todos.filter(function (todo) {
			return todo.id !== nodeId;
		});
    this.setState({todos});
    //set in local storage
    this.setTodos(this.state.todos);

		return;
	}


  render() {
    
    return (
      // <div className="App">
      //   <AddTodo addTodo={this.handleAddTodo.bind(this)}  />
      // </div>
      <div className="well">
				<h1 className="vert-offset-top-0">To do:</h1>
				<AddTodo addTodo={this.handleAddTodo.bind(this)} />
				<TodoList data={this.state.todos} removeNode={this.handleRemoveTodo} toggleComplete={this.handleToggleComplete} />
			</div>
    );
  }
}

export default App;
