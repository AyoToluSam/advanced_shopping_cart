import {FiShoppingCart} from 'react-icons/Fi'
import Link from 'next/link'
import { useShoppingCart } from '@/contexts/ShoppingCartContext'

const Navbar = () => {

//The useShoppingCart function below is defined in ShoppingCartContext
//in the contexts folder. It returns a useContext hook which in turn 
//returns all the context needed to handle the shopping cart button, as 
//destructured below.
//The destructured function and value are explained as named.

  const {openCart, cartQuantity} = useShoppingCart()

  return (
    <nav className='app_navbar'>
      <ul className='navList'>
        <li><Link href={"/"}>Home</Link></li>
        <li><Link href={"/Store"}>Store</Link></li>
        <li><Link href={"/About"}>About</Link></li>
      </ul>
      <div className='cart'>
        <button onClick={() => openCart()}>
          <FiShoppingCart/>
        </button>
        {cartQuantity > 0 &&
          <span className='itemCount'>
            {cartQuantity}
          </span>
        }
      </div>
    </nav>
  )
}

export default Navbar