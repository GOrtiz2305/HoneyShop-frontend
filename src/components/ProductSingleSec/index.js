import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import axios from "axios";
import { URL } from "../../config";
import Miel from './Miel.png';

const ProductSingleSec = ({ item, addToCart }) => {
  const [product, setProduct] = useState([]);
  const [presentationName, setPresentationName] = useState({}); // State to store presentation names
  const [brandName, setBrandName] = useState({}); // State to store brand names
  const [productId] = window.location.pathname.split('/').slice(-1); // Extract product ID from URL
  const [qty, setQty] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productResponse = await axios.get(`${URL}products/${productId}`);
        setProduct(productResponse.data);

        const presentationResponse = await axios.get(`${URL}presentations/${productResponse.data.presentation_id}`);
        setPresentationName(presentationResponse.data);

        const brandResponse = await axios.get(`${URL}brands/${productResponse.data.brand_id}`);
        setBrandName(brandResponse.data);
      } catch (error) {
        console.error("Error fetching product data:", error);
      }
    };

    fetchProduct();
  }, [productId]); // Agregar productId como dependencia

  return (
    <div className="product-single-section section-padding">
      <div className="container">
        <div className="product-details" >
          <div className="row align-items-center">
            <div className="col-lg-5">
              <div className="product-single-img">
                <div className="product-active">
                  <div className="item">
                    <Zoom>
                      <img
                        alt={product.product_name}
                        src={Miel || ''}
                        width="500"
                      />
                    </Zoom>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="product-single-content">
                <h5>{product.product_name}</h5>
                <h6>${product.price}</h6>
                <p>
                  {product.product_description}
                </p>
                <div className="product-filter-item color filter-size">
                  <div className="color-name">
                    <span>Weight :</span>
                    <ul>
                      <li className="color">
                        <input type="radio" name="size" value="30" />
                        <label>
                          {presentationName.presentation_name}
                        </label>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="product-filter-item color filter-size">
                  <div className="color-name">
                    <span>Brand :</span>
                    <ul>
                      <li className="color">
                        <input type="radio" name="size" value="30" />
                        <label>
                          {brandName.brand_name}
                        </label>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="pro-single-btn">
                  <Grid className="quantity cart-plus-minus">
                    <Button
                      className="dec qtybutton"
                      onClick={() => setQty(qty <= 1 ? 1 : qty - 1)}
                    >
                      -
                    </Button>
                    <input
                      value={qty}
                      onChange={() => setQty(qty)}
                      type="text"
                    />
                    <Button
                      className="inc qtybutton"
                      onClick={() => setQty(qty + 1)}
                    >
                      +
                    </Button>
                  </Grid>
                  <button
                    className="theme-btn"
                    onClick={() => addToCart(item, qty)}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSingleSec;
