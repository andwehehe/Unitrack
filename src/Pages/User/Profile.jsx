import { useContext } from "react";
import { PageContext } from "../../Contexts/PageContext";
import { OrderContext } from "../../Contexts/OrderContext";
import { LoginContext } from "../../Contexts/LoginContext";

function Profile() {

    const { currentPage, navigateTo } = useContext(PageContext);
    const { paidOrderList, orderList } = useContext(OrderContext);
    const { logout } = useContext(LoginContext);

    const userData = [
        { label: "Full Name", value: "Andrei Gobres" },
        { label: "Student ID", value: "02000389265" },
        { label: "Course", value: "ICT" },
        { label: "School", value: "STI Ortigas-Cainta" },
        { label: "Email", value: "gobres.389265@ortigas-cainta.sti.edu.ph" },
    ];

    const totalSpent = paidOrderList.reduce((acc, order) => {
        return acc + order.indivOrders.reduce((a, { price, quantity }) => a + (price * quantity), 0);
    }, 0);

    return (
        <div className={`
            ${currentPage === "User-Profile" ? "flex" : "hidden"} flex-col
            bg-login-100 overflow-y-auto h-[calc(100vh-7.5rem)] 
            lg:h-[calc(100vh-4rem)] p-6 gap-4 items-center
        `}>
            <div className="w-full max-w-[500px] flex flex-col gap-4">

                {/* Profile Card */}
                <div className="
                    bg-white border-2 border-gray-200 rounded-xl 
                    p-6 flex flex-col items-center gap-3
                ">
                    {/* Avatar */}
                    <div className="
                        w-20 h-20 rounded-full bg-blue-500 flex items-center 
                        justify-center text-white text-2xl font-bold
                    ">
                        AG
                    </div>
                    <div className="text-center">
                        <h1 className="text-xl font-bold">
                            Andrei Gobres
                        </h1>
                        <p className="text-gray-400 text-sm">
                            gobres.389265@ortigas-cainta.sti.edu.ph
                        </p>
                    </div>
                    <span className="
                        bg-blue-100 text-blue-600 text-xs 
                        font-medium px-4 py-1 rounded-full
                    ">
                        Student
                    </span>
                </div>

                {/* Info */}
                <div className="
                    bg-white border-2 border-gray-200 
                    rounded-xl p-4 flex flex-col gap-3
                ">
                    <h2 className="font-semibold text-base">
                        Account Details
                    </h2>

                    <div className="flex flex-col gap-2">
                        {userData.map(({ label, value }) => (
                            <div key={label} className="
                                flex justify-between text-sm border-b 
                                border-gray-100 pb-2 last:border-0
                            ">
                                <span className="text-gray-500">
                                    {label}
                                </span>
                                <span className="font-medium text-right max-w-[60%]">
                                    {value}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-3">
                    {[
                        { label: "Total Orders", value: paidOrderList.length },
                        { label: "Items in Cart", value: orderList.length },
                        { label: "Total Spent", value: `₱${totalSpent.toLocaleString()}` },
                    ].map(({ label, value }) => (
                        <div key={label} className="
                            bg-white border-2 border-gray-200 
                            rounded-xl p-3 flex flex-col items-center gap-1
                        ">
                            <p className="text-xl font-bold text-blue-500">
                                {value}
                            </p>
                            <p className="text-[10px] text-gray-400 text-center">
                                {label}
                            </p>
                        </div>
                    ))}
                </div>

                {/* Logout */}
                <button
                    onClick={() => {
                        navigateTo("Login");
                        logout();
                    }}
                    className="
                        w-full py-2 rounded-lg border-2 border-red-300
                        text-red-400 text-sm font-medium hover:bg-red-50 transition
                    "
                >
                    Logout
                </button>
            </div>
        </div>
    );
}

export default Profile;

