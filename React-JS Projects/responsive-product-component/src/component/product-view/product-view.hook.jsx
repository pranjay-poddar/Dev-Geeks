import { useState } from "react";

const useProductView = () => {
  const [quantity, setQuantity] = useState(1);
  const [selectedVariant, setSelectedVariant] = useState({});

  const increment = () => setQuantity((state) => state + 1);
  const decrement = () => {
    if (quantity !== 1) setQuantity((state) => state - 1);
  };

  const selectedVariation = (e) => {
    const parent = e.target.closest(".variations-content");
    const target = e.target.closest(".variations");

    const variationType = parent.getAttribute("data-variation");
    const variant = target.getAttribute("data-variant");

    if (target.classList.contains("selected")) return;

    [...parent.children].map((item) => {
      if (item.classList.contains("selected"))
        item.classList.toggle("selected");
    });

    target.classList.toggle("selected");

    setSelectedVariant((state) => {
      return {
        ...state,
        [variationType]: variant,
      };
    });
  };

  const addToCart = () => {
    // populate this with your add to cart logic
  };
  const buyProduct = () => {
    // populate this with your buy product logic
  };

  return {
    selectedVariant,
    quantity,

    increment,
    decrement,

    selectedVariation,
    addToCart,
    buyProduct,
  };
};

export default useProductView;
