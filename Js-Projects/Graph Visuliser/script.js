console.log("hellow world");

var nodeCount = 0;

var matrix = document.getElementById("matrix-body");
var header = document.getElementById("matrix-header");
var input_canvas = document.getElementById("canvas");
var res_canvas = document.getElementById("res-canvas");

var directed = document.getElementById("graphType").value == "directed";

// list with set of 20 colors
var colors = [
    "#FF0000",
    "#00FF00",
    "#0000FF",
    "#FFFF00",
    "#00FFFF",
    "#FF00FF",
    "#800000",
    "#008000",
    "#000080",
    "#808000",
    "#008080",
    "#800080",
    "#808080",
    "#C0C0C0",
    "#FF0000",
    "#00FF00",
    "#0000FF",
    "#FFFF00",
    "#00FFFF",
    "#FF00FF",
    ];


var nodeInfo = [];
var adjMatrix = [];

var selectedNode = null;

document.getElementById("addBtn").addEventListener("click", addNode);
document.getElementById("bfsBtn").addEventListener("click", bfs);
document.getElementById("dfsBtn").addEventListener("click", dfs);
document.getElementById("dijkstraBtn").addEventListener("click", dijkstra);
input_canvas.addEventListener("mousedown", selectNode);

document.getElementById("graphType").addEventListener("change", function () {
  var type = document.getElementById("graphType").value;
  if (type == "undirected") {
    directed = false;
  } else {
    directed = true;
  }
  //reset everything
  nodeCount = 0;
  matrix.innerHTML = "";
  header.innerHTML = '<tr id="matrix-header" class="fix"><th class="header-element fix vfix index">index</th></tr>';
  nodeInfo = [];
  adjMatrix = [];
  var ctx = input_canvas.getContext("2d");
  ctx.clearRect(0, 0, input_canvas.width, input_canvas.height);
  ctx.beginPath();
  ctx.closePath();
  ctx.stroke();
});

// array of 8 colors

function addNode() {
  //assing random color to node
  nodeCount++;
  var color = colors[nodeCount % 20];
  nodeInfo.push({
    color: color,
    label: "Node " + nodeCount,
    x: Math.random() * 950 + 50,
    y: Math.random() * 450 + 50,
  });
  
  var node = document.createElement("th");
  node.setAttribute("id", "node" + nodeCount);
  node.setAttribute("class", "header-element vfix");
  node.innerHTML = "Node " + nodeCount;
  header.appendChild(node);
  var node1 = document.createElement("input");
  node1.setAttribute("type", "text");
  node1.setAttribute("id", "node" + nodeCount + "-row-label");
  node1.setAttribute("class", "node-label");
  node1.setAttribute("value", "Node " + nodeCount);
  node1.setAttribute("style", "background-color:" + color + ";")
  node1.setAttribute("onchange", "changeNodeLabel(event)");
  var node2 = document.createElement("th");
    node2.setAttribute("id", "node-label" + nodeCount);
    node2.setAttribute("class", "header-element fix");
    node2.appendChild(node1);
      node2.setAttribute("style", "background-color:" + color + ";")

  var row = document.createElement("tr");
  row.setAttribute("id", "row-" + nodeCount);
  row.setAttribute("class", "row-element");
  row.appendChild(node2);
  matrix.appendChild(row);
  adjMatrix.push(new Array(nodeCount).fill([0, 0]));
  for (i = 0; i < nodeCount; i++) {
    var cell = document.createElement("td");
    cell.setAttribute("id", "cell-" + nodeCount + "-" + (i + 1));
    cell.setAttribute("class", "cell-element");
    var input = document.createElement("input");

    input.setAttribute("type", "number");
    input.setAttribute("id", "input-" + nodeCount + "-" + (i + 1));
    input.setAttribute("class", "input-element");
    input.setAttribute("onchange", "changeValue(event)");
    input.setAttribute("style","background-color:transparent;")
    cell.setAttribute("style", "background-color:" + ((nodeCount+i)%2?"#fff":"#f2f2f2") + ";")
    input.setAttribute("value", "0");
    if (i == nodeCount - 1) {
      input.setAttribute("disabled", "true");
    }
    cell.appendChild(input);
    row.appendChild(cell);
  }

  for (i = 0; i < nodeCount - 1; i++) {
    var cell = document.createElement("td");
    cell.setAttribute("id", "cell-" + (i + 1) + "-" + nodeCount);
    cell.setAttribute("class", "cell-element");
    var input = document.createElement("input");
    input.setAttribute("type", "number");
    input.setAttribute("id", "input-" + (i + 1) + "-" + nodeCount);
    input.setAttribute("class", "input-element");
    input.setAttribute("value", "0");
    input.setAttribute("onchange", "changeValue(event)");
    input.setAttribute("style","background-color:transparent;")
    cell.setAttribute("style", "background-color:" + ((nodeCount+i)%2?"#fff":"#f2f2f2") + ";")
    cell.appendChild(input);
    document.getElementById("row-" + (i + 1)).appendChild(cell);
    adjMatrix[i].push([0, 0]);
  }

  console.table(nodeInfo);

  drawEdges();
}

