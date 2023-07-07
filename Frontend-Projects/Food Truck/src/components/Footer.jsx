function Footer() {
  return (
    <div className="footer row">
      <div className="food-truck col-lg-3 col-md-6 col-sm-12">
        <img
          src={process.env.PUBLIC_URL + "./images/food-truck.png"}
          alt="food-cart"
        />
      </div>
      <div className="col-lg-3 col-md-6 col-sm-12">
        <h5>Contact Us</h5>
        <p>
          Lorem Ipsum Pvt Ltd.5/1, Magalton <br/> Road, Phartosh Gate near YTM <br /> Market, XYZ-343434
        </p>
        <p>example2020@gmail.com</p>
        <p>(904) 443-0343</p>
      </div>
      <div className="col-lg-3 col-md-6 col-sm-12">
        <h5>More</h5>
        <p>Products</p>
        <p>Career</p>
        <p>Contact Us</p>
      </div>
      <div className="spcl col-lg-3 col-md-6 col-sm-12">
        <div className="up">
          <h5>Social Links</h5>
          <div className="social">
            <img
              src={process.env.PUBLIC_URL + "./images/insta.png"}
              alt="food-cart"
            />
            <img
              src={process.env.PUBLIC_URL + "./images/twitter.png"}
              alt="food-cart"
            />
            <img
              src={process.env.PUBLIC_URL + "./images/fb.png"}
              alt="food-cart"
            />
          </div>
        </div>
        <div className="down">
          <p>© 2023 Food Truck Example</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
