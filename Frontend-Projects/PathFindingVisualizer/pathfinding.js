let source, destination;
let sourceSelected, destinationSelected;
let started;
let algo;
let startButton;
let screen;
let graph;
let rows, cols;
let resolution;
let openSet, closedSet;
let shortestPath;
let w, h;

function resetCanvas() {
    console.log(new Node(0, 0));
    started = false;
    algo = null;
    resolution = 30;

    openSet = [];
    closedSet = [];
    shortestPath = [];

    sourceSelected = false;
    destinationSelected = false;

    rows = floor(height / resolution);
    cols = floor(width / resolution);
    w = width / cols;
    h = height / rows;

    graph = twoDarray(cols, rows);

    startButton = document.getElementById("startButton");
    startButton.disabled = false;

    startButton.innerHTML = "Visualize";

    startButton.onclick = start;


    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            graph[i][j] = new Node(i, j);
        }
    }


    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            graph[i][j].addNeighbor();
        }
    }


    if (source === undefined || destination === undefined) {
        x = Math.floor(Math.random() * cols / 2);
        y = Math.floor(Math.random() * rows);

        source = graph[x][y];

        x = Math.floor(Math.random() * (cols - Math.floor((cols / 2 + 1)))) + Math.floor((cols / 2 + 1));
        y = Math.floor(Math.random() * rows);

        destination = graph[x][y];

    } else {
        graph.forEach(row => {
            row.forEach((node) => {
                if (node.i === source.i && node.j === source.j) {
                    source = node;
                }
                if (node.i === destination.i && node.j === destination.j) {
                    destination = node;
                }
            })
        })
    }

    source.obstacle = false;
    destination.obstacle = false;

    background("white");

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            graph[i][j].show("white");
        }
    }

    source.show(color("green"));
    destination.show("red");

    noLoop();

}


function clear_Canvas() {
    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            if (graph[i][j] != source && graph[i][j] != destination)
                graph[i][j].show("white");
        }
    }

    startButton.disabled = false;
}

class Node {
    constructor(i, j) {
        this.i = i;
        this.j = j;
        this.x = this.i * resolution;
        this.y = this.j * resolution;
        this.r = resolution - 1;

        //for A* and greedy
        this.f = 0;
        this.g = 0;
        this.h = 0;

        //for Dijkstra
        this.d = Infinity;

        this.obstacle = false;

        this.parent = undefined;
        this.neighbors = [];
        this.dragging = false;


        this.show = (color) => {
            let x = this.x;
            let y = this.y;
            let r = this.r;

            if (this.obstacle) {
                fill("black");
            } else {
                fill(color);
            }

            stroke(66, 148, 255, 90);
            strokeWeight(1);

            rect(x, y, r, r);
        };

        this.addNeighbor = () => {
            let i = this.i;
            let j = this.j;

            if (i > 0)
                this.neighbors.push(graph[i - 1][j]);
            if (i < cols - 1)
                this.neighbors.push(graph[i + 1][j]);
            if (j > 0)
                this.neighbors.push(graph[i][j - 1]);
            if (j < rows - 1)
                this.neighbors.push(graph[i][j + 1]);
        };


        this.clicked = () => {
            if (sourceSelected) {
                this.show("green");
            } else if (destinationSelected) {
                this.show("red");
            } else if (!this.obstacle) {
                this.obstacle = true;
                this.show("black");
            }
        };
    }
}


function twoDarray(cols, rows) {
    let array = new Array(cols);

    for (let i = 0; i < array.length; i++)
        array[i] = new Array(rows);

    return array;
}

function windowResized() {
    centerCanvas();
}

function centerCanvas() {
    var x = ((windowWidth) - width) / 3;
    var y = ((windowHeight - (windowHeight * 0.20)) - height) / 2;

    screen.position(x, y);
}

function setup() {
    screen = createCanvas(windowWidth - (windowHeight * 0.15), windowHeight - (windowHeight * 0.20));
    screen.parent("sketch01");

    centerCanvas();

    resetCanvas()
}




function dropdown(event) {
    algo = event.target.text;
    let startButton = document.getElementById('startButton');
    startButton.innerHTML = `Start ${algo}`;
}



