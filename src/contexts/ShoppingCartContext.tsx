import ShoppingCart from '@/components/ShoppingCart/ShoppingCart'
import { useLocalStorage } from '@/utilities/useLocalStorage'
import {useContext, createContext, useState} from 'react'

type ShoppingCartContextProps = {
  getItemQuantity: (id: number) => number,
  increaseItemQuantity: (id: number) => void,
  decreaseItemQuantity: (id: number) => void,
  removeFromCart: (id: number) => void,
  openCart: () => void,
  closeCart: () => void,
  cartQuantity: number,
  cartItems: CartItemProps[]
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
  
  const [isOpen, setIsOpen] = useState(false)
  const openCart = () => setIsOpen(true)
  const closeCart = () => setIsOpen(false)

  const [cartItems, setCartItems] = useLocalStorage<CartItemProps[]>("Shopping Cart", [])

  const getItemQuantity = (id: number) => {
    return cartItems.find(item => item.id === id)?.quantity || 0
  }

  const increaseItemQuantity = (id: number) => {
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

  const decreaseItemQuantity = (id: number) => {
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

  const cartQuantity = cartItems.reduce(
    (quantity, item) => item.quantity + quantity, 0 
  )

  return (
    <ShoppingCartContext.Provider 
      value={{
        getItemQuantity, 
        increaseItemQuantity, 
        decreaseItemQuantity, 
        removeFromCart, 
        openCart, 
        closeCart, 
        cartQuantity, 
        cartItems
      }}
    >
      {children}
      <ShoppingCart isOpen={isOpen}/>
    </ShoppingCartContext.Provider>
  )
}


// ShoppingCartProvider.getInitialProps = async (ctx) => {
//   if (typeof window === "undefined") {
//     const jsonValue = localStorage.getItem("")
//     if (jsonValue != null) return {cartItems: JSON.parse(jsonValue)}
//   }
// }