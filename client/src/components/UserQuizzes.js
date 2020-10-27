import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const UserQuizzes = function(props) {

    const [quizzes, setQuizzes] = useState("");
    const [loading, setLoading] = useState(true);
    const [pageNum, setPageNum] = useState(0);
    const userId = props.match.params.userId;

    useEffect(()=> {
        async function getQuizzes() {
            let res = await fetch(`/api/quizzes/users/${userId}`);
            if(res.ok) {
                let data = await res.json();
                setQuizzes(data.quizzes);
                setLoading(false);
            }
        }
        getQuizzes()
    }, [userId])

    const changePage = (num) => {
        if((pageNum + num) < 0 || (((pageNum + num) * 5) > quizzes.length)) return;
        setPageNum(pageNum + num);
    }

    const handleDelete = async (id) => {
        let res = await fetch(`/api/quizzes/${id}`, {
            method: "DELETE",
        });
        if(res.ok) {
            props.history.push('/quizzes/')
        }
    }

    return  loading ? null : !quizzes?.length ?

        ( <div className="quizzes">
            <h1 style={{color: "white", textAlign: "center", padding: "25px"}}> You Have Not Created any Quizzes </h1>
            <div className="quiz-create-button-container">
                        <Link to="/quizzes/create" className="quiz-create-link">
                            <button type="button" className="quiz-create-button">Create a New Quiz</button>
                        </Link>
            </div>
        </div>
        )

    : (
        <div className="quizzes">
            <h1 className="quizpage-title"> My Quizzes</h1>
            <div className="user-quiz">
                <div className="uquiz-container">
                    <div className="uquiz">
                        <div>Name:</div>
                        <div>Category:</div>
                    </div>
                </div>
                <div id="delete-div"></div>
            </div>
            {
                quizzes.slice((pageNum * 5), (pageNum + 1) * 5 ).map(quiz => (
                    <div className="user-quiz">
                        <Link to={`/quizzes/${quiz.id}`} key={quiz.id} className="quizlink" >
                            <div className="uquiz quizdiv" key={quiz.id}>
                                <div>{quiz.name}</div>
                                <div>{quiz.category}</div>
                            </div>
                        </Link>
                        <div id="delete-div">
                            <button id="delete-quiz" onClick={() => handleDelete(quiz.id)}> Delete Quiz</button>
                            </div>
                    </div>
                ))
            }
            <div className="upageNumbers">
                <div onClick={() => changePage(-1)} className="page-change"> Previous </div>
                <div>{`${pageNum * 5 +1} - ${Math.min((pageNum +1) * 5, quizzes.length)}  of  ${quizzes.length}`}</div>
                <div onClick={() => changePage(+1)} className="page-change"> Next </div>
            </div>
            <div className="quiz-create-button-container">
                <Link to="/quizzes/create" className="uquiz-create-link">
                    <button type="button" className="quiz-create-button">Create a New Quiz</button>
                </Link>
            </div>
        </div>
    )
}

export default UserQuizzes;
