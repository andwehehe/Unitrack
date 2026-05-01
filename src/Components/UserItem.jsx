import OrderPanel from './OrderPanel';
import { useState } from 'react';

function UserItem({ uniform, imageMap }) {

    const { name, course, sizes } = uniform;
    const { s, m, l, xl } = sizes;
    const [ openOrder, setOpenOrder ] = useState(false);

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

    const sizeData = [
        { label: "S",  price: s.price,  stock: s.stock  },
        { label: "M",  price: m.price,  stock: m.stock  },
        { label: "L",  price: l.price,  stock: l.stock  },
        { label: "XL", price: xl.price, stock: xl.stock },
    ];

    return(
        <>
            <article className='
                w-full bg-white rounded-xl border border-gray-200 
                flex flex-col max-w-[343px] overflow-hidden
                shadow-[0px_2px_12px_rgba(0,0,0,0.06)]
                hover:shadow-[0px_4px_20px_rgba(0,0,0,0.1)] transition
            '>
                {/* Image */}
                <div className="relative">
                    <img 
                        src={imageMap} 
                        alt="uniform image" 
                        className='w-full h-[200px] object-cover'
                    />
                    {/* Course Badge */}
                    <span className={`
                        absolute top-2 left-2 text-[11px] font-semibold 
                        px-2 py-1 rounded-full ${courseColors[course] || "bg-gray-100 text-gray-600"}
                    `}>
                        {course}
                    </span>
                </div>

                {/* Content */}
                <div className="p-3 flex flex-col gap-3">
                    {/* Name */}
                    <h3 className='text-base font-bold text-gray-800'>{name}</h3>

                    {/* Sizes */}
                    <div className="grid grid-cols-2 gap-1">
                        {sizeData.map(({ label, price, stock }) => (
                            <div 
                                key={label} 
                                className={`
                                    flex justify-between items-center text-xs 
                                    px-2 py-1 rounded-lg
                                    ${stock <= 5 
                                        ? "bg-red-50 text-red-500" 
                                        : "bg-gray-50 text-gray-600"
                                    }
                                `}
                            >
                                <span className="font-semibold">{label}</span>
                                <span>₱{price}</span>
                                <span className={stock <= 5 ? "text-red-400" : "text-gray-400"}>
                                    {stock} left
                                </span>
                            </div>
                        ))}
                    </div>

                    {/* Order Button */}
                    <button
                        className="
                            w-full bg-blue-500 text-white py-2 rounded-lg
                            hover:bg-blue-600 transition font-semibold text-sm
                        "
                        onClick={() => setOpenOrder(prev => !prev)}
                    >
                        Order
                    </button>
                </div>
            </article>
            
            <OrderPanel 
                openOrder={openOrder} 
                setOpenOrder={setOpenOrder} 
                uniform={uniform} 
            />
        </>
    );
}

export default UserItem;