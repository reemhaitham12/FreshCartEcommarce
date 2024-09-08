import axios from "axios";
import { createContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

export let CartContext = createContext();

export default function CartContextProvider({ children }) {
  
  const [CartItems, setCartItems] = useState(null);
  async function addToCart(productId) {
    try {
      // const token = localStorage.getItem("userToken");
      let { data } = await axios.post(
        `https://ecommerce.routemisr.com/api/v1/cart`,
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
      toast.success(data.message, { duration: 500, position: "top-right" });
      setCartItems(data);
      return data;
    } catch (err) {
      console.log(err);
    }
  }

  async function getCartItems() {
    try {
      // const token = localStorage.getItem("userToken");
      let { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/cart`,
        {
          headers:
          {
            token: localStorage.getItem("userToken"),
          }
        }
      );
      setCartItems(data);
      return data;
    } catch (err) {
      console.log(err);
    }
  }

  async function UpdateProductCount(productId, count) {
    try {
      // const token = localStorage.getItem("userToken");
      let { data } = await axios.put(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
          count,
        },
        {
          headers:
          {
            token: localStorage.getItem("userToken"),
          }
        }
      );
      setCartItems(data);
      return data;
    } catch (err) {
      console.log(err);
    }
  }

  async function deleteCartProduct(productId) {
    try {
      // const token = localStorage.getItem("userToken");
      let { data } = await axios.delete(
        `https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
        {
          headers:
          {
            token: localStorage.getItem("userToken"),
          }
        }
      );
      toast.error("Delete Item", { duration: 3000, position: "top-right" });
      setCartItems(data);
      return data;
    } catch (err) {
      console.log(err);
    }
  }

  async function CheckOutSession(shippingData) {
    try {
      // const token = localStorage.getItem("userToken");
      let { url, ...shippingAddress } = shippingData;
      let { data } = await axios.post(url, { shippingAddress },
        {
          headers:
          {
            token: localStorage.getItem("userToken"),
          }
        });
      return data;
    } catch (err) {
      console.log(err.message);
    }
  }
  async function getAllOrder(userId) {
    try {
      let { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/orders/user/${userId}`
      );
      setCartItems(data);
      return data;
    } catch (err) {
      console.log(err.message);
      return {};
    }
  }


  useEffect(() => {
    getCartItems();
  }, []);

  return (
    <>
      <CartContext.Provider
        value={{
          addToCart,
          getCartItems,
          UpdateProductCount,
          deleteCartProduct,
          CartItems,
          setCartItems,
          CheckOutSession,
          getAllOrder,
        }}
      >
        {children}
      </CartContext.Provider>
    </>
  );
}
