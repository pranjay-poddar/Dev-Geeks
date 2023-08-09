 <h1>Travelling Salesman Problem</h1>
 
  
  
 <p align="center">
<img src="https://img.shields.io/badge/  CPP-pink">
<img src="https://img.shields.io/badge/Contributions-welcome-brightgreen">
<img src="https://badges.frapsoft.com/os/v1/open-source.svg?v=103">
</p>
 
 
 </p>
 
<h3> TABLE OF CONTENTS </h3>
<ol type="I">
    <li><a href="#intro"> Introduction  </a></li>
    <li><a href="#scope"> Travelling Salesman Approach </a></li>
    <li><a href="#assump"> Algorithm </a></li>
    <li><a href="#req"> Language Used</a></li>
  
    
 </ol>
 <h2 id="intro">Introduction</h2>
 <p align="justify">
  The travelling salesman problem is a graph computational problem in which the salesman must visit all cities (represented by nodes in a graph) on a list only once, and the distances (represented by edges in a graph) between these cities are known. The solution to this problem is to find the shortest possible route in which the salesman visits all of the cities and returns to the origin city.
</p>

<h2 id="scope">Approach</h2>
 <p align="justify">
 As the definition for greedy approach states, we need to find the best optimal solution locally to figure out the global optimal solution. The inputs taken by the algorithm are the graph G {V, E}, where V is the set of vertices and E is the set of edges. The shortest path of graph G starting from one vertex returning to the same vertex is obtained as the output.
</p>

<h2 id="assump"> Algorithm</h2>
Travelling salesman problem takes a graph G {V, E} as an input and declare another graph as the output (say G’) which will record the path the salesman is going to take from one node to another. <br>

The algorithm begins by sorting all the edges in the input graph G from the least distance to the largest distance. <br>

The first edge selected is the edge with least distance, and one of the two vertices (say A and B) being the origin node (say A). <br>

Then among the adjacent edges of the node other than the origin node (B), find the least cost edge and add it onto the output graph. <br>

Continue the process with further nodes making sure there are no cycles in the output graph and the path reaches back to the origin node A. <br>

However, if the origin is mentioned in the given problem, then the solution must always start from that node only. Let us look at some example problems to understand this better. <br>
 <p align="justify">
  
</p>

<h2 id="req">Language Used </h2>
 <p align="justify">
C++
 </p>
 
 





 </p>
