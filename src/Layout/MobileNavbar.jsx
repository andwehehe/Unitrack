import user from '../assets/icons/user.png';
import receipt from '../assets/icons/receipt.png';
import uniform from '../assets/icons/uniform.png'
import home from '../assets/icons/home.png';
import { PageContext } from '../Contexts/PageContext';
import { useContext } from 'react';

function MobileNavbar() {

    const { currentPage, navigateTo } = useContext(PageContext);

    const menu = [
        {
            name: "Dashboard",
            img: home,
        },
        {
            name: "Uniforms",
            img: uniform,
        },
        {
            name: "Transactions",
            img: receipt,
        },
        {
            name: "Profile",
            img: user,
        },
    ];

    return(
        <nav className='lg:hidden block'>
            <ul className="
                fixed z-0 bottom-0 flex gap-3 items-center 
                justify-center px-4 border-t-2 bg-login-50 w-full
            ">
                {
                    menu.map(nav => {
                        const { name, img } = nav;
                        return(
                            <li 
                                key={name}
                                className='
                                    text-xs text-clr_description flex flex-col items-center 
                                    justify-center w-full py-2
                                    [&:has(input:checked)]:bg-nav_bg-100 cursor-pointer
                                '
                                onClick={() => navigateTo(name)}
                            >
                                <img src={img} alt={name} className='h-6'/>
                                <label className="cursor-pointer">
                                    <input
                                        type="radio" 
                                        name="nav-m" 
                                        className="hidden peer" 
                                        value={name}
                                        checked={currentPage === name}
                                        onChange={() => navigateTo(name)}
                                    />
                                    <span className="px-3 py-1 rounded ">
                                        {name}
                                    </span>
                                </label>
                            </li>
                        );
                    })
                }
            </ul>
        </nav>
    );
}

export default MobileNavbar