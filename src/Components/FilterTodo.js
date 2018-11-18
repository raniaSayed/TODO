import React, { Component  } from 'react';
import ReactDOM from 'react-dom';

import uuid from 'uuid';

class AddTodo extends Component {
    constructor(){
        super();
        this.state = {
            filteredTodos:{}
        }
    }

    handleChange(e){ 
        console.log(e.target.value);   
        this.props.filterByTag(e.target.value);    
        return;
    }

    handleToggleCompleted(){
        this.props.onChange();
    }

    render(){
          return (

            <div className="commentForm vert-offset-top-2">
            <hr />
            <div className="clearfix">
                    <div className="form-group">
                        <label htmlFor="filter" className="col-md-1 control-label">Filter</label>
                        <div className="col-md-5">
                            <input type="text" id="filter" ref="filter" onChange={this.handleChange.bind(this)} className="form-control" placeholder="Filter by tag name" />
                        </div>
                        <div className="col-md-3 col-md-offset-2 text-right">
                            <button className="btn btn-primary" onClick={this.handleToggleCompleted.bind(this)}>Toggle Complete</button>
                        </div>
                    </div>
            </div>
        </div>

          );
    }

}


export default AddTodo;
