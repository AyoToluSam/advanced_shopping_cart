import { useShoppingCart } from "@/contexts/ShoppingCartContext"
import storeItems from "../../data/items.json"
import Image from "next/image"
import {IoMdClose} from 'react-icons/io'

type CartItemProps = {
  id: number,
  quantity: number
}

const CartItem = ({id, quantity} : CartItemProps) => {

  const { removeFromCart } = useShoppingCart()
  const item = storeItems.find(item => item.id === id)

  if (item == null) return null

  return (
    <div className="cartItem">
      <Image className="itemImg" width="1200" height="200" src={item.imgUrl} alt="cart item" />
      <div className="itemInfo">
        <div className="infoLeft">
          <div className="itemDetails">
            <h4>
              {item.name}
            </h4>
            <p>
              {"x" + quantity}
            </p>
          </div>
          <p className="itemPrice">
            ${item.price}
          </p>
        </div>
        <div className="infoRight">
          <h4>{item.price * quantity}</h4>
          <button onClick={() => removeFromCart(id)}><IoMdClose/></button>
        </div>
      </div>
    </div>
  )
}

export default CartItem