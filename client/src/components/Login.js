import React from "react";

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
                        <input
                            type="confirmPassword"
                            name="confirmPassword"
                            autoComplete="off"
                            className="auth-form-input"
                            value={this.state.confirmPassword}
                            onChange={this.updateInput}
                            placeHolder="Confirm Password">
                        </input>
                        <button type="submit" className="auth-form-input" id="login"> Login</button>
                        <button type="button" className="auth-form-input" id="demo"> Login as Demo User</button>
                    </form>
                </div>
            </div>
        )
    }
}

export default Login;
