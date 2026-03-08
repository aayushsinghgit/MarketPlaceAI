'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    const data = await res.json()
    if (data.token) {
      localStorage.setItem('token', data.token)
      window.location.href = '/marketplace'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-secondary to-primary flex items-center justify-center p-4">
      <div className="bg-secondary/50 backdrop-blur border border-accent/20 p-10 rounded-3xl max-w-md w-full">
        <h1 className="text-4xl font-bold mb-2 text-center bg-gradient-to-r from-accent to-purple bg-clip-text text-transparent">Welcome Back</h1>
        <p className="text-gray text-center mb-8">Login to access your account</p>
        
        <form onSubmit={handleLogin} className="space-y-5">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full bg-primary/50 border border-accent/30 px-5 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full bg-primary/50 border border-accent/30 px-5 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent"
            required
          />
          <button type="submit" className="w-full bg-gradient-to-r from-accent to-purple py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-accent/50 transition">
            Login
          </button>
        </form>

        <div className="mt-8 space-y-3">
          <button className="w-full border border-accent/30 py-3 rounded-xl hover:bg-accent/10 transition flex items-center justify-center gap-2">
            <span>👑</span> Login with Google
          </button>
          <button className="w-full border border-accent/30 py-3 rounded-xl hover:bg-accent/10 transition flex items-center justify-center gap-2">
            <span>🐱</span> Login with GitHub
          </button>
        </div>

        <p className="mt-8 text-center text-gray">
          Don't have an account? <Link href="/auth/register" className="text-accent hover:text-purple transition">Sign up</Link>
        </p>
      </div>
    </div>
  )
}
