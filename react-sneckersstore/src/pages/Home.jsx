import Card from "../components/Card";
function HomePage({  items,
searchValue,
onChangeSearchInput,
setSearchValue,
onAddToFavorite,
onAddToCart
}){
    return (
        <div className="content x p-40">
        <div className="d-flex align-center justify-between mb-40">
          <h1> {searchValue ? `Поиск по запросу: ${searchValue}` : "Все кроссовки"}</h1>
          <div className="search-block d-flex">
            <img src="/img/search.svg" alt="Search" />
            <input onChange={onChangeSearchInput} value={searchValue} placeholder="Поиск..." />
            {searchValue && <img onClick={()=> setSearchValue("")} className="clear cu-p" src="/img/btn-remove.svg" alt="Clear"/>}
          </div>
        </div>
        <div className="d-flex flex-wrap">
          {items
          .filter((item) => item.title.toLowerCase().includes(searchValue.toLowerCase()))
          .map((item, index) => (
            <Card 
            key={index}
            title = {item.title}
            price = {item.price}
            imageUrl = {item.image} 
            onFavorite = {( obj) => {onAddToFavorite(obj)}} 
            onPlus = {(obj) => onAddToCart(obj)} />
          ))}
        </div>
      </div>
    );
}
export default HomePage;