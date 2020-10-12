import React, { useState } from "react";

export default function CreateQuiz() {
    let [quiz, setQuiz] = useState();
    let [questions, setQuestions] = useState([""]);
    let [answerChoices, setAnswerChoices] = useState({})

    const updateInput = (e) => {
        let updatedQuestions = questions.slice(0);
        updatedQuestions[e.target.name] = e.target.value;
        setQuestions(updatedQuestions);
    }

    console.log(questions);
    return (
        <form>
            {questions.map((q, i) => {
                return (
                    <div className="create-quiz-question-container">
                        <div className="create-quiz-question-label"> Question {i + 1} </div>
                        <input  type="textArea" className="create-quiz-question"
                                placeholder={"write question here"} value={useState[i]}
                                name={i} onChange={updateInput}/>
                    </div>
                )
            })}
        </form>
    )
}
