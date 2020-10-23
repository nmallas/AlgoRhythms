let SETCURRENT = "quiz/current/set";
let RESETCURRENT = "quiz/current/reset";


export default function quizReducer(state={}, action) {
    switch(action.type) {
        case(SETCURRENT):
            return action.answers
        case(RESETCURRENT):
            return {}
        default:
            return state
    }
}

const setCurrentAnswers = (answers) => ({
    type: SETCURRENT,
    answers
})

export const resetCurrentAnswers = () => ({
    type: RESETCURRENT
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
            dispatch(setCurrentAnswers(data));
            return data.current.score
        }
    }
}
