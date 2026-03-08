'use client'
import { motion } from 'framer-motion'
import { useState, useEffect } from 'react'

export default function CheckoutModal({ isOpen, onClose, onSuccess }: { isOpen: boolean; onClose: () => void; onSuccess: (orderId: string) => void }) {
  const [formData, setFormData] = useState({ name: '', email: '', cardNumber: '', expiry: '', cvv: '' })
  const [cartItems, setCartItems] = useState<any[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

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

  const total = cartItems.reduce((sum, item) => sum + (item.product?.price || 0) * item.quantity, 0)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    const token = localStorage.getItem('token')
    if (!token) {
      setError('Please login to continue')
      setLoading(false)
      return
    }

    try {
      const items = cartItems.map(item => ({
        id: item.product.id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity
      }))

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/checkout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          items,
          totalAmount: total,
          cardNumber: formData.cardNumber,
          name: formData.name,
          email: formData.email
        })
      })

      const data = await res.json()
      
      if (res.ok && data.success) {
        onSuccess(data.orderId)
        onClose()
      } else {
        setError(data.message || 'Payment failed. Please try again.')
      }
    } catch (err) {
      setError('An error occurred. Please try again.')
    }
    setLoading(false)
  }

  if (!isOpen) return null

  return (
    <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      <motion.div className="relative bg-secondary/95 backdrop-blur-xl border border-accent/30 rounded-3xl w-full max-w-2xl p-8" initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }}>
        <button onClick={onClose} className="absolute top-4 right-4 text-3xl hover:text-accent transition">&times;</button>
        
        <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-accent to-blue-600 bg-clip-text text-transparent">Checkout</h2>
        
        {error && <div className="bg-red-500/20 border border-red-500 text-red-400 px-4 py-3 rounded-xl mb-4">{error}</div>}
        
        <div className="mb-6 p-4 bg-primary/50 rounded-xl">
          <p className="text-sm text-gray mb-2">Order Summary</p>
          <div className="flex justify-between text-xl font-bold">
            <span>Total Amount:</span>
            <span className="text-accent">${total.toFixed(2)}</span>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-2 text-sm font-medium">Full Name</label>
            <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full bg-primary/50 border border-accent/30 px-4 py-3 rounded-xl" required />
          </div>
          
          <div>
            <label className="block mb-2 text-sm font-medium">Email</label>
            <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-primary/50 border border-accent/30 px-4 py-3 rounded-xl" required />
          </div>
          
          <div>
            <label className="block mb-2 text-sm font-medium">Card Number</label>
            <input type="text" placeholder="1234 5678 9012 3456" value={formData.cardNumber} onChange={(e) => setFormData({...formData, cardNumber: e.target.value})} className="w-full bg-primary/50 border border-accent/30 px-4 py-3 rounded-xl" required />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-2 text-sm font-medium">Expiry Date</label>
              <input type="text" placeholder="MM/YY" value={formData.expiry} onChange={(e) => setFormData({...formData, expiry: e.target.value})} className="w-full bg-primary/50 border border-accent/30 px-4 py-3 rounded-xl" required />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium">CVV</label>
              <input type="text" placeholder="123" value={formData.cvv} onChange={(e) => setFormData({...formData, cvv: e.target.value})} className="w-full bg-primary/50 border border-accent/30 px-4 py-3 rounded-xl" required />
            </div>
          </div>
          
          <button type="submit" className="w-full bg-gradient-to-r from-accent to-blue-600 py-3 rounded-xl font-semibold mt-6" disabled={loading}>
            {loading ? 'Processing...' : 'Complete Payment'}
          </button>
        </form>
      </motion.div>
    </motion.div>
  )
}
