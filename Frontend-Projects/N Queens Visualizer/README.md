# 👑N-Queen-Visualizer
The N Queens puzzle is the problem of placing N queens on an N x N chessboard such the no 2 queens attack each other i.e no two queens share the same row, column or diagonal.
The above project demonstrates the process of finding all such possible configurations using the Backtracking Approach.
# 📝 Algorithm
```
N-QUEEN(row, N, board)
  if row == N
    return TRUE

  for j in 1 to N
    if IS-VALID(row, j, board, N)
      board[row][j] = Queen

      if N-QUEEN(row+1, N, board)
        return TRUE

      board[row][j] = - //backtracking, changing current decision
  return FALSE
  
  IS-VALID(i, j, board, N)
  // checking in the column j
  for k in 1 to i-1
    if board[k][j] == Queen
      return FALSE

  // checking upper right diagonal
  k = i-1
  l = j+1
  while k>=1 and l<=N
    if board[k][l] == Queen
      return FALSE
    k=k+1
    l=l+1

  // checking upper left diagonal
  k = i-1
  l = j-1
  while k>=1 and l>=1
    if board[k][l] == Queen
      return FALSE
    k=k-1
    l=l-1

  return TRUE
```
# 🌐 Live Site
See the demo here : https://divya2910-n-queens-visualizer.netlify.app/
