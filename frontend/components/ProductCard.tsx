import { motion } from 'framer-motion'

interface ProductCardProps {
  product: any
  index: number
  onAddToCart?: () => void
}

export default function ProductCard({ product, index, onAddToCart }: ProductCardProps) {
  return (
    <motion.div 
      className="bg-secondary/50 backdrop-blur border border-accent/20 p-6 rounded-2xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ scale: 1.05 }}
    >
      <div className="w-full h-40 bg-gradient-to-br from-accent/20 to-blue-600/20 rounded-xl mb-4 flex items-center justify-center text-5xl">
        🤖
      </div>
      <h3 className="text-2xl font-bold mb-2">{product.name}</h3>
      <p className="text-gray mb-6 line-clamp-2">{product.description}</p>
      <div className="flex justify-between items-center">
        <span className="text-3xl font-bold bg-gradient-to-r from-accent to-blue-600 bg-clip-text text-transparent">
          ${product.price}
        </span>
        <button 
          onClick={onAddToCart}
          className="bg-gradient-to-r from-accent to-blue-600 px-6 py-2 rounded-full font-semibold hover:shadow-lg hover:shadow-accent/50 transition"
        >
          Add to Cart
        </button>
      </div>
    </motion.div>
  )
}
