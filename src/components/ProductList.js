import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/actions";
import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Grid,
  List,
  ListItem,
  Typography,
} from "@mui/material";
import { Create, ShoppingCart } from "@mui/icons-material";
import CartPopup from "./CartPopup";

const API_URL = "https://64dcd381e64a8525a0f73303.mockapi.io/products";

const ProductList = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [cartPopupOpen, setCartPopupOpen] = useState(false);

  console.log(products);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      // console.error("Error fetching products:", error);
    }
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
  };

  const handleOpenCartPopup = () => {
    setCartPopupOpen(true);
  };

  const handleCloseCartPopup = () => {
    setCartPopupOpen(false);
  };

  return (
    <div>
      <Typography
        variant="h4"
        textAlign="center"
        pt={4}
        pb={2}
        px={4}
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        <Button
          sx={{ minWidth: 0, padding: 0 }}
          onClick={() => console.log("Create button clicked")}
        >
          <Create sx={{ fontSize: 30 }} />
        </Button>
        Product List
        <Button sx={{ minWidth: 0, padding: 0 }} onClick={handleOpenCartPopup}>
          <ShoppingCart sx={{ fontSize: 30 }} />
        </Button>
      </Typography>
      <List>
        <Grid container>
          {products.map((product) => (
            <Grid item xs={4} key={product.id}>
              <ListItem>
                <Card sx={{ mx: 2, px: 2, pt: 2 }}>
                  <CardMedia
                    component="img"
                    height="250"
                    image={product.prodImage}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      objectFit: "contain",
                    }}
                  />
                  <CardContent>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                      }}
                    >
                      <Typography variant="h6">{product.prodName}</Typography>
                      <Typography variant="h6" fontWeight={"600"}>
                        ${product.prodPrice}
                      </Typography>
                    </div>
                    <Grid
                      container
                      justifyContent="space-between"
                      my={2}
                      sx={{ width: "100%" }}
                    >
                      <Button
                        variant="contained"
                        sx={{
                          marginRight: 1,
                          fontSize: 12,
                          width: 120,
                          height: 40,
                        }}
                        onClick={() => handleAddToCart(product)}
                      >
                        Add to Cart
                      </Button>
                      <Button
                        variant="outlined"
                        sx={{ marginLeft: 1, fontSize: 12, width: 120 }}
                        onClick={handleOpenCartPopup}
                      >
                        View Cart
                      </Button>
                    </Grid>
                  </CardContent>
                </Card>
              </ListItem>
            </Grid>
          ))}
        </Grid>
      </List>
      <CartPopup open={cartPopupOpen} onClose={handleCloseCartPopup} />
    </div>
  );
};

export default ProductList;
