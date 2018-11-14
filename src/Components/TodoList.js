import React, { Component } from 'react';
import uuid from 'uuid';
import TodoItem from './TodoItem';


class TodoList extends Component {
    constructor(){
        super();
    }
    componentWillMount(){
        console.log(this.props);
    }
    removeNode(nodeId) {
        console.log(nodeId);
		this.props.removeNode.bind(this,nodeId);
		return;
    }
    
	toggleComplete(nodeId) {
		this.props.toggleComplete(nodeId);
		return;
	}
	render() {
		var listNodes = this.props.data.map(function (listItem) {
			return (
				<TodoItem key={listItem.id} nodeId={listItem.id} task={listItem.task} complete={listItem.complete} removeNode={this.removeNode} toggleComplete={this.toggleComplete} />
			);
		},this);
		return (
			<ul className="list-group">
				{listNodes}
			</ul>
		);
	}

}
export default TodoList;