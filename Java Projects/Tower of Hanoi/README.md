 <h1>Tower of Hanoi</h1>

 <p align="center">
<img src="https://img.shields.io/badge/Java-red">
<img src="https://img.shields.io/badge/Contributions-welcome-brightgreen">
<img src="https://badges.frapsoft.com/os/v1/open-source.svg?v=103">
</p>
 
 
 
  <p align="justify">
The Tower of Hanoi is a well-known programming problem. Three rods/pegs and n discs make up the problem configuration. The discs can be shifted from one peg to the next. The n discs are of
 various sizes.Initially, every disc is put on the first tower. The discs are stacked so that a disc is always atop a disc larger than itself.
</p>
 


 </p>
 <p align="center">
  <img width="460" height="300" src="https://media.geeksforgeeks.org/wp-content/uploads/tower-of-hanoi.png">
</p>

<h3> TABLE OF CONTENTS </h3>
<ol type="I">
    <li><a href="#intro"> Problem  </a></li>
    <li><a href="#req"> Tech Stack </a></li>
    <li><a href="#sol"> Solution  </a></li>
    
    
 </ol>
 <h2 id="intro">Introduction</h2>
 <p align="justify">
Move all the disks stacked on the first tower over to the last tower using a helper tower in the middle. While moving the disks, certain rules must be followed. These are : <br>

1. Only one disk can be moved. <br>

2. A larger disk can not be placed on a smaller disk. <br>
</p>



<h2 id="req">Tech Stack </h2>
 <p align="justify">
  1. C++ <br>
  </p>
 
<h2 id="sol">Solution </h2>
 <p align="justify">
  Take disk 1 from rod A to rod C <br>
Take disk 2 from rod A to rod B <br>
Take disk 1 from rod C to rod B <br>
Take disk 3 from rod A to rod C <br>
Take disk 1 from rod B to rod A <br>
Take disk 2 from rod B to rod C <br>
Take disk 1 from rod A to rod C <br>
  </p>

