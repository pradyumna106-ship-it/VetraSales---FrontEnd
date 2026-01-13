import React,{ useState,useEffect } from "react";
import { Button } from "./components/ui/button";
import { useNavigate } from "react-router-dom";
import { loginUser } from "./services/authenticator";
import { Zero } from "./components/Zero";
import { useRef } from "react";
import { Toaster } from 'sonner';

export default function Welcome() {
  const navigate = useNavigate();
  const aboutRef = useRef(null);
  const contactRef = useRef(null);
  const loadAuthenticate = async () => {
    const res = await loginUser()
    console.log(res)
  }
  const handlelogin = async() => {
    navigate('/sign_in_page')
    const res = await loadAuthenticate()
    console.log(res);
  }
  const handleSingup = async() => {
    navigate('/sign_up_page')
    const res = await loadAuthenticate()
    console.log(res);
  }
  /* 🔹 WELCOME SCREEN */
  return (
    <div className="min-h-screen w-full bg-white-100">
      <header>
        <div className="w-full px-10 pt-6 flex items-center justify-between">
          {/* Logo / Brand */}
          <div className="flex items-center gap-2">
            <img
              src="https://github.com/pr4dyumn4/VetraSales---FrontEnd/blob/3190d00704950146fb8da5ce85f6c3a71da798e4/src/assets/svgviewer-png-output.png"
              alt="Vetra Sales"
              className="w-10 h-10 object-contain"
            />
            <span className="text-black text-xl font-semibold">
              Vetra-Sales
            </span>
          </div>
          {/* Actions */}
          <div className="flex gap-4 items-center-safe">
            <Button variant="ghost" onClick={() => handlelogin()} className="py-3 rounded-full hover:bg-[#4B3F1A]/10 transition-colors">
              Sign In
            </Button>
            <div className="h-6 w-px bg-white/40"/>
            <Button onClick={() => handleSingup()} className="py-3 rounded-full hover:bg-[#4B3F1A]/10 transition-colors">
              Sign Up
            </Button>
          </div>
        </div>
      </header>

      <Zero onSignIn={() => handlelogin()} onSignUp={() => handleSingup()}/>
         {/* FEATURES */}
      <section className="py-16">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">

            <div>
              <div className="w-16 h-16 bg-[#D9C88A]-100 rounded-full flex items-center justify-center mx-auto mb-4">
                🚚
              </div>
              <h3 className="text-xl font-semibold mb-2">Free Shipping</h3>
              <p className="text-gray-600">On orders over $50</p>
            </div>

            <div>
              <div className="w-16 h-16 bg-[#D9C88A]-100 rounded-full flex items-center justify-center mx-auto mb-4">
                ✨
              </div>
              <h3 className="text-xl font-semibold mb-2">Quality Products</h3>
              <p className="text-gray-600">Premium pet supplies</p>
            </div>

            <div>
              <div className="w-16 h-16 bg-[#D9C88A]-100 rounded-full flex items-center justify-center mx-auto mb-4">
                💝
              </div>
              <h3 className="text-xl font-semibold mb-2">Happy Pets</h3>
              <p className="text-gray-600">Satisfaction guaranteed</p>
            </div>

          </div>
        </div>
      </section>

      {/* ABOUT SECTION */}
      <section ref={aboutRef} className="py-20">
      <div className="mx-auto px-4 text-center">
        <h2 className="text-4xl font-semibold mb-6 ">About Vetra Sales</h2>
        <br/><br/>
        <p className="text-gray-600 leading-relaxed max-w-3xl mx-auto">
          Vetra Sales is a modern pet e-commerce platform offering premium
          quality products for pets. Our mission is to make pet care easy,
          affordable, and joyful.
        </p>
      </div>
    </section>


      {/* CONTACT SECTION */}
      <footer ref={contactRef} className="bg-black text-white py-16">
        <div className="mx-auto px-4 max-w-5xl">
          <h2 className="text-3xl mb-6">Contact Us</h2>

          <p>Email: support@vetrasales.com</p>
          <p>Phone: +91 98765 43210</p>
          <p>Location: Bengaluru, India</p>

          <p className="mt-8 text-sm text-gray-400">
            © 2025 Vetra Sales. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
