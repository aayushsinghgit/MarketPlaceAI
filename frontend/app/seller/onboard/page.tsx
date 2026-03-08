'use client'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const steps = [
  'Seller Information',
  'Banking Information',
  'Tax Information',
  'Channel Information',
  'Product Information'
]

export default function SellerOnboard() {
  const [currentStep, setCurrentStep] = useState(0)
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    displayName: '',
    storeName: '',
    interestedIn: '',
    maxSKU: '',
    revenue: '',
    category: '',
    address: { street: '', city: '', state: '', country: '', zipcode: '' }
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/sellers/onboard`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      if (res.ok) {
        alert('Seller account created!')
        window.location.href = '/'
      }
    }
  }

  return (
    <div className="min-h-screen bg-[#F4F4F4]">
      <header className="bg-gradient-to-r from-[#E74C3C] to-[#C0392B] h-[100px] flex items-center justify-center">
        <div className="text-center">
          <Image src="/logo.png" alt="Agent Forge" width={180} height={50} className="mx-auto mb-2" />
          <p className="text-white text-sm">The one-stop seller focused e-commerce solution</p>
        </div>
      </header>

      <div className="flex">
        <aside className="w-[260px] bg-[#2C2C2C] min-h-[calc(100vh-100px)] p-6">
          <div className="space-y-4">
            {steps.map((step, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                  idx < currentStep ? 'bg-green-500' : idx === currentStep ? 'bg-[#E74C3C]' : 'bg-gray-600'
                }`}>
                  {idx < currentStep ? '✓' : idx + 1}
                </div>
                <span className={`text-sm ${idx === currentStep ? 'text-white font-medium' : 'text-gray-400'}`}>
                  {step}
                </span>
              </div>
            ))}
          </div>
        </aside>

        <main className="flex-1 p-8">
          <Link href="/" className="text-[#E74C3C] hover:underline mb-6 inline-block">← Back to Home</Link>
          
          <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-md p-8 max-w-4xl">
            <h2 className="text-2xl font-bold text-[#333333] mb-6">{steps[currentStep]}</h2>

            {currentStep === 0 && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[#333333] mb-2">Full Name *</label>
                    <input type="text" required className="w-full border border-[#DDDDDD] rounded px-4 py-2 focus:outline-none focus:border-[#E74C3C]" 
                      value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#333333] mb-2">Email Address *</label>
                    <input type="email" required className="w-full border border-[#DDDDDD] rounded px-4 py-2 focus:outline-none focus:border-[#E74C3C]"
                      value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[#333333] mb-2">Mobile Number *</label>
                    <input type="tel" required className="w-full border border-[#DDDDDD] rounded px-4 py-2 focus:outline-none focus:border-[#E74C3C]"
                      value={formData.mobile} onChange={(e) => setFormData({...formData, mobile: e.target.value})} />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#333333] mb-2">Display Name *</label>
                    <input type="text" required className="w-full border border-[#DDDDDD] rounded px-4 py-2 focus:outline-none focus:border-[#E74C3C]"
                      value={formData.displayName} onChange={(e) => setFormData({...formData, displayName: e.target.value})} />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#333333] mb-2">Store Name *</label>
                  <input type="text" required className="w-full border border-[#DDDDDD] rounded px-4 py-2 focus:outline-none focus:border-[#E74C3C]"
                    value={formData.storeName} onChange={(e) => setFormData({...formData, storeName: e.target.value})} />
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#333333] mb-2">Interested In *</label>
                  <div className="space-y-2">
                    {['Selling with Verte', 'Fulfillment with Verte', 'Both'].map(option => (
                      <label key={option} className="flex items-center gap-2">
                        <input type="radio" name="interestedIn" value={option} checked={formData.interestedIn === option}
                          onChange={(e) => setFormData({...formData, interestedIn: e.target.value})} />
                        <span className="text-[#333333]">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-[#333333] mb-2">Max Product SKU *</label>
                    <select required className="w-full border border-[#DDDDDD] rounded px-4 py-2 focus:outline-none focus:border-[#E74C3C]"
                      value={formData.maxSKU} onChange={(e) => setFormData({...formData, maxSKU: e.target.value})}>
                      <option value="">Select</option>
                      <option value="1-10">1-10</option>
                      <option value="10-50">10-50</option>
                      <option value="50-100">50-100</option>
                      <option value="100-500">100-500</option>
                      <option value="500+">500+</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-[#333333] mb-2">Current Revenue *</label>
                    <select required className="w-full border border-[#DDDDDD] rounded px-4 py-2 focus:outline-none focus:border-[#E74C3C]"
                      value={formData.revenue} onChange={(e) => setFormData({...formData, revenue: e.target.value})}>
                      <option value="">Select</option>
                      <option value="No Revenue">No Revenue</option>
                      <option value="0-10K">0-10K</option>
                      <option value="10K-50K">10K-50K</option>
                      <option value="50K-100K">50K-100K</option>
                      <option value="100K+">100K+</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-[#333333] mb-2">Main Product Category *</label>
                  <div className="space-y-2">
                    {['Electronics', 'Apparels', 'Toys', 'Other'].map(cat => (
                      <label key={cat} className="flex items-center gap-2">
                        <input type="radio" name="category" value={cat} checked={formData.category === cat}
                          onChange={(e) => setFormData({...formData, category: e.target.value})} />
                        <span className="text-[#333333]">{cat}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-medium text-[#333333]">Address</h3>
                  <input type="text" placeholder="Address" className="w-full border border-[#DDDDDD] rounded px-4 py-2 focus:outline-none focus:border-[#E74C3C]"
                    value={formData.address.street} onChange={(e) => setFormData({...formData, address: {...formData.address, street: e.target.value}})} />
                  <div className="grid grid-cols-2 gap-6">
                    <input type="text" placeholder="City" className="w-full border border-[#DDDDDD] rounded px-4 py-2 focus:outline-none focus:border-[#E74C3C]"
                      value={formData.address.city} onChange={(e) => setFormData({...formData, address: {...formData.address, city: e.target.value}})} />
                    <input type="text" placeholder="State" className="w-full border border-[#DDDDDD] rounded px-4 py-2 focus:outline-none focus:border-[#E74C3C]"
                      value={formData.address.state} onChange={(e) => setFormData({...formData, address: {...formData.address, state: e.target.value}})} />
                  </div>
                  <div className="grid grid-cols-2 gap-6">
                    <input type="text" placeholder="Country" className="w-full border border-[#DDDDDD] rounded px-4 py-2 focus:outline-none focus:border-[#E74C3C]"
                      value={formData.address.country} onChange={(e) => setFormData({...formData, address: {...formData.address, country: e.target.value}})} />
                    <input type="number" placeholder="Zipcode" className="w-full border border-[#DDDDDD] rounded px-4 py-2 focus:outline-none focus:border-[#E74C3C]"
                      value={formData.address.zipcode} onChange={(e) => setFormData({...formData, address: {...formData.address, zipcode: e.target.value}})} />
                  </div>
                </div>
              </div>
            )}

            {currentStep > 0 && (
              <div className="text-center py-12 text-gray-500">
                Step {currentStep + 1} form fields coming soon...
              </div>
            )}

            <div className="flex justify-end gap-4 mt-8">
              {currentStep > 0 && (
                <button type="button" onClick={() => setCurrentStep(currentStep - 1)} 
                  className="px-6 py-2 text-gray-600 hover:text-gray-800">
                  Back
                </button>
              )}
              <button type="submit" className="bg-[#E74C3C] text-white px-8 py-2 rounded hover:bg-[#C0392B] font-medium">
                {currentStep < steps.length - 1 ? 'Continue →' : 'Submit'}
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  )
}
