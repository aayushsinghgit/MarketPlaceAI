'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import Navbar from '@/components/Navbar'
import { useRouter } from 'next/navigation'

export default function Dashboard() {
  const router = useRouter()
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/')
      return
    }

    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/dashboard`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        setData(data)
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  if (loading) return <div className="min-h-screen bg-gradient-to-br from-primary via-secondary to-primary flex items-center justify-center"><div className="text-2xl">Loading...</div></div>

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary via-secondary to-primary">
      <Navbar isLoggedIn={true} onExplore={() => {}} onCart={() => {}} onLogin={() => {}} onSignup={() => {}} />
      
      <div className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-4xl font-bold mb-8 bg-gradient-to-r from-accent to-blue-400 bg-clip-text text-transparent">Dashboard</h1>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <motion.div className="bg-white/10 backdrop-blur-lg border border-accent/30 rounded-2xl p-6" whileHover={{ scale: 1.02 }}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray text-sm">Total Purchases</p>
                  <p className="text-3xl font-bold">{data?.buyer?.totalPurchases || 0}</p>
                </div>
              </div>
            </motion.div>

            <motion.div className="bg-white/10 backdrop-blur-lg border border-accent/30 rounded-2xl p-6" whileHover={{ scale: 1.02 }}>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <p className="text-gray text-sm">Total Spent</p>
                  <p className="text-3xl font-bold">${data?.buyer?.totalSpent?.toFixed(2) || '0.00'}</p>
                </div>
              </div>
            </motion.div>

            {data?.isSeller && (
              <motion.div className="bg-white/10 backdrop-blur-lg border border-accent/30 rounded-2xl p-6" whileHover={{ scale: 1.02 }}>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-purple-500 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-gray text-sm">Total Revenue</p>
                    <p className="text-3xl font-bold">${data?.seller?.totalRevenue?.toFixed(2) || '0.00'}</p>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {data?.isSeller && (
            <motion.div className="bg-white/10 backdrop-blur-lg border border-accent/30 rounded-2xl p-6 mb-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
              <h2 className="text-2xl font-bold mb-4">Seller Statistics</h2>
              <div className="grid grid-cols-3 gap-6">
                <div>
                  <p className="text-gray text-sm">Products Listed</p>
                  <p className="text-2xl font-bold">{data?.seller?.productsListed || 0}</p>
                </div>
                <div>
                  <p className="text-gray text-sm">Total Sales</p>
                  <p className="text-2xl font-bold">{data?.seller?.totalSales || 0}</p>
                </div>
                <div>
                  <p className="text-gray text-sm">Avg. Sale Value</p>
                  <p className="text-2xl font-bold">${data?.seller?.totalSales > 0 ? (data?.seller?.totalRevenue / data?.seller?.totalSales).toFixed(2) : '0.00'}</p>
                </div>
              </div>
            </motion.div>
          )}

          <motion.div className="bg-white/10 backdrop-blur-lg border border-accent/30 rounded-2xl p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}>
            <h2 className="text-2xl font-bold mb-4">Order History</h2>
            {data?.buyer?.orders?.length > 0 ? (
              <div className="space-y-4">
                {data.buyer.orders.map((order: any, idx: number) => (
                  <div key={idx} className="bg-secondary/50 border border-accent/20 rounded-xl p-4 flex justify-between items-center">
                    <div>
                      <p className="font-semibold">Order #{order.orderId.slice(0, 8)}</p>
                      <p className="text-sm text-gray">{new Date(order.createdAt).toLocaleDateString()}</p>
                      <p className="text-sm text-gray">{order.items.length} item(s)</p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-accent">${order.totalAmount.toFixed(2)}</p>
                      <span className="text-xs bg-green-500/20 text-green-400 px-3 py-1 rounded-full">{order.status}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray text-center py-8">No orders yet</p>
            )}
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
