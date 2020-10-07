import React from "react";
import {useDispatch} from "react-redux";
import { logout } from "../store/authReducer"

export default function Logout(props) {
    const dispatch = useDispatch();

    const logoutUser = () => dispatch(logout())

    return (
        <button onClick={logoutUser}> Logout </button>
    )
}
