'use client'
import { useState } from 'react'
import Link from 'next/link'

export default function Register() {
  const [formData, setFormData] = useState({ email: '', password: '', name: '' })

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    })
    if (res.ok) {
      alert('Account created! Please login.')
      window.location.href = '/auth/login'
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-secondary to-primary flex items-center justify-center p-4">
      <div className="bg-secondary/50 backdrop-blur border border-accent/20 p-10 rounded-3xl max-w-md w-full">
        <h1 className="text-4xl font-bold mb-2 text-center bg-gradient-to-r from-accent to-purple bg-clip-text text-transparent">Create Account</h1>
        <p className="text-gray text-center mb-8">Join the AI marketplace today</p>
        
        <form onSubmit={handleRegister} className="space-y-5">
          <input
            type="text"
            placeholder="Full Name"
            value={formData.name}
            onChange={(e) => setFormData({...formData, name: e.target.value})}
            className="w-full bg-primary/50 border border-accent/30 px-5 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent"
            required
          />
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            className="w-full bg-primary/50 border border-accent/30 px-5 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent"
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            className="w-full bg-primary/50 border border-accent/30 px-5 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent"
            required
          />
          <button type="submit" className="w-full bg-gradient-to-r from-accent to-purple py-3 rounded-xl font-semibold hover:shadow-lg hover:shadow-accent/50 transition">
            Create Account
          </button>
        </form>

        <p className="mt-8 text-center text-gray">
          Already have an account? <Link href="/auth/login" className="text-accent hover:text-purple transition">Login</Link>
        </p>
      </div>
    </div>
  )
}
