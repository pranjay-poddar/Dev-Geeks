 <h1>Prim's Algorithm</h1>
 
  
  
 <p align="center">
<img src="https://img.shields.io/badge/  CPP-blue">
<img src="https://img.shields.io/badge/Contributions-welcome-brightgreen">
<img src="https://badges.frapsoft.com/os/v1/open-source.svg?v=103">
</p>
 
 
 </p>
 
<h3> TABLE OF CONTENTS </h3>
<ol type="I">
    <li><a href="#intro"> Introduction  </a></li>
    <li><a href="#scope"> Minimum Spanning Tree </a></li>
    <li><a href="#assump"> Algorithm </a></li>
    <li><a href="#req"> Language Used</a></li>
  
    
 </ol>
 <h2 id="intro">Introduction</h2>
 <p align="justify">
Prim's Algorithm is a greedy algorithm used for determining the shortest path through a graph. Prim's approach identifies the subset of edges that includes every vertex in the graph and allows the sum of the edge weights to be minimized.
   Prim's algorithm begins with a single node and proceeds to investigate all adjacent nodes with all connecting edges at each step. Edges with the fewest weights and no cycles in the graph were chosen.

</p>

<h2 id="scope">Minimum Spanning Tree</h2>
 <p align="justify">
Minimum spanning tree can be defined as the spanning tree in which the sum of the weights of the edge is minimum. The weight of the spanning tree is the sum of the weights given to the edges of the spanning tree.
</p>

<h2 id="assump"> Algorithm</h2> <p align="justify">
 Prim's algorithm is a greedy algorithm that begins with one vertex and adds edges with the minimum weight until the goal is met. 
 The following are the steps to implement the prim's algorithm: <br>

First, we must initialize an MST with a randomly selected vertex. <br>
Now we must locate all of the edges that connect the tree from the previous phase to the new vertices. Choose the shortest edge from the 
list and add it to the tree. <br>
Step 2 should be repeated until the minimum spanning tree is constructed. <br>



 
  
</p>

<h2 id="req">Language Used </h2>
 <p align="justify">
C++
 </p>
 
 

