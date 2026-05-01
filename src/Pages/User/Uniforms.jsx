import UserItem from '../../Components/UserItem';
import ItemFilter from '../../Layout/ItemFilter';
import { useState, useContext } from 'react';
import { PageContext } from '../../Contexts/PageContext';
import { InventoryContext } from '../../Contexts/InventoryContext';
import { imageMap } from '../../data/imageMap';

function Uniforms() {

    const { uniforms } = useContext(InventoryContext);
    const { currentPage } = useContext(PageContext);
    const [ selectedCourse, setSelectedCourse ] = useState("All");
    const [ searchFilter, setSearchFilter ] = useState("");

    return(
         
        <div className={`
            bg-login-100 lg:pl-[4rem] overflow-y-auto  
            lg:h-[calc(100vh-4rem)] h-[calc(100vh-7rem)] 
            ${currentPage === "User-Uniforms" ? "block" : "hidden"}
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