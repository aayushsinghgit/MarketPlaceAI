'use client'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function CartModal({ isOpen, onClose, onCheckout }: { isOpen: boolean; onClose: () => void; onCheckout: () => void }) {
  const [cartItems, setCartItems] = useState<any[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (isOpen) {
      const token = localStorage.getItem('token')
      if (token) {
        fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cart`, {
          headers: { 'Authorization': `Bearer ${token}` }
        })
          .then(res => res.json())
          .then(data => setCartItems(data))
      }
    }
  }, [isOpen])

  const removeItem = async (productId: number) => {
    const token = localStorage.getItem('token')
    if (!token) return
    
    setLoading(true)
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cart/remove/${productId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      })
      const data = await res.json()
      setCartItems(data.cart)
    } catch (error) {
      console.error(error)
    }
    setLoading(false)
  }

  const total = cartItems.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0)

  if (!isOpen) return null

  return (
    <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      <motion.div className="relative bg-secondary/95 backdrop-blur-xl border border-accent/30 rounded-3xl w-full max-w-2xl p-8 max-h-[80vh] overflow-y-auto" initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}>
        <button onClick={onClose} className="absolute top-4 right-4 text-3xl hover:text-accent transition">&times;</button>
        
        <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-accent to-blue-600 bg-clip-text text-transparent">Shopping Cart</h2>
        
        {cartItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray text-xl">Your cart is empty</p>
          </div>
        ) : (
          <>
            <div className="space-y-4 mb-6">
              {cartItems.map((item, i) => (
                <div key={i} className="flex justify-between items-center bg-primary/50 p-4 rounded-xl">
                  <div className="flex-1">
                    <h3 className="font-bold">{item.product?.name}</h3>
                    <p className="text-gray text-sm">{item.product?.description}</p>
                    <p className="text-sm text-accent">Qty: {item.quantity}</p>
                  </div>
                  <div className="flex items-center gap-4">
                    <span className="text-xl font-bold">${((item.product?.price || 0) * item.quantity).toFixed(2)}</span>
                    <button onClick={() => removeItem(item.productId)} className="text-red-500 hover:text-red-400" disabled={loading}>
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="border-t border-accent/20 pt-4 mb-6">
              <div className="flex justify-between text-xl font-bold">
                <span>Total:</span>
                <span className="bg-gradient-to-r from-accent to-blue-600 bg-clip-text text-transparent">${total.toFixed(2)}</span>
              </div>
            </div>
            
            <button onClick={onCheckout} className="w-full bg-gradient-to-r from-accent to-blue-600 py-3 rounded-xl font-semibold" disabled={loading}>
              Proceed to Checkout
            </button>
          </>
        )}
      </motion.div>
    </motion.div>
  )
}
