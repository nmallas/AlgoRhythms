import React, {useEffect, useState} from 'react';
import { BrowserRouter, Switch, Route, NavLink, Redirect } from 'react-router-dom';

import Login from "./components/Login";
import SignUp from './components/SignUp';
import { useSelector, useDispatch} from "react-redux";
import { getCurrent } from "./store/authReducer";
import Visuals from './components/Visuals';
import QuizPage from "./components/QuizPage"
import Quiz from './components/Quiz';
import Navbar from './components/Navbar';
import CreateQuiz from './components/CreateQuiz';
import UserQuizzes from './components/UserQuizzes';


function App() {

    const dispatch = useDispatch();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        dispatch(getCurrent());
        setLoading(false);
    }, [])

    const userId = useSelector(state => state.auth.id);

    const ProtectedRoute = function({path, exact, component, render}) {
        return (userId) ? (
            <>
                <Navbar/>
                <Route exact={exact} path={path} render={render} component={component}/>
            </>
        ) : <Redirect to="/login"/>
    }

    return (
        <BrowserRouter>


                <Switch>
                    <Route path="/login" component={Login}/>
                    <Route path="/signup" component={SignUp}/>
                    <ProtectedRoute path="/visuals" component={Visuals}/>
                    <Route exact path="/" >
                        <Redirect to="/quizzes"/>
                    </Route>
                    <ProtectedRoute exact path="/quizzes" render={(props) => <QuizPage {...props} userId={userId}></QuizPage>}/>
                    <ProtectedRoute exact path="/quizzes/create" component={CreateQuiz}/>
                    <ProtectedRoute exact path="/quizzes/:quizId" component={Quiz}/>
                    <ProtectedRoute exact path="/users/:userId" component={UserQuizzes}/>
                </Switch>
        </BrowserRouter>
    );
}

export default App;