function initialize() {
    openSet.push(source);
}

function DFS_BFS_initialization() {
    openSet.push(source);
    closedSet.push(source);

}

function dijkstraInitialize() {
    source.d = 0;

    graph.forEach(row => {
        row.forEach(node => {
            openSet.push(node);
        })
    })
}


function start() {
    if (algo === null) {
        let startButton = document.getElementById("startButton")
        startButton.innerHTML = `Pick an Algorithm!`
        return;
    } else if (algo === "Dijkstra") {
        dijkstraInitialize();
    } else if (algo != "Breadth First Search" && algo != "Depth First Search") {
        initialize();
    } else {
        DFS_BFS_initialization();
    }

    started = true;
    startButton.disabled = true;
    loop();
}


function draw() {
    if (started) {
        //dijkstra
        if (algo === "Dijkstra") {
            if (openSet.length > 0) {
                current = lowest_d_score_node();

                if (current.d === Infinity) {
                    noLoop();
                    return;
                }

                if (current === destination) {
                    noLoop();
                }

                var removeIndex = openSet.map(function(item) { return item; }).indexOf(current);
                openSet.splice(removeIndex, 1);
                closedSet.push(current);

                for (neighbor of current.neighbors) {
                    if (!neighbor.obstacle) {
                        dScore = current.d + 1;
                        if (dScore < neighbor.d) {
                            neighbor.d = dScore;
                            neighbor.parent = current;
                        }
                    }
                }
            }
        }
        //A* search
        if (algo === "A* Search") {
            if (openSet.length > 0) {
                current = lowest_f_score_node();

                if (current === destination)
                    noLoop();


                var removeIndex = openSet.map(function(item) { return item; }).indexOf(current);
                openSet.splice(removeIndex, 1);
                closedSet.push(current);

                for (neighbor of current.neighbors) {
                    if (!closedSet.includes(neighbor) && !neighbor.obstacle) {
                        gscore = current.g + heuristic(neighbor, current);
                        let isGbetter = false;
                        if (openSet.includes(neighbor)) {
                            if (gscore < neighbor.g) {
                                neighbor.g = gscore;
                                isGbetter = true;
                            }
                        } else {
                            neighbor.g = gscore;
                            isGbetter = true;
                            openSet.push(neighbor);
                        }
                        if (isGbetter) {
                            neighbor.h = heuristic(neighbor, destination);
                            neighbor.f = neighbor.g + neighbor.h;
                            neighbor.parent = current;
                        }
                    }
                }
            } else {
                noLoop();
                return;

            }
        }

        //Breadth First Search
        if (algo == "Breadth First Search") {
            if (openSet.length > 0) {
                current = openSet[0];

                if (current === destination)
                    noLoop();

                var removeIndex = openSet.map(function(item) { return item; }).indexOf(current);
                openSet.splice(removeIndex, 1);

                for (neighbor of current.neighbors) {
                    if (!closedSet.includes(neighbor) && !neighbor.obstacle) {
                        openSet.push(neighbor);
                        closedSet.push(neighbor);
                        neighbor.parent = current;
                    }
                }
            } else {
                noLoop();
                return;
            }
        }


        //Depth First Search
        if (algo == "Depth First Search") {
            if (openSet.length > 0) {
                current = openSet[openSet.length - 1];
                if (current === destination)
                    noLoop();


                var removeIndex = openSet.map(function(item) { return item; }).indexOf(current);
                openSet.splice(removeIndex, 1);

                for (neighbor of current.neighbors) {
                    if (!closedSet.includes(neighbor) && !neighbor.obstacle) {
                        openSet.push(neighbor);
                        closedSet.push(neighbor);
                        neighbor.parent = current;
                    }
                }
            } else {
                noLoop();
                return;
            }
        }

        background("white");

        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                graph[i][j].show("white");
            }
        }

        for (node of openSet) {
            if (algo === "Dijkstra") {
                if (node.d != Infinity) {
                    node.show("#7c40fe");
                }
            } else {
                node.show("#7c40fe");
            }
        }

        for (node of closedSet) {
            node.show(color(0, 0, 255, 60));
        }

        shortestPath = [];

        let tmp = current;

        shortestPath.push(tmp);

        while (tmp.parent) {
            shortestPath.push(tmp.parent);
            tmp = tmp.parent;
        }

        noFill();
        stroke("#c3ff00");

        strokeWeight(4);

        beginShape();

        for (path of shortestPath) {
            vertex(path.i * resolution + resolution / 2, path.j * resolution + resolution / 2);
        }

        endShape();

        source.show("green");
        destination.show("red");
    }
}



