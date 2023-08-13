import React from 'react';
import Menu from "./MenuApi";


const MenuCard = ({menuData}) => {
  return (
    <>
    <section className="main-card--cointainer">
      {menuData.map((curElem)=>{
        return (
          <>
          <div className="card-container" key={curElem.id}>
        <div className="card">
            <div className="card-body">
                <span className="card-number card-circle subtitle">
                {curElem.id}
                </span>
                <span className="card-author subtitle" >{curElem.category}</span>
                <h2 className="card-title">{curElem.name}</h2>
                <span className="card-description subtitle">
                    I Love Maggi. Lorem ipsum dolor sit, amet consectetur adipisicing elit. Minima voluptatibus animi tempora repudiandae laudantium libero. Numquam, mollitia perspiciatis hic nostrum veritatis deleniti corporis suscipit sapiente, vitae vel aliquid facilis delectus voluptatum facere.
                </span>
                <div className="card-read">Read</div>
            </div>
            <img src={curElem.image} alt="" className="card-media"/>
            <span className="card-tag subtitle">Order Now</span>
        </div>
      </div>
      
          </>
        )
      })}
      </section>
    </>
  )
}

export default MenuCard
