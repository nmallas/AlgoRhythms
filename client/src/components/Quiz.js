import React, {useEffect, useState} from "react";

export default function Quiz(props) {

    let quizId = props.match.params.quizId;
    let [quizData, setQuizData] = useState("");
    let [loading, setLoading] = useState(true);
    let [quizName, setQuizName] = useState("");
    let [answers, setAnswers] = useState({});

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

    const handleClick = (e) => {
        e.preventDefault();

    }

    const updateAnswers = (e) => {
        e.preventDefault();
        setAnswers({...answers, [e.target.name]: e.target.value})
    }

    console.log(quizName, quizData)
    console.log(answers)
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
                                    q.answers.map((a, i) =>
                                        <div className="mc-answer">
                                            <div >{i+1}.</div>
                                            <input  onChange={updateAnswers} type="radio" name={q.question.id}
                                                    value={a.order} style={{"marginLeft": "10px"}}
                                                    checked={answers[q.question.id] == a.order}
                                            />
                                            <div style={{"marginLeft": "10px"}}>{a.content} </div>
                                        </div>)}
                                </div>
                            </div>
                        )
                    }
                })}
                <button type="submit" onClick={handleClick}>Submit</button>
            </form>
        </div>
    )
}
