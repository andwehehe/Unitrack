import { useState } from "react";
import arrow_down from "../assets/icons/down-arrow.png";

function ItemFilter({ selectedCourse, setSelectedCourse, setSearchFilter }) {

    const courses = [
        "All",
        "Criminology",
        "Tourism",
        "Psychology",
        "Multimedia Arts",
        "Hotel Management",
        "ICT",
        "General",
        "SHS",
    ];

    const [ isFilterOpen, setIsFilterOpen ] = useState(false);

    return(
        <>  
            {/* Mobile Filter */}
            <article className='px-4 block lg:hidden'>
                <label className="
                    flex items-center gap-2 w-full border-2 py-1 pl-4 my-2 rounded-full
                    bg-login-100 focus-within:border-button_primary
                ">
                    <svg
                        width="16" height="16" viewBox="0 0 24 24" fill="none"
                        stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" 
                        strokeLinejoin="round"
                    >
                        <circle cx="11" cy="11" r="8"/>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                    </svg>
                    <input
                        type="text"
                        placeholder="Search uniforms..."
                        className="bg-transparent focus:outline-none w-full text-sm"
                        onChange={(e) => setSearchFilter(e.target.value)}
                    />
                </label>

                <div className='text-sm'>
                    <p className='text-clr_description mb-2'>Filter (Course): </p>
                    <div className="flex flex-wrap gap-2 justify-center">
                        {courses.map(course => (
                            <label
                                key={course}
                                className={`
                                    flex items-center gap-2 cursor-pointer 
                                    py-[4px] px-3 rounded-full text-sm border transition
                                    ${selectedCourse === course
                                        ? "bg-blue-500 text-white border-blue-500"
                                        : "bg-login-100 text-black border-gray-200"
                                    }
                                `}
                            >
                                <input
                                    type="radio"
                                    name="course"
                                    value={course}
                                    checked={selectedCourse === course}
                                    onChange={() => setSelectedCourse(course)}
                                    className="hidden"
                                />
                                {course}
                            </label>
                        ))}
                    </div>
                </div>
            </article>

            {/* Desktop Filter */}
            <article className='px-4 pl-4 pt-6 hidden lg:flex'>
                <div className="flex items-center gap-4">
                    <p className="text-lg text-clr_description">Search: </p>
                    <label className="
                        flex items-center gap-2 w-full border-2 py-1 pl-4 my-2 rounded-full
                        bg-login-100 focus-within:border-button_primary
                    ">
                        <svg
                            width="16" height="16" viewBox="0 0 24 24" fill="none"
                            stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" 
                            strokeLinejoin="round"
                        >
                            <circle cx="11" cy="11" r="8"/>
                            <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                        </svg>
                        <input
                            type="text"
                            placeholder="Search uniforms..."
                            className="bg-transparent focus:outline-none w-[30rem] text-sm"
                            onChange={(e) => setSearchFilter(e.target.value)}
                        />
                    </label>
                </div>

                <div className='text-sm mx-4 gap-4 flex items-center'>
                    <p className="text-clr_description text-lg">Filter:</p>
                    
                    <section className="relative w-full flex">
                        <div
                            className="
                                bg-login-100 rounded-lg border-2 w-full py-[4px]
                                px-3 flex justify-between items-center cursor-pointer
                            "
                            onClick={() => setIsFilterOpen(prev => !prev)}
                        >
                            <span className="w-[135px]">{selectedCourse}</span>
                            <img src={arrow_down} alt="arrow down" className="w-3" />
                        </div>
                        
                        <div className={`
                            flex flex-col justify-center absolute mt-10 
                            bg-login-100 rounded-lg border-2 overflow-hidden 
                            w-[175px] z-[999]
                            ${ isFilterOpen ? "flex" : "hidden" }
                        `}>
                            {courses.map(course => (
                                <label
                                    key={course}
                                    className={`
                                        flex items-center gap-2 cursor-pointer 
                                        py-[4px] px-3 text-sm transition
                                        ${selectedCourse === course
                                            ? "bg-blue-500 text-white border-blue-500"
                                            : "bg-login-100 text-black border-gray-200"
                                        }
                                    `}
                                >
                                    <input
                                        type="radio"
                                        name="course"
                                        value={course}
                                        checked={selectedCourse === course}
                                        onChange={() => {
                                            setSelectedCourse(course);
                                            setIsFilterOpen(false);
                                        }}
                                        className="hidden"
                                    />
                                    {course}
                                </label>
                            ))}
                        </div>
                    </section>
                </div>
            </article>
        </>
    );
}

export default ItemFilter;