import React, { useState } from "react";
import { useSelector } from "react-redux";

export default function CreateQuiz() {
    let [quizName, setQuizName] = useState("");
    let [questions, setQuestions] = useState([""]);
    let [answerChoices, setAnswerChoices] = useState([]);
    let [answers, setAnswers] = useState([]);
    let [category, setCategory] = useState("jsTrivia")
    let [currentAnswerChoice, setCurrentAnswerChoice] = useState("");
    let [currentQuestionContent, setCurrentQuestionContent] = useState("");
    let [currentQuestionId, setCurrentQuestionId] = useState(0);
    let [currentQuizName, setCurrentQuizName] = useState("");
    let userId = useSelector(state => state.auth.id);

    const updateInput = (e) => {
        setCurrentQuestionContent(e.target.value);
    }

    const addAnswerChoice = (i) => {
        if(!currentAnswerChoice.length) return null;

        let oldAnswerChoices = [...answerChoices];
        oldAnswerChoices[i].push(currentAnswerChoice);
        setAnswerChoices(oldAnswerChoices);
        setCurrentAnswerChoice("");
    }

    const setQuestion = (i) => {
        let updatedQuestions = questions.slice(0);
        updatedQuestions[currentQuestionId] = currentQuestionContent;
        setQuestions(updatedQuestions);
        let oldAnswerChoices = [...answerChoices];
        oldAnswerChoices[i] = [];
        setAnswerChoices(oldAnswerChoices);
    }

    const addQuestion = () => {
        setCurrentQuestionId(currentQuestionId + 1);
        setCurrentQuestionContent("");
        setQuestions([...questions, ""])
    }

    const deleteQuestion = (i) => {
        let newQuestions = [...questions.slice(0, i), ...questions.slice(i+1)]
        setQuestions(newQuestions);
        let newAnswerChoices = [...answerChoices.slice(0, i), ...answerChoices.slice(i+1)];
        setAnswerChoices(newAnswerChoices)
        setCurrentQuestionId(currentQuestionId-1);
    }

    const addAnswer = (i, j) => {
        let allAnswers = [...answers];
        allAnswers[i] = String(j)
        setAnswers(allAnswers);
    }

    const createNewQuiz = async () => {
        let res = await fetch("/api/quizzes/", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({questions, answers, answerChoices, quizName, userId, category})
        })
        if(res.ok) {
            let data = await res.json();
            console.log(data);
        }
    }

    return (
        <div className="quiz-page">
            <div className="quiz-container">
                {quizName ? <h1 className="quiz-name"> {quizName} </h1> : ""}
                {questions.map((q, i) => {
                    return (
                        // Require Quiz Name & Category
                        !quizName ?
                            <div className="quiz-name-and-category">
                                <div>
                                    <input value={currentQuizName} onChange={(e)=> setCurrentQuizName(e.target.value)}/>
                                    <button onClick={()=> setQuizName(currentQuizName)}> Set Quiz Name</button>
                                </div>
                                <div style={{"display": "flex"}}>
                                    <div className="category">Category:</div>
                                    <select onChange={(e)=> setCategory(e.target.value)}>
                                        <option>jsTrivia</option>
                                        <option>py_trivia</option>
                                        <option>general</option>
                                    </select>
                                </div>
                            </div>
                        :

                        <>

                            <div className="create-quiz-question-container">

                                {/* If question is set, display content in div, otherwise display input */}
                                { questions[i] ?
                                    <>
                                        <div style={{display: "flex", alignItems: "center"}}>
                                            <div className="create-quiz-question-label"> Question {i + 1}: </div>
                                            <div className="set-question"> {questions[i]} </div>
                                        </div>
                                        <button className="delete-question" onClick={() => deleteQuestion(i)}>Delete Question</button>
                                    </>
                                    :
                                    <>
                                        <div className="create-quiz-question-label"> Question {i + 1}: </div>
                                        <textarea  className="create-quiz-question"
                                            placeholder={"write question here"} value={currentQuestionContent}
                                            name={i} onChange={updateInput}/>
                                        <button onClick={() => setQuestion(i)} className="create-quiz-question-button">Set Question</button>
                                    </>
                                }

                            </div>
                            {/* Only display answerChoices after question is written */}
                            {!questions[i] ? null :
                                <ol className="answer-choice-list">
                                    {answerChoices[i].map((ac, j)=> (
                                        <div className={answers[i] === String(j)? "current-answer" : "answer-choice"}>
                                            <li> {ac} </li>
                                            <button type="button" onClick={() => addAnswer(i, j)}> Set as Answer</button>
                                        </div>
                                    ))}
                                    {/* Only allow answer choices to be added to current question  */}
                                    { currentQuestionId !== i ? null :
                                    <li className="add-answer-choice-li">
                                        <input className="new-answer-choice" onChange={(e) => setCurrentAnswerChoice(e.target.value)} value={currentAnswerChoice}/>
                                        <button type="button" className="add-answer-choice" onClick={() => addAnswerChoice(i)}> Add Answer Choice</button>
                                    </li>
                                    }
                                </ol>
                            }
                        </>
                        )
                })}
                {/* Ensure there is at least one answer choice and answer for the previous question */}
                {(!answerChoices[currentQuestionId]?.length || !answers[currentQuestionId]) ? null :
                    <div className="create-quiz-form-buttons">
                        <button type="button" className="another-question"onClick={addQuestion}> Add Another Question </button>
                        <button type="button" className="create-new-quiz" onClick={createNewQuiz}> Create Quiz </button>
                    </div>
                }
            </div>
        </div>
    )
}
