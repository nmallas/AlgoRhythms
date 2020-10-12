import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const QuizPage = function(props) {

    const [quizzes, setQuizzes] = useState("");
    const [loading, setLoading] = useState(true);

    useEffect(()=> {
        async function getQuizzes() {
            let res = await fetch("/api/quizzes");
            if(res.ok) {
                let data = await res.json();
                console.log(data)
                setQuizzes(data.quizzes);
                setLoading(false);
            }
        }
        getQuizzes()
    }, [])

    console.log(quizzes)
    return loading ? null : (
        <div className="quizzes">
            <h1 className="quizpage-title"> Available Quizzes</h1>
            <div className="quiz">
                <div> Name: </div>
                <div> Category: </div>
                <div> Username: </div>
            </div>
            {
                quizzes.map(quiz => (
                    <Link to={`/quizzes/${quiz.id}`} key={quiz.id} className="quizlink">
                        <div className="quiz quizdiv" key={quiz.id}>
                            <div>{quiz.name}</div>
                            <div>{quiz.category}</div>
                            <div>{quiz.username}</div>
                        </div>
                    </Link>
                ))
            }
        </div>
    )
}

export default QuizPage
