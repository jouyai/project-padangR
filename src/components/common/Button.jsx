import { motion } from 'framer-motion'

const Button = ({ 
  children, 
  className = '', 
  onClick, 
  disabled = false,
  type = 'button'
}) => {
  return (
    <motion.button
      type={type}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      onClick={onClick}
      disabled={disabled}
      className={`rounded-md px-4 py-2 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
    >
      {children}
    </motion.button>
  )
}

export default Button