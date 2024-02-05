import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.scss"

const NavBar = () => {
    return (
        <nav className={styles.nav_bar}>
            <NavLink to="theFakeReal/">
                Home
            </NavLink>
            <NavLink to="theFakeReal/cart" >
                Cart
            </NavLink>
            <NavLink to="theFakeReal/favourites" >
                Favourites
            </NavLink>
        </nav>
    )
}

export default NavBar