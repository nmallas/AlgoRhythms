const LOGIN = "auth/login"

export default function(state={}, action) {
    let newState = {...state}
    switch(action.type) {
        case(LOGIN):
            console.log(action.user)
           return action.user;
        default:
            return state;
    }
}

const SetUser = (user) => ({
    type: LOGIN,
    user
})


export const login = (email, password) => {
    return async (dispatch) => {
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


export const signup = (email, password, confirmPassword) => {
    return async (dispatch) => {
        let res = await fetch("/api/users/", {
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({email, password, confirmPassword})
        })
        if (res.ok) {
            let data = await res.json();
            console.log(data);
            dispatch(SetUser(data.login))
        }
    }
}
