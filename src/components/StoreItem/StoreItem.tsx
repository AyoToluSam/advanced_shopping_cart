import { formatCurrency } from '@/utilities/formatCurrency'
import React from 'react'
import Image from 'next/image'
import { useShoppingCart } from '@/contexts/ShoppingCartContext'

type StoreItemProps = {
  id: number,
  name: string,
  price: number,
  imgUrl: string
}

//Declaring the component for each store item and destructuting its props
//as parameters. The type of the component is defined above.

const StoreItem = ({id, name, price, imgUrl}: StoreItemProps) => {

//The useShoppingCart function below is defined in ShoppingCartContext
//in the contexts folder. It returns a useContext hook which in turn 
//returns all the context needed in this StoreItem component, as 
//destructured below.
//The destructured functions are explained as named.

  const {
    getItemQuantity, 
    increaseItemQuantity, 
    decreaseItemQuantity,
    removeFromCart
  } = useShoppingCart()

  const quantity = getItemQuantity(id);

  return (
    <div className='storeItem'>
      <Image width="1200" height="200" src={imgUrl} alt="shopping item" />
      <div className='title'>
        <h3>{name}</h3>
        {/*The formatCurrency function is defined in the utilities folder
        It formats the price passed into it and displays it just as a 
        currency would read.*/}
        <p>{formatCurrency(price)}</p>
      </div>
      <div>
        {
          quantity === 0 ?
          (<button className='addToCart' onClick={() => increaseItemQuantity(id)}> + Add To Cart</button>) : 
          (<div className='quantityBtns'>
            <div className='minusPlusBtns'>
              <button onClick={() => decreaseItemQuantity(id)}>-</button>
              <p><span>{quantity}</span>in cart</p>
              <button onClick={() => increaseItemQuantity(id)}>+</button>
            </div>
            <button className='removeBtn' onClick={() => removeFromCart(id)}>Remove</button>
          </div>)
        }
      </div>
    </div>
  )
}

export default StoreItem