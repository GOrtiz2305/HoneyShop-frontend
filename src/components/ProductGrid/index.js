import React, { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import DefaultModal from "../Modal";
import { URL } from "../../config";

const ProductGrid = ({ addToCartProduct }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get(URL + 'products/inventory/active')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const ClickHandler = () => {
    window.scrollTo(10, 0);
  };
  const [open, setOpen] = React.useState(false);

  function handleClose() {
    setOpen(false);
  }

  const [state, setState] = useState({});

  const handleClickOpen = (item) => {
    setOpen(true);
    setState(item);
  };

  return (

    <div className="product-wrap">
      <div className="row align-items-center">
        {data.length > 0 &&
          data.map((product, pitem) => (
            <div
              className="col-xl-4 col-lg-6 col-md-6 col-sm-12 col-12"
              key={pitem}
            >
              <div className="product-item">
                <div className="product-img">
                  <img src={product.proImg} alt="" />
                  <ul>
                    <li>
                      <button
                        data-bs-toggle="tooltip"
                        data-bs-html="true"
                        title="Add to Cart"
                        onClick={() => addToCartProduct(product)}
                      >
                        <i className="fi flaticon-shopping-cart"></i>
                      </button>
                    </li>
                  </ul>
                </div>
                <div className="product-content">
                  <h3>
                    <Link onClick={ClickHandler} to={`/product-single/${product.id}`}>
                      {product.product_name}
                    </Link>
                  </h3>
                  <div className="product-btm">
                    <div>
                        <ul>
                          {/* If discount is enable for the actual product */}
                          {/*product.discount === true && <li>${product.discount_price}</li> */}
                          <li>${product.price}</li>
                        </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
      </div>
      <DefaultModal
        addToCartProduct={addToCartProduct}
        open={open}
        onClose={handleClose}
        product={state}
      />
    </div>
  );
};

export default ProductGrid;
