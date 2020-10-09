let SETCURRENT = "quiz/current/set"


export default function quizReducer(state={}, action) {
    switch(action.type) {
        case(SETCURRENT):
            return action.answers
        default:
            return state
    }
}

const setCurrentAnswers = (answers) => ({
    type: SETCURRENT,
    answers
})

export const submitQuiz = ({answers, quizId, userId}) => {
    return async function(dispatch) {
        let res = await fetch("/api/quizzes/submit", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({answers, quizId, userId})
        })
        if(res.ok) {
            let data = await res.json();
            console.log(data);
            dispatch(setCurrentAnswers(data))
        }
    }
}
