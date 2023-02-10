import ShoppingCart from '@/components/ShoppingCart/ShoppingCart'
import { useLocalStorage } from '@/utilities/useLocalStorage'
import { ReactNode,createContext, useContext, useState} from 'react'

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
  children: ReactNode
}

type CartItemProps = {
  id: number,
  quantity: number
}

//Creating a context to handle all the information about the cart,
//and pass through all the components of the application using the provider.

const ShoppingCartContext = createContext({} as ShoppingCartContextProps)

//The function below when called, will return a useContext hook with the 
//above created context already passed into it. The useContext hook
//will in turn return all the values passed into the provider.

export const useShoppingCart = () => {
  return (
    useContext(ShoppingCartContext)
  )
}

//A wrapper component that returns the context provider. This is useful 
//for passing other components or data to the context provider.

export const ShoppingCartProvider = ({children}: ShoppingCartProviderProps) => {
  
//The state below handles the opening and closing of the cart button

  const [isOpen, setIsOpen] = useState(false)
  const openCart = () => setIsOpen(true)
  const closeCart = () => setIsOpen(false)

//The custom hook below is defined in the utilities folder. It handles 
//the state of the items in the cart and persists the state by saving it 
//to the local storage.

  const [cartItems, setCartItems] = useLocalStorage<CartItemProps[]>("Shopping Cart", [])

//The functions below are explained as named. They are passed as context
//to the provider.

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
      {/*The shopping cart component above is passed here so it
      available and be opened anywhere in the application and also have
      access to the context.*/}
    </ShoppingCartContext.Provider>
  )
}

