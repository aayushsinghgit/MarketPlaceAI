'use client'
import { motion } from 'framer-motion'

export default function WelcomeLoader({ onComplete }: { onComplete: (isLoggedIn: boolean) => void }) {

  const handleGoogleLogin = async () => {
    try {
      const width = 500
      const height = 600
      const left = window.screen.width / 2 - width / 2
      const top = window.screen.height / 2 - height / 2
      
      const popup = window.open(
        'https://accounts.google.com/o/oauth2/v2/auth?client_id=YOUR_CLIENT_ID&redirect_uri=http://localhost:3000/auth/callback&response_type=token&scope=email profile',
        'Google Login',
        `width=${width},height=${height},left=${left},top=${top}`
      )

      window.addEventListener('message', (event) => {
        if (event.data.type === 'GOOGLE_AUTH_SUCCESS') {
          localStorage.setItem('isLoggedIn', 'true')
          localStorage.setItem('user', JSON.stringify(event.data.user))
          localStorage.setItem('token', event.data.token)
          popup?.close()
          onComplete(true)
        }
      })
    } catch (error) {
      console.error('Login failed:', error)
    }
  }

  const handleSkip = () => {
    onComplete(false)
  }

  return (
    <div className="fixed inset-0 z-[100] bg-primary flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <motion.div
          className="absolute w-[800px] h-[800px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(33, 150, 243, 0.3) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }}
          animate={{
            x: [0, 100, -100, 0],
            y: [0, -100, 100, 0],
            scale: [1, 1.2, 0.8, 1],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute w-[600px] h-[600px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(25, 118, 210, 0.3) 0%, transparent 70%)',
            filter: 'blur(60px)',
            right: 0,
            bottom: 0,
          }}
          animate={{
            x: [0, -150, 150, 0],
            y: [0, 150, -150, 0],
            scale: [1, 0.8, 1.2, 1],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <motion.div
          className="absolute w-[700px] h-[700px] rounded-full"
          style={{
            background: 'radial-gradient(circle, rgba(66, 165, 245, 0.2) 0%, transparent 70%)',
            filter: 'blur(60px)',
            left: '50%',
            top: '50%',
          }}
          animate={{
            x: [0, 200, -200, 0],
            y: [0, -200, 200, 0],
            scale: [1, 1.1, 0.9, 1],
          }}
          transition={{
            duration: 30,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
      </div>

      <motion.div 
        className="relative text-center z-10 max-w-md w-full px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <motion.div 
          className="mb-12"
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-7xl font-bold mb-4 bg-gradient-to-r from-accent via-blue-400 to-blue-600 bg-clip-text text-transparent">
            AgentForge
          </h1>
          <p className="text-xl text-gray">AI Agent Platform</p>
        </motion.div>

        <motion.div 
          className="bg-secondary/50 backdrop-blur-xl border border-accent/30 rounded-3xl p-8"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold mb-2">Welcome!</h2>
          <p className="text-gray mb-8">Sign in to continue</p>
          
          <motion.button 
            onClick={handleGoogleLogin}
            className="w-full bg-white text-primary py-4 rounded-xl font-semibold hover:shadow-lg transition flex items-center justify-center gap-3 mb-4"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <svg className="w-6 h-6" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </motion.button>

          <motion.button 
            onClick={handleSkip}
            className="w-full border border-accent/30 py-3 rounded-xl hover:bg-accent/10 transition text-gray"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Skip for now
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  )
}
