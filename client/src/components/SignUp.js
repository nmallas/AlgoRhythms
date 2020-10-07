import React from "react";
import { Link } from "react-router-dom";

class SignUp extends React.Component {
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
                    <div className="auth-header"> Sign Up </div>
                    <form method="Post" action="/api/users/signup" className="auth-form">
                        <input
                            autoComplete="off"
                            type="email"
                            name="email"
                            className="auth-form-input"
                            value={this.state.email}
                            onChange={this.updateInput}
                            placeholder="Email Address">
                        </input>
                        <input
                            type="password"
                            name="password"
                            className="auth-form-input"
                            autoComplete="off"
                            value={this.state.password}
                            onChange={this.updateInput}
                            placeholder="Password">
                        </input>
                        <input
                            type="confirmPassword"
                            name="confirmPassword"
                            autoComplete="off"
                            className="auth-form-input"
                            value={this.state.confirmPassword}
                            onChange={this.updateInput}
                            placeholder="Confirm Password">
                        </input>
                        <button type="submit" className="auth-form-input" id="login" onSubmit={this.handleSumbit}> Sign Up</button>
                    </form>
                    <div className="auth-link">
                        <div className="auth-link-text"> Already Have an Account?</div>
                        <div><Link to="/login">Log In!</Link></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default SignUp;
