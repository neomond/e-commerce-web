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
  Box,
} from "@mui/material";
import { Close, ShoppingBasket } from "@mui/icons-material";
import { decrementQuantity, incrementQuantity } from "../redux/actions";
import { fontStyles, listItemStyles, popUpEmptyStyles } from "../styles/styles";

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
    <Dialog open={open} onClose={onClose} maxWidth="md">
      <DialogTitle sx={{ ...listItemStyles, mt: 1.5 }}>
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
          <Box style={{ ...popUpEmptyStyles }}>
            <ShoppingBasket sx={{ fontSize: 100, color: "#999" }} />
            <Typography variant="h5" align="center" my={2}>
              You have no products.
            </Typography>
          </Box>
        ) : (
          <List>
            {cartItems.map((item, index) => (
              <ListItem
                key={item.id}
                sx={{
                  borderBottom:
                    index < cartItems.length - 1 && "1px solid #e3e3e3",
                  py: 3,
                  ...listItemStyles,
                }}
              >
                <Box
                  component="img"
                  sx={{
                    width: "150px",
                    marginRight: "30px",
                  }}
                  alt={item.prodName}
                  src={item.prodImage}
                />
                <Box style={{ flexDirection: "column" }}>
                  <ListItemText
                    primary={`${item.prodName}`}
                    secondary={`$ ${item.prodPrice} x (${item.quantity})`}
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
                </Box>
              </ListItem>
            ))}
            <Box sx={{ ...listItemStyles }}>
              <Typography sx={{ ...fontStyles }}>Total: </Typography>
              <Typography sx={{ ...fontStyles }}>
                ${cartTotal.toFixed(2)}
              </Typography>
            </Box>
          </List>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CartPopup;
