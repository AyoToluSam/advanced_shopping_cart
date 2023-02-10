import { useShoppingCart } from "@/contexts/ShoppingCartContext"
import storeItems from "../../data/items.json"
import Image from "next/image"
import { formatCurrency } from "@/utilities/formatCurrency"

type CartItemProps = {
  id: number,
  quantity: number
}

//This component renders each item added to the cart, the quantity of the
//item and a button to remove it from the cart.

const CartItem = ({id, quantity} : CartItemProps) => {

//Destructuring the needed context from the useShoppingCart function as
//defined in the ShoppingCartContext.

  const { removeFromCart } = useShoppingCart()
  const item = storeItems.find(item => item.id === id)

  if (item == null) return null

  return (
    <div className="cartItem">
      <Image className="itemImg" width="600" height="200" src={item.imgUrl} alt="cart item" />
      <div className="itemInfo">
        <div className="infoLeft">
          <div className="itemDetails">
            <h4>
              {item.name}
            </h4>
            {quantity > 1 &&
              <p>
                x{quantity}
              </p>
            }
          </div>
          <p className="itemPrice">
            {formatCurrency(item.price)}
          </p>
        </div>
        <div className="infoRight">
          <h4>{formatCurrency(item.price * quantity)}</h4>
          <button onClick={() => removeFromCart(item.id)}>x</button>
        </div>
      </div>
    </div>
  )
}

export default CartItem