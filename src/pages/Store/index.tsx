import Navbar from '@/components/Navbar/Navbar'
import items from '../../data/items.json'
import StoreItem from '@/components/StoreItem/StoreItem'

const Store = () => {

  return (
    <div>
      <Navbar />
      <section>
        {
          items.map((item) => {
            return (
              <StoreItem key={item.id} {...item} />
            )
          })
        }
      </section>
    </div>
  )
}

export default Store