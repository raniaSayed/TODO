import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import uuid from 'uuid';

class Register extends Component {
    constructor() {

        super();
        this.state = {
            user: {}
        }
    }
    setUser(user) {
        user.loggedIn = false;
        this.setState({ user: user });
        window.localStorage.setItem('user', JSON.stringify(user));

    }

    handleRegister(e) {
        e.preventDefault();
        var user = {
            id: uuid.v4(),
            username: this.refs.username.value,
            password: this.refs.password.value
        }
        this.setUser(user);

        //refresh page to reload localstorage
        window.location.reload();

        //back to home
        const history = this.props.history;
        history.push('/');
    }

    render() {
        return (
            <div className="commentForm vert-offset-top-2">
                <div className="clearfix">
                    <h3> Registeration Form</h3>

                    <form className="todoForm form-horizontal" onSubmit={this.handleRegister.bind(this)}>
                        <div className="form-group">
                            <label htmlFor="username" className="col-md-3 control-label">Username</label>
                            <div className="col-md-6">
                                <input type="text" id="username" ref="username" className="form-control" placeholder="Username" />
                            </div>
                            <label htmlFor="pasword" className="col-md-3 control-label">Password</label>
                            <div className="col-md-6">
                                <input type="password" id="password" ref="password" className="form-control" placeholder="Pasword" />
                            </div>
                            <hr />
                            <div className="col-md-3 col-md-offset-2 text-right">
                                <input type="submit" value="Register" className="btn btn-primary" />
                            </div>
                        </div>
                    </form>
                </div>
            </div>

        );
    }

}


export default Register;
