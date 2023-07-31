function Label(props) {
  return (
    <div id={props.id} className="label">
      <h2>{props.title}</h2>
      <p className="time" id={props.idLength}>
        {props.time}
      </p>
      <div className="buttons"> 
        <button id={props.increment} onClick={(e) => props.handleClickPlus(e)}>
          +
        </button>
        <button id={props.decrement} onClick={(e) => props.handleClickMin(e)}>
          -
        </button>
      </div>
    </div>
  );
}

export default Label;
