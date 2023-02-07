import { formatCurrency } from '@/utilities/formatCurrency'
import React from 'react'

type StoreItemProps = {
  id: number,
  name: string,
  price: number,
  imgUrl: string
}

const StoreItem = ({id, name, price, imgUrl}: StoreItemProps) => {
  return (
    <div className='storeItem'>
      <img src={imgUrl} alt="shopping item" />
      <div className='title'>
        <h3>{name}</h3>
        <p>{formatCurrency(price)}</p>
      </div>
      <div>
        
      </div>
    </div>
  )
}

export default StoreItem