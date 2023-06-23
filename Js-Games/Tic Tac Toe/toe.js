var turn = "O";
var countTurns = 0;
var gameOver = false;
var cellXY = Array(Array(3),Array(3),Array(3));

const heading = document.getElementById("heading");
heading.innerText = turn + "'s turn";

const cells = document.querySelectorAll(".cell");
cells.forEach((cell) =>
              {
  cell.addEventListener("click", function()
                        {
    if(gameOver)
    {
      return;
    }

    if(cell.innerText == "")
    {
      countTurns++;
      cell.innerText = turn;
      cell.classList.add("filled");
      $x = cell.getAttribute("x");
      $y = cell.getAttribute("y");

      cellXY[$x-1][$y-1] = turn;

      for(var x = 0; x < 3; x++)
      {
        if(x == $x-1)
        {
          if(cellXY[x][0] == cellXY[x][1] && cellXY[x][0] == cellXY[x][2])
          {
            winner(turn);
          }
        }
      }
      for(var y = 0; y < 3; y++)
      {
        if(y == $y-1)
        {
          if(cellXY[0][y] == cellXY[1][y] && cellXY[0][y] == cellXY[2][y])
          {                                        
            winner(turn);
          }
        }
      }

      if(cellXY[0][0] == cellXY[1][1] && cellXY[0][0] == cellXY[2][2] && cellXY[1][1] == turn)
      {
        winner(turn);
      }

      if(cellXY[2][0] == cellXY[1][1] && cellXY[2][0] == cellXY[0][2] && cellXY[1][1] == turn)
      {
        winner(turn);
      }

      if(turn == "O")
      {
        turn = "X";
      }
      else
      {
        turn = "O";
      }
      heading.innerText = turn + "'s turn";

      if(countTurns == 9)
      {
        winner("No-one");
      }
    }
  });
});

function winner($turn)
{
  gameOver = true;
  const popup = document.getElementById("popup");
  popup.innerText = $turn + " is the winner!";
  popup.style.zIndex = 10;
  popup.style.opacity = 1;

  popup.addEventListener("click", function()
                         {
    turn = "O";
    countTurns = 0;
    gameOver = false;
    const heading = document.getElementById("heading");
    heading.innerText = turn + "'s turn";

    const cells = document.querySelectorAll(".cell");
    cells.forEach((cell) =>
                  {
      cell.classList.remove("filled");
      cell.innerText = "";
    });

    for($x = 0; $x < 3; $x++)
    {
      for($y = 0; $y < 3; $y++)
      {
        cellXY[$x][$y] = "";
      }
    }

    popup.innerText = "";
    popup.style.zIndex = -10;
    popup.style.opacity = 0;
  });
}