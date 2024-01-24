import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.scss"

const NavBar = () => {
    return (
        <nav className={styles.nav_bar}>
            <NavLink to="/">
                Home
            </NavLink>
            <NavLink to="/cart" >
                Cart
            </NavLink>
            <NavLink to="/favourites" >
                Favourites
            </NavLink>
        </nav>
    )
}

export default NavBar