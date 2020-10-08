import React from "react";
import { Link, Redirect } from "react-router-dom";
import { signup } from "../store/authReducer";
import { connect } from "react-redux";

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
        console.log('submitting')
        this.props.SignUpUser(this.state)
    }

    render() {
        return this.props.userId ? <Redirect to="/"/> :  (
            <div className="auth-page">
                <div className="auth-form-container">
                    <div className="auth-header"> Sign Up </div>
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
                        <input
                            type="password"
                            name="confirmPassword"
                            autoComplete="off"
                            className="auth-form-input"
                            value={this.state.confirmPassword}
                            onChange={this.updateInput}
                            placeholder="Confirm Password">
                        </input>
                        <button type="submit" className="auth-form-input" id="login"> Sign Up</button>
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

function mapStateToProps(state) {
    return {
        userId: state.auth.id
    }
}

function mapDispatchToProps(dispatch) {
    return {
        SignUpUser: ({email, password, confirmPassword}) => dispatch(signup(email, password, confirmPassword))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
