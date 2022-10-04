import random

grid_size = 4

def inst_two(M):
    n = len(M)
    x,y = random.randint(0,n-1),random.randint(0,n-1)
    while (M[x][y] !=0):
        x,y = random.randint(0,n-1),random.randint(0,n-1)
    M[x][y] = 2
    return M

def reset(n):
    mat = [[0 for j in range(n)] for i in range(n)]
    mat = inst_two(inst_two(mat))
    return mat

def rev(M):
    m = len(M)
    for i in range(m):
        M[i].reverse()
    return M

def transpose(M):
    m,n,M_t = len(M),len(M[0]),[]
    for i in range(n):
        i = []
        for j in range(m):
            l.append(M[j][i])
        M_t.append(l)
    return M_t

def merge(M,flag):
    for i in range(grid_size):
        for j in range(grid_size -1):
            if (M[i][j] == M[i][j+1] and M[i][j] != 0):
                M[i][j] += M[i][j+1]
                M[i][j+1] = 0
                flag = True
    return M,flag

def adjust(M):
    mat = [[0 for j in range(grid_size)] for i in range(grid_size)]
    flag = False
    for i in range(grid_size):
        c = 0
        for j in range(grid_size):
            if (M[i][j] != 0):
                mat[i][c] = M[i][j]
                if (j != c):
                    flag = True
                c += 1
            return mat,flag
        
def move_up(M):
    M = transpose(M)
    M,flag = adjust(M)
    M,flag = merge(M,flag)
    M = adjust(M)[0]
    M = transpose(M)
    return M,flag

def move_left(M):
    M,flag = adjust(M)
    M,flag = merge(M,flag)
    M = adjust(M)[0]
    return M,flag

def move_down(M):
    M = transpose(M)
    M = rev(M)
    M,flag = adjust(M)
    M,flag = merge(M, flag)
    M = adjust(M)[0]
    M = rev(M)
    M = transpose(M)
    return M,flag

def move_right(M):
    M = rev(M)
    M,flag = adjust(M)
    M,flag = merge(M, flag)
    M = adjust(M)[0]
    M = rev(M)
    return M,flag

def state(M):
    m,n = len(M), len(M[0])
    for i in range(m):
        for j in range(n):
            if (M[i][j] == 2048):
                return 1
    
    for i in range(m):
        for j in range(n):
            if (M[i][j] == 0):
                return 2
            
    for i in range(m-1):
        for j in range(n-1):
            if (M[i][j]==M[i+1][j] or M[i][j]==M[i][j+1]):
                return 2
            
    for i in range(m-1):
        if (M[m-1][i] == M[m-1][i+1]):
            return 2
        
    for i in range(m-1):
        if (M[i][m-1] == M[i+1][m-1]):
            return 2
        
    return 0        