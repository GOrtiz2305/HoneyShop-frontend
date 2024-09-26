import React, { useEffect, useState } from "react";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";
import axios from "axios";
import { URL } from "../../config";

const ProductSingleSec = ({ item, addToCart }) => {
  const [data, setData] = useState([]);
  const [presentationName, setPresentationName] = useState({}); // State to store presentation names
  const [productId] = window.location.pathname.split('/').slice(-1); // Extract product ID from URL

  useEffect(() => {
    axios
      .get(URL + "products/" + productId)
      .then((response) => {
        setData(response.data);
        
        //Print presentation.presentation_name
        axios
          .get(URL + "presentations/" + response.data.presentation_id)
          .then((response) => {
            setPresentationName(response.data);
          })
          .catch((error) => {
            console.error(error);
          });
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const ClickHandler = () => {
    window.scrollTo(10, 0);
  };

  const [qty, setQty] = useState(1);

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
                        alt="that wanaka tree"
                        src={item.proImg ? item.proImg : ""}
                        width="500"
                      />
                    </Zoom>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-lg-7">
              <div className="product-single-content">
                <h5>{data.product_name}</h5>
                <h6>${data.price}</h6>
                <p>
                  {data.product_description}
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
