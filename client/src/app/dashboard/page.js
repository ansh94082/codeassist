"use client";

import React, { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useSession, signOut } from "next-auth/react";
import Link from "next/link";

export default function DashboardPage() {
  const router = useRouter();
  const { data: session, status } = useSession();

  const [showCreateSession, setShowCreateSession] = useState(false);
  const [showJoinSession, setShowJoinSession] = useState(false);
  const [sessionCode, setSessionCode] = useState("");
  const [joinCode, setJoinCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const ws = useRef(null);
  const isNavigating = useRef(false);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/");
    }
  }, [status, router]);

  useEffect(() => {
    return () => {
      if (!isNavigating.current && ws.current) {
        ws.current.close();
      }
    };
  }, []);

  const handleCreateSession = () => {
    if (showJoinSession) setShowJoinSession(false);

    if (showCreateSession) {
      setShowCreateSession(false);
      if (ws.current) {
        ws.current.close();
        ws.current = null;
      }
      return;
    }

    setShowCreateSession(true);
    setIsLoading(true);

    ws.current = new WebSocket("ws://localhost:8080");

    ws.current.onopen = () => {
      ws.current.send(JSON.stringify({ type: "create_session" }));
    };

    ws.current.onmessage = (event) => {
      const msg = JSON.parse(event.data);
      if (msg.type === "session_created") {
        setSessionCode(msg.code);
        setIsLoading(false);
      }
    };

    ws.current.onerror = () => {
      setSessionCode("ERROR");
      setIsLoading(false);
    };
  };

  const handleJoinSessionSubmit = (e) => {
    e.preventDefault();
    if (!joinCode.trim()) return;
    isNavigating.current = true;
    router.push(`/dashboard/project/${joinCode.trim().toUpperCase()}`);
  };

  const handleStartSession = () => {
    if (!sessionCode || sessionCode === "ERROR") {
      alert("Invalid session code");
      return;
    }
    
    isNavigating.current = true;
    router.push(`/dashboard/project/${sessionCode}`);
  };

  if (status === "loading") {
    return (
      <div className="h-screen flex items-center justify-center text-white bg-black">
        Loading Auth...
      </div>
    );
  }

  return (
    <div className="min-h-screen text-gray-200 relative">
      <div className="fixed inset-0 -z-10 bg-[#0c0a09]">
        <div className="absolute w-[50vw] h-[50vw] rounded-full blur-[100px] top-[-10%] right-[-10%] bg-purple-500/20" />
        <div className="absolute w-[50vw] h-[50vw] rounded-full blur-[100px] bottom-[-10%] left-[-10%] bg-pink-500/20" />
      </div>

      <header className="py-4 px-6 bg-black/20 backdrop-blur border-b border-white/5">
        <nav className="flex justify-between items-center max-w-7xl mx-auto">
          <Link href="/">
            <h1 className="text-2xl font-bold text-white">Code-Assist</h1>
          </Link>
          <div className="flex items-center gap-4">
            <span className="text-gray-300">
              Welcome, <span className="text-white font-bold">{session?.user?.name || session?.user?.email}</span>
            </span>
            <button 
              onClick={() => signOut({ callbackUrl: "/" })} 
              className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-md"
            >
              Logout
            </button>
          </div>
        </nav>
      </header>

      <main className="flex flex-col items-center justify-center pt-32 px-4">
        <h2 className="text-5xl font-bold text-white tracking-tight">Dashboard</h2>
        <p className="text-gray-400 mt-4 text-lg">Collaborate in real-time with your team.</p>

        <div className="mt-12 flex gap-4">
          <button 
            onClick={handleCreateSession} 
            className="bg-gradient-to-r from-purple-600 to-pink-600 px-10 py-4 rounded-xl font-bold text-lg hover:scale-105 transition-transform"
          >
            Create New Session
          </button>
          <button 
            onClick={() => { 
              setShowJoinSession(!showJoinSession); 
              setShowCreateSession(false); 
            }} 
            className="bg-white/10 hover:bg-white/20 px-10 py-4 rounded-xl font-bold text-lg transition-colors"
          >
            Join Existing
          </button>
        </div>

        {showCreateSession && (
          <div className="mt-10 p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-xl text-center w-full max-w-md">
            <h3 className="text-xl font-bold text-white">Share Session Code</h3>
            <div className="my-6 p-5 bg-black/40 rounded-xl text-4xl font-mono tracking-[0.2em] text-purple-400 border border-purple-500/30">
              {isLoading ? "..." : sessionCode}
            </div>
            <button 
              onClick={handleStartSession} 
              disabled={isLoading || !sessionCode || sessionCode === "ERROR"} 
              className="w-full bg-green-600 hover:bg-green-700 py-4 rounded-xl font-bold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Enter Editor
            </button>
          </div>
        )}

        {showJoinSession && (
          <form onSubmit={handleJoinSessionSubmit} className="mt-10 flex gap-3 w-full max-w-md">
            <input 
              value={joinCode} 
              onChange={(e) => setJoinCode(e.target.value)} 
              placeholder="Paste code here..." 
              className="flex-grow bg-white/5 border border-white/10 p-4 rounded-xl focus:ring-2 ring-purple-500 outline-none text-white font-mono uppercase"
            />
            <button 
              type="submit" 
              className="bg-purple-600 px-8 py-4 rounded-xl font-bold hover:bg-purple-700"
            >
              Join
            </button>
          </form>
        )}
      </main>
    </div>
  );
}