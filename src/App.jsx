import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./Components/Home/Home";
import Cart from "./Components/Cart/Cart";
import Categories from "./Components/Categories/Categories";
import Product from "./Components/Products/Product";
import NotFound from "./Components/NotFound/NotFound";
import Register from "./Components/Register/Register";
import Login from "./Components/Login/Login";
import Brand from "./Components/Brand/Brand";
import Layout from "./Components/Layout/Layout";
import { UserProvider } from "./Context/UserContext";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import ProductDetails from "./Components/ProductDetails/ProductDetails";
import { ScrollProvider } from "./Context/ButtonContext";
import ScrollButton from "./Components/ScrollButton/ScrollButton";
import CartContextProvider from "./Context/CartContext";
import { Toaster } from "react-hot-toast";
import CheckOut from "./Components/CheckOut/CheckOut";
import AllOrders from "./Components/AllOrders/AllOrders";
import UserAccount from "./Components/UserAccount/UserAccount";
import Animation from "./Components/Animation/Animation";
import WishList from "./Components/WishList/WishList";
import WishListContextProvider from "./Context/WishListContext";


function App() {
  const routers = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          index: true,
          element: (
            <ProtectedRoute>
              <Animation>
                <Home />
              </Animation>
            </ProtectedRoute>
          ),
        },
        {
          path: "cart",
          element: (
            <ProtectedRoute>
              <Animation>
                <Cart />
              </Animation>
            </ProtectedRoute>
          ),
        },
        {
          path: "wishlist",
          element: (
            <ProtectedRoute>
              <Animation>
                <WishList />
              </Animation>
            </ProtectedRoute>
          ),
        },
        {
          path: "products",
          element: (
            <ProtectedRoute>
              <Animation>
                <Product />
              </Animation>
            </ProtectedRoute>
          ),
        },
        {
          path: "categories",
          element: (
            <ProtectedRoute>
              <Animation>
                <Categories />
              </Animation>
            </ProtectedRoute>
          ),
        },
        {
          path: "brand",
          element: (
            <ProtectedRoute>
              <Animation>
                <Brand />
              </Animation>
            </ProtectedRoute>
          ),
        },
        {
          path: "checkout",
          element: (
            <ProtectedRoute>
              <Animation>
                <CheckOut />
              </Animation>
            </ProtectedRoute>
          ),
        },
        {
          path: "allorders",
          element: (
            <ProtectedRoute>
              <Animation>
                <AllOrders />
              </Animation>
            </ProtectedRoute>
          ),
        },
        {
          path: "user-account/:UserId",
          element: (
            <ProtectedRoute>
              <Animation>
                <UserAccount />
              </Animation>
            </ProtectedRoute>
          ),
        },
        {
          path: "productdetails/:id/:categoryId",
          element: (
            <ProtectedRoute>
              <Animation>
                <ProductDetails />
              </Animation>
            </ProtectedRoute>
          ),
        },
        { path: "register", element: <Register /> },
        { path: "login", element: <Login /> },
        { path: "*", element: <NotFound /> },
      ],
    },
  ]);

  return (
    <CartContextProvider>
      <WishListContextProvider>
        <UserProvider>
          <ScrollProvider>
            <RouterProvider router={routers} />
            <Toaster />
            <ScrollButton />
          </ScrollProvider>
        </UserProvider>
      </WishListContextProvider>
    </CartContextProvider>
  );
}

export default App;
