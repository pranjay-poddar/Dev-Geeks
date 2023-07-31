# Graph visualiser

## Description

This is a simple graph visualiser. It can be used to visualise graphs in a simple way. It is written in javascript

## Features

1. You can select type of graph you want to visualise. You can choose between directed and undirected graph
2. You can add number of vertices you want to have in your graph using <mark> Add Node </mark> button dynamically.
3. You can add edges between vertices using the adjency matrix displayed.
    - The matrix is editable. You can change the value of the matrix by clicking on the cell and entering the value.
    - The matrix is symmetrical in undirected graph. If you change the value of the cell in row 1 and column 2, the value of the cell in row 2 and column 1 will also change.
    - for the directed graph, the matrix is not symmetrical. If you change the value of the cell in row 1 and column 2, the value of the cell in row 2 and column 1 will not change. and is of form 
    <table>
    <tr><th>Index</th><th>Name of the <mark> to</mark> node</th></tr>
    <tr><th>Name of the <mark> from</mark> node</th><td>weight of the edge</td></tr>
    </table>
4. Graph nodes span randomly inside the canvas. You can move them around using mouse by draging them. the edges will follow the nodes.

5. You can also apply Dijkstra's algorithm to find shortest path between two nodes. To do that you need to select two nodes and then click <mark> Dijkstra </mark> button. The shortest path will be displayed in red color. Apart from them you can also apply BFS and DFS algorithms to find all nodes that are reachable from the selected node. To do that you need to select one node and then click <mark> BFS </mark> or <mark> DFS </mark> button.( all the algorithms are applied on node 1).
6. You can also change the node label by changing the value in the text box in the leftmost column of the table.

## How to use

1. First you need to select type of graph you want to visualise. You can choose between directed and undirected graph
2. Then you can add number of vertices you want to have in your graph using <mark> Add Node </mark> button
3. Then you can add edges between vertices using the adjency matrix displayed.
4. Graph nodes span randomly inside the canvas. You can move them around using mouse by draging them. the edges will follow the nodes.