import React, { Component } from 'react'


class ProductForm extends Component {

    state = {
        name: '',
        price: '',
        discount_price: '',
        stock: '',
        events: '',
        notes: '',
        error: {}
    }


    changeHandler = (e) => {
        const error = this.state.error;
        error[e.target.name] = ''

        this.setState({
            [e.target.name]: e.target.value,
            error
        })
    }

    subimtHandler = (e) => {
        e.preventDefault();

        const { name,
            price,
            discount_price,
            stock,
            events,
            notes, error } = this.state;

        if (name === '') {
            error.name = "Please enter the product name";
        }
        if (price === '') {
            error.price = "Please enter the product price";
        }
        if (discount_price === '') {
            error.discount_price = "Please enter the discount price";
        }
        if (stock === '') {
            error.stock = "Please enter a quantity for stock";
        }
        if (events === '') {
            error.events = "Select your event list";
        }
        if (notes === '') {
            error.notes = "Please enter your note";
        }


        if (error) {
            this.setState({
                error
            })
        }
        if (error.name === '' && error.price === '' && error.price === '' && error.stock === '' && error.discount_price === '' && error.events === '' && error.notes === '') {
            this.setState({
                name: '',
                price: '',
                discount_price: '',
                events: '',
                notes: '',
                error: {}
            })
        }
    }

    render(){
        const { name,
            price,
            discount_price,
            stock,
            error } = this.state;

        return(
            <form onSubmit={this.subimtHandler} className="form">
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-12">
                        <div className="form-field">
                            <input value={name} onChange={this.changeHandler} type="text" name="name" placeholder="Name"/>
                            <p>{error.name ? error.name : ''}</p>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-12">
                        <div className="form-field">
                            <input value={stock} onChange={this.changeHandler} type="text" name="stock" placeholder="stock"/>
                            <p>{error.stock ? error.stock : ''}</p>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-12">
                        <div className="form-field">
                            <input onChange={this.changeHandler} value={price} type="price" name="price" placeholder="price"/>
                            <p>{error.price ? error.price : ''}</p>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-12">
                        <div className="form-field">
                            <input onChange={this.changeHandler} value={discount_price} type="text" name="discount_price" placeholder="discount_price"/>
                            <p>{error.discount_price ? error.discount_price : ''}</p>
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <div className="form-field">
                            <textarea name="message" placeholder="Message"></textarea>
                        </div>
                    </div>
                    <div className="col-lg-12">
                        <div className="form-submit">
                            <button type="submit" className="theme-btn">Send Message</button>
                        </div>
                    </div>
                </div>
            </form>
        )
    }

}
export default  ProductForm;