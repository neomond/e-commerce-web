import React from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  Typography,
  IconButton,
  Button,
  Stack,
} from "@mui/material";
import { Close, ShoppingBasket } from "@mui/icons-material";

import { decrementQuantity, incrementQuantity } from "../redux/actions";

const CartPopup = ({ open, onClose }) => {
  const cartItems = useSelector((state) => state.cart.items);
  const cartTotal = cartItems.reduce(
    (total, item) => total + item.prodPrice * item.quantity,
    0
  );
  const dispatch = useDispatch();

  const handleIncrement = (item) => {
    dispatch(incrementQuantity(item.id));
  };

  const handleDecrement = (item) => {
    dispatch(decrementQuantity(item.id));
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm">
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h5" sx={{ mx: "auto" }}>
          Your Cart
        </Typography>
        <IconButton
          edge="end"
          color="inherit"
          onClick={onClose}
          aria-label="close"
        >
          <Close />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        {cartItems.length === 0 ? (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <ShoppingBasket sx={{ fontSize: 100, color: "#999" }} />
            <Typography variant="h5" align="center" mt={2}>
              You have no products here.
            </Typography>
          </div>
        ) : (
          <List>
            {cartItems.map((item, index) => (
              <ListItem
                key={item.id}
                sx={{
                  borderBottom:
                    index < cartItems.length - 1 && "1px solid #e3e3e3",
                  py: 3,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <img
                  src={item.prodImage}
                  alt={item.prodName}
                  style={{
                    width: "150px",
                    marginRight: "30px",
                  }}
                />
                <div style={{ flexDirection: "column" }}>
                  <ListItemText
                    primary={`${item.prodName}`}
                    secondary={`$ ${item.prodPrice} x ${item.quantity}`}
                  />

                  <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
                    <Button
                      variant="outlined"
                      size="small"
                      color="error"
                      onClick={() => handleDecrement(item)}
                      // disabled={item.quantity === 1}
                    >
                      delete
                    </Button>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => handleIncrement(item)}
                    >
                      add
                    </Button>
                  </Stack>
                </div>
              </ListItem>
            ))}
            <div style={{ textAlign: "right", fontSize: 22 }}>
              <strong>Total: ${cartTotal.toFixed(2)}</strong>
            </div>
          </List>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CartPopup;
