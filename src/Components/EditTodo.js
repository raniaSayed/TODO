import React, { Component  } from 'react';
import ReactDOM from 'react-dom';


import uuid from 'uuid';
import Todo from './Todo';

class EditTodo extends Component {
    constructor(){
        super();
        this.state = {
            todo:{}
        }
    }

    setTodos(todos){
        window.localStorage.setItem('todos', JSON.stringify(todos));
    }

    getTodos() {

        //load it from local storage
        if (this.state.todos !== []) {
          var todoStorage = window.localStorage.getItem('todos');
          this.state.todos = (todoStorage == 'undefined' || todoStorage == null) ? [] : JSON.parse(todoStorage);
        }
        //get only auth user todos
        var authTodos = this.state.todos.filter((todo) => todo.userId == this.state.user.id)
    
        return authTodos;
      }

    handleChange(){
        this.state.todo.task = this.refs.task
    }
    handleSubmit(e){
        e.preventDefault();        
        const id = this.props.match.params.id;
        const history  =  this.props.history;
        
        if(id){
            var todos = this.getTodos();

            //find todo
            var todo  =  todos.find(todo => todo.id == id);
            var task = ReactDOM.findDOMNode(this.refs.task).value.trim();
            if (!task) {
                alert('empty todos not allowed!');
            }else{
                //edit  todo
                todo.task = this.refs.task.value;
                todo.tag  =  this.refs.tag.value;       

                //save to local storage
                this.setTodos(todos);

                //back to home
                history.push('/');


            }
        }                                
    }
     getCurrentTodo(){	
        const id = this.props.match.params.id;
        var todos = this.getTodos();

        return todos.find(todo => todo.id == id);
    }


    render(){

        var currentTodo = this.getCurrentTodo.bind(this);
        var todo = currentTodo();
        // }
          return (

            <div className="commentForm vert-offset-top-2">
            <hr />
            
            <div className="clearfix">
                <form className="todoForm form-horizontal" onSubmit={this.handleSubmit.bind(this)}>
                    <div className="form-group">
                        <label htmlFor="task" className="col-md-1 control-label">Task</label>
                        <div className="col-md-10">
                            <input type="text" id="task" ref="task"  defaultValue={todo.task} className="form-control" placeholder="Type Todo" />
                        </div>
                        <hr />
                        <label htmlFor="tag" className="col-md-1 control-label">Tag</label>
                         <div className="col-md-3">
                            <input type="text" id="tag" ref="tag" defaultValue={todo.tag} className="form-control" placeholder="Tag Todo" />
                        </div>

           
                        <div className="col-md-3 col-md-offset-2 text-right">
                            <input type="submit" value="Save Item" className="btn btn-primary" />
                        </div>
                    </div>
                </form>
            </div>
        </div>

          );
    }

}


export default EditTodo;
