import {CiShoppingCart} from 'react-icons/ci'
import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className='app_navbar'>
      <ul className='navList'>
        <li><Link href={"/"}>Home</Link></li>
        <li><Link href={"/store"}>Store</Link></li>
        <li><Link href={"/about"}>About</Link></li>
      </ul>

      <button>
        <CiShoppingCart className='cart'/>
        <div className='itemCount'>{1}</div>
      </button>
    </nav>
  )
}

export default Navbar