const LOGIN = "auth/login";
const LOGOUT = "auth/logout";

export default function(state={}, action) {
    switch(action.type) {
        case(LOGIN):
           return action.user;
        case(LOGOUT):
            return ({id: ""})
        default:
            return state;
    }
}

const setUser = (user) => ({
    type: LOGIN,
    user
})

const logoutUser = () => ({type: LOGOUT})


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
            dispatch(setUser(data.login))
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
            dispatch(setUser(data.login))
        }
    }
}

export const logout = () => {
    return async function(dispatch) {
        let res = await fetch("/api/users/logout", {
            method: "DELETE",
        });
        if(res.ok) {
            dispatch(logoutUser());
            return "success";
        }
    }
}


export const getCurrent = () => {
    return async dispatch => {
        let res = await fetch("/api/users/current");
        if(res.ok) {
            const data = await res.json()
            dispatch(setUser(data.current))
        }
    }
}
