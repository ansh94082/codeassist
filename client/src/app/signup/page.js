"use client";
import React, { useRef } from "react";
import { signIn } from "next-auth/react";
import Link from "next/link";

const Page = () => {


  const authSign = async (provider) => {
    await signIn(provider, {
      callbackUrl: "/dashboard", // IMPORTANT
    });
  };

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
            Create an account to start collaborating.
          </p>
        </div>

        <div className="w-full max-w-md p-8 space-y-6 rounded-xl orm-container">
        
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
             text-white font-bold px-8 rounded-lg
             transition-all duration-300 ease-in-out
             shadow-lg shadow-gray-500/30 text-lg mt-4"
              onClick={() => authSign('github')}
            >Github
            </button>


          </div>

          <div className="text-center text-gray-400">
            <p>
              Already have an account?{" "}
              <a
                href="/login"
                className="font-medium text-purple-400 hover:text-purple-300"
              >
                Login
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
