import { useState, useContext } from "react";
import { InventoryContext } from "../../Contexts/InventoryContext";
import { PageContext } from "../../Contexts/PageContext";
import { imageMap } from '../../data/imageMap';

function AdminInventory() {

    const { uniforms, updateStock, updatePrice } = useContext(InventoryContext);
    const { currentPage } = useContext(PageContext);
    const [isFilterOpen, setIsFilterOpen] = useState(false);

    const [searchFilter, setSearchFilter] = useState("");
    const [selectedCourse, setSelectedCourse] = useState("All");
    const [editPanel, setEditPanel] = useState(null);
    const [selectedSize, setSelectedSize] = useState("s");
    const [inputValue, setInputValue] = useState(0);

    const courses = [
        "All", "General", 
        "Criminology", "Tourism", 
        "Psychology", "Multimedia Arts", 
        "Hotel Management", "ICT", "SHS"
    ];

    const courseColors = {
        "General":          "bg-gray-100 text-gray-600",
        "Criminology":      "bg-blue-100 text-blue-600",
        "Tourism":          "bg-green-100 text-green-600",
        "Psychology":       "bg-purple-100 text-purple-600",
        "Multimedia Arts":  "bg-pink-100 text-pink-600",
        "Hotel Management": "bg-orange-100 text-orange-600",
        "ICT":              "bg-cyan-100 text-cyan-600",
        "SHS":              "bg-yellow-100 text-yellow-600",
    };

    const filteredUniforms = uniforms.filter(uniform => {
        const matchesCourse = selectedCourse === "All" || uniform.course === selectedCourse;
        const matchesSearch = uniform.name.toLowerCase().includes(searchFilter.toLowerCase());
        return matchesCourse && matchesSearch;
    });

    const openEdit = (uniform, mode) => {
        setEditPanel({ uniform, mode });
        setSelectedSize("s");
        setInputValue(
            mode === "stock"
                ? uniform.sizes["s"].stock
                : uniform.sizes["s"].price
        );
    };

    const handleConfirm = () => {
        if (editPanel.mode === "stock") {
            updateStock(editPanel.uniform.id, selectedSize, inputValue);
        } else {
            updatePrice(editPanel.uniform.id, selectedSize, inputValue);
        }
        setEditPanel(null);
    };

    return (
        <div className={`
            ${currentPage === "Admin-Inventory" ? "flex" : "hidden"} flex-col
            bg-login-100 overflow-y-auto h-[calc(100vh-4rem)] p-6 gap-4
        `}>
            <h1 className="text-2xl font-bold">Inventory Management</h1>

            {/* Mobile Filter */}
            <article className='block lg:hidden'>
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
                        className="
                            bg-transparent focus:outline-none w-full text-sm
                        "
                        onChange={(e) => setSearchFilter(e.target.value)}
                    />
                </label>

                <div className='text-sm'>
                    <p className='text-clr_description mb-2'>Filter (Course): </p>

                    <div className="flex flex-wrap gap-2 justify-center">
                        {courses.map(course => {
                            return(
                                <label
                                    key={course}
                                    className={`
                                        flex items-center gap-2 cursor-pointer 
                                        py-[4px] px-3 rounded-full text-sm border 
                                        transition
                                    ${
                                        selectedCourse === course
                                        ? "bg-blue-500 text-white border-blue-500"
                                        : "bg-login-100 text-black border-gray-200"
                                    }`}
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
                            );
                        })}
                    </div>
                </div>
            </article>

            {/* Search & Filter */}
            <article className='pt-4 flex items-center gap-4 hidden lg:flex'>
            {/* Search */}
            <p className="text-clr_description text-lg hidden lg:block">Search: </p>
            <label className="
                flex items-center gap-2 border-2 py-1 pl-4 rounded-full
                bg-white focus-within:border-blue-400 flex-1 hidden lg:flex
            ">
                
                <svg 
                    width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" 
                    strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                >
                    <circle cx="11" cy="11" r="8"/>
                    <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                </svg>
                <input
                    type="text"
                    placeholder="Search uniforms..."
                    className="bg-transparent focus:outline-none text-sm py-1 w-full"
                    onChange={(e) => setSearchFilter(e.target.value)}
                />
            </label>

            {/* Filter */}
            <div className='text-sm gap-4 flex items-center'>
                <p className="text-clr_description text-lg">Filter:</p>

                <section className="relative flex">
                    <div
                        className="
                            bg-white rounded-lg border-2 py-[4px]
                            px-3 flex justify-between items-center
                            cursor-pointer gap-3
                        "
                        onClick={() => setIsFilterOpen(prev => !prev)}
                    >
                        <span className="w-[135px] text-sm">{selectedCourse}</span>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <polyline points="6 9 12 15 18 9"/>
                        </svg>
                    </div>

                    <div className={`
                        flex flex-col justify-center absolute mt-10 
                        bg-white rounded-lg border-2 overflow-hidden 
                        w-[175px] z-10
                        ${isFilterOpen ? "flex" : "hidden"}
                    `}>
                        {courses.map(course => (
                            <label
                                key={course}
                                className={`
                                    flex items-center gap-2 cursor-pointer 
                                    py-[4px] px-3 text-sm transition
                                    ${selectedCourse === course
                                        ? "bg-blue-500 text-white"
                                        : "bg-white text-black hover:bg-gray-50"
                                    }
                                `}
                            >
                                <input
                                    type="radio"
                                    name="admin-course"
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

            {/* Grid */}
            <div className="grid grid-cols-[repeat(auto-fill,minmax(280px,1fr))] gap-4 pb-6">
                {filteredUniforms.map(uniform => (
                    <div
                        key={uniform.id}
                        className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-[0px_2px_12px_rgba(0,0,0,0.06)]"
                    >
                        {/* Image placeholder */}
                        <div className="relative h-[200px] bg-gray-100 flex items-center justify-center overflow-hidden">
                            <img 
                                src={imageMap[uniform.image]}
                                alt={uniform.name}
                                className='w-full h-[200px] object-cover'
                            />
                            <span className={`
                                absolute top-2 left-2 text-[11px] font-semibold 
                                px-2 py-1 rounded-full ${courseColors[uniform.course] || "bg-gray-100 text-gray-600"}
                            `}>
                                {uniform.course}
                            </span>
                        </div>

                        {/* Content */}
                        <div className="p-3 flex flex-col gap-2">
                            <h3 className="font-bold text-base">{uniform.name}</h3>

                            {/* Sizes */}
                            <div className="grid grid-cols-2 gap-1">
                                {Object.entries(uniform.sizes).map(([size, { price, stock }]) => (
                                    <div
                                        key={size}
                                        className={`
                                            flex justify-between text-xs px-2 py-1 rounded-lg
                                            ${stock <= 5 ? "bg-red-50 text-red-500" : "bg-gray-50 text-gray-600"}
                                        `}
                                    >
                                        <span className="font-semibold uppercase">{size}</span>
                                        <span>₱{price}</span>
                                        <span>{stock} pcs</span>
                                    </div>
                                ))}
                            </div>

                            {/* Buttons */}
                            <div className="grid grid-cols-2 gap-2 mt-1">
                                <button
                                    onClick={() => openEdit(uniform, "stock")}
                                    className="bg-green-500 text-white text-xs py-2 rounded-lg hover:bg-green-600 transition font-medium"
                                >
                                    + Edit Stock
                                </button>
                                <button
                                    onClick={() => openEdit(uniform, "price")}
                                    className="bg-blue-500 text-white text-xs py-2 rounded-lg hover:bg-blue-600 transition font-medium"
                                >
                                    ✏ Edit Price
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Edit Panel Modal */}
            {editPanel && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl p-6 w-full max-w-[360px] flex flex-col gap-4 shadow-xl">

                        {/* Header */}
                        <div className="flex items-center justify-between">
                            <h2 className="font-bold text-base">
                                {editPanel.mode === "stock" ? "Edit Stock" : "Edit Price"} — {editPanel.uniform.name}
                            </h2>
                            <button
                                onClick={() => setEditPanel(null)}
                                className="text-gray-400 hover:text-gray-600 text-xl"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Size Selector */}
                        <div className="flex flex-col gap-1">
                            <label className="text-sm text-gray-500">Select Size</label>
                            <select
                                className="border-2 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-400"
                                value={selectedSize}
                                onChange={(e) => {
                                    setSelectedSize(e.target.value);
                                    setInputValue(
                                        editPanel.mode === "stock"
                                            ? editPanel.uniform.sizes[e.target.value].stock
                                            : editPanel.uniform.sizes[e.target.value].price
                                    );
                                }}
                            >
                                {Object.keys(editPanel.uniform.sizes).map(size => (
                                    <option key={size} value={size}>{size.toUpperCase()}</option>
                                ))}
                            </select>
                        </div>

                        {/* Input */}
                        <div className="flex flex-col gap-1">
                            <label className="text-sm text-gray-500">
                                {editPanel.mode === "stock" ? "Quantity" : "Price (₱)"}
                            </label>
                            <div className="flex items-center border-2 rounded-lg overflow-hidden">
                                <button
                                    onClick={() => setInputValue(prev => Math.max(0, prev - 1))}
                                    className="px-4 py-2 text-lg font-medium hover:bg-gray-100 transition"
                                >
                                    −
                                </button>
                                <input
                                    type="number"
                                    value={inputValue}
                                    onChange={(e) => setInputValue(Number(e.target.value))}
                                    className="flex-1 text-center text-sm font-medium focus:outline-none"
                                />
                                <button
                                    onClick={() => setInputValue(prev => prev + 1)}
                                    className="px-4 py-2 text-lg font-medium hover:bg-gray-100 transition"
                                >
                                    +
                                </button>
                            </div>
                            <p className="text-xs text-gray-400">
                                Current: {editPanel.mode === "stock"
                                    ? `${editPanel.uniform.sizes[selectedSize].stock} pcs`
                                    : `₱${editPanel.uniform.sizes[selectedSize].price}`
                                }
                            </p>
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-2">
                            <button
                                onClick={handleConfirm}
                                className="flex-1 bg-blue-500 text-white py-2 rounded-lg font-medium hover:bg-blue-600 transition"
                            >
                                Confirm
                            </button>
                            <button
                                onClick={() => setEditPanel(null)}
                                className="flex-1 border-2 border-gray-200 py-2 rounded-lg font-medium hover:border-gray-400 transition text-gray-500"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminInventory;