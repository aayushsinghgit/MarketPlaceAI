'use client'
import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [showContactForm, setShowContactForm] = useState(false)
  const [formData, setFormData] = useState({ email: '', subject: '', body: '' })

  const faqs = [
    { q: 'How do I buy an AI agent?', a: 'Browse the marketplace, select an agent, and click Buy Now to complete your purchase.' },
    { q: 'How do I become a seller?', a: 'Click "Become a Seller" and complete the onboarding process with your payment details.' },
    { q: 'What payment methods are accepted?', a: 'We accept all major credit cards through Stripe, PayPal, and Razorpay.' },
    { q: 'How do refunds work?', a: 'Contact the seller within 7 days for refund requests. We mediate disputes fairly.' },
  ]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('Message sent! We will respond within 24 hours.')
    setShowContactForm(false)
    setFormData({ email: '', subject: '', body: '' })
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-accent to-blue-600 p-4 rounded-full shadow-lg hover:shadow-xl transition"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
        </svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 z-50 w-96 bg-secondary/95 backdrop-blur-xl border border-accent/30 rounded-2xl shadow-2xl overflow-hidden"
          >
            <div className="bg-gradient-to-r from-accent to-blue-600 p-4 flex justify-between items-center">
              <h3 className="font-bold">Help & Support</h3>
              <button onClick={() => setIsOpen(false)} className="text-2xl">&times;</button>
            </div>

            {!showContactForm ? (
              <div className="p-4 max-h-96 overflow-y-auto">
                <h4 className="font-bold mb-3">Frequently Asked Questions</h4>
                <div className="space-y-3">
                  {faqs.map((faq, i) => (
                    <div key={i} className="bg-primary/50 p-3 rounded-lg">
                      <p className="font-semibold text-sm mb-1">{faq.q}</p>
                      <p className="text-gray text-xs">{faq.a}</p>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setShowContactForm(true)}
                  className="w-full mt-4 bg-gradient-to-r from-accent to-blue-600 py-2 rounded-lg font-semibold"
                >
                  Contact Us
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-4 space-y-3">
                <button
                  type="button"
                  onClick={() => setShowContactForm(false)}
                  className="text-accent text-sm mb-2"
                >
                  ← Back to FAQ
                </button>
                <input
                  type="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full bg-primary/50 border border-accent/30 px-4 py-2 rounded-lg text-sm"
                  required
                />
                <input
                  type="text"
                  placeholder="Subject"
                  value={formData.subject}
                  onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  className="w-full bg-primary/50 border border-accent/30 px-4 py-2 rounded-lg text-sm"
                  required
                />
                <textarea
                  placeholder="Your Message"
                  value={formData.body}
                  onChange={(e) => setFormData({...formData, body: e.target.value})}
                  className="w-full bg-primary/50 border border-accent/30 px-4 py-2 rounded-lg text-sm h-24"
                  required
                />
                <button type="submit" className="w-full bg-gradient-to-r from-accent to-blue-600 py-2 rounded-lg font-semibold">
                  Send Message
                </button>
              </form>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
