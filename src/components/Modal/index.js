import React, { Fragment, useState, useEffect } from "react";
import { Dialog, Grid } from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import bee from '../../images/bee2.png'
import axios from "axios";
import { URL } from "../../config";
import { toast } from "react-toastify";

const updateUri = URL + "products/";

const DefaultModal = ({
  maxWidth,
  open,
  onClose,
  product,
  updateProduct,
}) => {
  const [productName, setProductName] = useState(product.product_name);
  const [price, setPrice] = useState(product.price);
  const [newStock, setNewStock] = useState(product.stock);
  const [product_description, setProductDescription] = useState(product.product_description);

  const styles = (theme) => ({
    root: {
      margin: 0,
      padding: theme.spacing(2),
    },
    closeButton: {
      position: "absolute",
      right: theme.spacing(1),
      top: theme.spacing(1),
      color: theme.palette.grey[500],
    },
  });

  const DialogTitle = withStyles(styles)((props) => {
    const { children, classes, onClose, ...other } = props;
    return (
      <MuiDialogTitle disableTypography className={classes.root} {...other}>
        <Typography variant="h6">{children}</Typography>
        {onClose ? (
          <IconButton
            aria-label="close"
            className={classes.closeButton}
            onClick={onClose}
          >
            <i className="fa fa-close"></i>
          </IconButton>
        ) : null}
      </MuiDialogTitle>
    );
  });
  
  //Handle the update of the stock
  const updateProductInfo = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(updateUri + id, {
        name: productName,
        stock: parseFloat(newStock), // Ensure numerical value for stock
        product_name: productName,
        price: parseFloat(price),
        product_description: product_description,
      },
      {
        headers: {
          "x-access-token": token,
        },
      });
      window.location.reload();
      updateProduct(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  // Actualiza los estados cuando el producto cambia
  useEffect(() => {
    if (product) {
      setProductName(product.product_name);
      setPrice(product.price);
      setNewStock(product.stock);
      setProductDescription(product.product_description);
    }
  }, [product]);
  
  return (
    <Fragment>
      <Dialog
        open={open}
        onClose={onClose}
        className="modalWrapper quickview-dialog"
        maxWidth={maxWidth}
      >
        <DialogTitle
          id="customized-dialog-title"
          onClose={onClose}
        />
        <Grid className="modalBody modal-body">
          <div className="product-details">
            <div className="row align-items-center">
              <div className="">
                <div className="product-single-content">
                  <br/>
                  <h3>Update product</h3>
                  <label><b>Name:</b></label>
                  <input
                    type="text"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                  />
                  <p></p>
                  <label><b>Price:</b></label>
                  <input
                    style={{ width: '100%' }}
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                  <p></p>
                  <label><b>Description:</b></label>
                  <textarea 
                    style={{width:'100%', height:'200px'}} 
                    value={product_description}
                    onChange={(e) => setProductDescription(e.target.value)}
                    />
                  <p></p>
                  <label><b>Stock:</b></label>
                  <input
                    style={{ width: '100%' }}
                    type="number"
                    name="new_stock"
                    id="new_stock"
                    step="1.00"
                    min="0"
                    value={newStock}
                    onChange={(e) => setNewStock(e.target.value)}
                  />
                  <p></p>                  
                  <button className="btn theme-btn" onClick={() => updateProductInfo(product.id)}>
                    Update
                  </button>
                  <div className="m-shape">
                    <img src={bee} alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Grid>
      </Dialog>
    </Fragment>
  );
};
export default DefaultModal;
