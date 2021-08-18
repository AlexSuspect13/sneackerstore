import React from "react";
import styles from "./Card.module.scss";

function Card({ imageUrl, price, title, onPlus, onFavorite, favorited=false, added=false }) {
  const [isAdded, setIsAdded] = React.useState(added);
  const [isFavorite, setIsFavorite] = React.useState(favorited);

  const onClickPlus = () => {
    onPlus({ imageUrl, price, title }); // диструкторизированные пропсы
    setIsAdded(!isAdded);
  };

  const onClickFavorite = () => {
    onFavorite({ imageUrl, price, title });
    setIsFavorite(!isFavorite);
  };
  
  return (
    <div className={styles.card}>
      <div className={styles.favorite} onClick={onClickFavorite}>
        <img
          src={isFavorite ? "/img/liked.svg" : "/img/unliked.svg"}
          alt="Favotite"
        />
      </div>
      <img width={133} height={112} src={imageUrl} alt="" />
      <h5>{title}</h5>
      <div  className="d-flex justify-between align-center">
        <div className="d-flex flex-column">
          <span>Цена:</span>
          <b>{price} руб.</b>
        </div>
        <img
          className={styles.plus}
          onClick={onClickPlus}
        
          src={isAdded ? "/img/checked.svg" : "/img/plus.svg"}
          alt="Plus"
        ></img>
      </div>
    </div>
  );
}

export default Card;
