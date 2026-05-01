import { OrderContext } from "../../Contexts/OrderContext";
import { PageContext } from "../../Contexts/PageContext";
import { useContext } from "react";
import left_arrow from '../../assets/icons/left-arrow.png';

function Receipt() {

    const { paidOrderList, orderIndex } = useContext(OrderContext);
    const { currentPage, navigateTo, previousPage } = useContext(PageContext);

    const currentOrder = paidOrderList[orderIndex]; //problem indexing

    const totalPrice = currentOrder?.indivOrders.reduce((acc, { price, quantity }) => {
        return acc + (price * quantity);
    }, 0);

    return (
        <div 
            className={`
                p-8 bg-login-100 rounded-xl md:h-[calc(100vh-4rem)] h-[calc(100vh-7rem)]
                ${currentPage === "User-Receipt" ? "flex" : "hidden"} overflow-y-auto
                items-start justify-center 
            `}
        >
            <div className="
                bg-white rounded-xl border-2 border-gray-200 p-6 w-full 
                max-w-[360px] flex flex-col items-center gap-4 relative
                shadow-xl" 
            >
                <img 
                    src={left_arrow} 
                    alt="back" 
                    className="w-5 absolute left-2 top-3 cursor-pointer"
                    onClick={() => navigateTo(previousPage)}
                />
                
                {/* Header */}
                <div className="flex flex-col items-center gap-2">
                    <svg 
                        width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#3b82f6"
                        strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                    >
                        <path d="
                            M20.38 3.46L16 2a4 4 0 01-8 0L3.62 3.46a2 2 0 00-1.34 2.23l.58 3.57a1 1 0 
                            00.99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 002-2V10h2.15a1 1 0 00.99-.84l.58-3.57a2 
                            2 0 00-1.34-2.23z"
                        />
                    </svg>
                    <p className="text-lg font-semibold">Unitrack — Order Receipt</p>
                    <span className="bg-blue-100 text-blue-600 text-xs font-medium px-4 py-1 rounded-full">
                        ORD-2026-{String(orderIndex + 1).padStart(4, '0')}
                    </span>
                </div>

                {/* Student & Date */}
                <div className="w-full border-y border-gray-200 py-3 flex flex-col gap-2">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Student</span>
                        <span>Andrei Gobres</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500">ID</span>
                        <span>02000389265</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Date</span>
                        <span>{currentOrder?.date}</span>
                    </div>
                </div>

                {/* Items */} 
                {currentOrder?.indivOrders.map(({ name, selectedSize, price, quantity }, index) => (
                    <div 
                        key={index}
                        className="w-full border-gray-200 flex flex-col gap-2"
                    >
                        <div className="flex justify-between text-sm">
                            <span>{name} {selectedSize}×{quantity}</span>
                            <span>₱{(price * quantity).toLocaleString()}</span>
                        </div>
                    </div>
                ))}

                {/* Total */}
                <div className="w-full border-y border-gray-200 py-3 flex flex-col gap-2">
                    <div className="flex justify-between text-sm font-semibold">
                        <span>Total</span>
                        <span>₱{totalPrice?.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500">Payment</span>
                        <span>{currentOrder?.payment}</span>
                    </div>
                </div>

                {/* Status */}
                <span className={`text-xs font-medium px-5 py-1 rounded-full ${
                    currentOrder?.status === "Ready for Pickup"
                        ? "bg-green-500 text-white"
                        : "bg-blue-100 text-blue-600"
                }`}>
                    {currentOrder?.status}
                </span>

                <p className="text-xs text-gray-400">Thank you for your order!</p>
            </div>
        </div>
    );
}

export default Receipt;