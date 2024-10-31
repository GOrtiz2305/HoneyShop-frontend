import React, {useState} from 'react';
import Grid from "@material-ui/core/Grid";
import SimpleReactValidator from "simple-react-validator";
import {toast} from "react-toastify";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import {useNavigate} from "react-router-dom";

import './style.scss';

const CheckWrap = ({totalPrice, payment_method}) => {

    const push = useNavigate()

    const [value, setValue] = useState({
        email: 'user@gmail.com',
        password: '123456',
        card_holder: 'Jhon Doe',
        card_number: '589622144',
        cvv: '856226',
        expire_date: '',
        remember: false,
    });

    const changeHandler = (e) => {
        setValue({...value, [e.target.name]: e.target.value});
        validator.showMessages();
    };

    const [validator] = React.useState(new SimpleReactValidator({
        className: 'errorMessage'
    }));

    const submitForm = async (e) => {
        e.preventDefault();
        if (validator.allValid()){
            // Save total price here (assuming it's available in props or state)
            const total = totalPrice;
            const authData = btoa('e5718b53-e352-41ba-a627-9deb3df9a8c2:3ca4a62b-fa1d-410a-ba17-bd539214787d');
                
            const data = {
                amount: total,
                card_token: '58c0d81f-a170-4758-ac39-60bd97c8e94d',
                card_acceptor: {
                    mid: '123456890'
                },
                network: 'VISA',
            };

            if (payment_method === 'card') {
                try {
                    const response = await fetch('https://sandbox-api.marqeta.com/v3/simulations/cardtransactions/authorization', {
                        method: 'POST',
                        headers: {
                            'Authorization': 'Basic ' + authData,
                            'Content-Type': 'application/json',
                        },

                        body: JSON.stringify(data),
                    });
                    
                    //console.log(response);

                    if (response.data.success) { 
                        setValue({
                            // Clear form fields after successful payment
                            email: '',
                            password: '',
                            card_holder: '',
                            card_number: '',
                            cvv: '',
                            expire_date: '',
                            remember: false
                        });

                        validator.hideMessages();
                        toast.success('Order Received successfully!');
                        push('/order_received');
                    } else {
                        toast.error(response.data.message || 'Payment failed!');
                    }
                } catch (error) {
                    console.error('API call error:', error);
                    toast.error('An error occurred during payment. Please try again.');
                }
            } else {
                // Handle other payment methods if applicable
                console.warn('Payment method not supported:', payment_method);
            }
        } else {
            validator.showMessages();
            toast.error('Empty field is not allowed!');
        }
    };

    return (
        <Grid className="cardbp mt-20">
            <Grid>
                <form onSubmit={submitForm}>
                    <Grid container spacing={3}>
                        <Grid item sm={6} xs={12}>
                            <TextField
                                fullWidth
                                label="Card holder Name"
                                name="card_holder"
                                value={value.card_holder}
                                onChange={(e) => changeHandler(e)}
                                type="text"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                className="formInput radiusNone"
                            />
                        </Grid>
                        <Grid item sm={6} xs={12}>
                            <TextField
                                fullWidth
                                label="Card Number"
                                name="card_number"
                                value={value.card_number}
                                onChange={(e) => changeHandler(e)}
                                type="number"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                className="formInput radiusNone"
                            />
                        </Grid>
                        <Grid item sm={6} xs={12}>
                            <TextField
                                fullWidth
                                label="CVV"
                                name="cvv"
                                value={value.cvv}
                                onChange={(e) => changeHandler(e)}
                                type="text"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                className="formInput radiusNone"
                            />
                        </Grid>
                        <Grid item sm={6} xs={12}>
                            <TextField
                                fullWidth
                                label="Expire Date"
                                name="expire_date"
                                value={value.expire_date}
                                onChange={(e) => changeHandler(e)}
                                type="date"
                                InputLabelProps={{
                                    shrink: true,
                                }}
                                className="formInput radiusNone"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Grid className="formFooter mt-20">
                                <Button fullWidth className="cBtn cBtnLarge cBtnTheme mt-20 ml-15" type="submit">Proceed to Checkout</Button>
                            </Grid>
                        </Grid>
                    </Grid>
                </form>
            </Grid>
        </Grid>
    )
};

export default CheckWrap;