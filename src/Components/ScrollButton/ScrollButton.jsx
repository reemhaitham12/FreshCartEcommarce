import React, { useContext } from "react";
import { ScrollContext } from "../../Context/ButtonContext";
import { FaArrowUp } from "react-icons/fa";

export default function ScrollButton() {
  const { ShowScrollButton, ScrolltoTop } = useContext(ScrollContext);

  if (!ShowScrollButton) return null;
  return (
    <>
      <div
        onClick={ScrolltoTop}
        className="fixed bottom-8 right-8 bg-green-700 text-white p-3 rounded-full cursor-pointer shadow-lg hover:bg-black hover:text-green-700 transition z-1000"
      >
        <FaArrowUp />
      </div>
    </>
  );
}
