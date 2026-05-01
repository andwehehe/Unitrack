import { useState, useContext } from "react";
import { OrderContext } from "../../Contexts/OrderContext";
import { PageContext } from "../../Contexts/PageContext";

function AdminOrders() {

    const { paidOrderList, setPaidOrderList } = useContext(OrderContext);
    const { currentPage } = useContext(PageContext);

    const [searchFilter, setSearchFilter] = useState("");
    const [statusFilter, setStatusFilter] = useState("All");
    const [selectedOrder, setSelectedOrder] = useState(null);

    const markAsIssued = (index) => {
        setPaidOrderList(prev => prev.map((order, i) =>
            i === index ? { ...order, status: "Issued" } : order
        ));
    };

    const filteredOrders = paidOrderList.filter(order => {
        const matchesStatus = statusFilter === "All" || order.status === statusFilter;
        const matchesSearch = `ORD-2026-${String(paidOrderList.indexOf(order) + 1).padStart(4, '0')}`.includes(searchFilter);
        return matchesStatus && matchesSearch;
    });

    return (
        <div className={`
            ${currentPage === "Admin-Orders" ? "flex" : "hidden"} flex-col
            bg-login-100 overflow-y-auto h-[calc(100vh-4rem)] p-6 gap-4
        `}>
            <h1 className="text-2xl font-bold">Orders</h1>

            {/* Search & Filter */}
            <div className="flex flex-col lg:flex-row gap-3">
                <label className="
                    flex items-center gap-2 border-2 py-1 pl-4 rounded-full
                    bg-white focus-within:border-blue-400 flex-1
                ">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="11" cy="11" r="8"/>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                    </svg>
                    <input
                        type="text"
                        placeholder="Search by Order ID..."
                        className="bg-transparent focus:outline-none w-full text-sm py-1"
                        onChange={(e) => setSearchFilter(e.target.value)}
                    />
                </label>

                <select
                    className="border-2 rounded-full px-4 py-2 text-sm bg-white focus:outline-none focus:border-blue-400"
                    onChange={(e) => setStatusFilter(e.target.value)}
                >
                    <option value="All">All Status</option>
                    <option value="Issued">Issued</option>
                    <option value="Ready for Pickup">Ready for Pickup</option>
                </select>
            </div>

            {/* Table */}
            {paidOrderList.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-3">
                    <p className="text-gray-400 text-sm">No orders yet.</p>
                </div>
            ) : (
                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-[0px_2px_12px_rgba(0,0,0,0.06)]">
                    <table className="w-full text-sm border-collapse">
                        <thead>
                            <tr className="bg-gray-50 border-b border-gray-200 text-gray-500 text-left">
                                <th className="py-3 px-4 font-medium">Order ID</th>
                                <th className="py-3 px-4 font-medium hidden lg:table-cell">Items</th>
                                <th className="py-3 px-4 font-medium hidden lg:table-cell">Qty</th>
                                <th className="py-3 px-4 font-medium">Status</th>
                                <th className="py-3 px-4 font-medium hidden lg:table-cell">Date</th>
                                <th className="py-3 px-4 font-medium">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredOrders.map((order, index) => {
                                const realIndex = paidOrderList.indexOf(order);
                                const orderId = `ORD-2026-${String(realIndex + 1).padStart(4, '0')}`;
                                const totalQty = order.indivOrders.reduce((acc, { quantity }) => acc + quantity, 0);
                                const itemNames = order.indivOrders.map(({ name, selectedSize }) => `${name} (${selectedSize})`).join(", ");

                                return (
                                    <tr key={index} className="border-b border-gray-100 hover:bg-gray-50 transition">
                                        <td className="py-3 px-4 font-medium">{orderId}</td>
                                        <td className="py-3 px-4 text-gray-600 hidden lg:table-cell max-w-[200px] truncate">{itemNames}</td>
                                        <td className="py-3 px-4 hidden lg:table-cell">{totalQty}</td>
                                        <td className="py-3 px-4">
                                            <span className={`
                                                text-xs font-medium px-3 py-1 rounded-full
                                                ${order.status === "Ready for Pickup"
                                                    ? "bg-green-500 text-white"
                                                    : "bg-blue-100 text-blue-600"
                                                }
                                            `}>
                                                {order.status}
                                            </span>
                                        </td>
                                        <td className="py-3 px-4 text-gray-400 hidden lg:table-cell">{order.date}</td>
                                        <td className="py-3 px-4">
                                            <div className="flex flex-col lg:flex-row gap-1">
                                                <button
                                                    onClick={() => setSelectedOrder({ order, index: realIndex, orderId })}
                                                    className="text-xs border border-blue-300 text-blue-500 px-2 py-1 rounded hover:bg-blue-50 transition"
                                                >
                                                    View Details
                                                </button>
                                                {order.status === "Ready for Pickup" && (
                                                    <button
                                                        onClick={() => markAsIssued(realIndex)}
                                                        className="text-xs border border-gray-300 text-gray-500 px-2 py-1 rounded hover:bg-gray-50 transition"
                                                    >
                                                        Mark as Issued
                                                    </button>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Order Details Panel */}
            {selectedOrder && (
                <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl p-6 w-full max-w-[560px] flex flex-col gap-4 shadow-xl">

                        {/* Header */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <h2 className="font-bold text-xl">Order Details</h2>
                                <span className="bg-blue-100 text-blue-600 text-xs font-medium px-3 py-1 rounded-full">
                                    {selectedOrder.orderId}
                                </span>
                            </div>
                            <button
                                onClick={() => setSelectedOrder(null)}
                                className="text-gray-400 hover:text-gray-600 text-xl"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Info */}
                        <div className="flex flex-col gap-1 text-sm">
                            <p><span className="text-gray-500">Date: </span>{selectedOrder.order.date}</p>
                            <div className="flex items-center gap-2">
                                <span className="text-gray-500">Status: </span>
                                <span className={`
                                    text-xs font-medium px-3 py-1 rounded-full
                                    ${selectedOrder.order.status === "Ready for Pickup"
                                        ? "bg-green-500 text-white"
                                        : "bg-blue-100 text-blue-600"
                                    }
                                `}>
                                    {selectedOrder.order.status}
                                </span>
                            </div>
                        </div>

                        {/* Items Table */}
                        <table className="w-full text-sm border-collapse">
                            <thead>
                                <tr className="border-b border-gray-200 text-gray-500 text-left">
                                    <th className="py-2 font-medium">Item</th>
                                    <th className="py-2 font-medium">Size</th>
                                    <th className="py-2 font-medium">Qty</th>
                                    <th className="py-2 font-medium">Unit Price</th>
                                    <th className="py-2 font-medium">Subtotal</th>
                                </tr>
                            </thead>
                            <tbody>
                                {selectedOrder.order.indivOrders.map(({ name, selectedSize, price, quantity }, i) => (
                                    <tr key={i} className="border-b border-gray-100">
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
                                    <td colSpan="4" className="py-2 font-semibold text-right pr-4">Total</td>
                                    <td className="py-2 font-semibold">
                                        ₱{selectedOrder.order.indivOrders.reduce((acc, { price, quantity }) =>
                                            acc + (price * quantity), 0
                                        ).toLocaleString()}
                                    </td>
                                </tr>
                            </tfoot>
                        </table>

                        {/* Actions */}
                        <div className="flex gap-2">
                            {selectedOrder.order.status === "Ready for Pickup" && (
                                <button
                                    onClick={() => {
                                        markAsIssued(selectedOrder.index);
                                        setSelectedOrder(null);
                                    }}
                                    className="flex-1 bg-blue-500 text-white py-2 rounded-lg font-medium hover:bg-blue-600 transition text-sm"
                                >
                                    Mark as Issued
                                </button>
                            )}
                            <button
                                onClick={() => setSelectedOrder(null)}
                                className="flex-1 border-2 border-gray-200 py-2 rounded-lg font-medium hover:border-gray-400 transition text-gray-500 text-sm"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AdminOrders;