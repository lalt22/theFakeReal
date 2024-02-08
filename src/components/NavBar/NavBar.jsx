import { NavLink } from "react-router-dom";
import styles from "./NavBar.module.scss"
import cart from "../../assets/shopping-cart.png";
import heart from "../../assets/heart.png";
import home from "../../assets/home.png";
import Hamburger from "hamburger-react";
import { useContext, useEffect, useRef, useState } from "react";
import { WidthContext } from "../../context/MobileContext";
import { useClickAway } from "react-use";


const NavBar = () => {  
    const {width, setWidth} = useContext(WidthContext);
    const [isOpen, setOpen] = useState(false);
    const ref = useRef(null);

    useClickAway(ref, () => setOpen(false));
    const isMobile = width <= 726;

    const widthChange = () => {
        setWidth(window.innerWidth);
    }
    useEffect(() => {
        window.addEventListener('resize', widthChange);
        return () => {
            window.removeEventListener('resize', widthChange);
        }
       
    }, [])
    return (
        <div className={styles.nav_section}>
        {!isMobile &&
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
        }
         {isMobile && <div ref={ref} className={styles.burger_nav}>
                <div className={styles.burger}>
                    <Hamburger rounded toggled={isOpen} size={20} toggle={setOpen} />
                </div>
            
                {isOpen && 
                    <div className={styles.route_list}>
                        
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
                }
                <div className={styles.site_home_title}>
                    <NavLink to="theFakeReal/">
                        <h1>TheFakeReal</h1>
                    </NavLink>
                </div>
                
            </div>
        }    
        </div>

    )
}

export default NavBar