import Carousel from "react-elastic-carousel";
import Item from "./Item";

const breakPoints = [
  { width: 1, itemsToShow: 1 },
  { width: 768, itemsToShow: 2 },
  { width: 1200, itemsToShow: 3 },
];

function Article() {
  return (
    <div className="article">
      <h1>Latest Articles</h1>
      <div className="App">
        <Carousel breakPoints={breakPoints}>
          <Item>
            <div className="up">
              <img
                src={process.env.PUBLIC_URL + "./images/meal-prep-ideas-1.png"}
                alt="food-cart"
              />
            </div>
            <div className="down">
              <p className="heading">Grilled Tomatoes at Home</p>
              <p>
                PLorem Ipsum is simply dummy text of the printing and
                typesetting industry. Lorem Ipsum has been the industry's
                standard...
              </p>
              <button className="btn">Read More</button>
            </div>
          </Item>
          <Item>
            <div className="up">
              <img
                src={process.env.PUBLIC_URL + "./images/meal-prep-ideas-2.png"}
                alt="food-cart"
              />
            </div>
            <div className="down">
              <p className="heading">Snacks for Travel</p>
              <p>
                PLorem Ipsum is simply dummy text of the printing and
                typesetting industry. Lorem Ipsum has been the industry's
                standard...
              </p>
              <button className="btn">Read More</button>
            </div>
          </Item>
          <Item>
            <div className="up">
              <img
                src={process.env.PUBLIC_URL + "./images/meal-prep-ideas-3.png"}
                alt="food-cart"
              />
            </div>
            <div className="down">
              <p className="heading">Post-workout Recipes</p>
              <p>
                PLorem Ipsum is simply dummy text of the printing and
                typesetting industry. Lorem Ipsum has been the industry's
                standard...
              </p>
              <button className="btn">Read More</button>
            </div>
          </Item>
          <Item>
            <div className="up">
              <img
                src={process.env.PUBLIC_URL + "./images/meal-prep-ideas-4.png"}
                alt="food-cart"
              />
            </div>
            <div className="down">
              <p className="heading">How To Grill Corn</p>
              <p>
                PLorem Ipsum is simply dummy text of the printing and
                typesetting industry. Lorem Ipsum has been the industry's
                standard...
              </p>
              <button className="btn">Read More</button>
            </div>
          </Item>
          <Item>
            <div className="up">
              <img
                src={process.env.PUBLIC_URL + "./images/meal-prep-ideas-5.png"}
                alt="food-cart"
              />
            </div>
            <div className="down">
              <p className="heading">Crunchwrap Supreme</p>
              <p>
                PLorem Ipsum is simply dummy text of the printing and
                typesetting industry. Lorem Ipsum has been the industry's
                standard...
              </p>
              <button className="btn">Read More</button>
            </div>
          </Item>
          <Item>
            <div className="up">
              <img
                src={process.env.PUBLIC_URL + "./images/meal-prep-ideas-6.png"}
                alt="food-cart"
              />
            </div>
            <div className="down">
              <p className="heading">Broccoli Cheese Soup</p>
              <p>
                PLorem Ipsum is simply dummy text of the printing and
                typesetting industry. Lorem Ipsum has been the industry's
                standard...
              </p>
              <button className="btn">Read More</button>
            </div>
          </Item>
        </Carousel>
      </div>
    </div>
  );
}

export default Article;
