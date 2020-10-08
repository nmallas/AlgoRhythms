import React, {useEffect, useState} from "react";

export default function Quiz(props) {

    let quizId = props.match.params.quizId;
    let [quizData, setQuizData] = useState("");
    let [loading, setLoading] = useState(true);
    let [quizName, setQuizName] = useState("")

    useEffect(()=> {
        async function getQuiz() {
            let res = await fetch(`/api/quizzes/${quizId}`);
            if(res.ok) {
                let data = await res.json();
                let name = Object.keys(data)[0]
                setQuizName(name);
                setQuizData(data[name]);
                setLoading(false);

            }
        }
        getQuiz();
    }, [quizId])

    console.log(quizName, quizData)
    return loading ? null : (
        <div className="quiz-container">
            <h1> {quizName} </h1>
            <form>
                {quizData.map(q => {
                    if(q.question.type === "mc") {
                        return (
                            <div className="mc-question">
                                <div className="mc-question-title"> {q.question.content} </div>
                                <div className="mc-answers">
                                    {
                                    q.answers.map(a =>
                                        <div className="mc-answer">
                                            <input type="radio" value={a.order} />
                                            <div >{a.content} </div>
                                        </div>)}
                                </div>
                            </div>
                        )
                    }
                })}
            </form>
        </div>
    )
}
