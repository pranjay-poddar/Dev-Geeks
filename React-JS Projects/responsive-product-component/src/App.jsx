import React, { useState } from "react";
import "./App.css";

import Product from "./component/product-view/index";
import { data } from "./component/product-view/models/sampleSchema";

function App() {
  return (
    <div className="App">
      <Product product={data} />
    </div>
  );
}

export default App;
