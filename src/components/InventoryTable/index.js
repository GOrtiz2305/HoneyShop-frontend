import React from "react";
import InventoryProductList from "../InventoryProductList";

const InventoryTable = ({ products, addToCartProduct }) => {

  return (
    <div>
      <InventoryProductList
            addToCartProduct={addToCartProduct}
            products={products}
          />
    </div>
  );
};

export default InventoryTable;