function drawEdges(canvas=input_canvas,val = true) {
    console.log(val)
  var ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (i = 0; i < nodeCount; i++) {
    for (j = 0; j < nodeCount; j++) {
      if (adjMatrix[i][j][0] != 0) {
        var x1 = nodeInfo[i].x;
        var y1 = nodeInfo[i].y;
        var x2 = nodeInfo[j].x;
        var y2 = nodeInfo[j].y;
        var theta = Math.atan((y2 - y1) / (x2 - x1));

        console.log(theta)

        var off = 10 * adjMatrix[i][j][1];

        var offX = parseInt(off * Math.sin(theta))
        var offY = parseInt(off * Math.cos(theta))
        console.log("offset",offX, offY)
        console.log(x1 + offX, y1 - offY);
        console.log(x2 + offX, y2 - offY)
        console.log("drawing edge between " + i + " and " + j);
        x1 = x1 + offX;
        x2 = x2 + offX
        y1 = y1 - offY
        y2 = y2 - offY
        ctx.fillStyle = "rgba(255,255,255)";
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.closePath();
        //draw arrow head if directed at edge of circle of radius r
        if (directed) {
            var r = 20;

            theta = theta
          if (x2 < x1) {
            theta += Math.PI;
          }
          var x = x2 - r * Math.cos(theta);
          var y = y2 - r * Math.sin(theta);
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(
            x - 10 * Math.cos(theta + Math.PI / 6),
            y - 10 * Math.sin(theta + Math.PI / 6)
          );
          ctx.lineTo(
            x - 10 * Math.cos(theta - Math.PI / 6),
            y - 10 * Math.sin(theta - Math.PI / 6)
          );
          ctx.lineTo(x, y);
          ctx.fillStyle = "#000000";
          ctx.fill();
          ctx.closePath();
        }

        //draw weight
        ctx.fillStyle = "#000000";
        ctx.font = "20px Arial";
        ctx.fillText(
          adjMatrix[i][j][0],
          (nodeInfo[i].x + nodeInfo[j].x) / 2 + offX,
          (nodeInfo[i].y + nodeInfo[j].y) / 2 - (adjMatrix[i][j][1]==-1?4*offY:2*offY)
        );
      }
    }
  }
  if (val) {
    drawNodes();
  }
}


function changeValue(event) {
  var id = event.target.id;
  var value = parseInt(document.getElementById(id).value);
  console.log(directed);
  var row = id.split("-")[1];
  var col = id.split("-")[2];

  if (directed == false) {
    adjMatrix[col - 1][row - 1] = [value, 0];
    document.getElementById("input-" + col + "-" + row).value = value;
    adjMatrix[row - 1][col - 1] = [value, 0];
  } else {
    if (value == 0) {
      adjMatrix[row - 1][col - 1] = [0, 0];
    } else {
      if (adjMatrix[col - 1][row - 1][0] === 0) {
        adjMatrix[row - 1][col - 1] = [value, 0];
      } else if (adjMatrix[col - 1][row - 1][0] === value) {
        adjMatrix[row - 1][col - 1] = [value, 0];
        adjMatrix[col - 1][row - 1] = [value, 0];
      } else {
        if (adjMatrix[col - 1][row - 1][1] === 0) {
          adjMatrix[col - 1][row - 1][1] = 1;
        }
        adjMatrix[row - 1][col - 1] = [value, -adjMatrix[col - 1][row - 1][1]];
      }
    }
  }

  console.table(adjMatrix);
  drawEdges();
}

