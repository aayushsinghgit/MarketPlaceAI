import Image from 'next/image'

interface NavbarProps {
  isLoggedIn: boolean
  onExplore: () => void
  onCart: () => void
  onLogin: () => void
  onSignup: () => void
  onDashboard?: () => void
}

export default function Navbar({ isLoggedIn, onExplore, onCart, onLogin, onSignup, onDashboard }: NavbarProps) {
  return (
    <nav className="backdrop-blur-sm bg-primary/50 border-b border-accent/20 p-4 sticky top-0 z-40">
      <div className="container mx-auto flex justify-between items-center">
        <Image src="/logo.png" alt="Agent Forge" width={150} height={40} className="h-10 w-auto" priority />
        <div className="flex items-center space-x-6">
          <button onClick={onExplore} className="hover:text-accent transition">Explore</button>
          <button onClick={onCart} className="hover:text-accent transition">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </button>
          {!isLoggedIn ? (
            <>
              <button onClick={onLogin} className="hover:text-accent transition">Login</button>
              <button onClick={onSignup} className="bg-gradient-to-r from-accent to-blue-600 px-6 py-2 rounded-full font-semibold hover:shadow-lg hover:shadow-accent/50 transition">
                Sign Up
              </button>
            </>
          ) : (
            <button onClick={onDashboard} className="bg-gradient-to-r from-accent to-blue-600 px-6 py-2 rounded-full font-semibold">
              Dashboard
            </button>
          )}
        </div>
      </div>
    </nav>
  )
}
