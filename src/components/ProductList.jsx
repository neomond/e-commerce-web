import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../redux/actions";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  List,
  ListItem,
  Stack,
  Typography,
} from "@mui/material";

import {
  Create,
  ShoppingCart,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import CartPopup from "./CartPopup";
import { API_URL } from "../utils/API_URL";
import {
  buttonStyles,
  cardTextStyles,
  cartBtnStyles,
  cartItemCountStyles,
  imageStyles,
  navStyles,
  navTextStyles,
} from "../styles/styles";
import { Link } from "react-router-dom";
import CreateProductForm from "./CreateProductPage";
import AnimatedPage from "../styles/AnimatedPage";

const ProductList = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [cartPopupOpen, setCartPopupOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const cartItems = useSelector((state) => state.cart.items);

  const [createDialogOpen, setCreateDialogOpen] = useState(false);

  const handleCreateProduct = (newProduct) => {
    setProducts([...products, newProduct]);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setProducts(data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const handleOpenCartPopup = (e) => {
    e.preventDefault();
    setCartPopupOpen(true);
  };

  const handleCloseCartPopup = () => {
    setCartPopupOpen(false);
  };

  const cartItemCount = cartItems.reduce(
    (count, item) => count + item.quantity,
    0
  );

  return (
    <AnimatedPage>
      <Box pt={4} pb={2} px={4} sx={{ ...navStyles }}>
        <Button onClick={() => setCreateDialogOpen(true)}>
          <Create sx={{ fontSize: 30 }} />
        </Button>
        <Typography variant="h4" sx={{ ...navTextStyles }}>
          Product List
        </Typography>
        <Button sx={{ ...cartBtnStyles }} onClick={handleOpenCartPopup}>
          {cartItemCount > 0 ? (
            <ShoppingCartOutlined sx={{ fontSize: 30 }} />
          ) : (
            <ShoppingCart sx={{ fontSize: 30 }} />
          )}
          {cartItemCount > 0 && (
            <Typography style={{ ...cartItemCountStyles }}>
              {cartItemCount}
            </Typography>
          )}
        </Button>
      </Box>
      <List>
        {isLoading ? (
          <Box display="flex" justifyContent="center" my={4}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container justifyContent="center" spacing={2}>
            {products.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product.id}>
                <ListItem>
                  <Link
                    to={`/${product.id}`}
                    style={{ textDecoration: "none" }}
                  >
                    <Card sx={{ mx: 2, px: 2, pt: 2 }}>
                      <CardMedia
                        component="img"
                        height="250"
                        image={product.prodImage}
                        sx={{ ...imageStyles }}
                      />
                      <CardContent>
                        <Box sx={{ ...cardTextStyles }}>
                          <Typography variant="h6">
                            {product.prodName}
                          </Typography>
                          <Typography variant="h6" fontWeight={"600"}>
                            ${product.prodPrice}
                          </Typography>
                        </Box>
                        <Stack sx={{ my: 2 }} direction="row" spacing={2}>
                          <Button
                            variant="contained"
                            sx={{ ...buttonStyles }}
                            onClick={(e) => {
                              e.preventDefault();
                              handleAddToCart(product);
                            }}
                          >
                            Add to Cart
                          </Button>
                          <Button
                            variant="outlined"
                            sx={{ ...buttonStyles }}
                            onClick={handleOpenCartPopup}
                          >
                            View Cart
                          </Button>
                        </Stack>
                      </CardContent>
                    </Card>
                  </Link>
                </ListItem>
              </Grid>
            ))}
          </Grid>
        )}
      </List>
      <CartPopup open={cartPopupOpen} onClose={handleCloseCartPopup} />
      <CreateProductForm
        open={createDialogOpen}
        onClose={() => setCreateDialogOpen(false)}
        onCreate={handleCreateProduct}
      />
    </AnimatedPage>
  );
};

export default ProductList;
