import React from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';
import { Provider } from "react-redux";

import Login from "./components/Login";
import SignUp from './components/SignUp';
import configureStore from './store/configureStore';


function App() {

    console.log("____Rendering app_____")

    const store = configureStore({auth: {id: ""}})

    return (
        <BrowserRouter>
            <Provider store={store}>
                {/* <nav>
                    <ul>
                        <li><NavLink to="/" activeclass="active">Home</NavLink></li>
                    </ul>
                </nav> */}
                <Switch>
                    <Route path="/login" component={Login}/>
                    <Route path="/signup" component={SignUp}/>
                    <Route path="/">
                        <h1>My Home Page</h1>
                    </Route>
                </Switch>
            </Provider>
        </BrowserRouter>
    );
}

export default App;
