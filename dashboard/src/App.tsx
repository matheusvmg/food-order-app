import { ThemeProvider } from "styled-components";
import "./App.css";
import { theme } from "@theme/index";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginPage } from "@pages/Login";
import { RegisterPage } from "@pages/Register";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" Component={LoginPage} />
          <Route path="/login" Component={LoginPage} />
          <Route path="/register" Component={RegisterPage} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
