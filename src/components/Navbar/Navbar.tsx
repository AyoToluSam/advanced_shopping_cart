import {CiShoppingCart} from 'react-icons/ci'
import Link from 'next/link'
import { useShoppingCart } from '@/contexts/ShoppingCartContext'

const Navbar = () => {

  const {openCart, closeCart, cartQuantity} = useShoppingCart()

  return (
    <nav className='app_navbar'>
      <ul className='navList'>
        <li><Link href={"/"}>Home</Link></li>
        <li><Link href={"/store"}>Store</Link></li>
        <li><Link href={"/about"}>About</Link></li>
      </ul>
      <button onClick={() => openCart()}>
        <CiShoppingCart className='cart'/>
        {cartQuantity > 0 &&
        <div className='itemCount'>{cartQuantity}</div>
        }
      </button>
    </nav>
  )
}

export default Navbar