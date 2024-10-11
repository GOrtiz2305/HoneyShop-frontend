import React, {Fragment, useEffect, useState} from 'react';
import Navbar from '../../components/Navbar'
import { useParams } from 'react-router-dom'
import ProductSingleSec from '../../components/ProductSingleSec'
import PageTitle from '../../components/pagetitle'
import Footer from '../../components/footer'
import Scrollbar from '../../components/scrollbar'
import { connect } from "react-redux";
import { addToCart } from "../../store/actions/action";
import axios from "axios";
import { URL } from "../../config";


const ProductDetailsPage =(props) => {

    const { id } = useParams()
    const {addToCart} = props;
    const [product, setProduct] = useState({});
    const [productsArray, setProductsArray] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`${URL}products`); // Cambia esto a tu URL de API
                setProductsArray(response.data); // Ajusta según la estructura de tu API
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    return(
        <Fragment>
            <Navbar hClass={'header-style-2'}/>
            <PageTitle pageTitle={'Product Single'} pagesub={'Product'}/> 
            {product ? <ProductSingleSec
                item={product}
                addToCart={addToCart}
            /> : null}
            <Footer/>
            <Scrollbar/>
        </Fragment>
    )
};

const mapStateToProps = state => {
    return {
        products: state.data.products,
    }
};

export default connect(mapStateToProps, {addToCart})(ProductDetailsPage);
