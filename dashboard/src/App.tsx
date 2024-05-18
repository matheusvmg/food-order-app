import { ThemeProvider } from "styled-components";
import "./App.css";
import { LoginPage } from "./pages/Login";
import { theme } from "./theme/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <LoginPage />
    </ThemeProvider>
  );
}

export default App;
