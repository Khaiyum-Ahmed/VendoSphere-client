import { createContext, useContext, useState } from "react";
import { toast } from "react-hot-toast";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    const addToCart = (product) => {
        setCart((prev) => [...prev, product]);
        toast.success("Added to Cart 🛒");
    };

    return (
        <CartContext.Provider value={{ cart, addToCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const UseCart = () => useContext(CartContext);
