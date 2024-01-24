import { NavLink } from "react-router-dom";

const NavBar = () => {
    return (
        <nav className="nav_bar">
            <NavLink to="/">
                Home
            </NavLink>
        </nav>
    )
}

export default NavBar