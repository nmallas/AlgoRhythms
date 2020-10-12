import React, {useEffect, useState} from 'react';
import { BrowserRouter, Switch, Route, NavLink, Redirect } from 'react-router-dom';

import Login from "./components/Login";
import SignUp from './components/SignUp';
import { useSelector, useDispatch} from "react-redux";
import Home from "./components/Home"
import { getCurrent } from "./store/authReducer";
import Visuals from './components/Visuals';
import QuizPage from "./components/QuizPage"
import Quiz from './components/Quiz';
import Navbar from './components/Navbar';
import CreateQuiz from './components/CreateQuiz';


function App() {

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        dispatch(getCurrent());
        setLoading(false);
    }, [])

    const userId = useSelector(state => state.auth.id);

    const ProtectedRoute = function({path, exact, component}) {
        return (userId) ? (
            <>
                <Navbar/>
                <Route exact={exact} path={path} component={component}/>
            </>
        ) : <Redirect to="/login"/>
    }

    return (
        <BrowserRouter>


                <Switch>
                    <Route path="/login" component={Login}/>
                    <Route path="/signup" component={SignUp}/>
                    <ProtectedRoute path="/visuals" component={Visuals}/>
                    <ProtectedRoute exact path="/" component={Home}/>
                    <ProtectedRoute exact path="/quizzes" component={QuizPage}/>
                    <ProtectedRoute exact path="/quizzes/create" component={CreateQuiz}/>
                    <ProtectedRoute exact path="/quizzes/:quizId" component={Quiz}/>
                </Switch>
        </BrowserRouter>
    );
}

export default App;
