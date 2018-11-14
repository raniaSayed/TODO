import React, { Component } from 'react';
import uuid from 'uuid';

class AddTodo extends Component {
    constructor(){
        super();
        this.state = {
            todo:{}
        }
    }


    static defaultProps = {
        tags: ['tag1','tag2','tag3']
    }

    handleSubmit(e){
        e.preventDefault();

        if(this.refs.content.value === ''){
            alert('empty todos not allowed!');
        }else{
            this.setState({
                todo:{
                    id: uuid.v4(),
                    content: this.refs.content.value,
                    tag: this.refs.tag.value
                }
            },() =>{
                this.props.addTodo(this.state.todo);
            }
        );
        }
    }


    render(){
        let tagOptions = this.props.tags.map(tag => {
            return <option key={tag} value={tag}>{tag}</option>
          });

          return (
            <div>
              <h3>Add Todo</h3>
              <form onSubmit={this.handleSubmit.bind(this)}>
                <div>
                  <label>Todo</label><br />
                  <input type="text" ref="content" />
                </div>
                <div>
                  <label>Tags</label><br />
                  <select ref="tag">
                    {tagOptions}
                  </select>
                </div>
                <br />
                <input type="submit" value="Submit" />
                <br />
              </form>
            </div>
          );
    }

}


export default AddTodo;
