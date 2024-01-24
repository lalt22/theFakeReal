import { createContext, useState, useContext } from "react";

export const FavouritesContext = createContext(null);

const FavouritesContextProvider = ({children}) => {
    const [favourites, setFavourites] = useState([]);

    return (<FavouritesContext.Provider value={{favourites, setFavourites}}>
        {children}
    </FavouritesContext.Provider>)
}

export default FavouritesContextProvider;