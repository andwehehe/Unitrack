import { useContext } from "react";
import { OrderContext } from "../../Contexts/OrderContext";
import { PageContext } from "../../Contexts/PageContext";
import { InventoryContext } from "../../Contexts/InventoryContext";

function Dashboard() {

    const { paidOrderList, orderList } = useContext(OrderContext);
    const { currentPage, navigateTo } = useContext(PageContext);
    const { uniforms } = useContext(InventoryContext);

    const totalCartPrice = orderList.reduce((acc, item) => acc + (item.price * item.quantity), 0);
    const activeOrders = paidOrderList.filter(order => order.status === "Ready for Pickup").length;
    const recentOrders = paidOrderList.slice(-6).reverse();

    const lowStockItems = uniforms.filter(uniform => 
        (uniform.course === "ICT" || uniform.course === "General") &&
        Object.values(uniform.sizes).some(size => size.stock <= 5)
    );

    const stats = [
        {
            icon: (
                <svg 
                    width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" 
                    strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                >
                    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                    <line x1="3" y1="6" x2="21" y2="6"/>
                    <path d="M16 10a4 4 0 01-8 0"/>
                </svg>
            ),
            label: "Active Orders",
            value: activeOrders,
            sub: "Ready for Pickup",
            subColor: "text-green-500"
        },
        {
            icon: (
                <svg 
                    width="50" height="50" viewBox="0 0 24 24" fill="none" 
                    stroke="#3b82f6" strokeWidth="1.5" strokeLinecap="round" 
                    strokeLinejoin="round"
                >
                    <rect x="5" y="2" width="14" height="20" rx="2"/>
                    <line x1="9" y1="7" x2="15" y2="7"/>
                    <line x1="9" y1="11" x2="15" y2="11"/>
                    <line x1="9" y1="15" x2="13" y2="15"/>
                </svg>
            ),
            label: "Total Orders",
            value: paidOrderList.length,
            sub: "All time",
            subColor: "text-gray-400"
        },
        {
            icon: (
                <svg 
                    width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" 
                    strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                >
                    <circle cx="9" cy="21" r="1"/>
                    <circle cx="20" cy="21" r="1"/>
                    <path d="M1 1h4l2.68 13.39a2 2 0 002 1.61h9.72a2 2 0 002-1.61L23 6H6"/>
                </svg>
            ),
            label: "Items in Cart",
            value: orderList.length,
            sub: `₱${totalCartPrice.toLocaleString()} total`,
            subColor: "text-blue-500"
        },
    ];

    return (
        <div className={`
            ${currentPage === "User-Dashboard" ? "flex" : "hidden"} flex-col
            bg-login-100 overflow-y-auto h-[calc(100vh-7.5rem)] 
            lg:h-[calc(100vh-4rem)] p-6 gap-6
        `}>
            {/* Welcome */}
            <div>
                <h1 className="text-2xl font-bold">Welcome back, Andrei!</h1>
                <p className="text-gray-400 text-sm">Here's your order summary</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-3">
                {stats.map((stat, index) => (
                    <div key={index} className="
                        bg-white border-2 border-gray-200 rounded-xl 
                        p-3 lg:p-4 flex flex-col lg:flex-row lg:items-center lg:gap-4
                    ">
                        <div className="
                            hidden lg:flex items-center justify-center 
                            bg-blue-50 rounded-xl p-3
                        ">
                            {stat.icon}
                        </div>
                        <div className="flex flex-col gap-1 lg:items-start items-center">
                            <p className="text-xl lg:text-3xl font-bold">{stat.value}</p>
                            <p className="text-black-500 text-[12px] lg:text-sm font-semibold">{stat.label}</p>
                            <p className={`text-[9px] lg:text-xs font-semibold ${stat.subColor}`}>{stat.sub}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Bottom Section */}
            <div className="flex flex-col lg:flex-row gap-4">

                {/* Recent Orders */}
                <div className="
                    bg-white border-2 border-gray-200 rounded-xl 
                    p-4 flex flex-col gap-3 flex-1 overflow-y-auto
                ">
                    <div className="flex items-center justify-between">
                        <h2 className="font-semibold text-base">Recent Orders</h2>
                        <button 
                            onClick={() => navigateTo("User-Transactions")}
                            className="text-blue-500 text-sm"
                        >
                            View All
                        </button>
                    </div>

                    {recentOrders.length === 0 ? (
                        <p className="text-gray-400 text-sm lg:text-md lg:text-center lg:pt-[6.5rem]">No orders yet.</p>
                    ) : (
                        recentOrders.map((order, index) => (
                            <div key={index} className="
                                flex flex-col gap-1 border-b-2 border-gray-200 
                                pb-2 last:border-0 last:pb-0
                            ">
                                {/* Mobile */}
                                <div className="flex flex-col gap-1 lg:hidden">
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm font-medium">
                                            ORD-2026-{String(paidOrderList.length - index).padStart(4, '0')}
                                        </p>
                                        <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                                            order.status === "Ready for Pickup"
                                                ? "bg-green-500 text-white"
                                                : "bg-blue-100 text-blue-600"
                                        }`}>
                                            {order.status}
                                        </span>
                                    </div>
                                    <span className="text-gray-400 text-xs">{order.date}</span>
                                </div>

                                {/* Desktop */}
                                <div className="hidden lg:flex items-center justify-between gap-4">
                                    <p className="text-sm font-medium w-[120px]">
                                        ORD-2026-{String(paidOrderList.length - index).padStart(4, '0')}
                                    </p>
                                    <p className="text-sm text-gray-600 flex-1">
                                        {order.indivOrders.map(({ name, selectedSize, quantity }) => (
                                            `${name} ${selectedSize}×${quantity}`)
                                        ).join(", ")}
                                    </p>
                                    <span className={`
                                        text-xs font-medium px-2 py-1 rounded-full 
                                        ${order.status === "Ready for Pickup" ?
                                        "bg-green-500 text-white" : "bg-blue-100 text-blue-600"}
                                    `}>
                                        {order.status}
                                    </span>
                                    <span className="text-gray-400 text-sm">{order.date}</span>
                                </div>
                            </div>
                        ))
                    )}
                </div>

                {/* Low Stock */}
                <div className="
                    bg-white border-2 border-gray-200 rounded-xl 
                    p-4 flex flex-col gap-3 lg:w-[300px]"
                >
                    <h2 className="font-semibold text-base">Low Stock</h2>

                    {lowStockItems.length === 0 ? (
                        <p className="text-gray-400 text-sm">
                            All items are well stocked.
                        </p>
                    ) : (
                        lowStockItems.map((uniform) => (
                            <div key={uniform.id} className="
                                flex flex-col gap-1 border-b-2 border-gray-200 
                                pb-2 last:border-0 last:pb-0
                            ">
                                <div className="flex items-center justify-between">
                                    <p className="text-sm font-medium">{uniform.name}</p>
                                </div>
                                <div className="flex gap-2 flex-wrap">
                                    {Object.entries(uniform.sizes).map(([size, { stock }]) => (
                                        stock <= 5 && (
                                            <span key={size} className="
                                                text-xs px-2 py-1 rounded-full 
                                                bg-red-100 text-red-500
                                            ">
                                                {size.toUpperCase()}: {stock} left
                                            </span>
                                        )
                                    ))}
                                </div>
                            </div>
                        ))
                    )}
                </div>

            </div>

            {/* Browse Button */}
            <button
                onClick={() => navigateTo("User-Uniforms")}
                className="
                    w-full lg:w-fit py-2 px-6 rounded-lg border-2 border-blue-400 
                    text-blue-500 text-sm font-medium hover:bg-blue-50 transition
                "
            >
                Browse Uniforms
            </button>
        </div>
    );
}

export default Dashboard;