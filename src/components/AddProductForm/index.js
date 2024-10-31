import React, { useState, useEffect } from 'react';
import { URL } from "../../config";

const AddProductForm = () => {
    const [product_name, setProductName] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [discount_price, setDiscountPrice] = useState('');
    const [discount, setDiscount] = useState('false'); // Assuming events is a separate field
    const [error, setError] = useState({});
    const [brands, setBrands] = useState([]); // State to store brands from API
    const [presentations, setPresentations] = useState([]); // State to store presentations from API
    const [product_description, setProductDescription] = useState('');

    useEffect(() => {
        const fetchData = async () => {
          try {
            const [brandsResponse, presentationsResponse] = await Promise.all([
              fetch(URL + 'brands'),
              fetch(URL + 'presentations'),
            ]);
    
            const [brandsData, presentationsData] = await Promise.all([
              brandsResponse.json(),
              presentationsResponse.json(),
            ]);
    
            setBrands(brandsData);
            setPresentations(presentationsData);
          } catch (error) {
            console.error('Error fetching data:', error);
          }
        };
    
        fetchData();
      }, []);

    const changeHandler = (e) => {
        const errorCopy = { ...error };
        errorCopy[e.target.name] = '';

        setError(errorCopy);
        switch (e.target.name) {
            case 'product_name':
                setProductName(e.target.value);
                break;
            case 'price':
                setPrice(e.target.value);
                break;
            case 'stock':
                setStock(e.target.value);
                break;
            case 'discount_price':
                setDiscountPrice(e.target.value);
                break;
            case 'discount':
                setDiscount(e.target.checked);
                break;
            case 'product_description':
                setProductDescription(e.target.value);
                break;
            default:
                break;
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        // Prepare data for API call
        const data = {
            product_name,
            price: parseFloat(price), // Convert price to a number for calculations
            stock: parseInt(stock), // Convert stock to a number
            discount_price,
            discount, // Include the discount boolean value
            brand_id: e.target.brand.value,
            presentation_id: e.target.presentation.value,
            product_description: e.target.product_description.value,
        };

        try {
            const response = await fetch(URL + 'products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
    
            });
            
            //console.log("Trying " , data);

            if (!response.ok) {
            throw new Error('Error creating product');
            }
    
            // Handle successful creation (e.g., clear form, show success message)
            //console.log('Product created successfully!');
            setProductName('');
            setPrice('');
            setStock('');
            setDiscountPrice('');
            setDiscount(false); // Reset discount checkbox
            setError({}); // Clear any errors
            setProductDescription('');
    
            // You can optionally display a success message to the user here
        } catch (error) {
            console.error('Error creating product:', error);
            // Handle errors appropriately (e.g., display an error message to the user)
        }
    };

    return (
        <form onSubmit={submitHandler} className="form">
            <div className="row">
                <div className="col-lg-6 col-md-6 col-12">
                    <div className="form-field">
                        <input value={product_name} onChange={changeHandler} type="text" name="product_name" placeholder="Product name" required/>
                        <p>{error.product_name ? error.product_name : ''}</p>
                    </div>
                </div>
                <div className="col-lg-6 col-md-6 col-12">
                    <div className="form-field">
                        <input value={discount_price} onChange={changeHandler} type="number" name="discount_price" placeholder="Discount price" min={0} step={0.01} required/>
                        <p>{error.discount_price ? error.discount_price : ''}</p>
                    </div>
                </div>
                <div className="col-lg-6 col-md-6 col-12">
                    <div className="form-field">
                        <input onChange={changeHandler} value={price} type="number" name="price" placeholder="Price" min={0} step={0.01} required/>
                        <p>{error.price ? error.price : ''}</p>
                    </div>
                </div>
                <div className="col-lg-6 col-md-6 col-12">
                    <div className="form-field">
                        <input onChange={changeHandler} value={stock} type="number" name="stock" placeholder="Initial stock" min={0} step={1} required/>
                        <p>{error.stock ? error.stock : ''}</p>
                    </div>
                </div>
                <div className="col-lg-6 col-md-6 col-12">
                    <div className="form-field">
                        <select onChange={changeHandler} name="brand" required>
                            <option value="">Choose a brand</option>
                            {brands.map((brand) => (
                                <option key={brand.id} value={brand.id}>
                                    {brand.brand_name}
                                </option>
                            ))}
                        </select>
                        <p>{error.brand ? error.brand : ''}</p>
                    </div>
                </div>
                <div className="col-lg-6 col-md-6 col-12">
                    <div className="form-field">
                        <select onChange={changeHandler} name="presentation" required>
                            <option value="">Choose a presentation</option>
                            {presentations.map((presentation) => (
                                <option key={presentation.id} value={presentation.id}>
                                    {presentation.presentation_name}
                                </option>
                            ))}
                        </select>
                        <p>{error.presentation ? error.presentation : ''}</p>
                    </div>
                </div>
                <div className="col-lg-12">
                    <div className="form-field">
                        <textarea name="product_description" value={product_description} onChange={changeHandler} placeholder="Product description"></textarea>
                    </div>
                </div>
                <div className="col-lg-12">
                    <div>
                        <label for="discount">Discount</label>
                    </div>
                </div>
                <div className="col-lg-12">
                    <div>
                        <input type="checkbox" id='discount' name="discount" value="discount" onChange={changeHandler} />
                    </div>
                </div>
                <div className="col-lg-12">
                    <div className="form-submit">
                        <button type="submit" className="theme-btn">Save</button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default AddProductForm;