import {IoMdClose} from 'react-icons/io'
import { useShoppingCart } from '@/contexts/ShoppingCartContext'
import CartItem from '../CartItem/CartItem'

type ShoppingCartProps = {
  isOpen: boolean
}

const ShoppingCart = ({isOpen} : ShoppingCartProps) => {

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
    </div>
    : null
  )
}

export default ShoppingCart