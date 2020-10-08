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
        <div className="quizzes"> {
            quizzes.map(quiz => (
                <Link to={`/quizzes/${quiz.id}`} key={quiz.id}>
                    <div className="quiz" key={quiz.id}>
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
