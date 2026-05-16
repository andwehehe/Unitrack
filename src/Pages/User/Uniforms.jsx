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
                grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4 pb-6 place-items-center my-4
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