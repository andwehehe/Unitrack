import { OrderContext } from "../Contexts/OrderContext";
import { PageContext } from "../Contexts/PageContext";
import { useContext } from "react";

function Transactions() {
    const { paidOrderList, setOrderIndex } = useContext(OrderContext); 
    const { currentPage, navigateTo } = useContext(PageContext);

    return (
        <div className={`
            ${currentPage === "Transactions" ? "flex" : "hidden"} flex-col
            bg-login-100 overflow-y-auto h-[calc(100vh-7.5rem)] lg:h-[calc(100vh-4rem)]
            items-center
        `}>
            {paidOrderList.length === 0 ? (
                <div className="flex flex-col h-full items-center justify-center gap-4 p-6 pb-[4rem]">
                    <svg
                        width="80" height="80" viewBox="0 0 24 24" fill="none"
                        stroke="#9ca3af" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"
                    >
                        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
                        <polyline points="14 2 14 8 20 8"/>
                        <line x1="16" y1="13" x2="8" y2="13"/>
                        <line x1="16" y1="17" x2="8" y2="17"/>
                        <line x1="10" y1="9" x2="8" y2="9"/>
                        <circle cx="12" cy="12" r="10" stroke="#d1d5db"/>
                        <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" stroke="#d1d5db"/>
                    </svg>

                    <div className="flex flex-col items-center gap-1">
                        <p className="font-semibold text-gray-700 text-lg">No Recent Transactions</p>
                        <p className="text-gray-400 text-sm text-center">
                            You haven't placed any orders yet.
                        </p>
                    </div>

                    <button
                        onClick={() => navigateTo("Uniforms")}
                        className="
                            w-full max-w-[260px] py-2 rounded-lg border-2 border-gray-300 font-semibold
                            text-sm text-gray-500 hover:border-blue-400 hover:text-blue-400 transition
                        "
                    >
                        Start Shopping
                    </button>
                </div>
            ) : (
                <div className="p-6 max-w-[774.25px] w-full">
                    <h1 className="text-2xl font-bold mb-4">My Orders</h1>

                    <div className="flex flex-col gap-3">
                        {paidOrderList.map((order, index) => (
                            <div
                                key={index}
                                className="
                                    bg-white border-2 shadow-md border-gray-200 
                                    rounded-xl p-4 flex flex-col gap-2
                                "
                            >
                                {/* Top Row */}
                                <div className="flex items-center justify-between">
                                    <h2 className="font-semibold text-base">
                                        ORD-2026-{String(index + 1).padStart(4, '0')}
                                    </h2>
                                    <span className={`
                                        text-xs font-medium px-3 py-1 rounded-full
                                        ${order.status === "Ready for Pickup"
                                            ? "bg-green-500 text-white"
                                            : "bg-blue-100 text-blue-600"
                                        }
                                    `}>
                                        {order.status}
                                    </span>
                                </div>

                                {/* Mobile View */}
                                <div className="flex flex-col gap-1 lg:hidden">
                                    {order.indivOrders.map(({ name, selectedSize, quantity, price }, i) => (
                                        <div key={i} className="flex justify-between text-sm text-gray-600">
                                            <span>{name} ({selectedSize}×{quantity})</span>
                                            <span>₱{(price * quantity).toLocaleString()}</span>
                                        </div>
                                    ))}
                                    <div className="flex justify-between text-sm font-semibold border-t border-gray-200 pt-1 mt-1">
                                        <span>Total</span>
                                        <span>
                                            ₱{order.indivOrders.reduce((acc, { price, quantity }) => 
                                                acc + (price * quantity), 0
                                            ).toLocaleString()}
                                        </span>
                                    </div>
                                </div>

                                {/* Desktop Table View */}
                                <table className="hidden lg:table w-full text-sm border-collapse mt-1">
                                    <thead>
                                        <tr className="border-b border-gray-200 text-gray-500 text-left bg-gray-300">
                                            <th className="py-2 font-medium">Uniform</th>
                                            <th className="py-2 font-medium">Size</th>
                                            <th className="py-2 font-medium">Qty</th>
                                            <th className="py-2 font-medium">Price</th>
                                            <th className="py-2 font-medium">Subtotal</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {order.indivOrders.map(({ name, selectedSize, quantity, price }, i) => (
                                            <tr key={i} className="border-b border-gray-100 text-gray-700">
                                                <td className="py-2">{name}</td>
                                                <td className="py-2">{selectedSize}</td>
                                                <td className="py-2">{quantity}</td>
                                                <td className="py-2">₱{price.toLocaleString()}</td>
                                                <td className="py-2">₱{(price * quantity).toLocaleString()}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    <tfoot>
                                        <tr className="border-t-2 border-gray-200">
                                            <td colSpan="4" className="py-2 font-semibold text-right pr-12">Total</td>
                                            <td className="py-2 font-semibold">
                                                ₱{order.indivOrders.reduce((acc, { price, quantity }) => 
                                                    acc + (price * quantity), 0
                                                ).toLocaleString()}
                                            </td>
                                        </tr>
                                    </tfoot>
                                </table>

                                {/* Bottom Row */}
                                <div className="flex items-center justify-between mt-1">
                                    <button 
                                        className="text-blue-500 text-sm underline"
                                        onClick={() => {
                                            setOrderIndex(index);
                                            navigateTo("Receipt");
                                        }}
                                    >
                                        View Receipt
                                    </button>
                                    <span className="text-gray-400 text-sm">{order.date}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Transactions;