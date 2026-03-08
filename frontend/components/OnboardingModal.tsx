'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'

export default function OnboardingModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '', email: '', phone: '', company: '', website: '',
    address: '', city: '', state: '', zip: '', country: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (step < 3) {
      setStep(step + 1)
    } else {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/sellers/onboard`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      if (res.ok) {
        alert('Seller account created!')
        onClose()
      }
    }
  }

  if (!isOpen) return null

  return (
    <motion.div className="fixed inset-0 z-50 flex items-center justify-center p-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose}></div>
      <motion.div className="relative bg-white rounded-2xl w-full max-w-5xl overflow-hidden shadow-2xl" initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }}>
        <div className="flex">
          <div className="w-1/3 bg-gradient-to-br from-purple-600 via-purple-700 to-indigo-800 p-8 text-white">
            <button onClick={onClose} className="text-white/80 hover:text-white mb-8">&times; Close</button>
            <h2 className="text-3xl font-bold mb-2">Seller Registration</h2>
            <p className="text-purple-200 mb-12">Join our marketplace</p>
            <div className="space-y-6">
              {[1, 2, 3].map(s => (
                <div key={s} className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    s < step ? 'bg-green-400 text-green-900' : s === step ? 'bg-white text-purple-700' : 'bg-purple-500/30 text-purple-300'
                  }`}>{s < step ? '✓' : s}</div>
                  <span className={s === step ? 'font-semibold' : 'text-purple-200'}>
                    {s === 1 ? 'Personal Info' : s === 2 ? 'Business Details' : 'Address'}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1 p-10 bg-gray-50">
            <form onSubmit={handleSubmit} className="space-y-5">
              {step === 1 && (
                <>
                  <h3 className="text-2xl font-bold text-black mb-6">Personal Information</h3>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-black">Full Name</label>
                    <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})}
                      className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white text-black" required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-black">Email</label>
                      <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}
                        className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white text-black" required />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-black">Phone</label>
                      <input type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})}
                        className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white text-black" required />
                    </div>
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <h3 className="text-2xl font-bold text-black mb-6">Business Details</h3>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-black">Company Name</label>
                    <input type="text" value={formData.company} onChange={(e) => setFormData({...formData, company: e.target.value})}
                      className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white text-black" required />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-black">Website</label>
                    <input type="url" value={formData.website} onChange={(e) => setFormData({...formData, website: e.target.value})}
                      className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white text-black" />
                  </div>
                </>
              )}

              {step === 3 && (
                <>
                  <h3 className="text-2xl font-bold text-black mb-6">Address Information</h3>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-black">Street Address</label>
                    <input type="text" value={formData.address} onChange={(e) => setFormData({...formData, address: e.target.value})}
                      className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white text-black" required />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-black">City</label>
                      <input type="text" value={formData.city} onChange={(e) => setFormData({...formData, city: e.target.value})}
                        className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white text-black" required />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-black">State</label>
                      <input type="text" value={formData.state} onChange={(e) => setFormData({...formData, state: e.target.value})}
                        className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white text-black" required />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-2 text-sm font-medium text-black">ZIP Code</label>
                      <input type="text" value={formData.zip} onChange={(e) => setFormData({...formData, zip: e.target.value})}
                        className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white text-black" required />
                    </div>
                    <div>
                      <label className="block mb-2 text-sm font-medium text-black">Country</label>
                      <input type="text" value={formData.country} onChange={(e) => setFormData({...formData, country: e.target.value})}
                        className="w-full border border-gray-300 px-4 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white text-black" required />
                    </div>
                  </div>
                </>
              )}

              <div className="flex justify-between pt-6">
                {step > 1 && <button type="button" onClick={() => setStep(step - 1)} className="px-6 py-3 text-black hover:text-gray-700 font-medium">← Back</button>}
                <button type="submit" className="ml-auto bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition">
                  {step < 3 ? 'Continue →' : 'Complete Registration'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}
