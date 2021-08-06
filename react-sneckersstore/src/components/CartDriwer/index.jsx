import styles from "./CartDriwer.module.scss";

function Cart({ onClose, items = [], onRemove }) {
  return (
    <div className="overlay">
      <div className={styles.drawer}>
        <h2 className="d-flex justify-between  mb-30">
          Корзина
          <img
            onClick={onClose}
            className="removeBtn cu-p"
            src="/img/btn-remove.svg"
            alt="Remove"
          />
        </h2>
        {items.length > 0 ? (
          <div>
            <div className={styles.item}>
              {items.map((obj) => (
                <div key ={obj.id} className="cartItem d-flex align-center mb-20">
                  <div
                    style={{ backgroundImage: `url( ${obj.imageUrl} )` }}
                    className="cartItemImg"
                  ></div>
                  <div className="mr-20 flex">
                    <p className="mb-5">{obj.title}</p>
                    <b>{obj.price} руб.</b>
                  </div>
                  <img
                    onClic k={() => onRemove(obj.id)}
                    className="removeBtn"
                    src="/img/btn-remove.svg"
                    alt="Remove"
                  />
                </div>
              ))}
            </div>
            <div className="cartTotalBlock">
              <ul>
                <li>
                  <span>Итого:</span>
                  <div></div>
                  <b>21 498 руб.</b>
                </li>
                <li>
                  <span>Налог 5%:</span>
                  <div></div>
                  <b>1074 руб.</b>
                </li>
              </ul>
              <button className="greenBotton">
                Оформить Заказ
                <img src="/img/arrow.svg" alt="arrow" />
              </button>
            </div>
          </div>
        ) : (
          <div className="cartEmpty d-flex align-center justify-center flex-column flex">
            <img
              src="/img/empty-cart.png"
              alt="EmptyCart"
              width={120}
              height={120}
              className="mb-20"
            />
            <h2>Корзина Пуста</h2>
            <p className="opacity-6">Добавьте хоть одну пару кроссовок</p>
            <button onClick={onClose} className="greenBotton">
              <img src="/img/arrow.svg" alt="Arrow" />
              Вернуться назад
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Cart;
