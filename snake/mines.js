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
let mause ; 
let mapbit = Array.from({length:filas},()=> new Array(columnas).fill(0));
canvas.addEventListener('click', (event)=>{
// calcular posicion 
const square = canvas.getBoundingClientRect();
const x =  event.clientX- square.left ;
const y = event.clientY - square.top;
mause = {x:x , y:y };
console.log(mause);
});

let posMines = GenerateMines();
setNumber();
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
        mines.push({x:x, y:y})
    }
    return mines;
}
function draw(){
     ctx.clearRect(0,0 , canvas.width, canvas.height);
     for (let i =0 ; i < 20 ; i++){
         for(let j = 0 ; j < 20; j++){
             ctx.fillStyle = mapbit[i][j]===false ? "grey": "blue";
             ctx.fillRect(i*20,j*20 , 20, 20);
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
    if (mapbit[x][y] === false ){
        mapbit[x][y] = true;
        if(tablero[x][y]===-1)return false;
        if (tablero[x][y] === 0){
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

function setNumber(){
    var pos = 0;
    cant = canvasSize/20;
    for (i =0 ; i < canvasSize/20;i++){
        for (j = 0 ; j<canvasSize/20; j++){
            tablero[i][j]= 0;
            mapbit[i][j] = false;
        }
    }
        for (j = 0 ; j<canvasSize/20; j++){
            if (posMines[pos].x === i && posMines[pos].y ===j ){
                tablero[i][j]= -1;  
                if (i+1 <cant && j+1 < camt && tablero[i+1][j+1]!= -1){
                    tablero[i+1][j+1] += 1 ;
                }
                if (i+1 <cant && tablero[i+1][j]!= -1){
                    tablero[i+1][j] += 1 ;
                }
                if (i+1 <cant && j-1 > 0 && tablero[i+1][j-1]!= -1){
                    tablero[i+1][j-1] += 1 ;
                }
                if ( j+1 < camt && tablero[i][j+1]!= -1){
                    tablero[i][j+1] += 1 ;
                }
                if (i-1 >0 && j+1 < camt && tablero[i-1][j+1]!= -1){
                    tablero[i-1][j+1] += 1 ;
                }
                if (i-1 >0  && tablero[i-1][j]!= -1){
                    tablero[i-1][j] += 1 ;
                }            
                if (i-1 >0 && j-1 >0 && tablero[i-1][j-1]!= -1){
                    tablero[i-1][j-1] += 1 ;
                }
                if ( j-1 >0 && tablero[i][j-1]!= -1){
                    tablero[i][j-1] += 1 ;
                }
                pos++;
            }
        }
    
}
setInterval(draw,150);