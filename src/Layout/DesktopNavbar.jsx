import light_uniform from '../assets/icons/light-uniform.png';
import light_home from '../assets/icons/light-home.png';
import light_user from '../assets/icons/light-user.png';
import light_paper from '../assets/icons/light-paper.png';
import { PageContext } from '../Contexts/PageContext';
import { useContext } from 'react';
import { LoginContext } from '../Contexts/LoginContext';

function DesktopNavbar() {
    
    const { currentPage, navigateTo } = useContext(PageContext);
    const { userType } = useContext(LoginContext);

    const userMenu = [
        { name: "Dashboard", img: light_home },
        { name: "Uniforms", img: light_uniform },
        { name: "Transactions", img: light_paper },
        { name: "Profile", img: light_user },
    ];

    const adminMenu = [
        { name: "Dashboard", img: light_home },
        { name: "Inventory", img: light_uniform },
        { name: "Orders", img: light_paper },
    ];

    const menu = userType === "admin" ? adminMenu : userMenu;
    const prefix = userType === "admin" ? "Admin" : "User";

    return(
        <nav className="w-full lg:block hidden">
            <ul className="flex flex-col items-start justify-center gap-3 w-full">
                {menu.map(({ name, img }) => (
                    <li 
                        key={name}
                        className='
                            text-base text-nav_bg-100 flex items-center justify-start w-full p-2
                            [&:has(input:checked)]:bg-nav_bg-200 cursor-pointer rounded-md
                        '
                        onClick={() => navigateTo(`${prefix}-${name}`)}
                    >
                        <img src={img} alt={name} className='h-6'/>
                        <label className="cursor-pointer">
                            <input
                                type="radio" 
                                name="nav-d" 
                                className="hidden peer" 
                                value={name}
                                checked={currentPage === `${prefix}-${name}`}
                                onChange={() => navigateTo(`${prefix}-${name}`)}
                            />
                            <span className="px-3 py-1 rounded">{name}</span>
                        </label>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default DesktopNavbar