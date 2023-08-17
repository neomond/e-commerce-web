import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  Button,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";

const CreateProductForm = ({ open, onClose, onProductCreate }) => {
  const [productName, setProductName] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productImage, setProductImage] = useState(null);
  const [productDescription, setProductDescription] = useState("");

  const handleCreate = () => {
    if (productName && productPrice && productImage && productDescription) {
      const newProduct = {
        id: uuidv4(),
        prodName: productName,
        prodPrice: parseFloat(productPrice),
        prodImage: URL.createObjectURL(productImage),
        prodDescription: productDescription,
      };
      onProductCreate(newProduct);
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Create New Product</DialogTitle>
      <DialogContent>
        <TextField
          label="Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Product Price"
          value={productPrice}
          onChange={(e) => setProductPrice(e.target.value)}
          fullWidth
          margin="normal"
        />
        <TextField
          type="file"
          accept="image/*"
          onChange={(e) => setProductImage(e.target.files[0])}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Product Description"
          value={productDescription}
          onChange={(e) => setProductDescription(e.target.value)}
          fullWidth
          multiline
          margin="normal"
        />
        <Button variant="contained" onClick={handleCreate}>
          Create
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProductForm;
