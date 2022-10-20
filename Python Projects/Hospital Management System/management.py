import numpy as np
import pandas as pd

new_vlst=[]
ag=[20,21,21,20,22,19,24,23]
bp=[80,96,82,85,90,98,73,102]
nam=['aman','anu','vishal','shekhar','daksh','kavi','raj','harry']
data={
    "Name":nam,
    "Age":ag,
    "BP":bp
}
ser=pd.Series(data)
frm=pd.DataFrame(data)
chk=True
print("WELCOME TO THE HOSPITAL DATA SERVICE : ")
while chk:

#____________________________________________________________
#PRESS 1 TO VISIUALIZE DATA
  n1=int(input('''

    CHOOSE OPTIONS :
        1.WANT TO VISIUALISE PATIENT DATA
        2.WANT TO ADD NEW DATA
        3.WANT TO UPDATE DATA
        4.EXIT
        '''))
  while n1==1:
    n2=int(input('''
    CHOOSE OPTIONS :
        1.WANT TO SEE WHOLE DATA
        2.WANT TO SEE PATICULAR DATA
        3.BACK
        '''))
#___________________________________________________________
#WHOLE DATA
    while n2==1:
      n3=int(input('''
      CHOOSE OPTIONS : 
          1.WANT TO SEE WHOLE DATA
          2.WANT TO SEE INDEXS
          3.WANT TO SEE COLUMNS
          4.WANT TO DATA INFO
          5.BACK
          '''))
      
      if n3==1:
        print(frm)
      elif n3==2:
        print(frm.index)
        n4=int(input("ENTER INDEX POSITION TO GET DATA : "))
        print(ser[[n4,]])
      elif n3==3:
        print(frm.columns)
        n4=input("ENTER COLUMN NAME TO GET DATA : ")
        print(ser[n4])
      elif n3==4:
        print(frm.info())
      else:
        break
#____________________________________________________________________
#PATICULAR DATA     
    while n2==2:
      n3=int(input('''
        CHOOSE OPTION TO SEE DATA :
            1.WANT TO SEE DATA NAME-WISE
            2.WANT TO SEE DATA INDEX WISE     
            3.BACK    
            '''))
#____________________________________________________________________
#NAME-WISE(SEE)
      while n3==1:
        n4=int(input('''
          CHOOSE OPTIONS (NAME-WISE) :
              1.TO SEE ONE DATA
              2.TO SEE ALL DATA
              3.BACK
              '''))
        if n4==1:
          print(frm['Name'])
          frm.set_index("Name", inplace = True)
          n5=input("ENTER INDEX OF NAME TO ITS DATA/DETAILS : ")
          print(frm.columns)
          n6=input("ENTER COLUMN NAME TO SEE ITS DATA/DETAILS : ")
          z=frm.loc[[n5],[n6]]
          print(z)
        elif n4==2:
          print(frm['Name'])
          frm.set_index("Name", inplace = True)
          n5=input("ENTER NAME TO ITS SEE DATA/DETAILS : ")
          z=frm.loc[[n5]]
          print(z)
        else:
          break
#____________________________________________________________________
#INDEX-WISE(SEE)
      while n3==2:
        n4=int(input('''
          CHOOSE OPTIONS (INDEX-WISE) :
              1.TO SEE ONE DATA
              2.TO SEE ALL DATA
              3.BACK
              '''))
        if n4==1:
          print(frm.index)
          print(frm.columns)
          n5=int(input("ENTER INDEX TO SEE ITS DATA/DETAILS : "))
          n6=input("ENTER LABEL NAME TO SEE ITS DATA/DETAILS : ")
          z=frm.loc[[n5],[n6]]
          print(z)
        elif n4==2:
          print(frm.index)
          n5=int(input("ENTER INDEX TO SEE ATTRIBUTE : "))
          z=frm.loc[[n5]]
          print(z)
        else:
          break
#____________________________________________________________________
#BACK(SEE DATA)
      while n3==3:
        n2=5
        break
#___________________________________________________________________
#BACK(VISIUALIZE DATA)
    while n2==3:
      n1=5
      break
#___________________________________________________________________
#PRESS 2 ENTER NEW DATA
  while n1==2:
    n2=int(input('''
      CHOOSE OPTIONS :
          1.WANT TO ADD NEW PATIENT DATA
          2.WANT TO ADD NEW ATTRIBUTES
          3.BACK
          '''))
#____________________________________________________________________
#ADD NEW PATIENT DATA
    while n2==1:
      nm=input("ENTER NAME : ")
      nam.append(nm)
      a=int(input("ENTER AGE : "))
      ag.append(a)
      b=int(input("ENTER BLOOD PRESSURE : "))
      bp.append(b)
      frm=pd.DataFrame(data)
      print(frm)
      break
#___________________________________________________________________
#ADD NEW COLUMN DATA      
    while n2==2:
      print(frm)
      i=input("\n ENTER NEW COLUMN NAME : ")
      n2=int(input('TOTAL NO. OF DATA YOU WANT TO ADD : '))
      for j in range(n2):
        v=input(f"ENTER DATA FOR PATIENT {j+1} : ")
        new_vlst.append(v)
      data1={i:pd.Series(new_vlst)}
      frm1=pd.DataFrame(data1)
      nw_data=pd.concat([frm,frm1],axis=1)
      frm=nw_data
      print(frm)
      break
#____________________________________________________________________
#BACK(NEW DATA ENTRY)    
    while n2==3:
      n1=5
      break

#____________________________________________________________________
#PRESS 3 TO UPDATE
  while n1==3:
    n2=int(input('''
      CHOOSE OPTIONS TO UPDATE DATA :
          1.UPDATE DATA INDEX WISE
          2.UPDATE DATA PATIENT NAME WISE
          3.BACK
          '''))
#____________________________________________________________________
#INDEX WISE UPDATE
    while n2==1:
      ser=pd.DataFrame(data)
      print(ser)
      i1=int(input("ENTER INDEX : "))
      l1=int(input("ENTER COLUMN POSITION : "))
      v1=input("ENTER VALUE : ")
      if v1.isalnum()==False:
        print("ERROR : VALUE CONTAIN SPECIAL CHARACTER!")
      else:
        frm.iloc[[i1],[l1-1]]=v1
        n2=5
      print(frm)
      break
#____________________________________________________________________
#NAME WISE UPDATE
    while n2==2:
      print(frm)
      n5=input("ENTER NAME TO UPDATE : ")
      n6=input("ENTER COLUMN NAME TO UPDATE : ")
      v1=input("ENTER VALUE : ")
      frm.set_index("Name", inplace = True)
      frm.loc[[n5],[n6]]=v1
      print(frm)
      n2=5
      break
#____________________________________________________________________
#BACK(UPDATE)
    while n2==3:
      n1=5
      break
  
#____________________________________________________________________  
#PRESS 4 FOR EXIT
  while n1==4:
    chk=False
    break
frm.to_csv("HOSPITAL_DATA.csv") 

