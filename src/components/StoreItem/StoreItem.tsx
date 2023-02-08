import { formatCurrency } from '@/utilities/formatCurrency'
import React from 'react'
import Image from 'next/image'

type StoreItemProps = {
  id: number,
  name: string,
  price: number,
  imgUrl: string
}

const StoreItem = ({name, price, imgUrl}: StoreItemProps) => {
  const quantity = 0;
  return (
    <div className='storeItem'>
      <Image width="1200" height="200" src={imgUrl} alt="shopping item" />
      <div className='title'>
        <h3>{name}</h3>
        <p>{formatCurrency(price)}</p>
      </div>
      <div>
        {
          quantity === 0 ?
          (<button className='addToCart'> + Add To Cart</button>) : 
          (<div className='quantityBtns'>
            <div className='minusPlusBtns'>
              <button>-</button>
              <p><span>{quantity}</span>in cart</p>
              <button>+</button>
            </div>
            <button className='removeBtn'>Remove</button>
          </div>)
        }
      </div>
    </div>
  )
}

export default StoreItem