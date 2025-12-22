import { useState } from "react";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { isTokenExpired } from "./auth";

function App() {
  const [loggedIn, setLoggedIn] = useState(
    localStorage.getItem("access") &&
    !isTokenExpired(localStorage.getItem("access"))
  );

  return loggedIn
    ? <Dashboard />
    : <Login onLogin={() => setLoggedIn(true)} />;
}

export default App;
