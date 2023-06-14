let number = document.getElementById('input-num');
let startButton = document.getElementById('start');
let speed = document.getElementById('speed-select');
let n = 0;
let num_boards = [0, 2, 1, 1, 3, 11, 5, 41, 93, 353];
const queenIcon1 = '<i class="fas fa-chess-queen queen-icon queen-icon-black"></i>';
const queenIcon2 = '<i class="fas fa-chess-queen queen-icon queen-icon-white"></i>';
let q, Board = 0;

let nowState = {};

document.getElementById("speed-select").oninput = function () {
    var value = (this.value - this.min) / (this.max - this.min) * 100
    this.style.background = 'linear-gradient(to right, #d274fb 0%, #d274fb ' + value + '%, #fff ' + value + '%, white 100%)'
};

startButton.onclick = async function startDisplay(n) {
    console.log(speed * 100);
    n = number.value;
    q = new nQueen(n);
    // console.log(n);
    // console.log(speed.value);
    if (n > 9) {
        alert('Queen value is too large!!');
    }
    else if (n < 1) {
        alert('Queen value is too small!!');
    }
    else {
        const no_of_arrangements = document.getElementById('no-of-arrangements');
        const chess_boards = document.getElementById('chess-boards');

        while (chess_boards.childElementCount > 0) {
            chess_boards.removeChild(chess_boards.firstChild);
        }

        while (no_of_arrangements.childElementCount > 0) {
            no_of_arrangements.removeChild(no_of_arrangements.firstChild);
        }

        let info = document.createElement('para');
        info.setAttribute("id", "queen-info");
        info.innerHTML = `For ${n}x${n} board, ${num_boards[n] - 1} different arrangements are possible : `;

        no_of_arrangements.appendChild(info);

        // console.log(num_boards[n]);
        for (let i = 0; i < num_boards[n]; i++) {
            let div = document.createElement('div');
            div.setAttribute("id", `div-${i}`);
            div.setAttribute("class", "each-div");
            let table = document.createElement('table');
            table.setAttribute("id", `table-${i}`);
            table.setAttribute("class", "each-board");
            for (let j = 0; j < n; j++) {
                let row = table.insertRow(j);
                row.setAttribute("id", `row-${i}-${j}`);
                for (let k = 0; k < n; k++) {
                    let cell = row.insertCell(k);
                    if ((j + k) % 2 == 0) {
                        cell.style.backgroundColor = "black";
                    }
                    else {
                        cell.style.backgroundColor = "white";
                    }
                    cell.style.border = "2px solid black";
                    // cell.innerHTML = queenIcon;
                }
            }
            div.appendChild(table);
            chess_boards.appendChild(div);
            await q.waitTime();
            await q.resetColor(i, n);
        }
        await q.startFunc(n);
    }
}


class nQueen {
    constructor(n) {
        this.n = n;
        this.state = Object.assign({}, nowState);
    }

    startFunc = async (n) => {
        Board = 0;
        this.state[`${Board}`] = {};
        await q.solve(Board, 0, n);
        await q.resetColor(Board, n);
    }

    waitTime = async () => {
        await new Promise((done) => setTimeout(() => done(), (100 - speed.value) * 10));
    }

    solve = async (board, r, n) => {
        if (r == n) {
            Board++;
            let table = document.getElementById(`table-${Board}`);
            for (let m = 0; m < n; ++m) {
                let row = table.firstChild.childNodes[m];
                let temp = row.getElementsByTagName("td")[this.state[board][m]];
                if ((m + this.state[board][m]) % 2 == 0) {
                    temp.innerHTML = queenIcon2;
                }
                else {
                    temp.innerHTML = queenIcon1;
                }

            }
            this.state[Board] = this.state[board];
            return;
        }
        for (let c = 0; c < n; c++) {
            await q.waitTime();
            await q.resetColor(board, n);
            if (await q.isValid(board, r, c, n)) {
                await q.waitTime();
                await q.resetColor(board, n);
                let table = document.getElementById(`table-${board}`);
                let row = table.firstChild.childNodes[r];
                let temp = row.getElementsByTagName("td")[c];
                if ((r + c) % 2 == 0) {
                    temp.innerHTML = queenIcon2;
                }
                else {
                    temp.innerHTML = queenIcon1;
                }

                this.state[board][r] = c;
                if (await q.solve(board, r + 1, n))
                    await q.resetColor(board, n);
                // }
                await q.waitTime();
                board = Board;
                table = document.getElementById(`table-${board}`);
                row = table.firstChild.childNodes[r];
                row.getElementsByTagName("td")[c].innerHTML = "";
                delete this.state[`${board}`][`${r}`];
            }
        }
    }

    resetColor = async (board, n) => {
        // console.log('Inside resetColor');
        // console.log(board);
        const table = document.getElementById(`table-${board}`);
        for (let i = 0; i < n; i++) {
            const row = table.firstChild.childNodes[i];
            for (let j = 0; j < n; j++) {
                if ((i + j) % 2 == 0) {
                    row.getElementsByTagName("td")[j].style.backgroundColor = "black";
                }
                else {
                    row.getElementsByTagName("td")[j].style.backgroundColor = "white";
                }
            }
        }
        return;
    }

    isValid = async (board, r, c, n) => {
        const table = document.getElementById(`table-${board}`);
        const row = table.firstChild.childNodes[r];
        const col = row.getElementsByTagName("td")[c];
        // let temp = row.getElementsByTagName("td")[c];
        if ((r + c) % 2 == 0) {
            col.innerHTML = queenIcon2;
        }
        else {
            col.innerHTML = queenIcon1;
        }
        // col.innerHTML = queenIcon;
        await q.waitTime();

        let dupRow, dupCol;
        dupRow = r - 1;
        while (dupRow >= 0) {
            const checkRow = table.firstChild.childNodes[dupRow];
            const checkCol = checkRow.getElementsByTagName("td")[c];

            if (checkCol.innerHTML == queenIcon1 || checkCol.innerHTML == queenIcon2) {
                checkCol.style.backgroundColor = "rgba(247, 104, 104, 0.7)";
                col.innerHTML = "";
                return false;
            }

            checkCol.style.backgroundColor = "rgb(102, 191, 250, 0.5)";
            await q.waitTime();
            dupRow--;
        }

        dupRow = r - 1;
        dupCol = c - 1;
        while (dupRow >= 0 && dupCol >= 0) {
            const checkRow = table.firstChild.childNodes[dupRow];
            const checkCol = checkRow.getElementsByTagName("td")[dupCol];

            if (checkCol.innerHTML == queenIcon1 || checkCol.innerHTML == queenIcon2) {
                checkCol.style.backgroundColor = "rgba(247, 104, 104, 0.7)";
                col.innerHTML = "";
                return false;
            }

            checkCol.style.backgroundColor = "rgb(102, 191, 250, 0.5)";
            await q.waitTime();
            dupRow--;
            dupCol--;
        }

        dupRow = r - 1;
        dupCol = c + 1;
        while (dupRow >= 0 && dupCol < n) {
            const checkRow = table.firstChild.childNodes[dupRow];
            const checkCol = checkRow.getElementsByTagName("td")[dupCol];

            if (checkCol.innerHTML == queenIcon1 || checkCol.innerHTML == queenIcon2) {
                checkCol.style.backgroundColor = "rgba(247, 104, 104, 0.7)";
                col.innerHTML = "";
                return false;
            }

            checkCol.style.backgroundColor = "rgb(102, 191, 250, 0.5)";
            await q.waitTime();
            dupRow--;
            dupCol++;
        }

        // await q.resetColor();
        return true;
    }
};




