import { createContext, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const LoginContext = createContext();

export function LoginContextProvider({ children }) {

    const [ account, setAccount ] = useState({ email: "", password: "" });
    const [ error, setError ] = useState("");
    const [ isLoggingIn, setIsLoggingIn ] = useState(false);
    const [ userType, setUserType ] = useState(null);

    const logout = () => {
        setAccount({ email: "", password: "" });
        setError("");
        setIsLoggingIn(false);
        setUserType(null);
    };

    return (
        <LoginContext.Provider value={{
            account, setAccount,
            error, setError,
            isLoggingIn, setIsLoggingIn,
            logout, userType, setUserType
        }}>
            {children}
        </LoginContext.Provider>
    );
}