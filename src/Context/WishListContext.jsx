import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export const WishListContext = createContext();

export default function WishListContextProvider({ children }) {
    const [Wishlist, setWishlist] = useState(null);

    async function addToWishlist(productId) {
        try {
            let { data } = await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`,
                {
                    productId,
                },
                {
                    headers:
                    {
                        token: localStorage.getItem("userToken"),
                    }
                }
            );
            console.log(data);
            toast.success(data.message, { duration: 500, position: "top-center" });
            setWishlist(data);
            return data;
        } catch (err) {
            console.log(err);
        }

    }
    async function getWishListItems() {
        try {
            let { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,
                {
                    headers:
                    {
                        token: localStorage.getItem("userToken"),
                    }
                }
            );
            console.log(data);
            setWishlist(data);
            return data;
        }
        catch (err) {
            console.log(err);
        }

    }

    async function deleteProduct(productId) {
        try {
            let { data } = await axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,
                {
                    headers: {
                        token: localStorage.getItem("userToken"),
                    }
                }
            )
            toast.error("Delete Item", { duration: 3000, position: "top-center" });
            console.log("delete data", data);
        } catch (err) {
            console.log(err);
        }

    }
    useEffect(() => {
        getWishListItems();
    }, [])
    return (
        <>
            <WishListContext.Provider value={{
                addToWishlist,
                Wishlist,
                setWishlist,
                getWishListItems,
                deleteProduct
            }}>
                {children}

            </WishListContext.Provider>

        </>

    )
}