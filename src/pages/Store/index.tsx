import Navbar from '@/components/Navbar/Navbar'
import items from '../../data/items.json'
import StoreItem from '@/components/StoreItem/StoreItem'

const Store = () => {

  return (
    <div>
      <Navbar />
      {/*The section below maps over the data of the items available in 
      store to produce a component for each store item, and passing the
      data for each item as props to its component.*/}
      <section className='storeItems'>
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