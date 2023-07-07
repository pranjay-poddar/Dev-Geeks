function About() {
  return (
    <div className="about row">
      <div className="about-left col-lg-6 col-md-6 col-sm-12">
        <img
          src={
            process.env.PUBLIC_URL +
            "./images/pharmasict-serving-customer-drug-store.png"
          }
          alt="food-cart"
        />
      </div>
      <div className="about-right col-lg-6 col-md-6 col-sm-12">
        <h1>About Us</h1>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. t has survived not only five centuries.</p>
        <button className="btn">Read More</button>
      </div>
    </div>
  );
}

export default About;
