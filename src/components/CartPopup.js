import React from "react";
import { useSelector } from "react-redux";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  List,
  ListItem,
  ListItemText,
  Button,
} from "@mui/material";

const CartPopup = ({ open, onClose }) => {
  const cartItems = useSelector((state) => state.cart.items);
  const cartTotal = cartItems.reduce((total, item) => total + item.price, 0);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Your Cart</DialogTitle>
      <DialogContent>
        <List>
          {cartItems.map((item) => (
            <ListItem key={item.id}>
              <ListItemText
                primary={item.name}
                secondary={`Price: ${item.price}`}
              />
            </ListItem>
          ))}
        </List>
        <div style={{ marginTop: "16px", textAlign: "right" }}>
          <strong>Total: ${cartTotal.toFixed(2)}</strong>
        </div>
        <Button
          variant="outlined"
          onClick={onClose}
          style={{ marginTop: "16px" }}
        >
          Close
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default CartPopup;
