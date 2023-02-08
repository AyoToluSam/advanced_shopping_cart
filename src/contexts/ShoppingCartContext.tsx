import {useContext, createContext, useState} from 'react'

type ShoppingCartContext = {
  getCartQuantity: (id: number) => number,
  incrementCartQuantity: (id: number) => void,
  decrementCartQuantity: (id: number) => void,
  removeFromCart: (id: number) => void
}

type ShoppingCartProvider= {
  children: React.ReactNode
}

type CartItem = {
  id: number,
  quantity: number
}

const ShoppingCartContext = createContext({} as ShoppingCartContext)

export const useShoppingCart = () => {
  return (
    useContext(ShoppingCartContext)
  )
}

export const ShoppingCartProvider = ({children}: ShoppingCartProvider) => {
  
  const [cartItems, setCartItems] = useState<CartItem[]>([])

  const getCartQuantity = (id: number) => {
    return cartItems.find(item => item.id === id)?.quantity || 0
  }

  const incrementCartQuantity = (id: number) => {
    setCartItems( cartItems => {
      if (cartItems.find(item => item.id === id) == null) {
        return [...cartItems, {id, quantity: 1}]
      } else {
        return cartItems.map(item => {
          if (item.id === id) {
            return {...item, quantity: item.quantity + 1}
          }
          return item
        })
      }
    })
  }

  const decrementCartQuantity = (id: number) => {
    setCartItems( cartItems => {
      if (cartItems.find(item => item.id === id) == null) {
        return [...cartItems, {id, quantity: 1}]
      } else {
        return cartItems.map(item => {
          if (item.id === id) {
            return {...item, quantity: item.quantity - 1}
          }
          return item
        })
      }
    })
  }

  return (
    <ShoppingCartContext.Provider value={{getCartQuantity}}>
      {children}
    </ShoppingCartContext.Provider>
  )
}