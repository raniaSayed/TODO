import React, { Component } from 'react';
import uuid from 'uuid';
import { Link } from "react-router-dom";

import { runInThisContext } from 'vm';


class TodoItem extends Component {
	constructor() {
		super();
		this.state = {
			todo: {}
		}
	}
	removeNode(e) {
		e.preventDefault();
		this.props.removeNode(this.props.listItem.id);
		return;
	}

	toggleComplete(e) {
		e.preventDefault();
		this.props.toggleComplete(this.props.listItem.id);
		return;
	}

	render() {
		var classes = 'list-group-item clearfix';
		if (this.props.listItem.complete === 'true') {
			classes = classes + ' list-group-item-success';
		}
		let tag;
		if (this.props.listItem.tag) {
			tag = <button type="button" className="btn btn-xs btn-primary img-circle" >{this.props.listItem.tag}</button>;

		}
		return (
			<li className={classes}>

				{this.props.listItem.task}
				&nbsp;&nbsp;&nbsp;&nbsp;

				{tag}

				<div className="pull-right" role="group">

					<Link to={'/edit/' + this.props.listItem.id}>
						<span class="glyphicon glyphicon-edit"></span>
					</Link>
					&nbsp;&nbsp;

					<button type="button" className="btn btn-xs btn-success img-circle"
						onClick={this.toggleComplete.bind(this)}>&#x2713;</button>

					&nbsp;&nbsp;
					<button type="button" className="btn btn-xs btn-danger img-circle"
						onClick={this.removeNode.bind(this)}>&#xff38;</button>


					{/* //TODO to be changes to icon after internet returns */}
				</div>
			</li>
		);
	}
}
export default TodoItem;
