import React, { useState } from 'react'

const WishList = () => {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState('');
  
    const handleAddItem = () => {
      if (newItem.trim() !== '') {
        setItems([...items, newItem]);
        setNewItem('');
      }
    };
  
  return (
    <section className='wishlist'>
        <div className='container'>

        </div>
        {/* <div>
        <h2>Wishlist</h2>
        <ul>
            {items.map((item, index) => (
            <li key={index}>{item}</li>
            ))}
        </ul>
        <div>
            <input
            type="text"
            value={newItem}
            onChange={(e) => setNewItem(e.target.value)}
            />
            <button onClick={handleAddItem}>Add to Wishlist</button>
        </div>
        </div> */}
    </section>
  )
}

export default WishList