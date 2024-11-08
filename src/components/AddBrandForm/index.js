import React, { useState } from 'react';
import { URL } from "../../config";
import { toast } from 'react-toastify';

const AddBrandForm = () => {
    const [brand_name, setBrandName] = useState('');
    const [error, setError] = useState({});

    const changeHandler = (e) => {
        const errorCopy = { ...error };
        errorCopy[e.target.name] = '';

        setError(errorCopy);
        switch (e.target.name) {
            case 'brand_name':
                setBrandName(e.target.value);
                break;
            default:
                break;
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        // Prepare data for API call
        const data = {
            brand_name,
        };

        try {
            const token = localStorage.getItem('token'); // Obtain token from localStorage
            const response = await fetch(URL + 'brands', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token,
            },
            body: JSON.stringify(data),
    
            });
            
            //console.log("Trying " , data);

            if (!response.ok) {
            throw new Error('Error creating brand');
            }else{
                toast.success("Brand created successfully");
            }
    
            setBrandName('');
            setError({}); // Clear any errors
    
        } catch (error) {
            toast.error('Error creating brand:', error);
            // Handle errors appropriately (e.g., display an error message to the user)
        }
    };

    return (
        <form onSubmit={submitHandler} className="form">
            <div className="row">
                <div className="col-lg-6 col-md-6 col-12">
                    <div className="form-field">
                        <input value={brand_name} onChange={changeHandler} type="text" name="brand_name" placeholder="Brand name" required/>
                        <p>{error.brand_name ? error.brand_name : ''}</p>
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

export default AddBrandForm;