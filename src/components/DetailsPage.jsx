import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Typography,
} from "@mui/material";
import { API_URL } from "../utils/API_URL";
import { imageStyles } from "../styles/styles";
import AnimatedPage from "../styles/AnimatedPage";

const DetailsPage = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const response = await fetch(`${API_URL}/${id}`);
      const data = await response.json();
      setProduct(data);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" my={4}>
        <CircularProgress />
      </Box>
    );
  }

  const handleBackClick = () => {
    navigate(-1);
  };

  return (
    <AnimatedPage>
      <Box sx={{ my: 4, pb: 5, px: 3 }}>
        <Button onClick={handleBackClick} sx={{ m: 1 }}>
          Back
        </Button>
        <Card sx={{ mx: 2, px: 2, pt: 2 }}>
          <CardMedia
            component="img"
            sx={{ ...imageStyles }}
            image={product.prodImage}
            alt={product.prodName}
          />
          <CardContent>
            <Typography variant="h5">{product.prodName}</Typography>
            <Typography>{product.prodDescription}</Typography>
            <Typography variant="h6" fontWeight="600">
              ${product.prodPrice}
            </Typography>
          </CardContent>
        </Card>
      </Box>
    </AnimatedPage>
  );
};

export default DetailsPage;