function lowest_d_score_node() {
    let miNode = openSet[0];
    for (node of openSet) {
        if (node.d < miNode.d)
            miNode = node;
    }

    return miNode;
}

function lowest_f_score_node() {
    let miNode = openSet[0];
    for (node of openSet) {
        if (node.f < miNode.f)
            miNode = node;
    }

    return miNode;
}

function heuristic(node, goal) {
    dx = abs(node.x - goal.x);
    dy = abs(node.y - goal.y);
    return 1 * sqrt(dx * dx + dy * dy);
}


function createmaze() {
    let weights = [
        ["Obstacle", 30],
        ["Non Obstacle", 70]
    ]

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            if (graph[i][j] != source && graph[i][j] != destination) {
                let decision = weightedRandom(weights);
                if (decision === "Obstacle") {
                    graph[i][j].obstacle = true;
                    graph[i][j].show();
                }
            }
        }
    }
}


function weightedRandom(weights) {
    let total = 1;
    for (let i = 0; i < weights.length; i++) {
        total += weights[i][1];
    }

    const threshold = Math.floor(Math.random() * total);

    total = 0;

    for (let i = 0; i < weights.length; i++) {
        total += weights[i][1];

        if (total >= threshold) {
            return weights[i][0];
        }
    }
}

function mouseDragged() {
    if (started)
        return;

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            if (mouseX >= graph[i][j].x && mouseX <= graph[i][j].x + graph[i][j].r && mouseY >= graph[i][j].y && mouseY <= graph[i][j].y + graph[i][j].r) {
                if (graph[i][j] != source && graph[i][j] != destination) {
                    graph[i][j].clicked();

                }

                if (sourceSelected) {
                    source.show("white");
                    source = graph[i][j];
                    graph[i][j].clicked();
                }

                if (destinationSelected) {
                    destination.show("white");
                    destination = graph[i][j];
                    graph[i][j].clicked();
                }


            }
        }
    }
}

function mousePressed() {
    if (started)
        return;

    for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
            if (mouseX >= graph[i][j].x && mouseX <= graph[i][j].x + graph[i][j].r && mouseY >= graph[i][j].y && mouseY <= graph[i][j].y + graph[i][j].r) {
                if (graph[i][j] != source && graph[i][j] != destination) {
                    graph[i][j].clicked();
                } else {
                    if (source === graph[i][j]) {
                        sourceSelected = true;
                    }
                    if (destination === graph[i][j]) {
                        destinationSelected = true;
                    }
                }

            }
        }
    }
}

function mouseReleased() {
    if (sourceSelected || destinationSelected) {
        for (let i = 0; i < cols; i++) {
            for (let j = 0; j < rows; j++) {
                if (mouseX >= graph[i][j].x && mouseX <= graph[i][j].x + graph[i][j].r && mouseY >= graph[i][j].y && mouseY <= graph[i][j].y + graph[i][j].r) {
                    if (sourceSelected) {
                        if (graph[i][j] === destination) {
                            source = graph[i - 1][j];
                            graph[i][j].show("red");
                            sourceSelected = false;
                        } else {
                            source = graph[i][j];
                            sourceSelected = false;
                        }


                        source.obstacle = false;
                        source.show("green");
                    } else {

                        if (graph[i][j] === source) {
                            destination = graph[i - 1][j];
                            graph[i][j].show("green");
                            destinationSelected = false;
                        } else {
                            destination = graph[i][j];
                            destinationSelected = false;
                        }


                        destination.obstacle = false;
                        destination.show("red");
                    }

                }
            }
        }
    }
}