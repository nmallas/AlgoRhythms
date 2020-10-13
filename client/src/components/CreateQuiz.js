import React, { useState } from "react";

export default function CreateQuiz() {
    let [quiz, setQuiz] = useState();
    let [questions, setQuestions] = useState([""]);
    let [answerChoices, setAnswerChoices] = useState([]);
    let [currentAnswerChoice, setCurrentAnswerChoice] = useState("");
    let [currentQuestionContent, setCurrentQuestionContent] = useState("");
    let [currentQuestionId, setCurrentQuestionId] = useState(0)

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

    console.log(answerChoices);
    console.log(currentQuestionId);
    return (
        <div className="create-quiz">
            {questions.map((q, i) => {
                return (
                    <>
                        <div className="create-quiz-question-container">
                            <div className="create-quiz-question-label"> Question {i + 1}: </div>
                            {/* If question is set display content in div, otherwise display input */}
                            { questions[i] ?
                                <>
                                    <div className="set-question"> {questions[i]} </div>
                            <button className="delete-question" onClick={() => deleteQuestion(i)}>Delete Question</button>
                                </>
                                :
                                <>
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
                                    <li> {ac} </li>
                                ))}
                                {/* Only allow answer choices to be added to current question  */}
                                { currentQuestionId !== i ? null :
                                <li >
                                    <input className="new-answer-choice" onChange={(e) => setCurrentAnswerChoice(e.target.value)} value={currentAnswerChoice}/>
                                    <button type="button" className="add-answer-choice" onClick={() => addAnswerChoice(i)}> Add Answer Choice</button>
                                </li>
                                }
                            </ol>
                        }
                    </>
                    )
            })}
            {/* Ensure there is at least one answer choice for the previous question */}
            {!answerChoices[currentQuestionId]?.length ? null :
                <button type="button" className="another-question"onClick={addQuestion}> Add Another Question </button>
            }
        </div>
    )
}
