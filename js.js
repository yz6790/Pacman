var player = {
    x: 50,
    y: 100,
    pacmouth: 320,
    pacdir: 0,
    psize: 32,
    speed: 5,
}
var enemy={
    x:150,
    y:200,
    speed:2,
    moving:0,
    dirx:0,
    diry:0,
    flash:0,
    
}

var powerdot={
    x:10,
    y:10,
    powerup:false,
    pcountdown:0,
    ghostNum:0,
    ghosteat:false
}

var score = 0;
var gscore = 0;
var ghost=false;
var countblink=10;

var canvas = document.createElement("canvas");
var context = canvas.getContext("2d");
canvas.height = 400;
canvas.width = 600;
mainImage = new Image();
mainImage.ready = false;
mainImage.onload = checkReady;
mainImage.src = "pac.png";

var keyclick = {

};

document.addEventListener("keydown", function (event) {
    keyclick[event.keyCode] = true;
    move(keyclick);
}, false);

document.addEventListener("keyup", function (event) {
    delete keyclick[event.keyCode];
}, false);

function move(keyclick) {
    if (37 in keyclick) {
        player.x -= player.speed;
        player.pacdir = 64;
    }
    if (38 in keyclick) {
        player.y -= player.speed;
        player.pacdir = 96;
    }
    if (39 in keyclick) {
        player.x += player.speed;
        player.pacdir = 0;
    }
    if (40 in keyclick) {
        player.y += player.speed;
        player.pacdir = 32;
    }
    if (player.x >= (canvas.width - 32)) {
        player.x = 0;
    }
    if (player.y >= (canvas.height - 32)) {
        player.y = 0;
    }
    if (player.x < 0) {
        player.x = canvas.width - 32;
    }
    if (player.y < 0) {
        player.y = canvas.height - 32;
    }
    if (player.pacmouth==320){
        player.pacmouth=352;
    }
    else{
        player.pacmouth=320;
    }
    render();
}
function checkReady() {
    this.ready = true;
    playgame();
}

function playgame() {
    render();
    requestAnimationFrame(playgame);
}

function myNum(n){
    return Math.floor(Math.random()*n);
}

function render() {
    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);

    if(!powerdot.powerup && powerdot.pcountdown<5){
        powerdot.x=myNum(420)+30;
        powerdot.y=myNum(250)+30;
        powerdot.powerup=true;
    }

    if(!ghost){
        enemy.ghostNum= myNum(5)*64;
        enemy.x=myNum(450);
        enemy.y=myNum(250)+30;
        ghost=true;
    }

    if(enemy.moving<0)
    {
        enemy.moving=myNum(30)*3+myNum(1);
        enemy.dirx=0;
        enemy.diry=0;
        if(powerdot.ghosteat){
            enemy.speed*=-1;
        }
        if(enemy.moving%2){
            if(player.x<enemy.x){
                enemy.dirx=-enemy.speed;
            }
            else{
                enemy.dirx=enemy.speed;
            }
        }
        else
        {
            if(player.y<enemy.y){
                enemy.diry=-enemy.speed;
            }
            else{
                enemy.diry=enemy.speed;
            }
        }
    }

    enemy.moving--;
    enemy.x+=enemy.dirx;
    enemy.y+=enemy.diry;

    if (enemy.x >= (canvas.width - 32)) {
        enemy.x = 0;
    }
    if (enemy.y >= (canvas.height - 32)) {
        enemy.y = 0;
    }
    if (enemy.x < 0) {
        enemy.x = canvas.width - 32;
    }
    if (enemy.y < 0) {
        enemy.y = canvas.height - 32
    }

    if (player.x <= enemy.x +26 && enemy.x <= (player.x + 26) && player.y <= enemy.y +26 && enemy.y <= (player.y + 26)) {
        if(powerdot.ghosteat){
            score++;
        }
        else{
            gscore++;
        }
        player.x=10;
        player.y=100;
        enemy.x=300;
        enemy.y=200;

        powerdot.pcountdown=0;
    }

    if (player.x <= powerdot.x && powerdot.x <= (player.x + 32) && player.y <= powerdot.y && powerdot.y <= (player.y + 32)) {
        powerdot.powerup=false;
        powerdot.pcountdown=500;
        powerdot.ghostNum=enemy.ghostNum;
        enemy.ghostNum=384;
        powerdot.x=0;
        powerdot.y=0;
        powerdot.ghosteat=true;
    }

    if(powerdot.ghosteat)
    {
        powerdot.pcountdown--;
        if(powerdot.pcountdown<=0)
        {
            powerdot.ghosteat=false;
            enemy.ghostNum=powerdot.ghostNum;
        }
    }

    if(powerdot.powerup){
        context.fillStyle="white";
        context.beginPath();
        context.arc(powerdot.x,powerdot.y,5,0,Math.PI*2,true);
        context.closePath();
        context.fill();
    }

    if(countblink>0)
    {
        countblink--;
    }
    else
    {
        countblink=10;
        if(enemy.flash==0){
            enemy.flash=32;
        }
        else{
            enemy.flash=0;
        }
    }

    context.font = "20px Verdana";
    context.fillStyle = "white";
    context.fillText("Pacman: " + score + " vs Ghost: " + gscore, 2, 18);

    context.drawImage(mainImage,enemy.ghostNum,enemy.flash,32,32,enemy.x,enemy.y,32,32);
    context.drawImage(mainImage, player.pacmouth, player.pacdir, 32, 32, player.x, player.y, player.psize, player.psize);

}

document.body.appendChild(canvas);