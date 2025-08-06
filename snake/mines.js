const canvas = document.getElementById("camvasGame");
const ctx = canvas.getContext("2d");
const canvasSize = 400;
isPaused = true;
let filas = canvasSize/20;
let columnas = canvasSize/20;
let tablero = new Array(filas);
for (let i = 0 ; i <filas;i++){
    tablero[i] = Array(columnas).fill(0);
}
let posMines = GenerateMines();
console.log(posMines);
setNumber();
let mause ; 
let mapbit = Array.from({length:filas},()=> new Array(columnas).fill(false));
canvas.addEventListener('click', (event)=>{
// calcular posicion 
const square = canvas.getBoundingClientRect();
let x =  event.clientX- square.left ;
let y = event.clientY - square.top;
x = Math.floor(x/20);
y = Math.floor(y/20);
DigPos(y,x);
mause = {x:x , y:y };

console.log(mause);
});

let time = 0 ;
/*0 = dont mines near 
1 = one maines near 
-1= mines here 
-2 mine in position  */
function GenerateMines(){
    let mines = [];
    for (i = 0 ; i <20 ; i++){
        x = Math.floor(Math.random()*(canvas.width/20));
        y = Math.floor(Math.random()*(canvas.width/20));
        mines.push({y:x, x:y})
    }
    return mines;
}
function draw(){
    ctx.clearRect(0,0 , canvas.width, canvas.height);
    ctx.font = "20px Arial";
    ctx.fillStyle = "black";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    for(let j = 0 ; j < 20; j++){
        for (let i =0 ; i < 20 ; i++){
    
             ctx.fillStyle = mapbit[i][j]===false ? "grey": "blue";
             ctx.fillRect(j*20,i*20 , 20, 20);
             ctx.fillStyle= "black";
             if (tablero[i][j]!==-1 && mapbit[i][j] ){
                ctx.fillText(tablero[i][j],j*20+10,i*20+10);
             }
         }
    }


    ctx.strokeStyle = 'white';
    ctx.lineWidth = 1;
    for(i = 20 ; i < canvas.width; i+=20){
        ctx.beginPath();
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
        ctx.stroke()
    }
    for(i = 20 ; i < canvas.height ; i +=20 ){
        ctx.beginPath();
        ctx.moveTo(0,i);
        ctx.lineTo(400,i);
        ctx.stroke();
    }
    
}

function DigPos(x, y){
    
    if (x< 0 || x >= filas || y< 0 || y >= columnas){return;}

    if (!mapbit[x][y]){
        mapbit[x][y] = true;
        if(tablero[x][y]===-1)return false;
        if (tablero[x][y] === 0 ){
            DigPos(x-1, y+1);
            DigPos(x-1, y);
            DigPos(x-1, y-1);
            DigPos(x, y-1);
            DigPos(x, y+1);
            DigPos(x+1, y-1);
            DigPos(x+1, y);
            DigPos(x+1, y+1);
        }
    }
    return true;
}
console.log(tablero);
console.log(mapbit);
function setNumber(){
    cant = canvasSize/20;
        for (pos = 0 ; pos<cant; pos++){
            let j = posMines[pos].x;
            let i = posMines[pos].y;
            if (tablero[i][j] !== -1){
                tablero[i][j]= -1;  
                 if (i+1 <filas  && j+1 <columnas && tablero[i+1][j+1]!== -1){
                     tablero[i+1][j+1] += 1 ;
                 }
                 if (i+1 <filas  && tablero[i+1][j]!== -1){
                     tablero[i+1][j] += 1 ;
                 }
                 if (i+1 <filas && j-1 >= 0 && tablero[i+1][j-1]!== -1){
                     tablero[i+1][j-1] += 1 ;
                 }
                 if ( j+1 < columnas && tablero[i][j+1]!== -1){
                     tablero[i][j+1] += 1 ;
                 }
                 if (i-1 >=0 && j+1 < columnas && tablero[i-1][j+1]!== -1){
                     tablero[i-1][j+1] += 1 ;
                 }
                if (i-1 >=0  && tablero[i-1][j]!== -1){
                    tablero[i-1][j] += 1 ;
                }            
                if (i-1 >=0 && j-1 >= 0 && tablero[i-1][j-1]!== -1){
                    tablero[i-1][j-1] += 1 ;
                }
                if ( j-1 >=0 && tablero[i][j-1]!== -1){
                    tablero[i][j-1] += 1 ;
                }

            }
        }
    
}
setInterval(draw,150);