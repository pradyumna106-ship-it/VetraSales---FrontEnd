import { useState,useEffect } from "react";
import { Button } from "./components/ui/button";
import { useNavigate } from "react-router-dom";
import { loginUser } from "./services/authenticator";
export default function Welcome() {
  const navigate = useNavigate();
  useEffect(() => {
    loadAuthenticate()
  },[])

  const loadAuthenticate = async () => {
    const res = await loginUser()
    console.log(res)
  }

  /* 🔹 WELCOME SCREEN */
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 gap-4">
      <h2 className="text-xl font-semibold">
        Welcome to Vetra-Sales
      </h2>

      <div className="flex gap-4">
        <Button className="btn btn-primary "  onClick={() => navigate('/sign_in_page')}>
        SIGN IN
      </Button>
      <Button className="btn btn-secondary" onClick={() => navigate('/sign_up_page')}>
        SIGN UP
      </Button>
      </div>
    </div>
  );
}
