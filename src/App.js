import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

import Todo from './Components/Todo';
import AddTodo from './Components/AddTodo';
import EditTodo from './Components/EditTodo';
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
    return this.state.todos;
    // console.log(this.state.todos);
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
      // <div className="App">
      //   <AddTodo addTodo={this.handleAddTodo.bind(this)}  />
      // </div>
      

          // <Router>

          //     <ul>
          //     <li>
          //       <Link to="/">Todos</Link>
          //     </li>
          //     <li>
          //       <Link to="/edit">Edit</Link>
          //     </li>
          //   </ul>
          //   <div>
          //       <Route path="/edit" component={EditTodo} />
          //       <Route exact path="/" component={Todo} />
          //   </div>

          // </Router>
          <Router>
          <div>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/topics">Topics</Link>
              </li>
            </ul>
    
            <hr />
    
            <Route exact path="/" component={Todo} />
            <Route path="/about" component={AddTodo} />
            <Route path="/topics" component={EditTodo} />
          </div>
        </Router>
    );
  }
}

export default App;
