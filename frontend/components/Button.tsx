import { motion } from 'framer-motion'

interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary' | 'outline'
  className?: string
  type?: 'button' | 'submit'
}

export default function Button({ children, onClick, variant = 'primary', className = '', type = 'button' }: ButtonProps) {
  const baseStyles = 'px-6 py-3 rounded-full font-semibold transition'
  
  const variants = {
    primary: 'bg-gradient-to-r from-accent to-blue-600 hover:shadow-lg hover:shadow-accent/50',
    secondary: 'bg-secondary/50 border border-accent/30 hover:bg-accent/10',
    outline: 'border-2 border-accent/50 hover:bg-accent/10'
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      {children}
    </motion.button>
  )
}
