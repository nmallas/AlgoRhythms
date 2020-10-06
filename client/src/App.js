import React from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';

import Login from "./components/Login";
import SignUp from './components/SignUp';


function App() {
  console.log("____Rendering app_____")
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
            <Route path="/">
                <h1>My Home Page</h1>
            </Route>
        </Switch>
    </BrowserRouter>
  );
}

export default App;
