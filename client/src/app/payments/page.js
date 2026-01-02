import Link from "next/link";

export default function JokePage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#0c0a09] px-4">
      <div className="w-fit bg-black/40 border border-gray-700 rounded-2xl p-8 text-center shadow-xl">
        <p className="text-xl text-gray-200 mb-8">
          Just kidding but a few sol to :
          <br />
          <span className="block mt-2 text-purple-400 font-mono whitespace-nowrap">
            DqJp1isyvJTvLxvEiGYMi6c5E5CDGtMz3KXEXWNnFmLN
          </span>
          <span className="block mt-2">
            are appreciated
          </span>
        </p>

        <Link href="/">
          <button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:opacity-90 text-white font-semibold px-6 py-3 rounded-lg transition cursor-pointer">
            Go to Home
          </button>
        </Link>
      </div>
    </div>
  );
}
