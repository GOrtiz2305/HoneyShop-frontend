import React, { Fragment } from 'react';
import Grid from "@material-ui/core/Grid";
import Collapse from "@material-ui/core/Collapse";
import FontAwesome from "../../components/UiStyle/FontAwesome";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import RadioGroup from "@material-ui/core/RadioGroup";
import Radio from "@material-ui/core/Radio";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { useNavigate } from 'react-router-dom'
import { totalPrice } from "../../utils";
import axios from "axios";
import { URL } from "../../config";

// images
import visa from '../../images/icon/visa.png';
import mastercard from '../../images/icon/mastercard.png';
import skrill from '../../images/icon/skrill.png';
import paypal from '../../images/icon/paypal.png';

import CheckWrap from '../CheckWrap'

import './style.scss';
import { toast } from 'react-toastify';

const cardType = [
    {
        title: 'visa',
        img: visa
    },
    {
        title: 'mastercard',
        img: mastercard
    },
    {
        title: 'skrill',
        img: skrill
    },
    {
        title: 'paypal',
        img: paypal
    },
];


const CheckoutSection = ({ cartList }) => {
    const navigate = useNavigate();

    const isFormValid = () => {
        const { name, lname, address, email, phone } = forms;
        return name && lname && address && email && phone;
    };
    // states
    const [tabs, setExpanded] = React.useState({
        billing_adress: true,
        payment: false
    });
    const [forms, setForms] = React.useState({

        name: '',
        lname: '',
        address: '',
        email: '',
        phone: '',
        notes: '',

        payment_method: 'cash',
        card_type: '',

        card_holder: '',
        card_number: '',
        cvv: '',
        expire_date: '',
    });

    // tabs handler
    function faqHandler(name) {
        setExpanded({
            billing_adress: true,
            payment: false, [name]: !tabs[name]
        });
    }

    //Order details
    function creatingOrder() {
        const order = {
            client_id: 11,
            totalAmount: totalPrice(cartList),
            address: forms.address,
            paymentMethod: forms.payment_method === 'cash' ? 'Cash' : 'Card',
            notes: `${forms.name} ${forms.lname} - ${forms.email} - ${forms.phone} - ${forms.notes}`,
            products: cartList.map(item => ({
                product_id: item.id,
                quantity: item.qty
            }))
        }

        //Mandar datos a la API
        try {
            axios.post(URL + 'orders', order)
        }
        catch (error) {
            console.log(error)
        }

        return order;
    }

    const handleOrderCreation = async () => {
        if (cartList.length === 0) {
            toast.error("No hay productos en el carrito.");
            return;
        }
    
        if (!isFormValid()) {
            toast.error("Por favor, completa todos los campos obligatorios.");
            return;
        }
    
        try {
            // Verificar inventario
            const inventoryCheck = await Promise.all(cartList.map(async (item) => {
                const response = await axios.get(`${URL}/products/stock/${item.id}`); // Supongamos que esta ruta devuelve la cantidad en stock
                return {
                    ...item,
                    availableQty: response.data.stock // Supongamos que `stock` es la cantidad en inventario
                };
            }));
    
            // Verificar si la cantidad solicitada supera la disponible
            const insufficientStock = inventoryCheck.find(item => item.qty > item.availableQty);
    
            if (insufficientStock) {
                toast.error(`There's not enough stockavailable for: ${insufficientStock.product_name}. Available: ${insufficientStock.availableQty}`);
                return;
            }else{
                toast.success("Inventory check passed.");
            }
    
            // Crear la orden si hay suficiente inventario
            const order = creatingOrder();
            //console.log(order); // Muestra el JSON en la consola
            cartList.length = 0; // Vacía el carrito
            toast.success("Order created successfully.");
            navigate('/order_received'); // Redirige después de crear el pedido
            
        } catch (error) {
            console.error("Error at verifying inventory:", error);
            toast.error("There was a problem at checking the inventory. Try again.");
        }
    };

    // forms handler
    const changeHandler = e => {
        setForms({ ...forms, [e.target.name]: e.target.value })
    };

    return (
        <Fragment>
            <Grid className="checkoutWrapper section-padding">
                <Grid className="container" container spacing={3}>
                    <Grid item md={6} xs={12}>
                        <div className="check-form-area">
                            <Grid className="cuponWrap checkoutCard">
                                <Button className="collapseBtn" fullWidth onClick={() => faqHandler('billing_adress')}>
                                    Billing Address
                                    <FontAwesome name={tabs.billing_adress ? 'minus' : 'plus'} />
                                </Button>
                                <Collapse in={tabs.billing_adress} timeout="auto" unmountOnExit>
                                    <Grid className="chCardBody">
                                        <form className="cuponForm">
                                            <Grid container spacing={3}>
                                                <Grid item sm={6} xs={12}>
                                                    <TextField
                                                        fullWidth
                                                        label="Name"
                                                        name="name"
                                                        value={forms.name}
                                                        onChange={(e) => changeHandler(e)}
                                                        type="text"
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                        className="formInput radiusNone"
                                                        required
                                                    />
                                                </Grid>
                                                <Grid item sm={6} xs={12}>
                                                    <TextField
                                                        fullWidth
                                                        label="Last Name"
                                                        name="lname"
                                                        value={forms.lname}
                                                        onChange={(e) => changeHandler(e)}
                                                        type="text"
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                        className="formInput radiusNone"
                                                        required
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        fullWidth
                                                        multiline
                                                        rows="3"
                                                        label="Address"
                                                        name="address"
                                                        value={forms.address}
                                                        onChange={(e) => changeHandler(e)}
                                                        type="text"
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                        className="formInput radiusNone"
                                                        required
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        fullWidth
                                                        label="Email Adress"
                                                        name="email"
                                                        value={forms.email}
                                                        onChange={(e) => changeHandler(e)}
                                                        type="email"
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                        className="formInput radiusNone"
                                                        required
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        fullWidth
                                                        label="Phone No"
                                                        name="phone"
                                                        value={forms.phone}
                                                        onChange={(e) => changeHandler(e)}
                                                        type="text"
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                        className="formInput radiusNone"
                                                        required
                                                    />
                                                </Grid>
                                                <Grid item xs={12}>
                                                    <TextField
                                                        fullWidth
                                                        multiline
                                                        label="Order Notes"
                                                        placeholder="Note about your order"
                                                        name="notes"
                                                        value={forms.notes}
                                                        onChange={(e) => changeHandler(e)}
                                                        type="text"
                                                        InputLabelProps={{
                                                            shrink: true,
                                                        }}
                                                        className="formInput radiusNone note"
                                                    />
                                                </Grid>
                                            </Grid>
                                        </form>
                                    </Grid>
                                </Collapse>
                            </Grid>
                            <Grid className="cuponWrap checkoutCard">
                                <Button className="collapseBtn" fullWidth onClick={() => faqHandler('payment')}>
                                    Payment Method
                                    <FontAwesome name={tabs.payment ? 'minus' : 'plus'} />
                                </Button>
                                <Grid className="chCardBody">
                                    <Collapse in={tabs.payment} timeout="auto">
                                        <RadioGroup className="paymentMethod" aria-label="Payment Method"
                                            name="payment_method"
                                            value={forms.payment_method}
                                            onChange={(e) => changeHandler(e)}>
                                            <FormControlLabel value="card" control={<Radio color="primary" />} label="Payment By Card " />
                                            <FormControlLabel value="cash" control={<Radio color="primary" />} label="Cash On delivery" />
                                        </RadioGroup>
                                        <Collapse in={forms.payment_method === 'card'} timeout="auto">
                                            <Grid className="cardType">
                                                {cardType.map((item, i) => (
                                                    <Grid
                                                        key={i}
                                                        className={`cardItem ${forms.card_type === item.title ? 'active' : null}`}
                                                        onClick={() => setForms({ ...forms, card_type: item.title })}>
                                                        <img src={item.img} alt={item.title} />
                                                    </Grid>
                                                ))}
                                            </Grid>
                                            <Grid>
                                                <CheckWrap
                                                    totalPrice={totalPrice(cartList)}
                                                    payment_method={forms.payment_method}
                                                />
                                            </Grid>
                                        </Collapse>
                                        <Collapse in={forms.payment_method === 'cash'} timeout="auto">
                                            <Grid className="cardType">
                                                <Button
                                                    className="cBtn cBtnLarge cBtnTheme mt-20 ml-15"
                                                    onClick={handleOrderCreation}>
                                                    Proceed to Checkout
                                                </Button>
                                            </Grid>
                                        </Collapse>
                                    </Collapse>
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <Grid className="cartStatus">
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <Grid className="cartTotals">
                                        <h4>Cart Total</h4>
                                        <Table>
                                            <TableBody>
                                                {cartList.map(item => (
                                                    <TableRow key={item.id}>
                                                        <TableCell>{item.product_name} ${item.price} x {item.qty}</TableCell>
                                                        <TableCell
                                                            align="right">${item.qty * item.price}</TableCell>
                                                    </TableRow>
                                                ))}
                                                <TableRow className="totalProduct">
                                                    <TableCell>Total product</TableCell>
                                                    <TableCell align="right">{cartList.length}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>Sub Price</TableCell>
                                                    <TableCell align="right">${totalPrice(cartList)}</TableCell>
                                                </TableRow>
                                                <TableRow>
                                                    <TableCell>Total Price</TableCell>
                                                    <TableCell
                                                        align="right">${totalPrice(cartList)}</TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </Grid>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </Fragment>
    )
};


export default CheckoutSection;