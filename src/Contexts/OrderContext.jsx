import { createContext, useState } from "react";

// eslint-disable-next-line react-refresh/only-export-components
export const OrderContext = createContext();

export function OrderContextProvider({ children }) {

    const [ orderList, setOrderList ] = useState([]);
    const [ paidOrderList, setPaidOrderList ] = useState([]);
    const [ selectedPayment, setSelectedPayment ] = useState(null);
    const [ orderIndex, setOrderIndex ] = useState(0);
    const [ orderStatus, setOrderStatus ] = useState("Ready for Pickup");

    const now = new Date();
    const formatted = now.toLocaleString('en-PH', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
    });

    const addToCart = (item) => {
        setOrderList(prev => [...prev, item]);
    };

    const addToPaid = () => {
        setPaidOrderList(prev => {
            return [...prev, {indivOrders:[...orderList], payment: selectedPayment, date: formatted, status: orderStatus}]
        });
    }

    return(
        <OrderContext.Provider 
            value={{
                orderList, setOrderList, addToCart, 
                paidOrderList, setPaidOrderList, addToPaid,
                selectedPayment, setSelectedPayment,
                orderIndex, setOrderIndex, 
                orderStatus, setOrderStatus
            }}>
            {children}
        </OrderContext.Provider>
    );
}