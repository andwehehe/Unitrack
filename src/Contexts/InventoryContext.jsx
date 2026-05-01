import { createContext, useState } from "react";
import { uniforms as initialUniforms } from "../data/uniforms";

// eslint-disable-next-line react-refresh/only-export-components
export const InventoryContext = createContext();

export function InventoryContextProvider({ children }) {

    const [uniforms, setUniforms] = useState(initialUniforms);

    const updateStock = (id, size, newStock) => {
        setUniforms(prev => prev.map(uniform =>
            uniform.id === id
                ? {
                    ...uniform,
                    sizes: {
                        ...uniform.sizes,
                        [size]: { ...uniform.sizes[size], stock: newStock }
                    }
                }
                : uniform
        ));
    };

    const updatePrice = (id, size, newPrice) => {
        setUniforms(prev => prev.map(uniform =>
            uniform.id === id
                ? {
                    ...uniform,
                    sizes: {
                        ...uniform.sizes,
                        [size]: { ...uniform.sizes[size], price: newPrice }
                    }
                }
                : uniform
        ));
    };

    return (
        <InventoryContext.Provider value={{ uniforms, setUniforms, updateStock, updatePrice }}>
            {children}
        </InventoryContext.Provider>
    );
}