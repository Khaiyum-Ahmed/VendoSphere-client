import { createContext, useContext } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import UseAxios from "../hooks/UseAxios";
import UseAuth from "../hooks/UseAuth";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const { user } = UseAuth();
  const axiosSecure = UseAxios();
  const queryClient = useQueryClient();

  /* ================= GET CART ================= */
  const {
    data: cart = [],
    isLoading,
  } = useQuery({
    queryKey: ["cart", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/cart/${user.email}`);
      return res.data.items || [];
    },
  });

  /* ================= ADD TO CART ================= */
  const addMutation = useMutation({
    mutationFn: async (product) => {
      await axiosSecure.post("/cart", {
        userEmail: user.email,
        product,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["cart", user?.email]);
      toast.success("Added to cart 🛒");
    },
  });

  /* ================= UPDATE QTY ================= */
  const updateQtyMutation = useMutation({
    mutationFn: async ({ productId, quantity }) => {
      await axiosSecure.patch("/cart/quantity", {
        userEmail: user.email,
        productId,
        quantity,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["cart", user?.email]);
    },
  });

  /* ================= REMOVE ITEM ================= */
  const removeMutation = useMutation({
    mutationFn: async (productId) => {
      await axiosSecure.delete("/cart/item", {
        data: {
          userEmail: user.email,
          productId,
        },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["cart", user?.email]);
      toast.success("Item removed");
    },
  });

  /* ================= CLEAR CART ================= */
  const clearMutation = useMutation({
    mutationFn: async () => {
      await axiosSecure.delete(`/cart/${user.email}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["cart", user?.email]);
      toast.success("Cart cleared");
    },
  });

  return (
    <CartContext.Provider
      value={{
        cart,
        isLoading,
        addToCart: addMutation.mutate,
        updateQuantity: updateQtyMutation.mutate,
        removeFromCart: removeMutation.mutate,
        clearCart: clearMutation.mutate,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const UseCart = () => useContext(CartContext);
