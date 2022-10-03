import func

from tkinter import Frame, Label, CENTER
import random

grid_coord = (500,4,10)
bg_grid,bg_empty_cell = "#92877d","#9e948a"
bg_cell = {2: "#eee4da", 4: "#ede0c8", 8: "#f2b179",
            16: "#f59563", 32: "#f67c5f", 64: "#f65e3b",
            128: "#edcf72", 256: "#edcc61", 512: "#edc850",
            1024: "#edc53f", 2048: "#edc22e"}
cell_clr = {2: "#776e65", 4: "#776e65", 8: "#f9f6f2", 16: "#f9f6f2",
                32: "#f9f6f2", 64: "#f9f6f2", 128: "#f9f6f2",
                256: "#f9f6f2", 512: "#f9f6f2", 1024: "#f9f6f2",
                2048: "#f9f6f2"}
f = ("Verdana",40,"bold")

ctrls_alt = ["\'\\uf700\'","\'\\uf702\'","\'\\uf701\'","\'\\uf703\'"]
ctrls1 = ["'w'","'a'","'s'","'d'"]
ctrls2 = ["'j'","'h'","'k'","'l'"]

class GameDisplay(Frame):
    def __init__(self):
        Frame.__init__(self)
        
        self.grid()
        self.master.title('2048 Game In Python')
        self.master.blind("<Key>", self.key_down)
        
        self.cells,self.old_mat = [],[]
        self.begin_game()
        self.M = func.reset(grid_coord[1])
        self.update_game()
        
        self.command = {ctrls1[0]:func.move_up,ctrls1[1]:func.move_left,
                        ctrls1[2]:func.move_down,ctrls1[3]:func.move_right,
                        ctrls2[0]:func.move_up,ctrls2[1]:func.move_left,
                        ctrls2[2]:func.move_down,ctrls2[3]:func.move_right}
        
        self.mainloop()
        
    def begin_game(self):
        bg = Frame(self,bg=bg_grid,height=grid_coord[0],width=grid_coord[0])
        bg.grid()
        
        for i in range(grid_coord[1]):
            r = []
            for j in range(grid_coord[1]):
                ele_size = grid_coord[0]/grid_coord[1]
                ele = Frame(bg,bg=bg_empty_cell,height=else_size,width=else_size)
                ele.grid(row=i,column=j,padx=grid_coord[2],pady=grid_coord[2])
                ele_text = Label(master=ele,text="",bg=bg_empty_cell,justify=CENTER,font=f,width=5,height=2)
                ele_text.grid()
                r.append(ele_text)
            self.cells.append(r)
            
        print('Controls:')
        print("W or J: MOVE UP \t\t A or H: MOVE LEFT")
        print("S or K: MOVE DOWN \t\t D or L MOVE RIGHT")
        
    def update_game(self):
        for i in range(grid_coord[1]):
            for j in range(grid_coord[1]):
                if (self.M[i][j]):
                    self.cells[i][j].configure(text=str(self.M[i][j]),bg=bg_cell[self.M[i][j]],fg=cell_clr[self.M[i][j]])
                else:
                    self.cells[i][j].configure(text="",bg=bg_empty_cell)
        self.update_idletasks()
    
    def key_down(self,event):
        char_key = repr(event.char)
        if (char_key in self.commands):
            self.M,flag = self.commands[char_key](self.M)
            if (flag):
                self.M = func.inst_two(self.M)
                self.old_mat.append(self.M)
                self.update_game()
                if (func.state(self.M) == 0):
                    self.cells[1][1].configure(text="You",bg=bg_empty_cell)
                    self.cells[1][2].configure(text="Lose!",bg=bg_empty_cell)
                if (func.state(self.M) == 1):
                    self.cells[1][1].configure(text="You",bg=bg_empty_cell)
                    self.cells[1][2].configure(text="Win!",bg=bg_empty_cell)
        elif (char_key == "'b'" and len(self.old_mat)>1):
            self.M = self.old_mat.pop()
            self.update_game()
            print('Step retraced. Total steps: ',len(self.old_mat))
    

game = GameDisplay()
lar,hi = 0,0
for i in range(len(game.M)):
    hi = max(game.M[i])
    if (lar < hi):
        lar = hi
print('You Score is: ',lar)        