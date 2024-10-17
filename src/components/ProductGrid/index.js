import React, { useEffect,useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { URL } from "../../config";

const ProductsPerPage = 9; // Número de productos por pestaña

const ProductGrid = ({ addToCartProduct }) => {
  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(0); // Estado para la página activa
  
  useEffect(() => {
    axios.get(URL + 'products/inventory/active')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }, []);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const totalPages = Math.ceil(data.length / ProductsPerPage); // Calcular el número total de páginas

  // Productos a mostrar en la página activa
  // const displayedProducts = data.slice(currentPage * ProductsPerPage, (currentPage + 1) * ProductsPerPage);
  const displayedProducts = 9;
  return (

    <div className="product-wrap">
      <div className="row align-items-center">
        {displayedProducts.length > 0 &&
          displayedProducts.map((product, pitem) => (
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
                    <Link to={`/product-single/${product.id}`}>
                      {product.product_name}
                    </Link>
                  </h3>
                  <div className="product-btm">
                    <div>
                        <ul>
                          <li>${product.price}</li>
                        </ul>
                    </div>
                  </div>
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
  );
};

export default ProductGrid;
