import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { URL } from "../../config";

const ProductsPerPage = 4; // Número de productos por pestaña

const ProductList = ({ addToCartProduct }) => {

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [open, setOpen] = React.useState(false);
  const [state, setState] = useState({});

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

  function handleClose() {
    setOpen(false);
  }

  const handleClickOpen = (item) => {
    setOpen(true);
    setState(item);
  };

  const totalPages = Math.ceil(data.length / ProductsPerPage); // Calcular el número total de páginas

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const displayedProducts = data.slice(currentPage * ProductsPerPage, (currentPage + 1) * ProductsPerPage);

  return (
    <div className="product-list">
      <div className="product-wrap">
        <div className="row align-items-center">
          {displayedProducts.length > 0 &&
            displayedProducts.map((product, pitem) => (
              <div className="col-xl-12 col-12" key={pitem}>
                <div className="product-item">
                  <div className="product-content">
                    <h2>
                      <Link onClick={ClickHandler} to={`/product-single/${product.id}`}>
                        {product.product_name}
                      </Link>
                    </h2>
                    <div className="product-btm">
                      <ul>
                        <li>${product.price}</li>
                      </ul>
                    </div>
                    <p>{product.product_description}</p>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* Paginación */}
        <div className="pagination">
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              onClick={() => handlePageChange(index)}
              className={`btn theme-btn ${currentPage === index ? 'active' : ''}`}
            >
              {index + 1}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductList;


