import {useRouter} from 'next/router'
import { useState } from 'react'


const Product = () => {
  const router = useRouter()
  const id = router.query.id
  const [product, setProduct] = useState(null)
  return (
    <div>Product {id}</div>
  )
}

export default Product