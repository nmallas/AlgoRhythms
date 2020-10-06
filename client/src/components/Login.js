import React from "react";
import { Link } from "react-router-dom";
import { login } from "../store/authReducer";
import { connect } from "react-redux";

class Login extends React.Component {
    constructor() {
        super()
        this.state = {
            email: "",
            password: "",
            confirmPassword: ""
        }
    }

    updateInput = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    handleSumbit = (e) => {
        e.preventDefault();

    }

    render() {
        return (
            <div className="auth-page">
                <div className="auth-form-container">
                    <div className="auth-header"> Sign In </div>
                    <form method="Post" action="/api/users/login" className="auth-form" >
                        <input
                            autoComplete="off"
                            type="email"
                            name="email"
                            className="auth-form-input"
                            value={this.state.email}
                            onChange={this.updateInput}
                            placeHolder="Email Address">
                        </input>
                        <input
                            type="password"
                            name="password"
                            className="auth-form-input"
                            autoComplete="off"
                            value={this.state.password}
                            onChange={this.updateInput}
                            placeHolder="Password">
                        </input>
                        <button type="submit" className="auth-form-input" id="login" onSubmit={this.handleSumbit}> Login</button>
                        <button type="button" className="auth-form-input" id="demo"> Login as Demo User</button>
                    </form>
                    <div> New to AlgoRythm? <Link to="/signup">Create An Account!</Link></div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        userId: state.auth.id
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loginUser: (email, password) => dispatch(login(email, password))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
