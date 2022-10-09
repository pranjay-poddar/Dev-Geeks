const container = document.querySelector('.data-container')
const ARRAY_SIZE = 20
const MAX_VALUE = 250
const MIN_VALUE = 5
var DELAY = 200
var ARRAY = []
const PRIMARY_COLOR = 'turquoise';
const SECONDARY_COLOR = 'red';



const speed = document.getElementById("speed")
const val = speed.options[speed.selectedIndex].value

speed.addEventListener("change", (e) => {
    const value = e.target.value
   
    if (value) {
        DELAY = parseInt(value)
    }
});

function generateArray(){

    container.innerHTML = "";
    ARRAY = []
    for(let i=0; i<ARRAY_SIZE; i++){
        
        const value = Math.floor(Math.random() * (MAX_VALUE - MIN_VALUE + 1)) + MIN_VALUE
        ARRAY.push(value)
        
        const bar = document.createElement('div')
        bar.classList.add('bar')
        bar.style.height = `${value}px`
        bar.style.transform = `translateX(${i * 30}px)`;
        
        const label = document.createElement('label')
        label.classList.add('bar_id')
        label.innerHTML = value
        
        bar.appendChild(label)
        container.append(bar)

    }

    var message = document.getElementById("message")
    message.innerHTML = ""
    // console.log(ARRAY)
}

async function selectionSort(){
    let array = document.querySelectorAll('.bar')
    var min_index = 0

    for(var i=0; i<array.length; i++){
        min_index = i;
        array[i].style.backgroundColor = 'darkblue'

        for(var j=i+1; j<array.length; j++){
            array[j].style.backgroundColor = 'red'
            
            await new Promise((resolve) => 
                setTimeout(() => {
                    resolve();
                }, DELAY)
            )

            var value1 = parseInt(array[j].childNodes[0].innerHTML);
            var value2 = parseInt(array[min_index].childNodes[0].innerHTML);

            if (value1 < value2) {
                if (min_index !== i) {
                    // Provide skyblue color to the (min-idx)th bar
                    array[min_index].style.backgroundColor = "grey";
                }
                min_index = j;
            }
            else {
                // Provide skyblue color to the jth bar
                array[j].style.backgroundColor = "grey";
            }
        }

        var temp1 = array[min_index].style.height;
        var temp2 = array[min_index].childNodes[0].innerText;

        array[min_index].style.height = array[i].style.height;
        array[i].style.height = temp1;
        array[min_index].childNodes[0].innerText = array[i].childNodes[0].innerText;
        array[i].childNodes[0].innerText = temp2;

        await new Promise((resolve) => 
            setTimeout(() => {
                resolve();
            }, DELAY)
        )

        // Provide skyblue color to the (min-idx)th bar
        array[min_index].style.backgroundColor = "grey";
    
        // Provide lightgreen color to the ith bar
        array[i].style.backgroundColor = "rgb(0,255,34)";
    }

    var message = document.getElementById("message")
    message.innerHTML = "<h3>Generated Array Sorted</h3>"
}


async function bubbleSort(){
    let array = document.querySelectorAll('.bar')

    for(var i=0; i<array.length; i++){
        for(var j=0; j<array.length-i-1; j++){
            array[j].style.backgroundColor = 'darkblue'
            array[j+1].style.backgroundColor = 'red'
            
            await new Promise((resolve) => 
                setTimeout(() => {
                    resolve();
                }, DELAY)
            )

            var value1 = parseInt(array[j].childNodes[0].innerHTML);
            var value2 = parseInt(array[j+1].childNodes[0].innerHTML);

            if (value1 > value2) {
                await new Promise((resolve) => {
                    var temp1 = array[j+1].style.height;
                    var temp2 = array[j+1].childNodes[0].innerText;
            
                    array[j+1].style.height = array[j].style.height;
                    array[j].style.height = temp1;
                    array[j+1].childNodes[0].innerText = array[j].childNodes[0].innerText;
                    array[j].childNodes[0].innerText = temp2;

                    setTimeout(() => {
                        resolve();
                    }, DELAY)
                })
            }

            // Provide skyblue color to the (min-idx)th bar
            array[j+1].style.backgroundColor = "rgb(0,255,34)";
        
            // Provide lightgreen color to the ith bar
            array[j].style.backgroundColor = "grey";
        }
        array[array.length - i - 1].style.backgroundColor = "rgb(0,255,34)";
    }

    var message = document.getElementById("message")
    message.innerHTML = "<h3>Generated Array Sorted</h3>"
}

