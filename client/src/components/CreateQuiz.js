import React, { useState } from "react";

export default function CreateQuiz() {
    let [quiz, setQuiz] = useState();
    let [questions, setQuestions] = useState([""]);
    let [answerChoices, setAnswerChoices] = useState({0: []});
    let [currentAnswerChoice, setCurrentAnswerChoice] = useState("");

    const updateInput = (e) => {
        let updatedQuestions = questions.slice(0);
        updatedQuestions[e.target.name] = e.target.value;
        setQuestions(updatedQuestions);
    }

    const addAnswerChoice = (i) => {
        let oldAnswerChoices = {...answerChoices};
        oldAnswerChoices[i].push(currentAnswerChoice);
        setAnswerChoices(oldAnswerChoices);
        setCurrentAnswerChoice("");
    }

    console.log(questions);
    console.log(currentAnswerChoice);
    return (
        <form>
            {questions.map((q, i) => {
                return (
                    <>
                        <div className="create-quiz-question-container">
                            <div className="create-quiz-question-label"> Question {i + 1} </div>
                            <textarea  className="create-quiz-question"
                                    placeholder={"write question here"} value={useState[i]}
                                    name={i} onChange={updateInput}/>
                        </div>
                        <ol className="answer-choice-list">
                            {answerChoices[i].map((ac, j)=> (
                                <li> {ac} </li>
                            ))}
                            <li>
                                <input onChange={(e) => setCurrentAnswerChoice(e.target.value)} value={currentAnswerChoice}/>
                                <button type="button" onClick={() => addAnswerChoice(i)}> Add Answer Choice</button>
                            </li>
                        </ol>

                    </>
                    )
            })}
        </form>
    )
}
