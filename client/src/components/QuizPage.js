import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Footer from "./Footer";

const QuizPage = function(props) {

    const [quizzes, setQuizzes] = useState("");
    const [loading, setLoading] = useState(true);
    const [pageNum, setPageNum] = useState(0);

    useEffect(()=> {
        async function getQuizzes() {
            let res = await fetch("/api/quizzes/");
            if(res.ok) {
                let data = await res.json();
                setQuizzes(data.quizzes);
                setLoading(false);
            }
        }
        getQuizzes()
    }, [])

    const changePage = (num) => {
        if((pageNum + num) < 0 || (((pageNum + num) * 5) > quizzes.length)) return;
        setPageNum(pageNum + num);
    }

    return loading ? <div className="quizzes"/> : (
        <>
            <div className="quizzes">
                <h1 className="quizpage-title"> Available Quizzes</h1>
                <div className="quiz">
                    <div> Name: </div>
                    <div> Category: </div>
                    <div> Username: </div>
                </div>
                {
                    quizzes.slice((pageNum * 5), (pageNum + 1) * 5 ).map(quiz => (
                        <Link to={`/quizzes/${quiz.id}`} key={quiz.id} className="quizlink" >
                            <div className="quiz quizdiv" key={quiz.id}>
                                <div>{quiz.name}</div>
                                <div>{quiz.category}</div>
                                <div>{quiz.username}</div>
                            </div>
                        </Link>
                    ))
                }
                <div className="pageNumbers">
                    <div onClick={() => changePage(-1)} className="page-change"> Previous </div>
                    <div>{`${pageNum * 5 +1} - ${Math.min((pageNum +1) * 5, quizzes.length)}  of  ${quizzes.length}`}</div>
                    <div onClick={() => changePage(+1)} className="page-change"> Next </div>
                </div>
                <div className="quiz-create-button-container">
                    <Link to="/quizzes/create" className="quiz-create-link">
                        <button type="button" className="quiz-create-button">Create a New Quiz</button>
                    </Link>
                    <Link to={`/quizzes/users/${props.userId}`} className="quiz-create-link">
                        <button type="button" className="quiz-create-button">See Your Quizzes</button>
                    </Link>
                </div>
            </div>
            <Footer/>
        </>
    )
}

export default QuizPage
