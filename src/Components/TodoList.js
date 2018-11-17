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
		this.props.removeNode(nodeId);
		return;
    }
    
	toggleComplete(nodeId) {
		console.log(nodeId);
		this.props.toggleComplete(nodeId);
		return;
	}
	render() {
		var listNodes = this.props.data.map(function (listItem) {
			return (
				<TodoItem key={listItem.id} listItem={listItem} removeNode={this.removeNode.bind(this)} toggleComplete={this.toggleComplete.bind(this)} />
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
