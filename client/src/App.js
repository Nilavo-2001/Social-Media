import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import HomePage from "scenes/homePage";
import LoginPage from "scenes/loginPage";
import ProfilePage from "scenes/profilePage";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";
function App() {
  const mode = useSelector((state) => state.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  const isAuth = Boolean(useSelector((state) => state.token));
  return (
    <div className="app">
      <ThemeProvider theme={theme}>
        {/* css reset to remove the default browser css */}
        <CssBaseline />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={(isAuth) ? <HomePage /> : <LoginPage />} />
            <Route path="/home" element={(isAuth) ? <HomePage /> : <LoginPage />} />
            <Route path="/profile/:userId" element={(isAuth) ? <ProfilePage /> : <LoginPage />} />
            <Route />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </div>
  );
}

export default App;
