import React, { useContext, useState } from "react";
import { NavLink, useNavigate, Link } from "react-router-dom";
import logo from "../../assets/freshcart-logo.svg";
import { userContext } from "../../Context/UserContext";
import { CartContext } from "../../Context/CartContext";

export default function Navbar() {
  let navigate = useNavigate();
  let [open, SetToggle] = useState(false);
  let { UserData, setUserData, UserId, setUserId } = useContext(userContext);
  
  const { CartItems } = useContext(CartContext);
  function Toggle() {
    SetToggle(!open);
  }

  function Logout() {
    localStorage.removeItem("userToken");
    setUserData(null);
    navigate("/login");
  }

  return (
    <nav className="py-4 px-8 bg-main-light fixed top-0 left-0 right-0 z-20 ">
      <div className="container md:flex justify-between items-center relative px-4">
        <div className="md:flex gap-2">
          <img src={logo} width={120} alt="" />
          {UserData && (
            <ul className={`md:flex gap-4 ${open ? "block" : "hidden"}`}>
              <li className="py-2">
                <NavLink to={"/"}>Home</NavLink>
              </li>
              <li className="py-2">
                <NavLink to={"/brand"}>Brand</NavLink>
              </li>
              <li className="py-2">
                <NavLink to={"/products"}>Products</NavLink>
              </li>
              <li className="py-2">
                <NavLink to={"/categories"}>Categories</NavLink>
              </li>
            </ul>
          )}
        </div>
        <div>
          <ul className={`md:flex gap-2 ${open ? "block" : "hidden"}`}>
            <li className="flex gap-4 text-lg py-2">
              <a href="">
                <i className="fa-brands fa-facebook"></i>
              </a>
              <a href="">
                <i className="fa-brands fa-instagram"></i>
              </a>
              <a href="">
                <i className="fa-brands fa-twitter"></i>
              </a>
              <a href="">
                <i className="fa-brands fa-linkedin"></i>
              </a>
              <a href="">
                <i className="fa-brands fa-youtube"></i>
              </a>
            </li>
            {UserData ? (
              <>
              <li className="relative gap-4 text-lg py-2">
                  <Link
                    to={`/wishlist`}
                    className="relative flex items-center"
                  >
                    <i className="fa-solid fa-heart text-main py-1 gap-4"></i>
                    {/* <span className="ml-2">WishList</span> */}
                  </Link>
                </li>
                <li className="relative gap-4 text-lg py-2">
                  <Link to={"/cart"} className="relative flex items-center">
                    <i className="fa-solid fa-cart-shopping text-main py-1"></i>
                    {CartItems?.numOfCartItems > 0 && (
                      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-5 h-5 flex items-center justify-center rounded-full">
                        {CartItems?.numOfCartItems}
                      </span>
                    )}
                  </Link>
                </li>
                <li className="relative gap-4 text-lg py-2">
                  <Link
                    to={`/user-account/${UserId}`}
                    className="relative flex items-center"
                  >
                    <i className="fa-solid fa-user text-main py-1 gap-4"></i>
                    {/* <span className="ml-2">Account</span> */}
                  </Link>
                </li>
                <li onClick={() => Logout()} className="py-2 cursor-pointer">
                  <Link>Logout</Link>
                </li>
              </>
            ) : (
              <>
                <li className="py-2">
                  <NavLink to={"/register"}>Register</NavLink>
                </li>
                <li className="py-2">
                  <NavLink to={"/login"}>Login</NavLink>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
      <div className="md:hidden">
        <i
          onClick={() => Toggle()}
          className={`fa-solid ${
            open ? "fa-xmark" : "fa-bars-staggered"
          } text-3xl cursor-pointer absolute top-0 right-4`}
          style={{ top: "1rem", right: "1rem" }} // Custom inline style to adjust positioning
        ></i>
      </div>
    </nav>
  );
}
