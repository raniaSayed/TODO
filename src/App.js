import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(){
    super();
    this.state = {
      todos:[]
    }
  }

  getTodos(){
    //load it from local storage
  }


  componentWillMount(){
    this.getTodos();
  }

  componentDidMount(){
    this.getTodos();
  }


  render() {
    return (
      <div className="App">
        <AddTodo ></AddTodo>
      </div>
    );
  }
}

export default App;
