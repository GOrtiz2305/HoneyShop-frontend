import React, { Fragment, useState } from "react";
import { Dialog, Grid, Button } from "@material-ui/core";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import bee from '../../images/bee2.png'
import axios from "axios";
import { URL } from "../../config";

const updateUri = URL + "products/";

const DefaultModal = ({
  maxWidth,
  open,
  onClose,
  product,
  updateProduct,
}) => {
  const [productName, setProductName] = useState();
  const [price, setPrice] = useState();
  const [newStock, setNewStock] = useState("");

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
  const updateStock = async (id) => {
    try {
      const response = await axios.put(updateUri + id, {
        stock: parseFloat(newStock), // Ensure numerical value for stock
        product_name: productName,
      });
      updateProduct(response.data);
      onClose(); // Close the modal after successful update
    } catch (error) {
      console.error(error);
    }
  };

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
                  <h3>{product.id}</h3>
                  <input
                    style={{ width: '100%' }}
                    type="text"
                    placeholder={product.product_name}
                    onChange={(e) => setProductName(e.target.value)}
                  />
                  <p></p>
                  <input
                    style={{ width: '100%' }}
                    type="number"
                    placeholder={product.price}
                    onChange={(e) => setPrice(e.target.value)}
                  />
                  <p></p>
                  <textarea style={{width:'150%', height:'200px'}} placeholder={product.product_description}></textarea>
                  <p></p>
                  <input
                    style={{ width: '150%' }}
                    type="number"
                    name="new_stock"
                    id="new_stock"
                    step="1.00"
                    min="0"
                    placeholder={product.stock}
                    onChange={(e) => setNewStock(e.target.value)}
                  />
                  <p></p>
                  <button className="btn theme-btn" onClick={() => updateStock(product.id)}>
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
