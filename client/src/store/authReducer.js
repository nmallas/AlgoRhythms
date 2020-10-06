const LOGIN = "auth/login"

export default function(state={}, action) {
    let newState = {...state}
    switch(action.type) {
        case(LOGIN):
           return action.user;
        default:
            return state;
    }
}

const SetUser = (user) => ({
    type: login,
    user
})


export const login = (dispatch) => {
    return async (email, password) => {
        let res = await fetch("/api/users/login", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email, password})
        })
        if(res.ok) {
            let data = await res.json()
            console.log(data);
            dispatch(SetUser(data.login))
        }
    }
}
