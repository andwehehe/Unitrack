import logo from '../assets/images/logo.png';
import cart from '../assets/icons/shopping-cart.png';
import { OrderContext } from '../Contexts/OrderContext';
import { PageContext } from '../Contexts/PageContext';
import { LoginContext } from '../Contexts/LoginContext';
import { useContext } from 'react';

function Header() {

    const { orderList } = useContext(OrderContext);
    const { navigateTo, currentPage } = useContext(PageContext);
    const { userType } = useContext(LoginContext);

    const isAdmin = userType === "admin";
    const pageTitle = currentPage.replace("Admin-", "").replace("User-", "");

    return(
        <header className='
            flex justify-between items-center p-4 border-b-2 
            border-clr-desciption lg:justify-end
        '>
            {/* Mobile Logo */}
            <img 
                src={logo} 
                alt="unitrack logo" 
                className='w-[8rem] block lg:hidden' 
            />

            {/* Page Title — desktop only */}
            <h1 className='hidden lg:block text-xl font-bold flex-1'>
                {pageTitle}
            </h1>

            <div className='flex justify-center items-center gap-6'>

                {/* Cart — user only */}
                {!isAdmin && (
                    <div className='relative'>
                        <img 
                            src={cart} 
                            alt="cart" 
                            className='w-6 cursor-pointer' 
                            onClick={() => navigateTo("User-Cart")}
                        />
                        <span className={`
                            absolute -top-1 -right-2 w-4 h-4 text-[12px] 
                            text-center text-login-50 font-semibold rounded-full 
                            bg-red-600 ${orderList.length > 0 ? "block" : "hidden"}
                        `}>
                            {orderList.length}
                        </span>
                    </div>
                )}

                {/* Avatar */}
                <div className='flex items-center gap-2'>
                    <span className='hidden md:block'>
                        {isAdmin ? "Admin" : "Andrei Gobres"}
                    </span>
                    <p className='
                        w-8 h-8 flex items-center justify-center rounded-full 
                        bg-clr_description text-login-100 p-1
                    '>
                        {isAdmin ? "AD" : "AG"}
                    </p>
                </div>
            </div>
        </header>
    );
}

export default Header;