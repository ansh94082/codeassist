import "./globals.css";
import Link from "next/link";
import { auth } from "@/auth";
export const dynamic = "force-dynamic";

export default async function Home() {
    /* ---------- AUTH (SERVER SIDE) ---------- */
    const session = await auth();
    
    // Add this to your terminal logs
    console.log("Current Session:", JSON.stringify(session, null, 2));

    const isAuthenticated = !!session?.user;

    /* ---------- UI ---------- */
    return (
        <div>
            {/* background */}

            <div className="  gradient-bg">
                <div className="gradient-blur purple-blur"></div>
                <div className="gradient-blur pink-blur"></div>
            </div>
            <div className="relative min-h-screen flex flex-col">
                {/* HEADER */}
                <header className="relative py-4 px-4 sm:px-6 lg:px-8">
                    <nav className="flex sticky top-0 justify-between items-center max-w-7xl mx-auto">
                        <div className="flex items-center space-x-2">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="28"
                                height="28"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="text-purple-400"
                            >
                                <polyline points="16 18 22 12 16 6" />
                                <polyline points="8 6 2 12 8 18" />
                            </svg>
                            <Link href="/"><h1 className="text-2xl font-bold text-white">Code-Assist</h1></Link>
                        </div>

                        <div className="hidden md:flex items-center space-x-8">
                            <a href="#features" className="text-gray-300 hover:text-white transition">
                                Features
                            </a>
                            <a href="#pricing" className="text-gray-300 hover:text-white transition">
                                Pricing
                            </a>
                            <a href="#about" className="text-gray-300 hover:text-white transition">
                                About
                            </a>
                        </div>

                        <div className="flex items-center space-x-4">
                            {!isAuthenticated ? (
                                <>
                                    <Link
                                        href="/login"
                                        className="text-gray-300 hover:text-white px-4 py-2 rounded-md"
                                    >
                                        Login
                                    </Link>
                                    <Link
                                        href="/signup"
                                        className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-4 py-2 rounded-md shadow-lg shadow-purple-600/20"
                                    >
                                        Sign Up
                                    </Link>
                                </>
                            ) : (
                                <div className="flex items-center gap-4">
                                    <div className="text-gray-300">
                                        Welcome, {session?.user?.name || "User"}!
                                    </div>

                                    <Link
                                        href="/dashboard"
                                        className="bg-gray-600 hover:bg-gray-200 text-white hover:text-gray-800 font-semibold px-4 py-2 rounded-md transition-colors duration-300"
                                    >
                                        Dashboard
                                    </Link>
                                </div>

                            )}
                        </div>
                    </nav>
                </header>

                {/* HERO */}
                <main className="flex-grow">

                    <section className="text-center py-20 lg:py-32 px-4">
                        <h2 className="text-4xl md:text-6xl font-bold text-white leading-tight">
                            Collaborate in Real-Time.
                        </h2>
                        <h2 className="text-4xl md:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500 leading-tight mt-2">
                            Code Together, Seamlessly.
                        </h2>

                        <p className="mt-6 max-w-2xl mx-auto text-lg text-gray-400">
                            The ultimate platform for pair programming. Share a powerful code editor,
                            talk with crystal-clear audio, and bring your projects to life, together.
                        </p>

                        <Link
                            href={isAuthenticated ? "/dashboard" : "/login"}
                            className="mt-10 flex justify-center"
                        >
                            {isAuthenticated ? <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg shadow-purple-600/30 text-lg cursor-pointer">
                                Continue to Dashboard
                            </button> : <button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold py-3 px-8 rounded-lg shadow-lg shadow-purple-600/30 text-lg cursor-pointer">
                                Start a Free Session
                            </button>}

                        </Link>
                        {isAuthenticated ? "" : <p className="mt-4 text-sm text-gray-500">
                            No credit card required.
                        </p>}

                    </section>

                    {/* FEATURES */}
                    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
                        
                        <div className="max-w-7xl mx-auto">
                            <div className="featuresec text-center mb-12">
                                <h3 className="text-3xl font-bold text-white">Everything You Need for Pair Programming</h3>
                                <p className="text-gray-400 mt-2">Powerful features designed for a fluid collaborative experience.</p>
                            </div>
                            <div className="grid md:grid-cols-3 gap-8">
                                <div className="feature-card p-8 rounded-xl">
                                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-purple-500/20 mb-6">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                            viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                            className="text-purple-400">
                                            <path d="m18 16 4-4-4-4" />
                                            <path d="m6 8-4 4 4 4" />
                                            <path d="m14.5 4-5 16" />
                                        </svg>
                                    </div>
                                    <h4 className="text-xl font-semibold text-white mb-2">Real-Time Code Editor</h4>
                                    <p className="text-gray-400">Work together in a shared editor with support for multiple languages. See changes live as your partner types.</p>
                                </div>

                                <div className="feature-card p-8 rounded-xl">
                                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-purple-500/20 mb-6">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                            viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                            className="text-purple-400">
                                            <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.72" />
                                            <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.72-1.72" />
                                        </svg>
                                    </div>
                                    <h4 className="text-xl font-semibold text-white mb-2">Instant Collaboration</h4>
                                    <p className="text-gray-400">Create a session and share a unique code to invite your pair. No complex setup required.</p>
                                </div>

                                <div className="feature-card p-8 rounded-xl">
                                    <div className="flex items-center justify-center h-12 w-12 rounded-lg bg-purple-500/20 mb-6">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                            viewBox="0 0 24 24" fill="none" stroke="currentColor"
                                            strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                            className="text-purple-400">
                                            <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
                                            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                                            <line x1="12" y1="19" x2="12" y2="23" />
                                            <line x1="8" y1="23" x2="16" y2="23" />
                                        </svg>
                                    </div>
                                    <h4 className="text-xl font-semibold text-white mb-2">Crystal-Clear Audio</h4>
                                    <p className="text-gray-400">Communicate effortlessly with built-in high-quality audio calls. Stay in sync without leaving the editor.</p>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section id="pricing" className="min-h-screen w-full flex items-center justify-center bg-[#0c0a09] px-4">
                        <div className="max-w-6xl w-full">
                            {/* Heading */}
                            <div className="text-center mb-16">
                                <h2 className="text-4xl md:text-5xl font-bold text-white">
                                    Simple, Transparent Pricing
                                </h2>
                                <p className="mt-4 text-gray-400 text-lg">
                                    Start free. Upgrade when you need more power.
                                </p>
                            </div>

                            {/* Cards */}
                            <div className="grid md:grid-cols-2 gap-8">
                                {/* FREE PLAN */}
                                <div className="rounded-2xl border border-gray-700 bg-black/40 p-8 flex flex-col">
                                    <h3 className="text-2xl font-semibold text-white">Free</h3>
                                    <p className="text-gray-400 mt-2">For getting started</p>

                                    <div className="mt-6">
                                        <span className="text-5xl font-bold text-white">$0</span>
                                        <span className="text-gray-400 ml-2">/ month</span>
                                    </div>

                                    <ul className="mt-6 space-y-4 text-gray-300">
                                        <li className="flex items-center gap-3">
                                            <span className="text-green-400">✓</span>
                                            10 collaboration sessions
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <span className="text-green-400">✓</span>
                                            Real-time code editor
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <span className="text-green-400">✓</span>
                                            Audio collaboration
                                        </li>
                                    </ul>

                                    <Link
                                        href="/payments"
                                        className="mt-1 bg-gray-700 hover:opacity-90 text-white font-bold py-3 rounded-lg transition cursor-pointer flex items-center justify-center"
                                    >      Get Started
                                    </Link>
                                </div>

                                {/* PRO PLAN */}
                                <div className="relative rounded-2xl border border-purple-500 bg-gradient-to-br from-purple-600/20 to-pink-600/20 p-8 flex flex-col shadow-xl">
                                    {/* Badge */}
                                    <span className="absolute -top-4 right-6 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-sm font-semibold px-4 py-1 rounded-full">
                                        Most Popular
                                    </span>

                                    <h3 className="text-2xl font-semibold text-white">Pro</h3>
                                    <p className="text-gray-300 mt-2">For serious collaboration</p>

                                    <div className="mt-6">
                                        <span className="text-5xl font-bold text-white">$9.99</span>
                                        <span className="text-gray-300 ml-2">/ month</span>
                                    </div>

                                    <ul className="mt-5 space-y-4 text-gray-200">
                                        <li className="flex items-center gap-3">
                                            <span className="text-green-400">✓</span>
                                            Unlimited collaboration sessions
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <span className="text-green-400">✓</span>
                                            Priority performance
                                        </li>
                                        <li className="flex items-center gap-3">
                                            <span className="text-green-400">✓</span>
                                            Early access to new features
                                        </li>
                                    </ul>
                                    <Link
                                        href="/payments"
                                        className="mt-auto bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white font-bold py-3 rounded-lg transition cursor-pointer flex items-center justify-center"
                                    >
                                        Upgrade to Pro
                                    </Link>

                                </div>
                            </div>
                        </div>
                    </section>
                    <section
                        id="about"
                        className="min-h-screen w-full bg-[#0c0a09] px-4 py-24"
                    >
                        <div className="max-w-6xl mx-auto">
                            {/* Heading */}
                            <div className="text-center mb-20">
                                <h2 className="text-4xl md:text-5xl font-bold text-white">
                                    About Code-Assist
                                </h2>
                                <p className="mt-4 text-gray-400 text-lg max-w-3xl mx-auto">
                                    Real-time collaboration, designed visually from the ground up.
                                </p>
                            </div>

                            {/* Diagram Flow */}
                            <div className="relative grid md:grid-cols-3 gap-12 items-center">
                                {/* Line (desktop only) */}
                                <div className="hidden md:block absolute top-1/2 left-0 right-0 h-[2px] bg-gradient-to-r from-purple-500 to-pink-500 opacity-40" />

                                {/* Step 1 */}
                                <div className="relative z-10 bg-black/40 border border-purple-500/30 rounded-2xl p-8 text-center shadow-lg">
                                    <div className="mx-auto mb-4 w-14 h-14 rounded-full bg-purple-500/20 flex items-center justify-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-7 h-7 text-purple-400"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                        >
                                            <path d="M8 9l3 3-3 3m5 0h3" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-semibold text-white mb-2">
                                        Create a Session
                                    </h3>
                                    <p className="text-gray-400 text-sm">
                                        Instantly start a collaboration session with one click.
                                    </p>
                                </div>

                                {/* Step 2 */}
                                <div className="relative z-10 bg-black/40 border border-pink-500/30 rounded-2xl p-8 text-center shadow-lg">
                                    <div className="mx-auto mb-4 w-14 h-14 rounded-full bg-pink-500/20 flex items-center justify-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-7 h-7 text-pink-400"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                        >
                                            <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-semibold text-white mb-2">
                                        Collaborate Live
                                    </h3>
                                    <p className="text-gray-400 text-sm">
                                        Code together in real-time with instant updates.
                                    </p>
                                </div>

                                {/* Step 3 */}
                                <div className="relative z-10 bg-black/40 border border-purple-500/30 rounded-2xl p-8 text-center shadow-lg">
                                    <div className="mx-auto mb-4 w-14 h-14 rounded-full bg-purple-500/20 flex items-center justify-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="w-7 h-7 text-purple-400"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth={2}
                                        >
                                            <path d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-10v2m0 8v2" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-semibold text-white mb-2">
                                        Ship Faster
                                    </h3>
                                    <p className="text-gray-400 text-sm">
                                        Less friction, more focus, better outcomes.
                                    </p>
                                </div>
                            </div>

                            {/* Bottom Explanation */}
                            <div className="mt-20 text-center max-w-4xl mx-auto">
                                <p className="text-gray-300 leading-relaxed">
                                    Code-Assist blends real-time synchronization, secure authentication,
                                    and a clean developer-first UI. The result is a platform that feels
                                    intuitive, fast, and powerful — built for modern teams and students.
                                </p>

                                <div className="mt-8 flex justify-center gap-4">
                                    <span className="px-4 py-2 rounded-full bg-purple-500/20 text-purple-300 text-sm">
                                        Real-Time
                                    </span>
                                    <span className="px-4 py-2 rounded-full bg-pink-500/20 text-pink-300 text-sm">
                                        Secure
                                    </span>
                                    <span className="px-4 py-2 rounded-full bg-purple-500/20 text-purple-300 text-sm">
                                        Developer-First
                                    </span>
                                </div>
                            </div>
                        </div>
                    </section>



                </main>

                {/* FOOTER (RETAINED) */}
                <footer className="border-t border-gray-800 mt-20">
                    <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
                        <p className="text-gray-500">
                            &copy; 2024 Code-Assist. All rights reserved.
                        </p>
                        <div className="flex space-x-6">
                            <a href="#" className="text-gray-500 hover:text-white transition">
                                Contact
                            </a>
                            <Link href="/terms" className="text-gray-500 hover:text-white transition">
                                Terms
                            </Link>
                            <a href="#" className="text-gray-500 hover:text-white transition">
                                Privacy
                            </a>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}
