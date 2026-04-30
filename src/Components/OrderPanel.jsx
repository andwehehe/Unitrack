import { useState, useContext } from "react";
import { OrderContext } from "../Contexts/OrderContext";

function OrderPanel({ openOrder, setOpenOrder, uniform }) {

    const { name, sizes } = uniform;
    const { s, m, l, xl } = sizes;
    const { addToCart } = useContext(OrderContext)

    const sizesOption = ["S", "M", "L", "XL"];
    const [ selectedSize, setSelectedSize ] = useState(null);
    const [ price, setPrice ] = useState(0);
    const [ stock, setStock ] = useState(0);
    const [ quantity, setQuantity ] = useState(1);

    const handleSizeSelection = (size) => {
        setSelectedSize(size);
        if(size === "S") {
            setPrice(s.price);
            setStock(s.stock);
        }

        if(size === "M") {
            setPrice(m.price);
            setStock(m.stock);
        }

        if(size === "L") {
            setPrice(l.price);
            setStock(l.stock);
        }

        if(size === "XL") {
            setPrice(xl.price);
            setStock(xl.stock);
        }
    };

    const handleAddToCart = () => {
        addToCart({ name, selectedSize, price, quantity });
        setOpenOrder(prev => !prev);
        setQuantity(1);
        setSelectedSize("");
    };

    const handleCancel = () => {
        setOpenOrder(prev => !prev);
        setSelectedSize("");
        setQuantity(1);
        setPrice(0);
        setStock(0);
    };

    return(
        <section className={`
            bg-black/70 absolute top-[0] left-[0] h-screen w-full z-10
            flex items-center justify-center ${openOrder ? "flex" : "hidden"} 
        `}>
            <article className="
                bg-login-100 m-10 px-4 py-2 w-full rounded-lg max-w-[30rem]
                flex flex-col items-center border-2 border-crl_description
            ">
                <div className="h-1 w-12 bg-clr_description rounded-full"></div>
                <h2 className="
                    w-full text-lg font-bold py-2 border-b-2
                    border-clr_description
                ">
                    Order &#8212; {name}
                </h2>

                {/* Order Details */}
                <div className="w-full">
                    <p className="text-lg font-semibold py-2">
                        Select Size
                    </p>

                    <div className="flex gap-2">
                        {sizesOption.map(size => (
                            <label
                                key={size}
                                className={`
                                    cursor-pointer border-2 rounded-lg px-3 py-1 text-sm font-medium transition
                                    ${selectedSize === size
                                        ? "bg-blue-500 text-white border-blue-500"
                                        : "bg-white text-black border-gray-300 hover:border-blue-400"
                                    }
                                `}
                            >
                                <input
                                    type="radio"
                                    name="size"
                                    value={size}
                                    checked={selectedSize === size}
                                    onChange={() => handleSizeSelection(size)}
                                    className="hidden"
                                />
                                {size}
                            </label>
                        ))}
                    </div>

                    <div className="flex py-2">
                        <p className="border-r-2 pr-4 mr-4">Price: ₱{price}</p>
                        <p>Available: {stock} pcs</p>
                    </div>
                </div>

                {/* Quantity */}
                <div className="flex items-center justify-between gap-3 w-full py-4">
                    <p className="text-md text-clr_description">Quantity:</p>
                    <div className="flex items-center border-2 rounded-lg overflow-hidden">
                        <button
                            onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                            className="px-3 text-lg font-medium hover:bg-gray-100 transition"
                        >
                            −
                        </button>

                        <span className="px-4 py-1 text-sm font-medium border-x-2">
                            {quantity}
                        </span>

                        <button
                            onClick={() => setQuantity(prev => prev + 1)}
                            className="px-3 text-lg font-medium hover:bg-gray-100 transition"
                        >
                            +
                        </button>
                    </div>
                </div>

                {/* Buttons */}
                <div className="flex flex-col gap-2 w-full">
                    <button
                        onClick={() => handleAddToCart()}
                        className={`
                            flex-1 py-2 rounded-lg text-sm font-medium transition
                            ${selectedSize
                                ? "bg-blue-500 text-white hover:bg-blue-600"
                                : "bg-gray-200 text-gray-400 cursor-not-allowed"
                            }
                        `}
                        disabled={!selectedSize}
                    >
                        Add to Cart
                    </button>

                    <button
                        onClick={() => handleCancel()}
                        className="
                            flex-1 py-2 rounded-lg text-sm font-medium border-2 border-gray-300
                            hover:border-red-400 hover:text-red-400 transition
                        "
                    >
                        Cancel
                    </button>
                </div>
            </article>
        </section>
    );
}

export default OrderPanel