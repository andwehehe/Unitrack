import { useContext } from "react";
import { OrderContext } from "../../Contexts/OrderContext";
import { PageContext } from "../../Contexts/PageContext";
import { InventoryContext } from "../../Contexts/InventoryContext";
import { LoginContext } from "../../Contexts/LoginContext";

function AdminDashboard() {

    const { paidOrderList } = useContext(OrderContext);
    const { currentPage, navigateTo } = useContext(PageContext);
    const { logout } = useContext(LoginContext);
    const { uniforms } = useContext(InventoryContext);

    const totalStock = uniforms.reduce((acc, uniform) =>
        acc + Object.values(uniform.sizes).reduce((a, { stock }) => a + stock, 0), 0
    );

    const pendingPickups = paidOrderList.filter(order => order.status === "Ready for Pickup").length;
    const ordersToday = paidOrderList.filter(order => {
        const today = new Date().toLocaleDateString('en-PH', { year: 'numeric', month: 'long', day: 'numeric' });
        return order.date.includes(today);
    }).length;

    const lowStockItems = uniforms.flatMap(uniform =>
        Object.entries(uniform.sizes)
            .filter(([, { stock }]) => stock <= 5)
            .map(([size, { stock }]) => ({
                name: uniform.name,
                course: uniform.course,
                size: size.toUpperCase(),
                stock
            }))
    );

    const recentOrders = paidOrderList.slice(-5).reverse();

    const stats = [
        {
            icon: (
                <svg 
                    width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" 
                    strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                >
                    <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"/>
                    <line x1="3" y1="6" x2="21" y2="6"/>
                    <path d="M16 10a4 4 0 01-8 0"/>
                </svg>
            ),
            label: "Orders Today",
            value: ordersToday,
            sub: "+3 from yesterday",
            subColor: "text-green-500",
            bg: "bg-blue-50"
        },
        {
            icon: (
                <svg 
                    width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" 
                    strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                >
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                </svg>
            ),
            label: "Pending Pickups",
            value: pendingPickups,
            sub: "Awaiting collection",
            subColor: "text-gray-400",
            bg: "bg-amber-50"
        },
        {
            icon: (
                <svg 
                    width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#10b981" 
                    strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                >
                    <rect x="2" y="7" width="20" height="14" rx="2"/>
                    <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/>
                    <line x1="12" y1="12" x2="12" y2="16"/>
                    <line x1="10" y1="14" x2="14" y2="14"/>
                </svg>
            ),
            label: "Total Items in Stock",
            value: totalStock,
            sub: "Across all departments",
            subColor: "text-gray-400",
            bg: "bg-green-50"
        },
        {
            icon: (
                <svg 
                    width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ef4444" 
                    strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"
                >
                    <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/>
                    <line x1="12" y1="9" x2="12" y2="13"/>
                    <line x1="12" y1="17" x2="12.01" y2="17"/>
                </svg>
            ),
            label: "Low Stock Alerts",
            value: lowStockItems.length,
            sub: "Below 5 pcs",
            subColor: "text-red-500",
            bg: "bg-red-50"
        },
    ];

    return (
        <div className={`
            ${currentPage === "Admin-Dashboard" ? "flex" : "hidden"} flex-col
            bg-login-100 overflow-y-auto h-[calc(100vh-4rem)] p-6 gap-6
        `}>
            {/* Welcome */}
            <div>
                <h1 className="text-2xl font-bold">Dashboard</h1>
                <p className="text-gray-400 text-sm">Admin Overview</p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {stats.map((stat, index) => (
                    <div key={index} className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-3">
                        <div className={`${stat.bg} p-3 rounded-xl`}>
                            {stat.icon}
                        </div>
                        <div className="flex flex-col gap-1">
                            <p className="text-[11px] text-gray-500 font-medium">{stat.label}</p>
                            <p className="text-2xl font-bold">{stat.value}</p>
                            <p className={`text-[10px] ${stat.subColor}`}>{stat.sub}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Bottom Section */}
            <div className="flex flex-col lg:flex-row gap-4">

                {/* Recent Orders */}
                <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col gap-3 flex-1">
                    <div className="flex items-center justify-between">
                        <h2 className="font-semibold text-base">Recent Orders</h2>
                        <button
                            onClick={() => navigateTo("Admin-Orders")}
                            className="text-blue-500 text-sm"
                        >
                            View All →
                        </button>
                    </div>

                    {recentOrders.length === 0 ? (
                        <p className="text-gray-400 text-sm text-center py-8">No orders yet.</p>
                    ) : (
                        <table className="w-full text-sm border-collapse">
                            <thead>
                                <tr className="border-b border-gray-200 text-gray-500 text-left">
                                    <th className="py-2 font-medium">Order ID</th>
                                    <th className="py-2 font-medium hidden lg:table-cell">Items</th>
                                    <th className="py-2 font-medium">Status</th>
                                    <th className="py-2 font-medium hidden lg:table-cell">Date</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recentOrders.map((order, index) => {
                                    const realIndex = paidOrderList.length - 1 - index;
                                    const orderId = `ORD-2026-${String(realIndex + 1).padStart(4, '0')}`;
                                    return (
                                        <tr key={index} className="border-b border-gray-100">
                                            <td className="py-2 font-medium">{orderId}</td>
                                            <td className="py-2 text-gray-600 hidden lg:table-cell max-w-[200px] truncate">
                                                {order.indivOrders.map(({ name, selectedSize }) => `${name} ${selectedSize}`).join(", ")}
                                            </td>
                                            <td className="py-2">
                                                <span className={`
                                                    text-xs font-medium px-2 py-1 rounded-full
                                                    ${order.status === "Ready for Pickup"
                                                        ? "bg-green-500 text-white"
                                                        : "bg-blue-100 text-blue-600"
                                                    }
                                                `}>
                                                    {order.status}
                                                </span>
                                            </td>
                                            <td className="py-2 text-gray-400 hidden lg:table-cell">{order.date}</td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    )}
                </div>

                {/* Low Stock Alerts */}
                <div className="bg-white border border-gray-200 rounded-xl p-4 flex flex-col gap-3 lg:w-[300px]">
                    <div className="flex items-center justify-between">
                        <h2 className="font-semibold text-base">Low Stock Alerts</h2>
                        <button
                            onClick={() => navigateTo("Admin-Inventory")}
                            className="text-blue-500 text-sm"
                        >
                            Manage Inventory →
                        </button>
                    </div>

                    {lowStockItems.length === 0 ? (
                        <p className="text-gray-400 text-sm">All items well stocked.</p>
                    ) : (
                        lowStockItems.slice(0, 5).map((item, index) => (
                            <div key={index} className="flex items-center justify-between border-b border-gray-100 pb-2 last:border-0">
                                <div>
                                    <p className="text-sm font-medium">{item.name} — {item.size}</p>
                                    <p className="text-xs text-gray-400">{item.course}</p>
                                </div>
                                <span className={`
                                    text-xs font-semibold
                                    ${item.stock <= 2 ? "text-red-500" : "text-amber-500"}
                                `}>
                                    {item.stock} pcs left
                                </span>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
                <button
                    onClick={() => navigateTo("Admin-Inventory")}
                    className="flex items-center gap-2 py-2 px-5 rounded-lg border-2 border-blue-400 text-blue-500 text-sm font-medium hover:bg-blue-50 transition"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2"/>
                    </svg>
                    Manage Inventory
                </button>
                <button
                    onClick={() => navigateTo("Admin-Orders")}
                    className="flex items-center gap-2 py-2 px-5 rounded-lg border-2 border-gray-300 text-gray-500 text-sm font-medium hover:border-blue-400 hover:text-blue-500 transition"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14 2 14 8 20 8"/>
                    </svg>
                    View All Orders
                </button>
                
                <button
                    onClick={() => {
                        navigateTo("Login");
                        logout();
                    }}
                    className="
                        w-[200px] py-2 rounded-lg border-2 border-red-300
                        text-red-400 text-sm font-medium hover:bg-red-50 transition
                    "
                >
                    Logout
                </button>
            </div>
        </div>
    );
}

export default AdminDashboard;