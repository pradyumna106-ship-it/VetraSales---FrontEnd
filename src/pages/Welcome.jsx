import { useState } from "react";
import { Button } from "./components/ui/button";
import Customer from "./Customer";
import Admin from "./Admin";
import SignInPage from "./components/SignInPage";
import SignUpPage from "./components/SignUpPage";

export default function Welcome() {
  const [user, setUser] = useState(
    localStorage.getItem("username")
      ? {
          username: localStorage.getItem("username"),
          role: localStorage.getItem("role"),
        }
      : null
  );

  const [view, setView] = useState("welcome"); // welcome | signin | signup

  const handleLogin = (userData) => {
    localStorage.setItem("username", userData.username);
    localStorage.setItem("role", userData.role);
    setUser(userData);
    setView("dashboard");
  };

  const handleBack = () => {
    setView("welcome");
  };

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
    setView("welcome");
  };

  /* 🔹 AUTH PAGES */
  if (!user && view === "signin") {
    return <SignInPage onLogin={handleLogin} onBack={handleBack} />;
  }

  if (!user && view === "signup") {
    return <SignUpPage onBack={handleBack} />;
  }

  /* 🔹 ROLE-BASED DASHBOARD */
  if (user) {
    if (user.role === "admin") {
      return <Admin onLogout={handleLogout} />;
    }
    if (user.role === "customer") {
      return <Customer onLogout={handleLogout} />;
    }
  }

  /* 🔹 WELCOME SCREEN */
  return (
    <div className="flex items-center justify-between p-4 bg-gray-100 rounded-lg">
      <h2 className="text-lg font-semibold">
        Welcome to Vetra-Sales
      </h2>

      <div className="flex gap-3">
        <Button
          onClick={() => setView("signin")}
          className="bg-blue-600 hover:bg-blue-700 text-white"
        >
          Sign In
        </Button>

        <Button
          onClick={() => setView("signup")}
          className="bg-green-600 hover:bg-green-700 text-white"
        >
          Sign Up
        </Button>
      </div>
    </div>
  );
}