function changeNodeLabel(event) {
  var id = event.target.id;
  var node = id.split("-")[0];
  var label = document.getElementById(id).value;
  document.getElementById(node).innerHTML = label;
    nodeInfo[node.split("node")[1] - 1].label = label;
  console.log(node);
  drawEdges();
}

function drawNodes(canvas=input_canvas) {
  var ctx = canvas.getContext("2d");

  for (i = 0; i < nodeCount; i++) {
    ctx.beginPath();
    ctx.arc(nodeInfo[i].x, nodeInfo[i].y, 20, 0, 2 * Math.PI);
    ctx.fillStyle = nodeInfo[i].color;
    ctx.fill();
    ctx.closePath();
    ctx.fillStyle = "#000000";
    ctx.font = "10px Arial";
    ctx.fillText(nodeInfo[i].label, nodeInfo[i].x - 12, nodeInfo[i].y + 2.5);
  }
}

function selectNode(event) {
  const rect = event.target.getBoundingClientRect();

  var mouseX = event.clientX - rect.left;
  var mouseY = event.clientY - rect.top;

  console.log(mouseX, mouseY);

  for (i = 0; i < nodeCount; i++) {
    if (
      mouseX > nodeInfo[i].x - 20 &&
      mouseX < nodeInfo[i].x + 20 &&
      mouseY > nodeInfo[i].y - 20 &&
      mouseY < nodeInfo[i].y + 20
    ) {
      selectedNode = i;

      break;
    }
  }

  if (selectedNode != null) {
    document.getElementById("node" + (selectedNode + 1)).style.backgroundColor =
      "#00FF00";

    input_canvas.addEventListener("mousemove", dragNode);
    input_canvas.addEventListener("mouseup", function () {
      input_canvas.removeEventListener("mousemove", dragNode);
      console.log("mouseup");
      document.getElementById(
        "node" + (selectedNode + 1)
      ).style.backgroundColor = "#FFFFFF";
      selectedNode = null;
    });
  } else {
    input_canvas.removeEventListener("mousemove", dragNode);
  }

  console.log(selectedNode);
}

function dragNode(event) {
  const rect = event.target.getBoundingClientRect();

  var mouseX = event.clientX - rect.left;
  var mouseY = event.clientY - rect.top;

  nodeInfo[selectedNode].x = mouseX;
  nodeInfo[selectedNode].y = mouseY;
  drawEdges();
}

function bfs() {
  var queue = [];
  var visited = [];
  var path = [];
  var parent = [];

  for (i = 0; i < nodeCount; i++) {
    visited.push(false);
    parent.push(-1);
  }

  queue.push(0);
  visited[0] = true;

  while (queue.length != 0) {
    var curr = queue.shift();
    path.push(curr);
    for (i = 0; i < nodeCount; i++) {
      if (adjMatrix[curr][i] != 0 && visited[i] == false) {
        queue.push(i);
        visited[i] = true;
        parent[i] = curr;
      }
    }
  }

  console.log(path);
  console.log(parent);

  var ctx = res_canvas.getContext("2d");
  ctx.clearRect(0, 0, res_canvas.width, res_canvas.height);
  
  for (i = 0; i < path.length - 1; i++) {
    ctx.beginPath();
    ctx.moveTo(nodeInfo[path[i]].x, nodeInfo[path[i]].y);
    ctx.lineTo(nodeInfo[path[i + 1]].x, nodeInfo[path[i + 1]].y);
    ctx.strokeStyle = "#000000";
    ctx.stroke();
    ctx.closePath();
  }
  drawNodes();
}

function dfs() {
  var stack = [];
  var visited = [];
  var path = [];
  var parent = [];

  for (i = 0; i < nodeCount; i++) {
    visited.push(false);
    parent.push(-1);
  }

  stack.push(0);
  visited[0] = true;

  while (stack.length != 0) {
    var curr = stack.pop();
    path.push(curr);
    for (i = 0; i < nodeCount; i++) {
      if (adjMatrix[curr][i] != 0 && visited[i] == false) {
        stack.push(i);
        visited[i] = true;
        parent[i] = curr;
      }
    }
  }

  console.log(path);
  console.log(parent);

  var ctx = res_canvas.getContext("2d");
  ctx.clearRect(0, 0, res_canvas.width, res_canvas.height);
  drawEdges(res_canvas,false);
  for (i = 0; i < path.length - 1; i++) {
    ctx.beginPath();
    ctx.moveTo(nodeInfo[path[i]].x, nodeInfo[path[i]].y);
    ctx.lineTo(nodeInfo[path[i + 1]].x, nodeInfo[path[i + 1]].y);
    ctx.strokeStyle = "#000000";
    ctx.stroke();
    ctx.closePath();
  }
  drawNodes(res_canvas);
}

