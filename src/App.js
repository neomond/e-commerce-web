import { Container, CssBaseline, Grid, Paper, Typography } from "@mui/material";
import ProductList from "./components/ProductList";

function App() {
  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      {/* <Typography variant="h3" align="center" gutterBottom>
        Redux Toolkit Example with Material-UI
      </Typography> */}
      {/* <Grid container spacing={5}> */}
      {/* <Grid> */}
      <Paper elevation={3}>
        <ProductList />
      </Paper>
      {/* </Grid> */}
      {/* </Grid> */}
    </Container>
  );
}

export default App;
