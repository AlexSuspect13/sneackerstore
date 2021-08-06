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
  axios.get('https://6101ea3227d22500174b2265.mockapi.io/items').then((res)=>{
    setItems(res.data);
  });
  axios.get('https://6101ea3227d22500174b2265.mockapi.io/cart').then((res)=>{
    setCartItems(res.data);
  });
  axios.get('https://6101ea3227d22500174b2265.mockapi.io/favorite').then((res)=>{
    setFavorites(res.data);
  });
 },[]);

const onAddToCart = (obj)=>{
  console.log(obj);
  if(cartItems.find((item)=> item.id === obj.id )){
    setCartItems((prev)=> prev.filter(item => item.id !== obj.id))
  }
  else{
    axios.post('https://6101ea3227d22500174b2265.mockapi.io/cart', obj);
    setCartItems([...cartItems, obj])
  }
  
 
}

const onRemoveItem=(id)=>{
  axios.delete(`https://6101ea3227d22500174b2265.mockapi.io/cart/${id}`);
  setCartItems((prev)=>prev.filter(item=>item.id !== id))
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
