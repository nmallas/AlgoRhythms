import React from "react";
import { NavLink } from "react-router-dom";
import Logout from "./Logout";

class Navbar extends React.Component {
    render() {
        return (
        <nav>
            <ul className="nav-list">
                <li><NavLink to="/quizzes" activeclass="active">Quizzes</NavLink></li>
                <li><NavLink exact to="/visuals" activeclass="active">Visuals</NavLink></li>
                <li><Logout/></li>
            </ul>
        </nav>
        )
    }
}

export default Navbar;
