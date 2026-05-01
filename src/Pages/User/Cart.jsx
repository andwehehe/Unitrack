import gcash from '../../assets/icons/gcash.png';
import paymaya from '../../assets/icons/paymaya.png';
import paypal from '../../assets/icons/paypal.svg';
import cc from '../../assets/icons/cc.png';
import empty from '../../assets/icons/empty-cart.png';
import { OrderContext } from '../../Contexts/OrderContext';
import { PageContext } from '../../Contexts/PageContext';
import { useContext } from 'react';

function Cart() {

    const paymentMethods = [
        { id: "gcash", label: "GCash", src: gcash, width: "w-6" },
        { id: "paymaya", label: "PayMaya", src: paymaya, width: "w-6" },
        { id: "paypal", label: "PayPal", src: paypal, width: "w-4" },
        { id: "cc", label: "Credit/Debit Card", src: cc, width: "w-5" },
    ];
    
    const { orderList, setOrderList, addToPaid, selectedPayment, setSelectedPayment } = useContext(OrderContext);
    const { currentPage, navigateTo } = useContext(PageContext);
    const totalItems = orderList.reduce((acc, item) => acc + item.quantity, 0);
    const totalPrice = orderList.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    const removeItem = (index) => {
        setOrderList(prev => prev.filter((_, i) => i !== index));
    };

    const handlePlaceOrder = () => {
        navigateTo("User-Receipt");
        addToPaid();
        setOrderList([]);
        setSelectedPayment(null);
    }

    return(
        <>
            {/* Non-empty Cart */}
            <section className={`
                h-screen w-full px-6 py-4 bg-login-100 flex 
                flex-col items-center justify-start gap-3 
                ${currentPage === "User-Cart" ? "flex" : "hidden"}
                ${orderList.length > 0 ? "flex" : "hidden"}
                overflow-y-auto pb-[10rem] 
            `}>
                <h1 className="text-2xl font-bold text-left w-full max-w-[425.6px]">
                    My Cart
                </h1>
                
                <article className="w-full flex flex-col gap-3 max-w-[425.6px]">  
                    {orderList.map(({ name, selectedSize, price, quantity }, index) => {
                        return(
                            <div key={index} className="
                                bg-login-50 border-2 rounded-lg p-3 
                                flex items-center justify-between"
                            >
                                <div className="flex flex-col items-start text-xs gap-1 w-full">
                                    <h2  className="text-[16px] font-bold">{name}</h2>
                                    <div className="flex items-center justify-center gap-1  leading-4">
                                        <p>Qtty: {quantity}</p>
                                        <p className="border-x-2 border-clr_description px-1">Size: {selectedSize}</p>
                                        <p>₱{price.toLocaleString()}</p>
                                    </div>
                                </div>

                                <div className="flex flex-col items-start text-xs gap-1">
                                    <p className="text-[16px] font-bold text-button_primary w-full text-right">
                                        ₱{(price * quantity).toLocaleString( )}
                                    </p>
                                    <button 
                                        className="text-red-500 underline text-right w-full"
                                        onClick={() => removeItem(index)}   
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        );
                    })}
                </article>

                <article className="w-full flex flex-col bg-login-50 border-2 rounded-lg p-3 max-w-[425.6px]">
                    <div className="pb-2 mb-2 border-b border-clr_description">
                        <h3 className="font-semibold text-sm">
                            Order Total
                        </h3>
                        <p className="text-clr_description text-xs">
                            Total Items: {totalItems} pcs
                        </p>
                        <p className="text-xl font-bold">
                            Total: ₱{totalPrice.toLocaleString()}
                        </p>
                    </div>

                    <p className="text-sm font-semibold mb-2">Payment Method</p>

                    <div className='grid grid-cols-2 gap-1'>
                        {paymentMethods.map(method => (
                            <label
                                key={method.id}
                                className={`
                                    flex items-center gap-1 cursor-pointer border-2 rounded-lg 
                                    px-3 py-2 transition h-[40px]
                                    ${selectedPayment === method.label
                                        ? "border-blue-500 bg-blue-50"
                                        : "border-gray-200 hover:border-blue-300"
                                    }
                                `}
                            >
                                <input
                                    type="radio"
                                    name="payment"
                                    value={method.label}
                                    checked={selectedPayment === method.label}
                                    onChange={() => setSelectedPayment(method.label)}
                                    className="hidden"
                                />
                                <img 
                                    src={method.src} 
                                    alt={method.label} 
                                    className={method.width}
                                />
                                <p className="text-xs font-medium pb-[2px]">{method.label}</p>
                            </label>
                        ))}
                    </div>
                </article>

                <div className="flex flex-col gap-2 w-full max-w-[425.6px]">
                    <button
                        onClick={() => handlePlaceOrder()}
                        className={`
                            flex-1 py-2 rounded-lg text-sm font-medium transition
                            ${selectedPayment
                                ? "bg-blue-500 text-white hover:bg-blue-600"
                                : "bg-gray-200 text-gray-400 cursor-not-allowed"
                            }
                        `}
                        disabled={!selectedPayment}
                    >
                        Place Order
                    </button>

                    <button
                        onClick={() => navigateTo("User-Uniforms")}
                        className="
                            py-2 rounded-lg text-sm font-medium border-2 border-gray-300
                            hover:border-blue-400 hover:text-blue-400 transition 
                            text-clr_description w-full h-[36px] flex justify-center items-center
                        "
                    >
                        Continue Shopping
                    </button>
                </div>
            </section>

            {/* Empty Cart */}
            <div className={`
                flex flex-col w-full h-[calc(100vh-10rem)] justify-center items-center 
                p-12 overflow-y-scroll ${currentPage === "User-Cart" ? "flex" : "hidden"}
                ${orderList.length <= 0 ? "block" : "hidden"} bg-login-100 h-screen
                pb-[10rem]
            `}>
                <img 
                    src={empty} 
                    alt="empty cart" 
                    className='w-24'
                />

                <div className="flex flex-col items-center gap-1 m-3">
                    <p className="font-semibold text-gray-700 text-lg">Your Cart is Empty :(</p>
                    <p className="text-gray-400 text-sm text-center">
                        You haven't placed any orders yet.
                    </p>
                </div>

                <button
                    onClick={() => navigateTo("User-Uniforms")}
                    className="
                        py-2 rounded-lg text-sm font-medium border-2 border-gray-300
                        hover:border-blue-400 hover:text-blue-400 transition 
                        text-clr_description w-full max-w-[220px]
                    "
                >
                    Start Shopping
                </button>
            </div>
        </>
    );
}

export default Cart