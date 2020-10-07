import React from "react";
import { Link, Redirect } from "react-router-dom";
import { login } from "../store/authReducer";
import { connect } from "react-redux";

class Login extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: "",
            password: "",
        }
    }

    updateInput = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    handleSumbit = (e) => {
        e.preventDefault();
        this.props.loginUser(this.state.email, this.state.password)
    }

    demoLogin = (e) => {
        this.props.loginUser("demo@user.io", "password")
    }

    render() {
        return this.props.userId ? <Redirect to="/"/> : (
            <div className="auth-page">
                <div className="auth-form-container">
                    <div className="auth-header"> Sign In </div>
                    <form className="auth-form" onSubmit={this.handleSumbit}>
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
                        <button type="submit" className="auth-form-input" id="login" >
                            Login
                        </button>
                        <button type="button" className="auth-form-input" id="demo" onClick={this.demoLogin}>
                            Login as Demo User
                        </button>
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
