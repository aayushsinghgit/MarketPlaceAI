'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

export default function Marketplace() {
  const [products, setProducts] = useState([])
  const [filter, setFilter] = useState({ category: '', priceRange: '' })

  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error(err))
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-secondary to-primary">
      <nav className="backdrop-blur-sm bg-primary/50 border-b border-accent/20 p-4 sticky top-0 z-50">
        <div className="container mx-auto">
          <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-accent to-purple bg-clip-text text-transparent">AgentMarket</Link>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-white to-purple bg-clip-text text-transparent">AI Marketplace</h1>
          <p className="text-gray text-lg">Discover powerful AI agents and automation tools</p>
        </div>
        
        <div className="flex gap-4 mb-12">
          <select className="bg-secondary/80 backdrop-blur border border-accent/30 text-light px-6 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent" onChange={(e) => setFilter({...filter, category: e.target.value})}>
            <option value="">All Categories</option>
            <option value="automation">Automation AI</option>
            <option value="analytics">Analytics AI</option>
            <option value="content">Content Generation</option>
          </select>
          <select className="bg-secondary/80 backdrop-blur border border-accent/30 text-light px-6 py-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-accent" onChange={(e) => setFilter({...filter, priceRange: e.target.value})}>
            <option value="">All Prices</option>
            <option value="0-50">$0 - $50</option>
            <option value="50-200">$50 - $200</option>
            <option value="200+">$200+</option>
          </select>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {products.length === 0 ? (
            <div className="col-span-3 text-center py-20">
              <div className="text-6xl mb-4">🚀</div>
              <p className="text-gray text-xl">No products available yet. Be the first to list!</p>
              <Link href="/seller/onboard" className="inline-block mt-6 bg-gradient-to-r from-accent to-purple px-6 py-3 rounded-full font-semibold hover:shadow-lg transition">
                List Your Agent
              </Link>
            </div>
          ) : (
            products.map((product: any) => (
              <div key={product.id} className="bg-secondary/50 backdrop-blur border border-accent/20 p-6 rounded-2xl card-hover group">
                <div className="w-full h-40 bg-gradient-to-br from-accent/20 to-purple/20 rounded-xl mb-4 flex items-center justify-center text-5xl">
                  🤖
                </div>
                <h3 className="text-2xl font-bold mb-2 group-hover:text-accent transition">{product.name}</h3>
                <p className="text-gray mb-6 line-clamp-2">{product.description}</p>
                <div className="flex justify-between items-center">
                  <span className="text-3xl font-bold bg-gradient-to-r from-accent to-purple bg-clip-text text-transparent">${product.price}</span>
                  <button className="bg-gradient-to-r from-accent to-purple px-6 py-2 rounded-full font-semibold hover:shadow-lg hover:shadow-accent/50 transition">
                    Buy Now
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
