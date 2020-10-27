import React, {useEffect, useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { submitQuiz, resetCurrentAnswers } from "../store/quizReducer";
import ConfettiGenerator from "confetti-js";


export default function Quiz(props) {

    let quizId = props.match.params.quizId;
    let [quizData, setQuizData] = useState("");
    let [loading, setLoading] = useState(true);
    let [quizName, setQuizName] = useState("");
    let [answers, setAnswers] = useState({});
    let [quizErrors, setQuizErrors] = useState("");
    let [showConfetti, setShowConfetti] = useState(false)
    let userId = useSelector(state => state.auth.id);
    let taken = useSelector(state => state.quizzes.current);
    let dispatch = useDispatch();

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

        (function resetCurrentQuiz() {
            dispatch(resetCurrentAnswers())
        })()

        getQuiz();
    }, [quizId, dispatch])

    const handleClick = async (e) => {
        e.preventDefault();
        let totalQuestions = quizData.length;
        let totalAnswers = Object.keys(answers).length;
        if(totalQuestions !== totalAnswers) {
            setQuizErrors("* You Must Answer Every Question *");
            return;
        }
        let score = await dispatch(submitQuiz({answers, quizId, userId}));
        if(score === 100) {
            setShowConfetti(true);
            renderConfetti();
        }
    }

    const handleReset = (e) => {
        e.preventDefault();
        setAnswers({});
        dispatch(resetCurrentAnswers())
    }

    const updateAnswers = (e) => {
        setAnswers({...answers, [e.target.name]: e.target.value})
    }

    const renderConfetti = (e) => {

        const confettiSettings = {
            target: "canvas",
            clock: 35,
            max: 350,
            size: 2,
        };

        const confetti = new ConfettiGenerator(confettiSettings);
        confetti.render();

        setTimeout(() => {
            confetti.clear();
            setShowConfetti(false);
        }, 3500);
    }



    return loading ? null : (
        <div className="quiz-page">
            <div className="quiz-container">
                <div className="quiz-form-container">
                    <h1 className="quiz-name"> {quizName} </h1>
                    {taken && <h3 className={"quiz-score"}> {`Your Score is ${taken.score}%` }</h3>}
                    <form>
                        {quizData.map(q => {
                            if(q.question.type === "mc") {
                                return (
                                    <div className="mc-question" key={q.question.id}>
                                        <div className="mc-question-title"> {q.question.content} </div>
                                        <div className="mc-answers">
                                            {
                                            q.answers.map((a, i) =>
                                                <div className="mc-answer" key={a.id}>
                                                    {taken && taken.incorrectChoices.includes(String(a.id)) ?
                                                        <div className={"quiz-feedback"} style={{color: "#FF5103"}}>✘</div> :
                                                    taken && taken.correctChoices.includes(String(a.id)) ?
                                                        <div className={"quiz-feedback"} style={{color: "#03C805"}} >✔</div> :
                                                    taken && taken.correctAnswers.includes(a.id) && !(taken.correctChoices.includes(String(a.id))) ?
                                                    <div className={"quiz-feedback"} style={{color: "#03C805"}} >➞</div> :
                                                        <div className={"quiz-feedback"}/>
                                                    }
                                                    <div> {i+1}.</div>
                                                    <input  onChange={updateAnswers} type="radio" name={q.question.id}
                                                            disabled={taken}
                                                            value={a.id} style={{"marginLeft": "10px"}}
                                                            checked={answers[q.question.id] === String(a.id)}
                                                    />
                                                    <div style={{"marginLeft": "10px"}}>{a.content} </div>
                                                </div>)}
                                        </div>
                                    </div>
                                )
                            } else return null;
                        })}
                        <div className="errors">{quizErrors}</div>
                        <button type="submit" onClick={handleClick} className="quiz-submit quiz-button">Submit</button>
                        <button type="button" onClick={handleReset} className="quiz-reset quiz-button" hidden={!taken}> Reset</button>
                    </form>
            </div>
            { showConfetti && <canvas id="canvas"></canvas> }
            </div>
        </div>
    )
}
