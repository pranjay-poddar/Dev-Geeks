from tkinter import *
from tkinter import ttk,messagebox
from ttkbootstrap import *
import numpy as np
import time


class window:

     st = {'bubble': False, 'insertion': False, 'selection': False,
          'merge': False, 'quick': False}  # to select the sorts

     def __init__(self, root, title) -> None:
          self.root = root
          self.root.title(title)
          self.root.resizable(width=False, height=False)
          Label(self.root, text='Sorting Algorithm Visualizer').grid(
               row=0, columnspan=6)
          #  Buttons
          self.bs = ttk.Button(self.root, text='Bubble Sort', style='info.TButton', padding=5, width=15,
                              command=self.bubble)
          self.bs.grid(column=0, row=1, padx=5, pady=5)
          self.Is = ttk.Button(self.root, text='Insertion Sort', style='info.TButton', padding=5, width=15,
                              command=self.insertion)
          self.Is.grid(column=1, row=1, padx=5, pady=5)
          self.ss = ttk.Button(self.root, text='Selection Sort', style='info.TButton', padding=5, width=15,
                              command=self.selection)
          self.ss.grid(column=2, row=1, padx=5, pady=5)
          self.ms = ttk.Button(self.root, text='Merge Sort', style='info.TButton', padding=5, width=15,
                              command=self.merge)
          self.ms.grid(column=3, row=1, padx=5, pady=5)         
          self.qs = ttk.Button(self.root, text='Quick Sort', style='info.TButton', padding=5, width=15,
                              command=self.quick)
          self.qs.grid(column=4, row=1, padx=5, pady=5)          
          self.start = ttk.Button(self.root, text='Start', padding=5, width=15,
                              command=self.start)
          self.start.grid(column=5, row=2, padx=5, pady=5)

          ttk.Label(self.root, text='Speed & Array Size:').grid(row=2,column=0)
          self.arraysize=ttk.Scale(self.root,from_=6,to=120,length=380,style='success.Horizontal.TScale',value=10,
               command=lambda x:self.slide_function())
          self.arraysize.grid(row=2,column=1,columnspan=3)
          
          ttk.Button(self.root, text='Shuffle', style='info.Outline.TButton', padding=5, width=15,
                                   command=self.shuffle).grid(column=5, row=1, padx=5, pady=5)

          #    Canvas
          self.canvas=Canvas(self.root, width=800-5, height=400,highlightbackground="dodgerblue",highlightthickness=2,
               bg='black')
          self.canvas.grid(row=4, padx=5, pady=10, columnspan=6)



          
          self.speed=0.2
          self.N=10
          self.colours=['dodgerblue' for i in range(self.N)]
          N=self.N
          self.data=np.linspace(5,400,N,dtype=np.uint16)
          np.random.shuffle(self.data)
          self.display(N,self.data,self.colours)
        
     
     def display(self,N: int,a: list,rong: list):
          '''
          N = number of rectangles
          a = array of heights of rectangles
          rong = array of colours of each and every rectangle'''

          self.canvas.delete('all')
          width=(1570)/(3*N-1)
          gap=width/2

          for i in range(N):
               self.canvas.create_rectangle(7+i*width+i*gap,0,7+(i+1)*width+i*gap,a[i],fill=rong[i])

          self.root.update_idletasks()

     def slide_function(self):
          self.N=int(self.arraysize.get())
          self.data=np.linspace(5,400,self.N,dtype=np.uint16)
          self.speed=5/self.arraysize.get()
          self.colours=['dodgerblue' for _ in range(self.N)]
          self.shuffle()
          
  
     def shuffle(self):
          self.canvas.delete('all')
          self.data=np.linspace(5,400,self.N,dtype=np.uint16)
          np.random.shuffle(self.data)
          self.display(self.N,self.data,self.colours)


     # ---------------button selection of sorting algos---------------------------
     def bubble(self):
          if self.st['bubble'] is False:
               self.st['bubble'] = True
               self.bs.config(style='success.TButton')

               for i in self.st:
                    if i != 'bubble':
                         self.st[i]=False

               self.qs.config(style='info.TButton')               
               self.ms.config(style='info.TButton')
               self.ss.config(style='info.TButton')
               self.Is.config(style='info.TButton')
              
          else:
               self.st['bubble'] = False
               self.bs.config(style='info.TButton')
               

     def merge(self):
          if self.st['merge'] is False:
               self.st['merge'] = True
               self.ms.config(style='success.TButton')

               for i in self.st:
                    if i != 'merge':
                         self.st[i]=False

               self.qs.config(style='info.TButton')               
               self.bs.config(style='info.TButton')
               self.ss.config(style='info.TButton')
               self.Is.config(style='info.TButton')
               
          else:
               self.st['merge'] = False
               self.ms.config(style='info.TButton')
               

     def quick(self):
          if self.st['quick'] is False:
               self.st['quick'] = True
               self.qs.config(style='success.TButton')

               for i in self.st:
                    if i != 'quick':
                         self.st[i]=False

               self.ms.config(style='info.TButton')               
               self.bs.config(style='info.TButton')
               self.ss.config(style='info.TButton')
               self.Is.config(style='info.TButton')
               
          else:
               self.st['quick'] = False
               self.qs.config(style='info.TButton')
               

     def selection(self):
          if self.st['selection'] is False:
               self.st['selection'] = True
               self.ss.config(style='success.TButton')

               for i in self.st:
                    if i != 'selection':
                         self.st[i]=False

               self.qs.config(style='info.TButton')               
               self.bs.config(style='info.TButton')
               self.ms.config(style='info.TButton')
               self.Is.config(style='info.TButton')
               
          else:
               self.st['selection'] = False
               self.ss.config(style='info.TButton')
               

     def insertion(self):
          if self.st['insertion'] is False:
               self.st['insertion'] = True
               self.Is.config(style='success.TButton')


               for i in self.st:
                    if i != 'insertion':
                         self.st[i]=False
               self.qs.config(style='info.TButton')               
               self.bs.config(style='info.TButton')
               self.ss.config(style='info.TButton')
               self.ms.config(style='info.TButton')
               
          else:
               self.st['insertion'] = False
               self.Is.config(style='info.TButton')
 
     # -----------------------------------------------------------
     def start(self):
          if self.st['bubble'] is True:
               for i in range(self.N-1):
                    for j in range(self.N-1-i):
                         self.display(self.N,self.data,['purple' if a==j or a==j+1 else 'green' if a>self.N-1-i else 'dodgerblue' for a in range(self.N)])
                         time.sleep(self.speed)
                         if self.data[j]>self.data[j+1]:
                              self.display(self.N,self.data,['red' if a==j or a==j+1 else 'green' if a>self.N-1-i else 'dodgerblue' for a in range(self.N)])
                              time.sleep(self.speed)
                              self.data[j],self.data[j+1]=self.data[j+1],self.data[j]
                              self.display(self.N,self.data,['lime' if a==j or a==j+1 else 'green' if a>self.N-1-i else 'dodgerblue' for a in range(self.N)])
                              time.sleep(self.speed)
               self.display(self.N,self.data,['lime' for _ in range(self.N)])

          elif self.st['insertion'] is True:
               for j in range(1,len(self.data)):
                    key=self.data[j]
                    i=j-1
                    self.display(self.N,self.data,['purple' if a==i or a==i+1 else 'green' if a<=j else'dodgerblue' for a in range(self.N)])
                    time.sleep(self.speed)
                    while i>=0 and self.data[i]>key:
                         self.data[i+1]=self.data[i]
                         self.display(self.N,self.data,['yellow' if a==i else 'green' if a<=j else'dodgerblue' for a in range(self.N)])
                         time.sleep(self.speed)
                         i-=1
                    self.data[i+1]=key
               self.display(self.N,self.data,['lime' for _ in range(self.N)])

          elif self.st['selection'] is True:
               for i in range(len(self.data)-1):
                    min_index=i
                    # loop to find the minimum element and its index
                    for j in range(i+1,len(self.data)):
                         self.display(self.N,self.data,['yellow' if a==min_index or a==i else 'green' if a<=i else 'dodgerblue' for a in range(self.N)])
                         time.sleep(self.speed)
                         if self.data[min_index]>self.data[j]:
                              self.display(self.N,self.data,['red' if a==min_index or a==j else 'green' if a<=i else 'dodgerblue' for a in range(self.N)])
                              time.sleep(self.speed)
                              min_index=j
                    if min_index!=i:
                         self.data[i], self.data[min_index]=self.data[min_index],self.data[i]
                         self.display(self.N,self.data,['lime' if a==min_index or a==i else 'green' if a<=i else 'dodgerblue' for a in range(self.N)])
                         time.sleep(self.speed)
               self.display(self.N,self.data,['lime' for _ in range(self.N)])
               

          elif self.st['merge'] is True:
               self.mergesort(self.data,0,self.N-1)
               self.display(self.N,self.data,['lime' for _ in range(self.N)])

          elif self.st['quick'] is True:
               self.quicksort(self.data,0,self.N-1)
               self.display(self.N,self.data,['lime' for _ in range(self.N)])

          else:
               #show messege box
               messagebox.showerror("Algorithm Visualizer", "You didn't select any sorting algorithm")
               

     # -----------merge sort algo-------------------------------------

     def mergesort(self,a,front,last):
          if front<last:
               mid= (front+last)//2

               self.mergesort(a,front,mid)
               self.mergesort(a,mid+1,last)


               self.display(self.N,self.data,['dodgerblue' for _ in range(self.N)])
               
               rj=mid+1
               if a[mid]<=a[mid+1]:
                    return 
               
               while front<=mid and rj<=last:
                    self.display(self.N,self.data,['yellow' if x==front or x==rj else 'dodgerblue' for x in range(self.N)])
                    time.sleep(self.speed)
                    if a[front]<=a[rj]:
                         self.display(self.N,self.data,['lime' if x==front or x==rj else 'dodgerblue' for x in range(self.N)])
                         time.sleep(self.speed)
                         front+=1
                    else:
                         self.display(self.N,self.data,['red' if x==front or x==rj else 'dodgerblue' for x in range(self.N)])
                         time.sleep(self.speed)
                         temp=a[rj]
                         i=rj
                         while i!=front:
                              a[i]=a[i-1]
                              i-=1
                         a[front]=temp
                         self.display(self.N,self.data,['lime' if x==front or x==rj else 'dodgerblue' for x in range(self.N)])
                         time.sleep(self.speed)

                         front+=1
                         mid+=1
                         rj+=1
          
               self.display(self.N,self.data,['dodgerblue' for _ in range(self.N)])
               time.sleep(self.speed)
     
     #-----------------------------quick sort algo---------------

     def partition(self,a,i,j):
          '''
          a -> is  the array
          i -> index from front
          j -> index from back'''

          l=i # left index

          pivot=a[i]
          piv_index=i

          while i<j:
               while  i<len(a) and a[i]<= pivot:
                    i+=1
                    self.display(self.N,self.data,['purple' if x==piv_index else 'yellow' if x==i else "dodgerblue" for x in range(self.N)])
                    time.sleep(self.speed)
               while a[j]>pivot:
                    j-=1
               if i<j:
                    self.display(self.N,self.data,['red' if x==i or x==j else "dodgerblue" for x in range(self.N)])
                    time.sleep(self.speed)
                    a[i],a[j]=a[j],a[i]
                    self.display(self.N,self.data,['lime' if x==i or x==j else "dodgerblue" for x in range(self.N)])
                    time.sleep(self.speed)
          a[j],a[l]=a[l],a[j]
          return j

     def quicksort(self,a,i,j):
          if i<j:
               x=self.partition(a,i,j)
          
               self.quicksort(a,i,x-1)
               self.quicksort(a,x+1,j)
     #--------------------------------------------------
     
if __name__ == '__main__':
     win = Style(theme='darkly').master
     obj = window(win, 'Sorting Algorithm Visualizer')

     win.mainloop()
