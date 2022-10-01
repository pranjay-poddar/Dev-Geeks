import React from "react";
import "./product-view.css";

const formatProductPrice = (price) =>
  new Intl.NumberFormat(navigator.language, {
    style: "currency",
    currency: "PHP",
  }).format(price);

const keysToValues = (obj) => Object.keys(obj);

const ProductViewComponent = ({
  product,
  quantity,
  onVariationSelect,
  onIncrement,
  onDecrement,
  onAddToCart,
  onBuyProduct,
}) => {
  return (
    <section className="product-wrapper">
      <div className="product-container">
        {/* product image */}
        <section className="product-image">
          <div className="product-content">
            <img
              className="product-image"
              src={product.product_image}
              alt={product.slug}
            />
          </div>
        </section>

        <section className="product-sidebar">
          {/* product name and price */}
          <div className="product-content">
            <h1 className="product-name" title={product.product_name}>
              {product.product_name}
            </h1>
            <p className="product-price">
              {formatProductPrice(product.product_price)}
            </p>
          </div>

          {/* product variations */}
          <div className="product-content variations-section">
            <h4>Variations</h4>
            <div className="product-variations-container">
              {keysToValues(product.variations).map((variation) => (
                <VariationItem
                  key={variation}
                  variation={variation}
                  contents={product.variations[variation]}
                  onVariationSelect={onVariationSelect}
                />
              ))}
            </div>
          </div>

          {/* product count */}
          <div className="product-content item-count-section">
            <div className="product-count-container">
              <button className="product-count-ctrl" onClick={onDecrement}>
                - {/* I recommend changing this to a fontawesome icon */}
              </button>
              <div className="product-count">{quantity}</div>
              <button className="product-count-ctrl" onClick={onIncrement}>
                + {/* I recommend changing this to a fontawesome icon */}
              </button>
            </div>

            {/* product actions */}
            <div className="product-content">
              <div className="product-action-buttons">
                <button onClick={onAddToCart}>ADD TO CART</button>
                <button onClick={onBuyProduct}>BUY NOW</button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

const VariationItem = ({ variation, contents, onVariationSelect }) => {
  return (
    <div key={variation} className="product-variation">
      <p className="variation-type">
        <strong>{variation}</strong>
      </p>
      <div data-variation={variation} className="variations-content">
        {contents.map((content) => (
          <div
            key={content}
            className="variations"
            data-variant={`${content}`}
            onClick={onVariationSelect}
          >
            {content}
          </div>
        ))}
      </div>
    </div>
  );
};

export default React.memo(ProductViewComponent);
