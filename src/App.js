import { Container, CssBaseline, Paper } from "@mui/material";
import ProductList from "./components/ProductList";
import { Route, Routes } from "react-router-dom";
import DetailsPage from "./components/DetailsPage";
import { AnimatePresence } from "framer-motion";

function App() {
  return (
    <AnimatePresence mode="wait">
      <Container component="main" maxWidth="lg">
        <CssBaseline />
        <Paper elevation={4} sx={{ my: 2 }}>
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/:id" element={<DetailsPage />} />
          </Routes>
        </Paper>
      </Container>
    </AnimatePresence>
  );
}

export default App;
