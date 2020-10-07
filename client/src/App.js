import React from 'react';
import { BrowserRouter, Switch, Route, NavLink, Redirect } from 'react-router-dom';

import Login from "./components/Login";
import SignUp from './components/SignUp';
import { useSelector } from "react-redux";
import Home from "./components/Home"


function App() {

    const userId = useSelector(state => state.auth.id);

    const ProtectedRoute = function({path, exact, component}) {
        return (!userId) ? <Redirect to="/login"/> :
            <Route exact={exact} path={path} component={component}/>
    }

    return (
        <BrowserRouter>

                {/* <nav>
                    <ul>
                        <li><NavLink to="/" activeclass="active">Home</NavLink></li>
                    </ul>
                </nav> */}
                <Switch>
                    <Route path="/login" component={Login}/>
                    <Route path="/signup" component={SignUp}/>
                    <ProtectedRoute exact path="/" component={Home}/>
                </Switch>
        </BrowserRouter>
    );
}

export default App;
