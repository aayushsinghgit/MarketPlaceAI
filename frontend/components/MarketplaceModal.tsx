'use client'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'
import Image from 'next/image'

export default function MarketplaceModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [products, setProducts] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    if (isOpen) {
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/products`)
        .then(res => res.json())
        .then(data => setProducts(data))
        .catch(err => console.error(err))
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <motion.div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      <motion.div 
        className="relative bg-secondary/95 backdrop-blur-xl border border-accent/30 rounded-3xl w-full max-w-7xl max-h-[90vh] overflow-hidden"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 20 }}
      >
        <div className="sticky top-0 bg-secondary/95 backdrop-blur border-b border-accent/20 p-6">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-4">
              <button onClick={onClose} className="text-accent hover:text-blue-400">
                ← Back to Home
              </button>
              <h2 className="text-3xl font-bold bg-gradient-to-r from-accent to-blue-600 bg-clip-text text-transparent">AI Agent Store</h2>
            </div>
            <button onClick={onClose} className="text-3xl hover:text-accent transition">&times;</button>
          </div>
          
          <div className="flex gap-4">
            <select 
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="bg-primary/50 border border-accent/30 px-4 py-2 rounded-xl"
            >
              <option value="">All Categories</option>
              <option value="automation">Automation</option>
              <option value="analytics">Analytics</option>
              <option value="content">Content Generation</option>
            </select>
            <input
              type="search"
              placeholder="Search agents..."
              className="flex-1 bg-primary/50 border border-accent/30 px-4 py-2 rounded-xl"
            />
          </div>
        </div>
        
        <div className="p-8 overflow-y-auto max-h-[calc(90vh-180px)]">
          <div className="grid md:grid-cols-4 gap-6">
            {products.length === 0 ? (
              <div className="col-span-4 text-center py-12">
                <div className="text-6xl mb-4">🤖</div>
                <p className="text-gray text-xl">No AI agents available yet</p>
              </div>
            ) : (
              products.map((product: any) => (
                <motion.div 
                  key={product.id} 
                  className="bg-primary/50 border border-accent/20 p-4 rounded-2xl group"
                  whileHover={{ scale: 1.03, y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="w-full h-32 bg-gradient-to-br from-accent/20 to-blue-600/20 rounded-xl mb-3 flex items-center justify-center text-3xl">
                    🤖
                  </div>
                  <h3 className="text-lg font-bold mb-1 group-hover:text-accent transition">{product.name}</h3>
                  <p className="text-gray mb-3 text-xs line-clamp-2">{product.description}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-xl font-bold bg-gradient-to-r from-accent to-blue-600 bg-clip-text text-transparent">${product.price}</span>
                    <button className="bg-gradient-to-r from-accent to-blue-600 px-4 py-1.5 rounded-full text-sm font-semibold hover:shadow-lg transition">
                      Add to Cart
                    </button>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
