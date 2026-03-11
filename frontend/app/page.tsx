'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import dynamic from 'next/dynamic'
import LoginModal from '@/components/LoginModal'
import SignupModal from '@/components/SignupModal'
import MarketplaceModal from '@/components/MarketplaceModal'
import OnboardingModal from '@/components/OnboardingModal'
import CartModal from '@/components/CartModal'
import CheckoutModal from '@/components/CheckoutModal'
import SuccessModal from '@/components/SuccessModal'
import WelcomeLoader from '@/components/WelcomeLoader'
import Footer from '@/components/Footer'
import Chatbot from '@/components/Chatbot'
import Navbar from '@/components/Navbar'
import ProductCard from '@/components/ProductCard'
import Button from '@/components/Button'
import { API_URL, FEATURES } from '@/lib/constants'
import { getAuthStatus } from '@/lib/utils'
import strings from '@/lib/strings.json'
import { useRouter } from 'next/navigation'

const Spline = dynamic(() => import('@splinetool/react-spline'), { ssr: false })

export default function Home() {
  const router = useRouter()
  const [showLoader, setShowLoader] = useState(true)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [orderId, setOrderId] = useState('')
  const [modals, setModals] = useState({
    login: false,
    signup: false,
    marketplace: false,
    onboarding: false,
    cart: false,
    checkout: false,
    success: false
  })
  const [products, setProducts] = useState([])

  useEffect(() => {
    if (!showLoader) {
      setIsLoggedIn(getAuthStatus())
      fetch(`${API_URL}/api/products`)
        .then(res => res.json())
        .then(data => setProducts(data.slice(0, 6)))
        .catch(err => console.error(err))
    }
  }, [showLoader])

  const toggleModal = (modal: keyof typeof modals) => {
    setModals(prev => ({ ...prev, [modal]: !prev[modal] }))
  }

  const handleCheckoutSuccess = (id: string) => {
    setOrderId(id)
    toggleModal('success')
  }

  const handleDashboard = () => {
    router.push('/dashboard')
  }

  if (showLoader) {
    return <WelcomeLoader onComplete={(loggedIn) => { setIsLoggedIn(loggedIn); setShowLoader(false) }} />
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-primary via-secondary to-primary">
      <Navbar 
        isLoggedIn={isLoggedIn}
        onExplore={() => toggleModal('marketplace')}
        onCart={() => toggleModal('cart')}
        onLogin={() => toggleModal('login')}
        onSignup={() => toggleModal('signup')}
        onDashboard={handleDashboard}
      />

      <section className="container mx-auto px-4 py-32 text-center">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="inline-block mb-4 px-4 py-2 bg-accent/10 border border-accent/30 rounded-full text-accent text-sm font-medium">
            {strings.hero.badge}
          </div>
          <h2 className="text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-300 to-accent bg-clip-text text-transparent">
            {strings.hero.title}<br/>{strings.hero.subtitle}
          </h2>
          <p className="text-xl text-gray mb-8 max-w-2xl mx-auto">
            {strings.hero.description}
          </p>

          <div className="w-full max-w-3xl mx-auto h-[500px] mb-8">
            <Spline scene="https://prod.spline.design/9B0bSxFEVYYXeoor/scene.splinecode" />
          </div>

          <div className="flex gap-4 justify-center">
            <Button onClick={() => toggleModal('marketplace')}>{strings.hero.ctaPrimary}</Button>
            <Button variant="outline" onClick={() => toggleModal('onboarding')}>{strings.hero.ctaSecondary}</Button>
          </div>
        </motion.div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold mb-4">{strings.sections.featured.title}</h3>
          <p className="text-gray">{strings.sections.featured.subtitle}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {products.length === 0 ? (
            <div className="col-span-3 text-center py-12">
              <div className="text-6xl mb-4">🤖</div>
              <p className="text-gray text-xl">{strings.sections.featured.emptyState}</p>
            </div>
          ) : (
            products.map((product: any, index: number) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))
          )}
        </div>
        <div className="text-center">
          <Button variant="outline" onClick={() => toggleModal('marketplace')}>{strings.sections.featured.viewAll}</Button>
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h3 className="text-4xl font-bold mb-4">{strings.sections.whyChoose.title}</h3>
          <p className="text-gray">{strings.sections.whyChoose.subtitle}</p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {strings.features.map((feature, i) => (
            <motion.div key={i} className="bg-secondary/50 backdrop-blur border border-accent/20 p-8 rounded-2xl" whileHover={{ scale: 1.05 }}>
              <div className={`w-12 h-12 bg-gradient-to-br ${FEATURES[i].gradient} rounded-xl mb-4 flex items-center justify-center text-2xl`}>
                {feature.icon}
              </div>
              <h4 className="text-2xl font-bold mb-3">{feature.title}</h4>
              <p className="text-gray">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="container mx-auto px-4 py-20">
        <div className="bg-gradient-to-r from-accent/20 to-blue-600/20 border border-accent/30 rounded-3xl p-16 text-center">
          <h3 className="text-4xl font-bold mb-4">{strings.sections.cta.title}</h3>
          <p className="text-gray mb-8">{strings.sections.cta.subtitle}</p>
          <Button onClick={() => toggleModal('signup')}>{strings.sections.cta.button}</Button>
        </div>
      </section>

      <Footer />
      <Chatbot />

      <LoginModal isOpen={modals.login} onClose={() => toggleModal('login')} onSwitchToSignup={() => { toggleModal('login'); toggleModal('signup'); }} />
      <SignupModal isOpen={modals.signup} onClose={() => toggleModal('signup')} onSwitchToLogin={() => { toggleModal('signup'); toggleModal('login'); }} />
      <MarketplaceModal isOpen={modals.marketplace} onClose={() => toggleModal('marketplace')} />
      <OnboardingModal isOpen={modals.onboarding} onClose={() => toggleModal('onboarding')} />
      <CartModal isOpen={modals.cart} onClose={() => toggleModal('cart')} onCheckout={() => { toggleModal('cart'); toggleModal('checkout'); }} />
      <CheckoutModal isOpen={modals.checkout} onClose={() => toggleModal('checkout')} onSuccess={handleCheckoutSuccess} />
      <SuccessModal isOpen={modals.success} onClose={() => toggleModal('success')} orderId={orderId} />
    </main>
  )
}