async function insertionSort(){
    let array = document.querySelectorAll('.bar')

    array[0].style.backgroundColor = "rgb(0,255,34)"

    for(var i=1; i<array.length; i++){
        var j = i-1
        
        var key = parseInt(array[i].childNodes[0].innerHTML)
        var key_height = array[i].style.height

        array[i].style.backgroundColor = "darkblue"

        await new Promise((resolve) => 
            setTimeout(() => {
                resolve();
            }, DELAY)
        )

        while(j>=0 && parseInt(array[j].childNodes[0].innerHTML) > key){
            array[j].style.backgroundColor = "darkblue"

            array[j + 1].style.height = array[j].style.height;
            array[j + 1].childNodes[0].innerText = array[j].childNodes[0].innerText;

            j = j-1

            await new Promise((resolve) => 
                setTimeout(() => {
                    resolve();
                }, DELAY)
            )
            
            for(var k=i; k>=0; k--){
                array[k].style.backgroundColor = "rgb(0,255,34)" 
            }
        }

        array[j + 1].style.height = key_height;
        array[j + 1].childNodes[0].innerHTML = key;
        
        // To pause the execution of code for 600 milliseconds
        await new Promise((resolve) =>
        setTimeout(() => {
            resolve();
        }, DELAY)
        );
        
        // Provide light green color to the ith bar
        array[i].style.backgroundColor = "rgb(0,255,34)";
    }

    var message = document.getElementById("message")
    message.innerHTML = "<h3>Generated Array Sorted</h3>"
}


async function partition(low, high){
    let array = document.querySelectorAll('.bar');
    var pivot = parseInt(array[low].childNodes[0].innerHTML)

    var j = low;

    array[low].style.backgroundColor = "red";


    for(var i = low+1; i<=high; i++){
        array[i].style.backgroundColor = "deepblue";

        await new Promise((resolve) =>
            setTimeout(() => {
                resolve();
            }, DELAY)
        );

        var value = parseInt(array[i].childNodes[0].innerHTML);
        if(value < pivot){
            j++;
            var temp1 = array[j].style.height;
            var temp2 = array[j].childNodes[0].innerText;
            array[j].style.height = array[i].style.height;
            array[i].style.height = temp1;
            array[j].childNodes[0].innerText = array[i].childNodes[0].innerText;
            array[i].childNodes[0].innerText = temp2;

            array[j].style.backgroundColor = "grey";

            if (j != i)
                array[i].style.backgroundColor = "pink";

            await new Promise((resolve) =>
                setTimeout(() => {
                    resolve();
                }, DELAY)
            );
        }
        else{
            array[i].style.backgroundColor = "pink";
        }
    }

    var temp1 = array[j].style.height;
    var temp2 = array[j].childNodes[0].innerText;
    array[j].style.height = array[low].style.height;
    array[low].style.height = temp1;
    array[j].childNodes[0].innerText = array[low].childNodes[0].innerText;
    array[low].childNodes[0].innerText = temp2;

    array[low].style.backgroundColor = "pink";
    array[j].style.backgroundColor = "green";

    await new Promise((resolve) =>
        setTimeout(() => {
            resolve();
        }, DELAY)
    );

    for(var k = low; k < high; k++) 
        array[k].style.backgroundColor = "#6b5b95";

    return j;
}


async function quickSort(low = 0, high = document.querySelectorAll('.bar').length-1){
    if(low<high){
        var pivot = await partition(low, high)

        await quickSort(low, pivot);
        await quickSort(pivot+1, high);
    }
    // await new Promise((resolve) => 
    //     setTimeout(() => {
    //         var message = document.getElementById("message")
    //         message.innerHTML = "<h3>Generated Array Sorted</h3>"

    //         resolve()
    //     }, DELAY)
    // )
}


// async function merge(array, start, end, split){
//     console.log("testing")
//     var tempArr = array;
//     var left, right, count;
//     count = 0;
//     left = start;
//     right = split + 1;

//     while(left <= split && right <= end) {
//         await new Promise((resolve) =>
//             setTimeout(() => {
//             resolve();
//             }, DELAY)
//         );

//         var value1 = parseInt(array[left].childNodes[0].innerHTML)
//         var value2 = parseInt(array[right].childNodes[0].innerHTML)
        
//         if(value1 <= value2){
//             tempArr[count].style.height = array[left].style.height
//             tempArr[count].childNodes[0].innerText = array[left].childNodes[0].innerText
//             left++
//             count++
//             await new Promise((resolve) =>
//                 setTimeout(() => {
//                     resolve();
//                 }, DELAY)
//             );
//         }
//         else if(value1 > value2){
//             tempArr[count].style.height = array[right].style.height
//             tempArr[count].childNodes[0].innerText = array[right].childNodes[0].innerText
//             right++
//             count++
//             await new Promise((resolve) =>
//                 setTimeout(() => {
//                     resolve();
//                 }, DELAY)
//             );
//         }
//     }
    
//     await new Promise((resolve) =>
//         setTimeout(() => {
//         resolve();
//         }, DELAY)
//     );

//     while(left <= split) {
//         tempArr[count].style.height = array[left].style.height
//         tempArr[count].childNodes[0].innerText = array[left].childNodes[0].innerText
//         left++
//         count++
//     }

//     while(right <= end) {
//         tempArr[count].style.height = array[right].style.height
//         tempArr[count].childNodes[0].innerText = array[right].childNodes[0].innerText
//         right++
//         count++
//     }

