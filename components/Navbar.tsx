export default function Navbar() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 h-14 bg-[#070a13]/80 backdrop-blur-md border-b border-white/5">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-sky-400 to-indigo-500 flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 18 18" fill="none">
            <path d="M9 2L15 6V12L9 16L3 12V6L9 2Z" stroke="white" strokeWidth="1.5" />
            <circle cx="9" cy="9" r="2.5" fill="white" />
          </svg>
        </div>
        <span className="font-bold text-lg text-white tracking-tight">
          Civ<span className="text-sky-400">AI</span>
        </span>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-xs text-slate-500 font-mono">PL_Genesis 2025</span>
        <button className="px-4 py-1.5 rounded-md border border-sky-400/30 bg-sky-400/5 text-sky-400 text-xs hover:bg-sky-400/10 transition-colors">
          Connect Wallet
        </button>
      </div>
    </nav>
  );
}