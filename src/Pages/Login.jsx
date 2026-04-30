import google_icon from '../assets/icons/google.png';
import logo from '../assets/images/logo.png';
import { useState } from 'react';
import SubmitBTN from '../Components/SubmitBTN';

function Login() {

    const defaultUser = {
        email: "gobres.389265@ortigas-cainta.sti.edu.ph",
        password: "User123"
    };

    const defaultAdmin = {
        email: "admin@ortigas-cainta.sti.edu.ph",
        password: "Admin123"
    };

    const [account, setAccount] = useState({
        email: "",
        password: "",
    });

    const [error, setError] = useState("");
    const [userType, setUserType] = useState(null);
    const [ isLoggingIn, setIsLoggingdIn ] = useState(false);

    const handleLoggingIn = () => {
        setIsLoggingdIn(prev => !prev);
    };

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
            setError("");
        } else if (isAdmin) {
            setUserType("admin");
            setError("");
        } else {
            setError("Invalid email or password");
            setUserType(null);
        }
    };

    return(
        <main className="flex items-center justify-center w-full h-screen bg-login-100 p-8">
            <div className="
                w-full h-full max-w-md flex flex-col items-center justify-center gap-20 bg-login-50 shadow-md
                md:h-max md:py-12 lg:max-w-sm
            ">
                <div className='flex flex-col items-center justify-center text-center'>
                    <img src={logo} alt="unitrack logo" className='w-[13rem]' />
                    <p className='text-clr_description text-sm'>
                        Online Uniform Reservation & <br />Inventory System
                    </p>
                </div>

                <div className='text-sm text-clr_description px-4 w-full'>
                    <button 
                        className='flex items-center justify-center gap-2 bg-button_primary w-full py-2 mb-2 rounded'
                        onClick={handleLoggingIn}
                        style={isLoggingIn ? {display: 'none'} : {display: 'flex'}}
                    >
                        <span className="bg-login-100  rounded">
                            <img src={google_icon} alt="google icon" className='w-4 max-w-8 m-1' />
                        </span>
                        <span className='w-max text-login-100'>
                            Sign in with School Email
                        </span>
                    </button>

                    <form onSubmit={handleLogin} className={`space-y-4 ${isLoggingIn ? "block" : "hidden"}`}>

                        <div
                            className={`space-y-4`}
                        >

                            {/* Email */}
                            <div className="flex flex-col">
                            <label className="mb-1 text-sm font-medium">
                                School Email
                            </label>

                            <input
                                type="email"
                                required
                                value={account.email}
                                onChange={(e) =>
                                setAccount({ ...account, email: e.target.value })
                                }
                                placeholder="Enter your school Email"
                                pattern="^[a-zA-Z0-9._%+-]+@ortigas-cainta\.sti\.edu\.ph$"
                                className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-button_primary"
                            />
                            </div>

                            {/* Password */}
                            <div className="flex flex-col">
                            <label className="mb-1 text-sm font-medium">
                                Password
                            </label>

                            <input
                                type="password"
                                required
                                value={account.password}
                                onChange={(e) =>
                                setAccount({ ...account, password: e.target.value })
                                }
                                placeholder="Enter your password"
                                className="border p-2 rounded w-full focus:outline-none focus:ring-2 focus:ring-button_primary"
                            />
                            </div>

                        </div>

                        {/* Login Button */}
                        <SubmitBTN prompt={"Login"} />

                    </form>

                    {error && (
                        <p className="text-red-500 text-sm">
                            {error}
                        </p>
                    )}

                    {userType && (
                        <p className="text-green-500 text-sm">
                            Logged in as {userType}
                        </p>
                    )}

                    <p className='text-[10px] text-center'>Access is limited to authorized school accounts</p>
                </div>
            </div>
        </main>
    )
}

export default Login