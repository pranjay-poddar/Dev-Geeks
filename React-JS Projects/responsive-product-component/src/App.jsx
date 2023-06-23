import React from "react";
import "./App.css";
import DarkModeButton from './component/product-view/Darkmode';
import ProductViewComponent from "./component/product-view/product-view.component";
import { data } from "./component/product-view/models/sampleSchema";

function App() {
  const quantity=1;
  return (
    <div className="App">
      <DarkModeButton />
      {data.map((product) => (
        <ProductViewComponent key={product.id} product={product} quantity={quantity} />
      ))}
    </div>
  );
}

export default App;
