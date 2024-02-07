import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.scss"
import cart from "../../assets/shopping-cart.png";
import heart from "../../assets/heart.png";
import home from "../../assets/home.png";


const NavBar = () => {
    return (
        <nav className={styles.nav_bar}>
            <div className={styles.nav_left}>
                <NavLink to="theFakeReal/">
                    <h1>TheFakeReal</h1>
                </NavLink>
                <p>Luxury Consignment and Resale</p>
            </div>
            
            <div className={styles.nav_right}>
                <NavLink to="theFakeReal/">
                <   img src={home} />
                </NavLink>
                <NavLink to="theFakeReal/favourites" >
                    <img src={heart} />
                </NavLink>
                <NavLink to="theFakeReal/cart" >
                    <img src={cart} />
                </NavLink>  
            </div>
            
        </nav>
    )
}

export default NavBar