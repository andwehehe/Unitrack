import { createContext, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const PageContext = createContext();

export function PageContextProvider({ children }) {

    const [currentPage, setCurrentPage] = useState("Login");
    const [previousPage, setPreviousPage] = useState(null);

    const navigateTo = (page) => {
        setPreviousPage(currentPage);
        setCurrentPage(page);
    };

    return(
        <PageContext.Provider value={{currentPage, previousPage, navigateTo}}>
            {children}
        </PageContext.Provider>
    );
}