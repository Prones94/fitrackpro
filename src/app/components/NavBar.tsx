export default function NavBar(){
  return (
    <nav className="p-4 bg-blue-600 text-white flex items-center justify-between">
      <div className="font-bold text-lg">FitTrackPro</div>
      <div className="hidden md:flex space-x-4">
        <a href="/" className="hover:underline">
          Home
        </a>
        <a href="/dashboard" className="hover:underline">
          Dashboard
        </a>
        <a href="/about" className="hover:underline">
          About
        </a>
      </div>
      <button className="md:hidden px-4 py-2 bg-blue-500 rounded">
        Menu
      </button>
    </nav>
  )
}