import { createContext, useState, useEffect, useContext } from "react";

export const WidthContext = createContext(null);

const WidthContextProvider = ({children}) => {
    const [width, setWidth] = useState(window.innerWidth);

    return (
        <WidthContext.Provider value={{width, setWidth}}>
            {children}
        </WidthContext.Provider>
    )
}

export default WidthContextProvider;