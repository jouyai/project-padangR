import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])
  
  // Load cart from localStorage on initial render
  useEffect(() => {
    const savedCart = localStorage.getItem('secondstyle_cart')
    if (savedCart) {
      setCartItems(JSON.parse(savedCart))
    }
  }, [])
  
  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('secondstyle_cart', JSON.stringify(cartItems))
  }, [cartItems])

  const addToCart = (product) => {
    setCartItems(prevItems => {
      // Check if product with same ID and size already exists in cart
      const existingItem = prevItems.find(
        item => item.id === product.id && item.size === product.size
      )
      
      if (existingItem) {
        // Update quantity if exists
        return prevItems.map(item =>
          item.id === product.id && item.size === product.size
            ? { ...item, quantity: item.quantity + product.quantity }
            : item
        )
      } else {
        // Add new item if not exists
        return [...prevItems, product]
      }
    })
  }

  const removeFromCart = (productId, size) => {
    setCartItems(prevItems =>
      prevItems.filter(item => !(item.id === productId && item.size === size))
    )
  }

  const updateQuantity = (productId, size, newQuantity) => {
    if (newQuantity < 1) return
    
    setCartItems(prevItems =>
      prevItems.map(item =>
        item.id === productId && item.size === size
          ? { ...item, quantity: newQuantity }
          : item
      )
    )
  }

  const clearCart = () => {
    setCartItems([])
  }

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export const useCart = () => {
  return useContext(CartContext)
}