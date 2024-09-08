import React, { createContext, useEffect, useState } from "react";

export const ScrollContext = createContext();

export function ScrollProvider({ children }) {
  const [ShowScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const ScrolltoTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <ScrollContext.Provider value={{ ShowScrollButton, ScrolltoTop }}>
      {children}
    </ScrollContext.Provider>
  );
}
