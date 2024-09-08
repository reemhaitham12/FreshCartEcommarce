import axios from 'axios';
import React, { useEffect, useState } from 'react';
import RecentProduct from '../RecentProduct/RecentProduct';
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import Animation from '../Animation/Animation';

// Function to shuffle an array
function shuffleArray(array) {
  let shuffledArray = array.slice(); // Create a copy of the array
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]; // Swap elements
  }
  return shuffledArray;
}

export default function Product() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  // Define the getProducts function
  async function getProducts() {
    try {
      setLoading(true);
      const { data } = await axios.get('https://ecommerce.routemisr.com/api/v1/products');
      const shuffledProducts = shuffleArray(data.data); // Shuffle products
      setProducts(shuffledProducts); // Set shuffled products
      setLoading(false);
    } catch (err) {
      console.error('Failed to fetch products:', err);
      setLoading(false);
    }
  }

  // Call getProducts inside useEffect
  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      {
        loading ? <div className="flex justify-center items-center h-screen">
          <LoadingSpinner></LoadingSpinner>
        </div> :
          < Animation>
            <div className="flex flex-wrap justify-center gap-4 py-3">
              {products.map((product, index) => (
                <RecentProduct key={index} product={product} />
              ))}
            </div>
          </Animation>

      }
    </>

  );
}
