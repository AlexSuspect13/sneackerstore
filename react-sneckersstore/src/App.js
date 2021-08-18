import {Route} from 'react-router-dom'
import React from 'react';
import axios from 'axios'
import Header from "./components/Header";
import CartDriver from "./components/CartDriwer";
import HomePage from './pages/Home';
import Favorites from './pages/Favorites';

function App() {
  const [items, setItems] = React.useState([])
  const [searchValue, setSearchValue] = React.useState("")
  const [cartItems, setCartItems] = React.useState([])
  const [cartOpened, setCartOpened] = React.useState(false);
  const [favorites, setFavorites] = React.useState([])

  

 React.useEffect(()=>{
  async function fetchData(){
   const {data: itemData} = await axios.get('https://6101ea3227d22500174b2265.mockapi.io/items');

  const {data: cartData} = await axios.get('https://6101ea3227d22500174b2265.mockapi.io/cart');

  const {data: favoriteData} = await axios.get('https://6101ea3227d22500174b2265.mockapi.io/favorite');

  setCartItems(cartData);
  setFavorites(favoriteData);
  setItems(itemData);
  }
  fetchData();
 },[]);

const onAddToCart = (obj)=>{
  if(cartItems.find((item)=> item.title === obj.title)){
    axios.delete(`https://6101ea3227d22500174b2265.mockapi.io/cart/${obj.title}`)
    setCartItems((prev)=> prev.filter((item) =>  item.title !== obj.title))
  }
  else{
    axios.post('https://6101ea3227d22500174b2265.mockapi.io/cart', obj);
    setCartItems((prev)=> [...prev,obj])
  }
 
}

const onRemoveItem = (id)=>{
  axios.delete(`https://6101ea3227d22500174b2265.mockapi.io/cart/${id}`);
  setCartItems((prev)=>prev.filter((item)=>item.id !== id))
}


const onChangeSearchInput= (event) =>{
  setSearchValue(event.target.value);
}


const onAddToFavorite = async (obj)=>{
  try {
    if(favorites.find((favObj)=> favObj.id === obj.id )){
      axios.delete(`https://6101ea3227d22500174b2265.mockapi.io/favorite/${obj.id}`);
      setFavorites((prev)=> prev.filter(item=>item.id !== obj.id))
    }
    else{
      const {data} = await axios.post('https://6101ea3227d22500174b2265.mockapi.io/favorite', obj);
      setFavorites([...favorites, data])
    }
  } catch (error) {
    alert('Товар небыл добавлен в закладки')
  }
  
}

  return (
    <div className="wrapper clear">
      {cartOpened && <CartDriver  items={cartItems} onClose={ () => {setCartOpened(false)} } onRemove={onRemoveItem}/>}
      <Header onClickCart={()=>{setCartOpened(true)}} />

      <Route path="/" exact><HomePage items={items} 
      cartItems={cartItems}
      searchValue={searchValue}
      onChangeSearchInput={onChangeSearchInput}
      setSearchValue={setSearchValue}
      onAddToFavorite={onAddToFavorite}
      onAddToCart={onAddToCart}
      />
      </Route>
      <Route path="/favorites" exact><Favorites items={favorites} onAddToFavorite={onAddToFavorite} />
      </Route>
    </div>
  );
}

export default App;
