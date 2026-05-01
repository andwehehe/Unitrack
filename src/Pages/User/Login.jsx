import google_icon from '../../assets/icons/google.png';
import logo from '../../assets/images/logo.png';
import view from '../../assets/icons/view.png';
import hidden from '../../assets/icons/hidden.png';
import { useContext, useState } from 'react';
import { PageContext } from '../../Contexts/PageContext';
import { LoginContext } from '../../Contexts/LoginContext';

function Login() {

    const { currentPage, navigateTo } = useContext(PageContext);

    const defaultUser = {
        email: "gobres.389265@ortigas-cainta.sti.edu.ph",
        password: "User123"
    };

    const defaultAdmin = {
        email: "admin@ortigas-cainta.sti.edu.ph",
        password: "Admin123"
    };

    const [ togglePassword, setTogglePassword ] = useState(false);

    const { 
        account, 
        setAccount, 
        error, 
        setError, 
        isLoggingIn, 
        setIsLoggingIn,
        setUserType  
    } = useContext(LoginContext);

    const handleLogin = (e) => {
        e.preventDefault();

        const isUser =
            account.email === defaultUser.email &&
            account.password === defaultUser.password;

        const isAdmin =
            account.email === defaultAdmin.email &&
            account.password === defaultAdmin.password;

        if (isUser) {
            setUserType("user");
            navigateTo("User-Dashboard");
        } else if (isAdmin) {
            setUserType("admin");
            navigateTo("Admin-Dashboard");
        }
    };

    return(
        <main className={`
            flex items-center justify-center w-full 
            h-screen bg-login-100 p-8
            ${currentPage === "Login" ? "flex" : "hidden"}
        `}>
            <div className="
                w-full h-full max-w-md flex flex-col items-center 
                justify-center gap-20 bg-login-50 shadow-md
                md:h-max md:py-12 lg:max-w-sm
            ">
                <div className='flex flex-col items-center justify-center text-center'>
                    <img src={logo} alt="unitrack logo" className='w-[13rem]' />
                    <p className='text-clr_description text-sm'>
                        Online Uniform Reservation & <br />Inventory System
                    </p>
                </div>

                <div className='text-sm text-clr_description px-4 w-full'>
                    
                    {/* Google Button */}
                    {!isLoggingIn && (
                        <button
                            className='flex items-center justify-center gap-2 bg-button_primary w-full py-2 mb-2 rounded'
                            onClick={() => setIsLoggingIn(true)}
                        >
                            <span className="bg-login-100 rounded">
                                <img src={google_icon} alt="google icon" className='w-4 max-w-8 m-1' />
                            </span>
                            <span className='w-max text-login-100'>Sign in with School Email</span>
                        </button>
                    )}

                    {/* Login Form */}
                    {isLoggingIn && (
                        <form onSubmit={handleLogin} className="space-y-4">
                            {/* Email */}
                            <div className="flex flex-col">
                                <label className="mb-1 text-sm font-medium">School Email</label>
                                <input
                                    type="email"
                                    required
                                    value={account.email}
                                    onChange={(e) => setAccount({ ...account, email: e.target.value })}
                                    placeholder="Enter your school email"
                                    className="
                                        border p-2 rounded w-full focus:outline-none 
                                        focus:ring-2 focus:ring-button_primary cursor-pointer
                                "/>
                            </div>

                            {/* Password */}
                            <div className="flex flex-col">
                                <label className="mb-1 text-sm font-medium">
                                    Password
                                </label>
                                <div className='
                                    rounded w-full focus:outline-none focus-within:ring-2 
                                    focus-within:ring-button_primary border p-2
                                    flex items-center
                                '>
                                    <input
                                        type={togglePassword ? "text" : "password"}
                                        required
                                        value={account.password}
                                        onChange={(e) => setAccount({ ...account, password: e.target.value })}
                                        placeholder="Enter your password"
                                        className=" rounded w-full focus:outline-none cursor-pointer"
                                    />
                                    <img 
                                        src={togglePassword ? view : hidden} 
                                        alt="view/hide" 
                                        className='w-4 cursor-pointer'
                                        onClick={() => setTogglePassword(prev => !prev)} 
                                    />
                                </div>
                            </div>

                            {/* Error */}
                            {error && <p className="text-red-500 text-sm">{error}</p>}

                            {/* Buttons */}
                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-white p-2 rounded hover:bg-button_primary font-semibold"
                            >
                                Login
                            </button>

                            <button
                                type="button"
                                onClick={() => {
                                    setIsLoggingIn(false);
                                    setError("");
                                }}
                                className="w-full text-start text-xs text-gray-400 hover:text-gray-600"
                            >
                                ← Back
                            </button>
                        </form>
                    )}

                    <p className='text-[10px] text-center pt-2'>
                        Access is limited to authorized school accounts
                    </p>
                </div>
            </div>
        </main>
    );
}

export default Login;