
var canvas=document.createElement("canvas");
var context=canvas.getContext("2d");
canvas.height=100%;
canvas.width=100%;
mainImage=new Image();
mainImage.ready = false;
mainImage.onload = checkReady;
mainImage.src="pac.png";


function checkReady(){
    this.ready=true;
    playgame();
}

function playgame(){
    render();
}

function render(){
    context.fillStyle = "black";
    context.fillRect(0,0,canvas.width,canvas.height);
    context.drawImage(mainImage,320,0,32,32,50,50,32,32);
}

document.body.appendChild(canvas);