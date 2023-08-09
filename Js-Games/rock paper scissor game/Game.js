
import React, {Component} from "react";
import './Game.css';

class Game extends Component{
	constructor(props) {
		super(props)
		this.state = {
			playerVal : null,
			computerVal : null,
			playerScore: 0,
			compScore: 0,
		};
	}
	logic = (playerVal, computerVal)=>{
		if(playerVal == computerVal){
			return 0;
		} else if ((playerVal == "ROCK" && computerVal == "SCISSORS") ||
			(playerVal == "SCISSORS" && computerVal == "PAPER") ||
			(playerVal == "PAPER" && computerVal == "ROCK")
		) {
			return 1;
		} else {
			return -1;
		}
	}

	decision = (playerChoice)=> {
		const choices = ["ROCK", "PAPER", "SCISSORS"];
		const compChoice = choices[Math.floor(Math.random() * choices.length)];
		const val = this.logic(playerChoice, compChoice)
		if(val == 1) {
			console.log("Hello")
			this.setState({
				playerVal: playerChoice,
				computerVal : compChoice,
				playerScore : this.state.playerScore +1
			})
		} else if(val == -1) {
			console.log("Hello")
			this.setState({
				playerVal: playerChoice,
				computerVal : compChoice,
				compScore : this.state.compScore +1
			})
		} else {
			console.log("Hello")
			this.setState({
				computerVal : compChoice,
				playerVal : playerChoice
			})
		}
	}
	render(){
		const {playerVal, computerVal, playerScore, compScore} = this.state;
		return(
			<div className="container">
				<h1>Welcome to Rock, Paper, Scissors Game</h1>
				<div >
					<button onClick={()=>this.decision("ROCK")}>
						<i className={`fas fa-hand-rock`} /> Rock
					</button>
					<button onClick={()=>this.decision("PAPER")}>
						<i className={`fas fa-hand-paper`} /> Paper
					</button>
					<button onClick={()=>this.decision("SCISSORS")}>
						<i className={`fas fa-hand-scissors`} /> Scissors
					</button>
				</div>
				<div className="content">
					<p>Your choice: {playerVal}</p>
					<p>Computer's choice: {computerVal}</p>
					<h2>Your Score:{playerScore}</h2>
					<h2>Computer Score: {compScore}</h2>
				</div>
			</div>
		)
	}
}

export default Game;
