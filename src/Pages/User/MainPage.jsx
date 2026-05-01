import light_logo from '../../assets/images/light-logo.png';
import Uniforms from './Uniforms';
import Cart from './Cart';
import Receipt from './Receipt';
import Transactions from './Transactions';
import Dashboard from './Dashboard';
import Profile from './Profile';
import MobileNavbar from '../../Layout/MobileNavbar';
import DesktopNavbar from '../../Layout/DesktopNavbar';
import Header from '../../Layout/Header';
import AdminDashboard from '../Admin/AdminDashboard';
import AdminInventory from '../Admin/AdminInventory';
import AdminOrders from '../Admin/AdminOrder';
import { PageContext } from '../../Contexts/PageContext';
import { useContext } from 'react';

function MainPage() {

    const { currentPage } = useContext(PageContext);

    return(
        <main className={`
            flex w-full h-full ${currentPage !== "Login" ? "flex" : "hidden"}
        `}>
            {/* side menu */}
            <aside className='
                w-[20rem] bg-side_menu flex flex-col items-center 
                justify-start gap-10 px-4 py-2 h-screen
                lg:flex hidden 
            '>
                <img 
                    src={light_logo} 
                    alt="unitrack logo" 
                    className='w-[13rem] ' 
                />
                <DesktopNavbar />
            </aside>

            <div className='w-full'>
                <Header />
                <Dashboard />
                <Uniforms />
                <Cart />
                <Receipt />
                <Transactions />
                <Profile />
                <AdminDashboard />
                <AdminInventory />
                <AdminOrders />
                <MobileNavbar />
            </div>
        </main>
    );  
}

export default MainPage