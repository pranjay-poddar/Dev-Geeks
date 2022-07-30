import sys
if sys.version_info[0] < 3:
    from sudoku import Sudoku
else:
    from sudoku.sudoku import Sudoku