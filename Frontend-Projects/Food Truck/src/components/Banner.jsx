function Banner() {
  return (
    <div className="banner row">
      <div className="banner-left col-lg-6 col-md-6 col-sm-12">
        <img
          src={process.env.PUBLIC_URL + "./images/food-truck.png"}
          alt="food-cart"
        />
        <h1>Discover the</h1>
        <h1>
          <span>Best</span> Food
        </h1>
        <h1>and Drinks</h1>
        <p>
          Naturally made Healthcare Products for the <br /> better care &
          support of your body.
        </p>
        <button className="btn">Explore Now!</button>
      </div>
      <div className="banner-right col-lg-6 col-md-6 col-sm-12">
        <img
          src={process.env.PUBLIC_URL + "./images/pizza.png"}
          alt="food-cart"
        />
        <button className="btn">Get In Touch</button>
      </div>
    </div>
  );
}

export default Banner;
