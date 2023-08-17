import React, { useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";

const CreateProductForm = ({ open, onClose, onCreate }) => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productImage, setProductImage] = useState(null);

  const handleProductNameChange = (event) => {
    setProductName(event.target.value);
  };

  const handleProductPriceChange = (event) => {
    setProductPrice(event.target.value);
  };

  const handleProductImageChange = (event) => {
    const file = event.target.files[0];
    setProductImage(file);
  };

  const handleCreate = () => {
    if (productName && productPrice) {
      const newProduct = {
        id: Date.now(),
        prodName: productName,
        prodPrice: parseFloat(productPrice),
        prodImage: URL.createObjectURL(productImage),
      };

      onCreate(newProduct);
      onClose();
      setProductName("");
      setProductPrice("");
      setProductImage(null);
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create New Product</DialogTitle>
      <DialogContent>
        <Box>
          <TextField
            label="Product Name"
            variant="outlined"
            fullWidth
            value={productName}
            onChange={handleProductNameChange}
          />
          <TextField
            label="Product Price"
            variant="outlined"
            fullWidth
            value={productPrice}
            onChange={handleProductPriceChange}
            type="number"
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleProductImageChange}
          />
        </Box>
        <Button variant="contained" onClick={handleCreate}>
          Create
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProductForm;
