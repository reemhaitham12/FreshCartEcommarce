import axios from "axios";
import React, { useState, useEffect } from "react";
import RecentProduct from "../RecentProduct/RecentProduct";
import notProductImage from "../../assets/NotProduct.jpg";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import Animation from "../Animation/Animation";

export default function Categories() {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  // Function to get all products
  async function getProducts() {
    try {
      setLoading(true);
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/products"
      );
      setProducts(data.data); // Set products
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch products:", err);
      setLoading(false);
    }
  }

  // Function to get categories
  async function getRecentCategories() {
    try {
      let { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/categories`
      );
      setCategories(data.data);
    } catch (err) {
      console.log(err);
    }
  }

  // Function to get products by category
  async function getProductsByCategory(categoryId) {
    try {
      setLoading(true);
      let { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/products?category=${categoryId}`
      );
      setProducts(data.data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  }

  // UseEffect to get categories and products on initial load
  useEffect(() => {
    getRecentCategories();
    getProducts(); // Fetch and display all products initially
  }, []);

  // UseEffect to get products by selected category
  useEffect(() => {
    if (selectedCategory) {
      getProductsByCategory(selectedCategory);
    } else {
      getProducts(); // If no category is selected, show all products
    }
  }, [selectedCategory]);

  return (
    <div className="flex flex-col md:flex-row">
      <div className="w-full md:w-1/5 p-4 border-r border-gray-300">
        <ul className="flex flex-col space-y-2">
          {categories.map((category) => (
            <li
              key={category._id}
              className="py-2 px-4 border-b border-gray-300 last:border-b-0 cursor-pointer hover:bg-gray-100"
              onClick={() => setSelectedCategory(category._id)}
            >
              {category.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="w-full md:w-4/5 p-4">
        {loading ? (
          <div className="flex justify-center items-center h-screen">
            <LoadingSpinner />
          </div>
        ) : (
          <Animation>
            {products.length > 0 ? (
              <div className="flex flex-wrap justify-center gap-4 py-3">
                {products.map((product, index) => (
                  <RecentProduct key={index} product={product} />
                ))}
              </div>
            ) : (
              <div className="flex justify-center items-center h-80">
                <img
                  src={notProductImage}
                  alt="No Products Available"
                  className="max-w-full max-h-full w-auto h-auto"
                />
              </div>
            )}
          </Animation>
        )}
      </div>
    </div>
  );
}
