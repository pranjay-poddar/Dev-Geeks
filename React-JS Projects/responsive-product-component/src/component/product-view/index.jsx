import React from "react";

import ProductView from "./product-view.view";
import useProductView from "./product-view.hook";

const Product = ({ product }) => {
  const {
    quantity,
    increment,
    decrement,
    selectedVariation,
    addToCart,
    buyProduct,
  } = useProductView();

  return (
    <ProductView
      product={product}
      quantity={quantity}
      onVariationSelect={selectedVariation}
      onIncrement={increment}
      onDecrement={decrement}
      onAddToCart={addToCart}
      onBuyProduct={buyProduct}
    />
  );
};

export default React.memo(Product);
