"use client";
import React, { useRef } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";


const Page = () => {
  const router = useRouter();

  const usernameOrEmailRef = useRef();
  const passwordRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      username: usernameOrEmailRef.current.value,
      email: usernameOrEmailRef.current.value,
      password: passwordRef.current.value,
    };

    try {
      const res = await axios.post("http://localhost:4000/api/auth/login", data, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      console.log("Login success:", res.data);
      router.push("/dashboard");
    } catch (err) {
      console.error("Login error:", err.response?.data || err.message);
      alert(err.response?.data?.error || "Login failed!");
    }
  };
  
  const authSign = async (provider) => {
      
      try {
  
          await signIn(provider ,{
              callbackUrl : 'http://localhost:3000/dashboard',
              redirect : true
          } )
          
      } catch (error) {
          console.log(error);
      }
      
  }
  

  return (
    <div>
      <div className="radient-bg">
        <div className="radient-blur purple-blur"></div>
        <div className="radient-blur pink-blur"></div>
      </div>

      <div className="relative min-h-screen flex flex-col items-center justify-center px-4">
        <div className="text-center mb-8">
          <Link href="/" className="flex items-center justify-center space-x-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-purple-400"
            >
              <polyline points="16 18 22 12 16 6"></polyline>
              <polyline points="8 6 2 12 8 18"></polyline>
            </svg>
            <h1 className="text-3xl font-bold text-white">Code-Assist</h1>
          </Link>
          <p className="text-gray-400 mt-2">
            Login to your account to continue.
          </p>
        </div>

        <div className="w-full max-w-md p-8 space-y-6 rounded-xl orm-container">
          {/* <form onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="usernameOrEmail"
                className="text-sm font-medium text-gray-300"
              >
                Username or Email
              </label>
              <input
                ref={usernameOrEmailRef}
                type="text"
                id="usernameOrEmail"
                name="usernameOrEmail"
                required
                className="mt-1 block w-full px-4 py-3 rounded-md orm-input text-white transition"
                placeholder="username or email@work.com"
              />
            </div>

            <div>
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-300"
              >
                Password
              </label>
              <input
                ref={passwordRef}
                type="password"
                id="password"
                name="password"
                required
                className="mt-1 block w-full px-4 py-3 rounded-md orm-input text-white transition"
                placeholder="••••••••"
              />
            </div>

            <div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-600 to-pink-600 
                       hover:from-pink-600 hover:to-purple-600 
                       text-white font-bold py-3 px-8 rounded-lg 
                       transition-colors duration-500 ease-in-out 
                       shadow-lg shadow-purple-600/30 text-lg mt-4"
              >
                Login
              </button>
            </div>
          </form> */}
          <div className="flex gap-4">

            <button
              className="w-[360px] h-12 
             flex items-center justify-center gap-3
             bg-gradient-to-r from-orange-500 to-orange-700
             hover:from-orange-600 hover:to-orange-700
             text-white font-bold px-8 rounded-lg
             transition-all duration-300 ease-in-out
             shadow-lg shadow-orange-500/30 text-lg mt-4"
             onClick={() => authSign('google')}
            >Google
            </button>


            <button
              type="submit"
              className="w-[360px] h-12 
             flex items-center justify-center gap-3
             bg-gradient-to-r from-gray-500 to-gray-700
             hover:from-gray-600 hover:to-gray-700
             text-white font-bold px-8 rounded-lg cursor-pointer
             transition-all duration-300 ease-in-out
             shadow-lg shadow-gray-500/30 text-lg mt-4"
             onClick={() => authSign('github')}
            >Github
            </button>


          </div>

          <div className="text-center text-gray-400">
            <p>
              Don't have an account?{" "}
              <a
                href="/signup"
                className="font-medium text-purple-400 hover:text-purple-300"
              >
                Sign up
              </a>
            </p>
          </div>
        </div>
        <footer className="absolute bottom-4 text-center w-full">
          <p className="text-gray-500 text-sm">
            &copy; 2024 Code-Assist. All rights reserved.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Page;