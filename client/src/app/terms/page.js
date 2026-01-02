import Link from "next/link";

export default async function TermsPage() {


  return (
    <div className="min-h-screen w-full bg-[#0c0a09]">
      
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
            <Link href="/">
              <h1 className="text-2xl font-bold text-white cursor-pointer">
                Code-Assist
              </h1>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="/#features" className="text-gray-300 hover:text-white transition">
              Features
            </a>
            <a href="/#pricing" className="text-gray-300 hover:text-white transition">
              Pricing
            </a>
            <a href="/#about" className="text-gray-300 hover:text-white transition">
              About
            </a>
          </div>

          <div className="flex items-center space-x-4">
            
                <Link
                  href="/"
                  className="bg-purple-600 hover:bg-purple-700 text-white font-semibold px-4 py-2 rounded-md shadow-lg shadow-purple-600/20"
                >
                  Home
                </Link>
             
             
          </div>
        </nav>
      </header>

      {/* TERMS CONTENT */}
      <div className="px-4 py-24">
        <div className="max-w-5xl mx-auto">
          {/* Title */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Terms & Conditions
            </h1>
            <p className="mt-4 text-gray-400">
              Last updated: September 2025
            </p>
          </div>

          {/* Cards */}
          <div className="space-y-8">
            <div className="bg-black/40 border border-purple-500/30 rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-semibold text-purple-400 mb-4">
                1. Acceptance of Terms
              </h2>
              <p className="text-gray-300">
                By accessing or using Code-Assist, you agree to be bound by these
                Terms and Conditions.
              </p>
            </div>

            <div className="bg-black/40 border border-pink-500/30 rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-semibold text-pink-400 mb-4">
                2. Description of Service
              </h2>
              <p className="text-gray-300">
                Code-Assist provides real-time collaboration sessions for coding.
              </p>
            </div>

            <div className="bg-black/40 border border-purple-500/30 rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-semibold text-purple-400 mb-4">
                3. User Responsibilities
              </h2>
              <ul className="list-disc list-inside text-gray-300 space-y-2">
                <li>Maintain account security</li>
                <li>Use the platform lawfully</li>
                <li>Avoid misuse or disruption</li>
              </ul>
            </div>

            <div className="bg-black/40 border border-pink-500/30 rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-semibold text-pink-400 mb-4">
                4. Accounts & Security
              </h2>
              <p className="text-gray-300">
                You are responsible for keeping your credentials secure.
              </p>
            </div>

            <div className="bg-black/40 border border-purple-500/30 rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-semibold text-purple-400 mb-4">
                5. Payments & Subscriptions
              </h2>
              <p className="text-gray-300">
                Paid plans are billed monthly. Features and pricing may change.
              </p>
            </div>

            <div className="bg-black/40 border border-pink-500/30 rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-semibold text-pink-400 mb-4">
                6. Limitation of Liability
              </h2>
              <p className="text-gray-300">
                The service is provided “as is” without warranties.
              </p>
            </div>

            <div className="bg-black/40 border border-purple-500/30 rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-semibold text-purple-400 mb-4">
                7. Changes to Terms
              </h2>
              <p className="text-gray-300">
                Continued use means acceptance of updated terms.
              </p>
            </div>

            <div className="bg-gradient-to-br from-purple-600/20 to-pink-600/20 border border-gray-700 rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-semibold text-white mb-4">
                Contact
              </h2>
              <p className="text-gray-300">
                Reach us at{" "}
                <span className="text-purple-400 font-semibold">
                  support@codeassist.dev
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
