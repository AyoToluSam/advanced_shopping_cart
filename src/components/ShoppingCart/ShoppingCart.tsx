import {IoMdClose} from 'react-icons/io'
import { useShoppingCart } from '@/contexts/ShoppingCartContext'
import { formatCurrency } from '@/utilities/formatCurrency'
import storeItems from "../../data/items.json"
import CartItem from '../CartItem/CartItem'

type ShoppingCartProps = {
  isOpen: boolean
}

const ShoppingCart = ({isOpen} : ShoppingCartProps) => {

//Destructuring the needed context from the useShoppingCart function
//as defined in the ShoppingCartContext module.

  const {closeCart, cartItems} = useShoppingCart()
  
  return ( isOpen ?
    <div className='shoppingCart'>
      <IoMdClose onClick={() => closeCart()} className='closeBtn' />
      <h2>Cart</h2>
      <div>
        {
          cartItems.map(item => <CartItem key={item.id} {...item} />)
        }
      </div>
      <div className='totalPrice'>
        <h2>
          Total: {formatCurrency(cartItems.reduce(
          (total, cartItem) => {
            const item = storeItems.find(item => item.id === cartItem.id)
            return total + (item?.price || 0) * cartItem.quantity
          }, 0))}
        </h2>
      </div>
    </div>
    : null
  )
}

export default ShoppingCart