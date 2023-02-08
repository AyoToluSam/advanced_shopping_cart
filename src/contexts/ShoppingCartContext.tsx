import {useContext, createContext, useState} from 'react'

type ShoppingCartContextProps = {
  getCartQuantity: (id: number) => number,
  incrementCartQuantity: (id: number) => void,
  decrementCartQuantity: (id: number) => void,
  removeFromCart: (id: number) => void
}

type ShoppingCartProviderProps= {
  children: React.ReactNode
}

type CartItemProps = {
  id: number,
  quantity: number
}

const ShoppingCartContext = createContext({} as ShoppingCartContextProps)

export const useShoppingCart = () => {
  return (
    useContext(ShoppingCartContext)
  )
}

export const ShoppingCartProvider = ({children}: ShoppingCartProviderProps) => {
  
  const [cartItems, setCartItems] = useState<CartItemProps[]>([])

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
      if (cartItems.find(item => item.id === id)?.quantity === 1) {
        return cartItems.filter(item => item.id !== id)
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

  const removeFromCart = (id: number) => {
    setCartItems( cartItems => {
      return cartItems.filter(item => item.id !== id)
    })
  }

  return (
    <ShoppingCartContext.Provider value={{getCartQuantity, incrementCartQuantity, decrementCartQuantity, removeFromCart}}>
      {children}
    </ShoppingCartContext.Provider>
  )
}