import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { createContext, useEffect, useState } from "react";

export const userContext = createContext();

export function UserProvider({ children }) {
  const [UserData, setUserData] = useState(null);
  let [UserId, setUserId] = useState();

  function ConvertToken() {
    const token = window.localStorage.getItem("userToken");
    if (token) {
      let data = jwtDecode(token);
      console.log("Decoded User ID:", data.id); // Check decoded User ID
      setUserId(data.id);
    }
  }

  async function getAllUser(userId) {
    try {
      const { data } = await axios.get(`https://ecommerce.routemisr.com/api/v1/users/${userId}`);
      console.log(data); // Check the structure of the data
      setUserData(data.data); // Assuming data.data contains the user details
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  }

  useEffect(() => {
    if (localStorage.getItem("userToken")) {
      setUserData(localStorage.getItem("userToken"));
      ConvertToken();
    }
  }, []);

  return (
    <userContext.Provider value={{ UserData, setUserData, ConvertToken, UserId, setUserId,getAllUser }}>
      {children}
    </userContext.Provider>
  );
}
