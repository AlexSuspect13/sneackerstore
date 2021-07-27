function Card(){
    return(
        <div className="card">
          <img width={133} height={112} src="/img/sneackers/sneacker2.jpg" alt="" />
          <h5>Мужские Кроссовки Nike Blazer Mid Suede</h5>
          <div className="d-flex justify-between align-center">
            <div className="d-flex flex-column">
              <span>Цена:</span>
              <b>12 900 руб.</b>
            </div>
            <button className="button">
              <img width={11} height={11} src="/img/plus.svg" alt="Plus"></img>
            </button>
          </div>
        </div>

    );
}


export default Card;