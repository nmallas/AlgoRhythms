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
                <form method="Post" action="/api/users/login" className="auth-form">
                    <input type="email" name="email" value={this.state.email} onChange={this.updateInput} placeHolder="Email Address"></input>
                    <input type="password" name="password" value={this.state.password} onChange={this.updateInput} placeHolder="Password"></input>
                    <input type="confirmPassword" name="confirmPassword" value={this.state.confirmPassword} onChange={this.updateInput} placeHolder="Confirm Password"></input>
                    <button type="submit"> Login</button>
                </form>
            </div>
        )
    }
}

export default Login;
