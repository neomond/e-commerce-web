import { Container, CssBaseline, Paper } from "@mui/material";
import ProductList from "./components/ProductList";

function App() {
  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <Paper elevation={4}>
        <ProductList />
      </Paper>
    </Container>
  );
}

export default App;
