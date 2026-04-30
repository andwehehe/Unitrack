import light_uniform from '../assets/icons/light-uniform.png';
import light_home from '../assets/icons/light-home.png';
import light_user from '../assets/icons/light-user.png';
import light_paper from '../assets/icons/light-paper.png';
import { PageContext } from '../Contexts/PageContext';
import { useContext } from 'react';

function DesktopNavbar() {

    const { currentPage, navigateTo } = useContext(PageContext);

    const menu = [
        {
            name: "Dashboard",
            img: light_home,
        },
        {
            name: "Uniforms",
            img: light_uniform,
        },
        {
            name: "Transactions",
            img: light_paper,
        },
        {
            name: "Profile",
            img: light_user,
        },
    ];

    return(
        <nav className="w-full lg:block hidde">
            <ul className="flex flex-col items-start justify-center gap-3 w-full">
                {
                    menu.map(nav => {
                        const { name, img } = nav;
                        return(
                            <li 
                                key={name}
                                className='
                                    text-base text-nav_bg-100 flex items-center justify-start w-full p-2
                                    [&:has(input:checked)]:bg-nav_bg-200 cursor-pointer rounded-md
                                '
                                onClick={() => navigateTo(name)}
                            >
                                <img src={img} alt={name} className='h-6'/>
                                <label className="cursor-pointer">
                                    <input
                                        type="radio" 
                                        name="nav-d" 
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

export default DesktopNavbar