import React from 'react';
//import './weekspecial.css';

class WeekSpecial extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 'Breakfast'
    };
  }

  componentDidMount() {
    document.getElementById('defaultOpen').click();
  }

  openMeal(evt, mealName) {
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(mealName).style.display = "block";
    evt.currentTarget.className += " active";
  }

  render() {
    return (
      <div className="container">
        <h1 id="special" style={{textAlign: 'center'}}>Week Special</h1>
        <div className="tab">
          <button className="tablinks" onClick={(e) => this.openMeal(e, 'Breakfast')} id="defaultOpen" style={{width: '33.33%'}}><h4>Breakfast</h4></button>
          <button className="tablinks" onClick={(e) => this.openMeal(e, 'Lunch')} style={{width: '33.33%'}}><h4>Lunch</h4></button>
          <button className="tablinks" onClick={(e) => this.openMeal(e, 'Dinner')} style={{width: '33.33%'}}><h4>Dinner</h4></button>
        </div>
        <div id="Breakfast" className="tabcontent">
          <h3>Breakfast</h3>
          <div className="column">
            <div className="card">
              <img src="image/food.jpg" style={{width: '50%'}} />
              <div className="container">
                <h2>Food Ipsum</h2>
                <button>$5.99</button>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="card">
              <img src="image/food.jpg" style={{width: '50%'}} />
              <div className="container">
                <h2>Food Ipsum</h2>
                <button>$5.99</button>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="card">
              <img src="image/food.jpg" style={{width: '50%'}} />
              <div className="container">
                <h2>Food Ipsum</h2>
                <button>$5.99</button>
              </div>
            </div>
          </div>
        </div>
        <div id="Lunch" className="tabcontent">
          <h3>Lunch</h3>
          <div className="column">
            <div className="card">
              <img src="image/food1.jpg" style={{width: '50%'}} />
              <div className="container">
                <h2>Food Ipsum</h2>
                <button>$6.99</button>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="card">
              <img src="image/food2.jpg" style={{width: '50%'}} />
              <div className="container">
                <h2>Food Ipsum</h2>
                <button>$4.99</button>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="card">
              <img src="image/food.jpg" style={{width: '50%'}} />
              <div className="container">
                <h2>Food Ipsum</h2>
                <button>$5.99</button>
              </div>
            </div>
          </div>    
        </div>
        <div id="Dinner" className="tabcontent">
          <h3>Dinner</h3>
          <div className="column">
            <div className="card">
              <img src="image/food2.jpg" style={{width: '50%'}} />
              <div className="container">
                <h2>Food Ipsum</h2>
                <button>$9.99</button>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="card">
              <img src="image/food2.jpg" style={{width: '50%'}} />
              <div className="container">
                <h2>Food Ipsum</h2>
                <button>$5.99</button>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="card">
              <img src="image/food1.jpg" style={{width: '50%'}} />
              <div className="container">
                <h2>Food Ipsum</h2>
                <button>$6.99</button>
              </div>
            </div>
          </div> 
        </div>
        </div>
    );
    }
}

export default WeekSpecial; 
