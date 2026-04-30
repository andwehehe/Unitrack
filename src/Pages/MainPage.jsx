import light_logo from '../assets/images/light-logo.png';
import Uniforms from './Uniforms';
import Cart from './Cart';
import MobileNavbar from '../Layout/MobileNavbar';
import DesktopNavbar from '../Layout/DesktopNavbar';
import Header from '../Layout/Header';
import Receipt from './Receipt';
import Transactions from './Transactions';
import Dashboard from './Dashboard';

function MainPage() {

    return(
        <main className='flex w-full h-full'>
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
                <MobileNavbar />
            </div>
        </main>
    );  
}

export default MainPage