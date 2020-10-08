import React, {useEffect} from "react";

export default function Quiz(props) {

    let quizId = props.match.params.quizId

    useEffect(()=> {
        async function getQuiz() {
            let res = await fetch(`/api/quizzes/${quizId}`);
            if(res.ok) {
                let data = await res.json();
                console.log(data);

            }
        }
        getQuiz();
    }, [])

    return (
    <h1> Quiz {quizId} </h1>
    )
}
