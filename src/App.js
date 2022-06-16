import StepModal from "./StepModal";
import { CssBaseline, Container, Paper, Box } from "@material-ui/core";

function App() {
  return (
    <>
      <CssBaseline />
      <Container component={Box} p={4}>
        <Paper component={Box} p={3}>
          <StepModal />
        </Paper>
      </Container>
    </>
  );
}

export default App;