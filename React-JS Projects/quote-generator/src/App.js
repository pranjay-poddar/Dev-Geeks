import React from "react";
import "./App.css";
import axios from "axios";

class App extends React.Component {
  state = { advice: "", col: 0 };

  componentDidMount() {
    this.fetchAdvice();
  }
  fetchAdvice = () => {
    axios
      .get("https://api.adviceslip.com/advice")
      .then((response) => {
        const { advice } = response.data.slip;
        this.setState({ advice, col: (this.state.col + 1) % 3 });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  render() {
    const { advice } = this.state;
    return (
      <>
        <div className="app">
          <div
            className={`card ${this.state.col == 1 ? `col1` : ``} ${
              this.state.col == 2 ? `col2` : ``
            } ${this.state.col == 0 ? `col3` : ``}`}
          >
            <h1 className="heading">{advice}</h1>
            <button className="button" onClick={this.fetchAdvice}>
              <span>GIVE ME ADVICE!</span>
            </button>
          </div>
        </div>
        <div className="footer">
          <div className="left">
          <img
            src="https://i.ibb.co/nBQLJbs/removal-ai-tmp-646ca89d65086.png"
            alt="removal-ai-tmp-646ca89d65086"
            border="0"
          ></img>
          </div>
          <div className="right">All Rights Reserved</div>
        </div>
      </>
    );
  }
}
export default App;
