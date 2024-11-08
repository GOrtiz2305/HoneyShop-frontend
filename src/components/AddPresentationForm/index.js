import React, { useState } from 'react';
import { URL } from "../../config";
import { toast } from 'react-toastify';

const AddPresentationForm = () => {
    const [presentation_name, setPresentationName] = useState('');
    const [error, setError] = useState({});

    const changeHandler = (e) => {
        const errorCopy = { ...error };
        errorCopy[e.target.name] = '';

        setError(errorCopy);
        switch (e.target.name) {
            case 'presentation_name':
                setPresentationName(e.target.value);
                break;
            default:
                break;
        }
    };

    const submitHandler = async (e) => {
        e.preventDefault();

        // Prepare data for API call
        const data = {
            presentation_name,
        };

        try {
            const token = localStorage.getItem('token'); // Obtain token from localStorage
            const response = await fetch(URL + 'presentations', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': token
            },
            body: JSON.stringify(data),
    
            });
            
            //console.log("Trying " , data);

            if (!response.ok) {
            throw new Error('Error creating presentation');
            }else{
                toast.success('Presentation created successfully!');
            }
    
            setPresentationName('');
            setError({});
    
        } catch (error) {
            console.error('Error creating presentation:', error);
            toast.error('Error creating presentation');
        }
    };

    return (
        <form onSubmit={submitHandler} className="form">
            <div className="row">
                <div className="col-lg-6 col-md-6 col-12">
                    <div className="form-field">
                        <input value={presentation_name} onChange={changeHandler} type="text" name="presentation_name" placeholder="Presentation name" required/>
                        <p>{error.presentation_name ? error.presentation_name : ''}</p>
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

export default AddPresentationForm;