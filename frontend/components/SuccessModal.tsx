'use client'
import { motion } from 'framer-motion'

export default function SuccessModal({ isOpen, onClose, orderId }: { isOpen: boolean; onClose: () => void; orderId?: string }) {
  if (!isOpen) return null

  return (
    <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose}></div>
      <motion.div className="relative bg-white rounded-3xl p-12 max-w-md text-center" initial={{ scale: 0.5, y: 50 }} animate={{ scale: 1, y: 0 }} transition={{ type: "spring", duration: 0.5 }}>
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: "spring" }}>
          <div className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </motion.div>
        <h2 className="text-3xl font-bold text-black mb-3">Payment Successful!</h2>
        <p className="text-gray-600 mb-2">Your order has been confirmed</p>
        {orderId && <p className="text-sm text-gray-500 mb-6">Order ID: {orderId}</p>}
        <button onClick={onClose} className="bg-gradient-to-r from-green-500 to-green-600 text-white px-8 py-3 rounded-full font-semibold hover:shadow-lg transition">
          Continue Shopping
        </button>
      </motion.div>
    </motion.div>
  )
}
