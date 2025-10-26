import React, { useState, useEffect } from "react";
import LoginForm from "./components/LoginForm";
import Dashboard from "./components/Dashboard";

export default function App() {
  const [programs, setPrograms] = useState([]);
  const [token, setToken] = useState(() => localStorage.getItem("token") || null);


  useEffect(() => {
    fetch("http://localhost:5000/programs")
      .then((res) => res.json())
      .then((data) => setPrograms(data))
      .catch((err) => console.error("Error fetching programs:", err));
  }, []);

  if (!token) {
    return <LoginForm programs={programs} setToken={setToken} />;
  }

  return <Dashboard token={token} />;
}
