import axios from "axios";
import React, { useEffect, useState } from "react";
import RecentBrands from "../RecentBrands/RecentBrands";
import LoadingSpinner from "../LoadingSpinner/LoadingSpinner";
import Animation from "../Animation/Animation";

// Function to shuffle an array
function shuffleArray(array) {
  let shuffledArray = array.slice(); // Create a copy of the array
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]]; // Swap elements
  }
  return shuffledArray;
}

export default function Brand() {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(false);
  // Define the getBrands function
  async function getBrands() {
    try {
      setLoading(true);
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/brands"
      );
      const shuffledBrands = shuffleArray(data.data); // Shuffle Brands
      setBrands(shuffledBrands); // Set shuffled Brands
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch Brands:", err);
      setLoading(false);
    }
  }

  // Call getBrands inside useEffect
  useEffect(() => {
    getBrands();
  }, []);

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-screen">
          <LoadingSpinner></LoadingSpinner>
        </div>
      ) : (
       <Animation>
         <div className="flex flex-wrap justify-center gap-4 py-3">
          {brands.map((brand, index) => (
            <RecentBrands key={index} brand={brand} />
          ))}
        </div>
       </Animation>
      )}
    </>
  );
}