function dijkstra() {
  var dist = [];
  var visited = [];
  var path = [];
  var parent = [];
        
  for (i = 0; i < nodeCount; i++) {
    dist.push(Number.MAX_VALUE);
    visited.push(false);
    parent.push(-1);
  }

  dist[0] = 0;
  console.log(adjMatrix,dist,visited)
  for (i = 0; i < nodeCount - 1; i++) {
    var min = Number.MAX_VALUE;
    var minIndex = -1;
    for (j = 0; j < nodeCount; j++) {
      if (visited[j] == false && dist[j] < min) {
        min = dist[j];
        minIndex = j;
      }
    }
    visited[minIndex] = true;
    for (j = 0; j < nodeCount; j++) {
        console.log(visited[j],adjMatrix[minIndex][j][0],dist[minIndex],dist[j])
      if (
        visited[j] == false &&
        adjMatrix[minIndex][j][0] != 0 &&
        dist[minIndex] + adjMatrix[minIndex][j][0] < dist[j]
      ) {
        dist[j] = dist[minIndex] + adjMatrix[minIndex][j][0];
        parent[j] = minIndex;
      }
    }
  }

  console.log(dist);
  console.log(parent);
  
  var ctx = res_canvas.getContext("2d");
  ctx.clearRect(0, 0, res_canvas.width, res_canvas.height);
  for (i = 0; i < nodeCount; i++) {
    if (parent[i] != -1) {
        var x1 = nodeInfo[i].x;
        var y1 = nodeInfo[i].y;
        var x2 = nodeInfo[parent[i]].x;
        var y2 = nodeInfo[parent[i]].y;
        var theta = Math.atan((y2 - y1) / (x2 - x1));

        console.log(theta)

        var off = 10 * adjMatrix[i][parent[i]][1];

        var offX = parseInt(off * Math.sin(theta))
        var offY = parseInt(off * Math.cos(theta))
        console.log("offset",offX, offY)
        console.log(x1 + offX, y1 - offY);
        console.log(x2 + offX, y2 - offY)
        console.log("drawing edge between " + i + " and " + parent[i]);
        x1 = x1 + offX;
        x2 = x2 + offX
        y1 = y1 - offY
        y2 = y2 - offY
        ctx.fillStyle = "rgba(255,255,255)";
        ctx.beginPath();
        ctx.moveTo(x1, y1);
        ctx.lineTo(x2, y2);
        ctx.stroke();
        ctx.closePath();
        //draw arrow head if directed at edge of circle of radius r
        if (directed) {
            var r = 20;

            theta = theta
          if (x2 > x1) {
            theta += Math.PI;
          }
          var x = x1 - r * Math.cos(theta);
          var y = y1 - r * Math.sin(theta);
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(
            x - 10 * Math.cos(theta + Math.PI / 6),
            y - 10 * Math.sin(theta + Math.PI / 6)
          );
          ctx.lineTo(
            x - 10 * Math.cos(theta - Math.PI / 6),
            y - 10 * Math.sin(theta - Math.PI / 6)
          );
          ctx.lineTo(x, y);
          ctx.fillStyle = "#000000";
          ctx.fill();
          ctx.closePath();
        }

        //draw weight
        ctx.fillStyle = "#000000";
        ctx.font = "20px Arial";
        ctx.fillText(
          adjMatrix[parent[i]][i][0],
          (nodeInfo[i].x + nodeInfo[parent[i]].x) / 2 + offX,
          (nodeInfo[i].y + nodeInfo[parent[i]].y) / 2 - (adjMatrix[i][parent[i]][1]==-1?4*offY:2*offY)
        );
      }
    }
  
  drawNodes(res_canvas);
}
