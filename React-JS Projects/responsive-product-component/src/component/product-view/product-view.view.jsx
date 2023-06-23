import React from "react";
import ProductViewComponent from "./product-view.component";

const ProductView = ({
  product,
  quantity,
  onVariationSelect,
  onIncrement,
  onDecrement,
  onAddToCart,
  onBuyProduct,
}) => {
  return (
    <ProductViewComponent
      product={product}
      quantity={quantity}
      onVariationSelect={onVariationSelect}
      onIncrement={onIncrement}
      onDecrement={onDecrement}
      onAddToCart={onAddToCart}
      onBuyProduct={onBuyProduct}
    />
  );
};

export default React.memo(ProductView);
