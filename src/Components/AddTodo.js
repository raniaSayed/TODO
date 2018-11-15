import React, { Component  } from 'react';
import ReactDOM from 'react-dom';

import uuid from 'uuid';

class AddTodo extends Component {
    constructor(){
        super();
        this.state = {
            todo:{}
        }
    }

    handleSubmit(e){
        e.preventDefault();
        

        var task = ReactDOM.findDOMNode(this.refs.task).value.trim();
		if (!task) {
            alert('empty todos not allowed!');
		}else{
            this.setState({
                todo:{
                    id: uuid.v4(),
                    task: this.refs.task.value,
                    complete: false,
                    tag: this.refs.tag.value
                }
            },() =>{
                this.props.addTodo(this.state.todo);
            }
        );
        ReactDOM.findDOMNode(this.refs.task).value = '';
        return;
        }
    }


    render(){
          return (

            <div className="commentForm vert-offset-top-2">
            <hr />
            <div className="clearfix">
                <form className="todoForm form-horizontal" onSubmit={this.handleSubmit.bind(this)}>
                    <div className="form-group">
                        <label htmlFor="task" className="col-md-1 control-label">Task</label>
                        <div className="col-md-10">
                            <input type="text" id="task" ref="task" className="form-control" placeholder="Type Todo" />
                        </div>
                        <hr />
                        <label htmlFor="tag" className="col-md-1 control-label">Tag</label>
                         <div className="col-md-5">
                            <input type="text" id="tag" ref="tag" className="form-control" placeholder="Tag Todo" />
                        </div>

                    </div>
                    <div className="row">
                        <div className="col-md-10 col-md-offset-2 text-right">
                            <input type="submit" value="Save Item" className="btn btn-primary" />
                        </div>
                    </div>
                </form>
            </div>
        </div>

          );
    }

}


export default AddTodo;
