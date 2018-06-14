$("body").on("contextmenu", false);

var dimension = 10;
var arr = generateArray(dimension);
var view_arr = generateArray(dimension);
var difficulty = 0.1;

renderField(dimension);
generateMines(dimension, Math.floor((dimension*dimension)*difficulty));
console.log(Math.floor((dimension*dimension)*difficulty) + " mine(s) generated succesfuly");

function generateArray(d){
    var f = [];
    for (var i = 0; i < (d + 2); i++){
        f[i] = [];
        for (var j = 0; j < (d + 2); j++){
            f[i][j] = 0;
        }
    }
    return f;
}

function generateMines(d, a){
    var generated = 0;
    while (generated < a){
        var t1 = Math.floor((Math.random() * d) + 1);
        var t2 = Math.floor((Math.random() * d) + 1)
        if (arr[t1][t2] != "X"){
            arr[t1][t2] = "X";
            generated++;
            renderNumbers(t1, t2);
        }
    }
    //Math.floor((Math.random() * 10) + 1);
}

function syncArray(){
    var content;
        for (var i = 0; i < dimension; i++){
            for (var j = 0; j < dimension; j++){
                content = document.querySelector(".field").childNodes[i].childNodes[j].querySelector(".cell");
                    if (view_arr[i + 1][j + 1] === 1){
                        if (arr[i + 1][j + 1] === "X"){
                            content.innerHTML = "<i class='fas fa-flag'></i>";
                        }
                        else {
                            content.style.backgroundColor = "#ff4f4f";
                            content.style.color = "white";
                            content.innerHTML = '<i class="fas fa-times"></i>';
                        }
                    }

                    else if (view_arr[i + 1][j + 1] === 0){
                        if (arr[i + 1][j + 1] === "X"){
                            content.style.backgroundColor = "white";
                            content.innerHTML = "<i class='fas fa-skull'></i>";
                        }
                        else if (arr[i + 1][j + 1] === 0){
                            content.style.backgroundColor = "white";
                            content.innerHTML = "";
                        }
                        else {
                            content.style.backgroundColor = "white";
                            content.innerHTML = "<span style='color: " + designNumber(i + 1, j + 1) + "'>" + arr[i + 1][j + 1] + "</span>";
                        }
                    }
                    // if ((arr[i + 1][j + 1] !== "X")
                    //     && (arr[i + 1][j + 1] !== 0)){
                    //         content.innerHTML = "<span style='color: " + designNumber(i + 1, j + 1) + "'>" + arr[i + 1][j + 1] + "</span>";
                    // }
                    // if ((arr[i + 1][j + 1] === "X")){
                    //         content.innerHTML = "<span class='fas fa-skull'></span>";
                    // }
            }
        }
}

function designNumber(x, y){
    var dict = ["", "grey", "green", "blue", "red", "orange", "yellow", "purple", "black"];
    return dict[arr[x][y]]
}

function renderNumbers(x, y){
    if (arr[x - 1][y - 1] !== "X"){
        arr[x - 1][y - 1]++;
    }
    if (arr[x + 1][y + 1] !== "X"){
        arr[x + 1][y + 1]++;
    }
    if (arr[x + 1][y - 1] !== "X"){
        arr[x + 1][y - 1]++;
    }
    if (arr[x - 1][y + 1] !== "X"){
        arr[x - 1][y + 1]++;
    }
    if (arr[x][y + 1] !== "X"){
        arr[x][y + 1]++;
    }
    if (arr[x][y - 1] !== "X"){
        arr[x][y - 1]++;
    }
    if (arr[x + 1][y] !== "X"){
        arr[x + 1][y]++;
    }
    if (arr[x - 1][y] !== "X"){
        arr[x - 1][y]++;
    }
    //syncArray();
}

function renderField(d){
//rendering game field
//@d - field dimension

    var field = document.querySelector(".field");

    for (var i = 1; i <= d; i++){
        var row = document.createElement("tr");
        field.appendChild(row);

        for (var j = 1; j <= d; j++){
            //row is a parent
            var cell = document.createElement("td");
            var btn = document.createElement("button");
            btn.classList.add("cell");
            btn.setAttribute("onclick","makeMove(" + i + "," + j + ")");
            btn.setAttribute("oncontextmenu", "putFlag(" + i + "," + j + ")");
            //btn.toggleClass("flagged");
            cell.appendChild(btn);
            row.appendChild(cell);
        }
    }
}

function makeMove(x, y){
        var content = document.querySelector(".field").childNodes[x - 1].childNodes[y - 1].querySelector(".cell");
        console.log("Move made in " + (x + 1) + ", " + (y + 1));
        if (arr[x][y] === "X"){
            syncArray();
            console.log("game over");
        }
        else if (arr[x][y] !== 0){
            content.style.backgroundColor = "white";
            content.innerHTML = "<span style='color: " + designNumber(x, y) + "'>" + arr[x][y] + "</span>";
            view_arr[x][y] = 2;
        }
        else {
            openCloser(x, y);
        }
    }

function openCloser(x, y){
if((view_arr[x][y] !== 2) && (x > 0) && (y > 0) && (x <= dimension) && (y <= dimension)){
        var content = document.querySelector(".field").childNodes[x - 1].childNodes[y - 1].querySelector(".cell");
        if (arr[x][y] === 0){
            content.style.backgroundColor = "white";
            content.innerHTML = "";
            view_arr[x][y] = 2;
            openCloser(x - 1, y - 1);
            openCloser(x, y - 1);
            openCloser(x + 1, y - 1);
            openCloser(x - 1, y);
            openCloser(x + 1, y);
            openCloser(x - 1, y + 1);
            openCloser(x, y + 1);
            openCloser(x + 1, y + 1);
        }
        else {
            content.style.backgroundColor = "white";
            content.innerHTML = "<span style='color: " + designNumber(x, y) + "'>" + arr[x][y] + "</span>";
        }
    }   
}

function putFlag(x, y){
    var content = document.querySelector(".field").childNodes[x - 1].childNodes[y - 1].querySelector(".cell");
    var f;
    if (view_arr[x][y] === 0){
        f = 1;
        view_arr[x][y] = 1;
    }
    else {
        f = 0;
        view_arr[x][y] = 0;
    }

    ///---////

    if (f === 1){
        content.innerHTML = "<i class='fas fa-flag'></i>";
    }
    else {
        content.innerHTML = "";
    }

    }