//     count = 0
//     // for(let i = start; i <= end; i++) {
//     //     array[i].style.height = tempArr[count].style.height
//     //     array[i].childNodes[0].innerText = tempArr[count].childNodes[0].innerText
//     //     count++
//     // }
//     array = tempArr
// }


// async function mergeSort(array = document.querySelectorAll('.bar'), start = 0, end = document.querySelectorAll('.bar').length-1) {
//     if(start < end){
//         // console.log("testing")
//         var split = Math.floor((start + end) / 2);
    
//         await mergeSort(array, start, split);  // sort left side
    
//         await mergeSort(array, split+1, end);  // sort right side
    
//         await merge(array, start, end, split);  // merge them together
//     }
// }



async function getMergeSortAnimations(array) {
    // console.log("testing")
    const animations = [];
    if (array.length <= 1) return array;
    const auxiliaryArray = array.slice();
    await mergeSortHelper(array, 0, array.length - 1, auxiliaryArray, animations);
    return animations;
}

async function mergeSortHelper(mainArray, startIdx, endIdx, auxiliaryArray, animations){
    // console.log("testing")
    if (startIdx === endIdx) return;
    const middleIdx = Math.floor((startIdx + endIdx) / 2);
    await mergeSortHelper(auxiliaryArray, startIdx, middleIdx, mainArray, animations);
    await mergeSortHelper(auxiliaryArray, middleIdx + 1, endIdx, mainArray, animations);
    await doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations);
}

async function doMerge(mainArray, startIdx, middleIdx, endIdx, auxiliaryArray, animations){
    // console.log("testing")
    let k = startIdx;
    let i = startIdx;
    let j = middleIdx + 1;
    while (i <= middleIdx && j <= endIdx) {
        // await new Promise((resolve) => 
        //     setTimeout(() => {
        //         resolve();
        //     }, DELAY)
        // )
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([i, j]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([i, j]);
      if (auxiliaryArray[i] <= auxiliaryArray[j]) {
        // We overwrite the value at index k in the original array with the
        // value at index i in the auxiliary array.
        animations.push([k, auxiliaryArray[i]]);
        mainArray[k++] = auxiliaryArray[i++];
      } else {
        // We overwrite the value at index k in the original array with the
        // value at index j in the auxiliary array.
        animations.push([k, auxiliaryArray[j]]);
        mainArray[k++] = auxiliaryArray[j++];
      }
    }
    // await new Promise((resolve) => 
    //     setTimeout(() => {
    //         resolve();
    //     }, DELAY)
    // )
    while (i <= middleIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([i, i]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([i, i]);
      // We overwrite the value at index k in the original array with the
      // value at index i in the auxiliary array.
      animations.push([k, auxiliaryArray[i]]);
      mainArray[k++] = auxiliaryArray[i++];
    }
    while (j <= endIdx) {
      // These are the values that we're comparing; we push them once
      // to change their color.
      animations.push([j, j]);
      // These are the values that we're comparing; we push them a second
      // time to revert their color.
      animations.push([j, j]);
      // We overwrite the value at index k in the original array with the
      // value at index j in the auxiliary array.
      animations.push([k, auxiliaryArray[j]]);
      mainArray[k++] = auxiliaryArray[j++];
    }
}

async function mergeSort() {
    const animations = await getMergeSortAnimations(ARRAY);
    // console.log("testing")
    const arrayBars = document.querySelectorAll('.bar');
    for (let i = 0; i < animations.length; i++) {
    //   const arrayBars = document.querySelectorAll('.bar');
      const isColorChange = (i % 3 != 2);
      if (isColorChange) {
        const [barOneIdx, barTwoIdx] = animations[i];
        const barOneStyle = arrayBars[barOneIdx].style;
        const barTwoStyle = arrayBars[barTwoIdx].style;
        const color = i % 3 === 0 ? SECONDARY_COLOR : PRIMARY_COLOR;
        await new Promise((resolve) => 
            setTimeout(() => {
                barOneStyle.backgroundColor = color;
                barTwoStyle.backgroundColor = color;
                resolve()
            }, DELAY)
        );
      } else {
        console.log("testing")
            await new Promise((resolve) => 
                setTimeout(() => {
                    const [barOneIdx, newHeight] = animations[i];
                    const barOneStyle = arrayBars[barOneIdx].style;
                    barOneStyle.height = `${newHeight}px`;
                    arrayBars[barOneIdx].childNodes[0].innerText = `${newHeight}`
                    resolve()
                }, DELAY)
            );
      }
    }
    for(let i=0; i<arrayBars.length; i++){
        arrayBars[i].style.backgroundColor = "rgb(19, 208, 19)"
    }
    var message = document.getElementById("message")
    message.innerHTML = "<h3>Generated Array Sorted</h3>"
  }


// to generate the random array when screen reloads
window.onload = function() {
    generateArray();
};