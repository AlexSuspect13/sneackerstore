import {Link} from 'react-router-dom'
function Header(props){
    return(
        <header className="d-flex justify-between align-center p-40">
        <div className="d-flex align-center">
          <Link to="">
          <img width={40} height={40} src="/img/logo.png" alt="Logo" />
          </Link>
          <div >
            <h3 className="text-uppercase">Sneackers Store</h3>
            <p className="opacity-5">Магазин лучших кроссовок</p>
          </div>
        </div>
        <ul className="d-flex">
          <li onClick={props.onClickCart} className="mr-30 cu-p">
          <img  width={20} height={20} src="/img/cart.svg" alt="Корзина" />
            <span>1205 руб.</span>
          </li>
          <li /*onClick={}*/ className="mr-30 cu-p">
            <Link to="favorites">
            <img width={20} height={20} src="/img/favorite.svg" alt="Закладки" />
            </Link>
          </li>
          <li>
          <img width={20} height={20} src="/img/user.svg" alt="Пользователь" />
          </li>
        </ul>
      </header>
    )
}

export default Header;