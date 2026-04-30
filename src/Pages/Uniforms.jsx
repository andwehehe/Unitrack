import UserItem from '../Components/UserItem';
import uniforms from '../data/uniforms.json';
import ItemFilter from '../Layout/ItemFilter';
import { useState, useContext } from 'react';
import { PageContext } from '../Contexts/PageContext';
import pe_shirt from '../assets/images/pe-shirt.png';
import pe_pants from '../assets/images/pe-pants.png';
import crim_polo from '../assets/images/crim-polo.jpg';
import crim_blouse from '../assets/images/crim-blouse.jpg';
import crim_pants from '../assets/images/crim-pants.jpg';
import crim_skirt from '../assets/images/crim-skirt.jpg';
import tourism_blouse from '../assets/images/tourism-blouse.jpg';
import tourism_polo from '../assets/images/tourism-polo.jpg';
import tourism_pants from '../assets/images/tourism-pants.jpg';
import tourism_skirt from '../assets/images/tourism-skirt.jpg';
import ict_polo from '../assets/images/ict-polo.jpg';
import ict_blouse from '../assets/images/ict-blouse.jpg';
import ict_pants from '../assets/images/ict-pants.jpg';
import ict_skirt from '../assets/images/ict-skirt.jpg';
import shs_polo from '../assets/images/shs-polo.jpg';
import shs_blouse from '../assets/images/shs-blouse.jpg';
import shs_pants from '../assets/images/shs-pants.jpg';
import shs_skirt from '../assets/images/shs-skirt.jpg';
import psych_blouse from '../assets/images/phsych-blouse.jpg';
import psych_pants from '../assets/images/phsych-pants.jpg';
import psych_polo from '../assets/images/phsych-polo.jpg';
import psych_skirt from '../assets/images/phsych-skirt.jpeg';
import lab_gown from '../assets/images/lab-gown.jpg';
import bamma_blouse from '../assets/images/bamma-blouse.jpg';
import bamma_pants from '../assets/images/bamma-pants.jpg';
import bamma_polo from '../assets/images/bamma-polo.jpg';
import bamma_skirt from '../assets/images/bamma-skirt.jpg';
import hm_blouse from '../assets/images/hm-blouse.jpg';
import hm_pants from '../assets/images/hm-pants.jpg';
import hm_polo from '../assets/images/hm-polo.jpg';
import hm_skirt from '../assets/images/hm-skirt.jpg';

function Uniforms() {

    const { currentPage } = useContext(PageContext);
    const [ selectedCourse, setSelectedCourse ] = useState("All");
    const [ searchFilter, setSearchFilter ] = useState("");

        const imageMap = {
            ict_polo,
            ict_blouse,
            ict_pants,
            ict_skirt,

            crim_polo,
            crim_blouse,
            crim_pants,
            crim_skirt,

            tourism_polo,
            tourism_blouse,
            tourism_pants,
            tourism_skirt,

            psych_polo,
            psych_blouse,
            psych_pants,
            psych_skirt,

            bamma_polo,
            bamma_blouse,
            bamma_pants,
            bamma_skirt,

            shs_polo,
            shs_blouse,
            shs_pants,
            shs_skirt,

            hm_polo,
            hm_blouse,  
            hm_pants,
            hm_skirt,

            pe_shirt,
            pe_pants,
            lab_gown
        };

    return(
         
        <div className={`
            bg-login-100 lg:pl-[4rem] overflow-y-auto  
            lg:h-[calc(100vh-4rem)] h-[calc(100vh-7rem)] 
            ${currentPage === "Uniforms" ? "block" : "hidden"}
        `}>
            {/* Filter/Search */}
            <ItemFilter 
                selectedCourse={selectedCourse}
                setSelectedCourse={setSelectedCourse}
                setSearchFilter={setSearchFilter}
            />

            {/* Items */}
            <div className='
                lg:pr-8 lg: my-4 md:pb-[10rem] lg:pb-12 grid grid-cols-[repeat(auto-fit,minmax(343px,1fr))] 
                place-items-center place-items-top lg:place-items-center gap-4
                [@media(max-width:360px)]:grid-cols-[repeat(auto-fit,minmax(200px,1fr))] 
            '>
                {
                    uniforms.filter(item => {
                        const matchesCourse = selectedCourse === "All" || item.course === selectedCourse;
                        const matchesSearch = item.name.toLowerCase().includes(searchFilter.toLowerCase());
                        return matchesCourse && matchesSearch;
                    }).map((uniform) => (
                        <UserItem 
                            uniform={uniform}  
                            imageMap={imageMap[uniform.image]}
                            key={uniform.name} 
                        />
                    ))
                }
            </div>
        </div>
    );
}

export default Uniforms