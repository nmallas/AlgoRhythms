import React, { useState } from "react";

export default function CreateQuiz() {
    let [quiz, setQuiz] = useState();
    let [questions, setQuestions] = useState([""]);
    let [answerChoices, setAnswerChoices] = useState({0: []});
    let [currentAnswerChoice, setCurrentAnswerChoice] = useState("");
    let [currentQuestionContent, setCurrentQuestionContent] = useState("");
    let [currentQuestionId, setCurrentQuestionId] = useState(0)

    const updateInput = (e) => {
        // let updatedQuestions = questions.slice(0);
        // updatedQuestions[e.target.name] = e.target.value;
        // setQuestions(updatedQuestions);
        setCurrentQuestionContent(e.target.value);
    }

    const addAnswerChoice = (i) => {
        if(!currentAnswerChoice.length) return null;

        let oldAnswerChoices = {...answerChoices};
        oldAnswerChoices[i].push(currentAnswerChoice);
        setAnswerChoices(oldAnswerChoices);
        setCurrentAnswerChoice("");
    }

    const setQuestion = (i) => {
        let updatedQuestions = questions.slice(0);
        updatedQuestions[currentQuestionId] = currentQuestionContent;
        setQuestions(updatedQuestions);
        setCurrentQuestionId(-1);
    }

    console.log(currentQuestionContent);
    console.log(currentAnswerChoice);
    return (
        <div className="create-quiz">
            {questions.map((q, i) => {
                return (
                    <>
                        <div className="create-quiz-question-container">
                            <div className="create-quiz-question-label"> Question {i + 1}: </div>
                            { i !== currentQuestionId ?
                                <div className="set-question"> {questions[i]} </div> :
                                <>
                                    <textarea  className="create-quiz-question"
                                        placeholder={"write question here"} value={currentQuestionContent}
                                        name={i} onChange={updateInput}/>
                                    <button onClick={setQuestion} className="create-quiz-question-button">Set Question</button>
                                </>
                            }

                        </div>
                        <ol className="answer-choice-list">
                            {answerChoices[i].map((ac, j)=> (
                                <li> {ac} </li>
                            ))}
                            <li>
                                <input className="new-answer-choice" onChange={(e) => setCurrentAnswerChoice(e.target.value)} value={currentAnswerChoice}/>
                                <button type="button" className="add-answer-choice" onClick={() => addAnswerChoice(i)}> Add Answer Choice</button>
                            </li>
                        </ol>
                        <button type="button" className="another-question"> Add Another Question </button>
                    </>
                    )
            })}
        </div>
    )
}
