import React, { useContext } from "react";
import { AppContext } from "../App";
import Letter from "./Letter";

function Board() {
  return (
    <div className="board">
      {/* Board component responsible for displaying the game board */}
      <div className="row">
        {/* First row of the board */}
        <Letter letterPos={0} attemptVal={0} />{" "}
        {/* Render Letter component at position 0, attempt 0 */}
        <Letter letterPos={1} attemptVal={0} />{" "}
        {/* Render Letter component at position 1, attempt 0 */}
        <Letter letterPos={2} attemptVal={0} />{" "}
        {/* Render Letter component at position 2, attempt 0 */}
        <Letter letterPos={3} attemptVal={0} />{" "}
        {/* Render Letter component at position 3, attempt 0 */}
        <Letter letterPos={4} attemptVal={0} />{" "}
        {/* Render Letter component at position 4, attempt 0 */}
      </div>
      <div className="row">
        {/* Second row of the board */}
        <Letter letterPos={0} attemptVal={1} />{" "}
        {/* Render Letter component at position 0, attempt 1 */}
        <Letter letterPos={1} attemptVal={1} />{" "}
        {/* Render Letter component at position 1, attempt 1 */}
        <Letter letterPos={2} attemptVal={1} />{" "}
        {/* Render Letter component at position 2, attempt 1 */}
        <Letter letterPos={3} attemptVal={1} />{" "}
        {/* Render Letter component at position 3, attempt 1 */}
        <Letter letterPos={4} attemptVal={1} />{" "}
        {/* Render Letter component at position 4, attempt 1 */}
      </div>
      <div className="row">
        {/* Third row of the board */}
        <Letter letterPos={0} attemptVal={2} />{" "}
        {/* Render Letter component at position 0, attempt 2 */}
        <Letter letterPos={1} attemptVal={2} />{" "}
        {/* Render Letter component at position 1, attempt 2 */}
        <Letter letterPos={2} attemptVal={2} />{" "}
        {/* Render Letter component at position 2, attempt 2 */}
        <Letter letterPos={3} attemptVal={2} />{" "}
        {/* Render Letter component at position 3, attempt 2 */}
        <Letter letterPos={4} attemptVal={2} />{" "}
        {/* Render Letter component at position 4, attempt 2 */}
      </div>
      <div className="row">
        {/* Fourth row of the board */}
        <Letter letterPos={0} attemptVal={3} />{" "}
        {/* Render Letter component at position 0, attempt 3 */}
        <Letter letterPos={1} attemptVal={3} />{" "}
        {/* Render Letter component at position 1, attempt 3 */}
        <Letter letterPos={2} attemptVal={3} />{" "}
        {/* Render Letter component at position 2, attempt 3 */}
        <Letter letterPos={3} attemptVal={3} />{" "}
        {/* Render Letter component at position 3, attempt 3 */}
        <Letter letterPos={4} attemptVal={3} />{" "}
        {/* Render Letter component at position 4, attempt 3 */}
      </div>
      <div className="row">
        {/* Fifth row of the board */}
        <Letter letterPos={0} attemptVal={4} />{" "}
        {/* Render Letter component at position 0, attempt 4 */}
        <Letter letterPos={1} attemptVal={4} />{" "}
        {/* Render Letter component at position 1, attempt 4 */}
        <Letter letterPos={2} attemptVal={4} />{" "}
        {/* Render Letter component at position 2, attempt 4 */}
        <Letter letterPos={3} attemptVal={4} />{" "}
        {/* Render Letter component at position 3, attempt 4 */}
        <Letter letterPos={4} attemptVal={4} />{" "}
        {/* Render Letter component at position 4, attempt 4 */}
      </div>
      <div className="row">
        {/* Sixth row of the board */}
        <Letter letterPos={0} attemptVal={5} />{" "}
        {/* Render Letter component at position 0, attempt 5 */}
        <Letter letterPos={1} attemptVal={5} />{" "}
        {/* Render Letter component at position 1, attempt 5 */}
        <Letter letterPos={2} attemptVal={5} />{" "}
        {/* Render Letter component at position 2, attempt 5 */}
        <Letter letterPos={3} attemptVal={5} />{" "}
        {/* Render Letter component at position 3, attempt 5 */}
        <Letter letterPos={4} attemptVal={5} />{" "}
        {/* Render Letter component at position 4, attempt 5 */}
      </div>
    </div>
  );
}

export default Board;
