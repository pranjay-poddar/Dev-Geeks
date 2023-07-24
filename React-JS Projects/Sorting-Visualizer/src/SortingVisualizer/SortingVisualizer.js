import React from "react";
import "./SortingVisualizer.css";
import { getMergeSortAnimations } from "../sortingAlgorithms/mergeSort.js";
// import { getSelectionSortAnimations } from "../sortingAlgorithms/selectionSort.js";
import { getBubbleSortAnimations } from "../sortingAlgorithms/bubbleSort.js";
import { getInsertionSortAnimations } from "../sortingAlgorithms/insertionSort.js";
// import { getQuickSortAnimations } from "../sortingAlgorithms/quickSort.js";
// import { get_iterations } from "../sortingAlgorithms/enter_iterations.js";
var ITERATIONS;
const PRIMARY_COLOR = "black";
const SECONDARY_COLOR = "white";
const THIRD_COLOR = "green";
let ANIMATION_SPEED_MS = 200;
export class SortingVisualizer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      array: [],
      value: 10,
      w: "30px",
      b: "20em",
    };
  }

  componentDidMount() {
    //Called immediately after a component is mounted. Setting state here will trigger re-rendering.
    document.getElementById("myRange").value = 10;
    this.value = 10;
    this.b = "2em";
    this.w = this.w = (1200 - 11.3 * this.value) / this.value;
    this.resetArray();
  }

  onInput() {
    var input = document.getElementById("myRange");
    var currentVal = input.value;
    this.value = currentVal;
    this.w = (1200 - 11.3 * currentVal) / currentVal - currentVal;

    this.setState({
      value: currentVal,
    });
    this.resetArray();
  }

  resetArray() {
    const array = [];
    console.log(this.value);
    for (let i = 0; i < this.value; i++) {
      array.push(randomIntFromInterval(200, 600));
    }

    this.setState({ array });
  }

  mergeSort() {
    const animations = getMergeSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");
      const isColorChange = i % 3 !== 2;

      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  //   selectionSort() {
  //     const animations = getSelectionSortAnimations(this.state.array);
  //     for (let i = 0; i < animations.length; i++) {
  //       const arrayBars = document.getElementsByClassName("array-bar");
  //       const isColorChange = i % 3 !== 2;
  //       const [barOneIdx, barTwoIdx] = animations[i];
  //       if (isColorChange) {
  //         const barOneStyle = arrayBars[barOneIdx].style;
  //         const barTwoStyle = arrayBars[barTwoIdx].style;
  //         const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
  //         setTimeout(() => {
  //           barOneStyle.backgroundColor = color;
  //           barTwoStyle.backgroundColor = color;
  //         }, i * ANIMATION_SPEED_MS);
  //       } else {
  //         setTimeout(() => {
  //           const [barOneIdx, newHeight] = animations[i];
  //           const barOneStyle = arrayBars[barOneIdx].style;
  //           barOneStyle.height = `${newHeight}px`;
  //         }, i * ANIMATION_SPEED_MS);
  //       }
  //     }
  //   }

  bubbleSort() {
    const animations = getBubbleSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  insertionSort() {
    const animations = getInsertionSortAnimations(this.state.array);
    for (let i = 0; i < animations.length; i++) {
      const arrayBars = document.getElementsByClassName("array-bar");
      const isColorChange = i % 3 !== 2;
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        setTimeout(() => {
          barOneStyle.backgroundColor = color;
          barTwoStyle.backgroundColor = color;
        }, i * ANIMATION_SPEED_MS);
      } else {
        setTimeout(() => {
          const [barOneIdx, newHeight] = animations[i];
          const barOneStyle = arrayBars[barOneIdx].style;
          barOneStyle.height = `${newHeight}px`;
        }, i * ANIMATION_SPEED_MS);
      }
    }
  }

  //   quickSort() {
  //     const animations = getQuickSortAnimations(this.state.array);
  //     for (let i = 0; i < animations.length; i++) {
  //       const arrayBars = document.getElementsByClassName("array-bar");
  //       const isColorChange = i % 3 !== 2;
  //       if (isColorChange) {
  //         const [barOneIdx, barTwoIdx] = animations[i];
  //         const barOneStyle = arrayBars[barOneIdx].style;
  //         const barTwoStyle = arrayBars[barTwoIdx].style;
  //         const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
  //         setTimeout(() => {
  //           barOneStyle.backgroundColor = color;
  //           barTwoStyle.backgroundColor = color;
  //         }, i * ANIMATION_SPEED_MS);
  //       } else {
  //         setTimeout(() => {
  //           const [barOneIdx, newHeight] = animations[i];
  //           const barOneStyle = arrayBars[barOneIdx].style;
  //           barOneStyle.height = `${newHeight}px`;
  //         }, i * ANIMATION_SPEED_MS);
  //       }
  //     }
  //   }

  render() {
    const { array } = this.state;

    return (
      <div>
        <ul id="topnav">
          <li>
            <div
              class="button_cont"
              align="center"
              onClick={() => this.resetArray()}
            >
              Reset Array
            </div>
          </li>
          {/* <input
            type="range"
            min="4"
            max="40"
            step="1"
            style={{
              width: "514px",
              color: "yellow",
            }}
            defaultValue="3"
            onInput={this.onInput.bind(this)}
          ></input> */}

          <li>
            <div
              class="button_cont"
              //   align="center"
              onClick={() => this.mergeSort()}
            >
              Merge Sort
            </div>
          </li>
          <li>
            <div
              class="button_cont"
              //   align="center"
              onClick={() => this.bubbleSort()}
            >
              Bubble Sort
            </div>
          </li>
          <li>
            <div
              class="button_cont"
              align="center/"
              onClick={() => this.quickSort()}
            >
              Quick Sort
            </div>
          </li>
          <li>
            <div
              class="button_cont"
              //   align="center"
              onClick={() => this.insertionSort()}
            >
              Insertion Sort
            </div>
          </li>

          <li>
            <div
              class="button_cont"
              //   align="center"
              onClick={() => this.selectionSort()}
            >
              Selection Sort
            </div>
          </li>
        </ul>
        <input
          type="range"
          min="4"
          max="20"
          id="myRange"
          step="1"
          defaultValue="3"
          onInput={this.onInput.bind(this)}
        ></input>
        <div className="array-container">
          {array.map((value, idx) => (
            <div
              className="array-bar"
              key={idx}
              style={{
                backgroundColor: PRIMARY_COLOR,
                height: `${value}px`,
                width: `${this.w}px`,
                border: `solid ${this.b}em`,
              }}
            ></div>
          ))}
        </div>
      </div>
    );
  }
}

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function arrayAreEqual(array1, array2) {
  if (array1.length !== array2.length) {
    return false;
  }

  for (let i = 0; i < array1.length; i++) {
    if (array1[i] !== array2[i]) {
      return false;
    }
  }
  return true;
}

function settingit() {
  var slider = document.getElementById("myRange");
  var ans = slider.value;
  return ans;
}
