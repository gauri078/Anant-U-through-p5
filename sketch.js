
  let body, head;
let headAngle = 0;
let rectX1, rectY1, rectX2;
let angle = 0;
let discoScreen=false;
let startScreen=true;
let plateScreen=false;
let lightScreen=false;
 var n=0
 var image1,image2;
var xpos = [];
var ypos = [];
var windowX = [];
var windowY = [];
var windowN = [];
var x1 = 160;
var y1 = 160;
var building
let hasRunOnce = false;
function preload() {
  body = loadImage("body.png");
  head = loadImage("head.png");
  rectX1 = 100;
  rectY1 = 329;
  rectX2 = 320;
    image1=loadImage('messplate.png');
  image2=loadImage('insect1.png');
   building = loadImage("building.png");

}

function setup() {
  createCanvas(400, 400);

   angleMode(DEGREES);
var imgs=[image1,image2];
  
  for(var i=0;i<10;i++){
    xpos[i] = 30 + 15*i + random(125,50);
    ypos[i] = 60 + 20*i + random(50,40);
  }
   buildingLight()
}

function draw() {
  
    if (startScreen===true){
  start()
  }else if(lightScreen===true){
      textSize(20);
  text('Click ON Lights to TURN OFF',width/2,30)
    if (hasRunOnce ===false) {
       image(building,width/2, height/2, 400,400);
        hasRunOnce = true;
  }

   
  }else if(discoScreen===true){
    disco()
  }else if(plateScreen===true){
    plate()
  }
}


//brek////////////////////////////////////////////////////////////////////////////////

function start(){
  background('black')
  noStroke()
  ellipse(width/2,height/2+30,100)
  fill('black')
  textSize(20);
  text('START',width/2,height/2+30)


 
 textSize(40);
  textAlign(CENTER, CENTER);
  fill('white');
  text("AnantU through P5", width / 2, height / 3);
 
  
}

//brek///////////////////////////////////////////////////////////////////////////////

function disco() {
  
  discoScreen=true
  startScreen=false
  
  colorMode(HSB);
 

  let h = map(mouseX, 0, width, 0, 255,true);

  background(h, 100, 70);
   textSize(20);
  text('Make him move 20 times',width/2,30)
  imageMode(CENTER);
  
     image(body,200,355,230,200,0,0,0,0,CONTAIN);
 
  let targetAngle = map(mouseX, 0, width, 0, 360,true);

  let angleDiff = targetAngle - headAngle;
  headAngle += angleDiff * 0.05;
  
  let headX = width / 2 - 33;
  let headY = height / 2 + 50;
  push()
  translate(headX + 33, headY + 20);
  rotate(headAngle);
  imageMode(CENTER);
  image(head, 0, 0, width / 6, height / 6);
  pop(); 

  angle = map(mouseX, 0, width, 45, 120,true);


  fill('#ebcbac');
  noStroke();
  strokeWeight(2);
  push(); 
  translate(rectX1, rectY1);
  rotate(angle + 90);
  rect(0, 0, 22, 80,10,10,10,10);
  pop(); 


  fill('#ebcbac');
  noStroke();
  strokeWeight(2);
  push(); 
  translate(rectX2, rectY1);
  rotate(angle + 90);
  rect(0, 0, 22, 80,10,10,10,10);
  pop(); 
  // for (var i=0;i<50;i++){
  var mn=dist(30,0,mouseX,0)

 
  if (mn>300){
    n=n+1
   
  }
  if (n===40){
    plate()//function call next  level

  }
 
  // }
}

//brek////////////////////////////////////////////////////////////////////////////////

function buildingLight(){
   for(let i = 0; i<8; i++){// main building centre
    if(i == 0){
      windowX.push(x1);
      windowY.push(y1);
    }
    
    else if(i%2 != 0){
      x1=x1+50
      windowX.push(x1);
      windowY.push(y1);
    }
    
    else{
      y1=y1+60;
      x1=x1-50
     windowX.push(x1);
     windowY.push(y1);
    }
  }
}

//brek////////////////////////////////////////////////////////////////////////////////
function gameOver(){
   background('black')


 
 textSize(40);
  textAlign(CENTER, CENTER);
  fill('white');
  text("GAME OVER", width / 2, height / 3);
 
}


//brek//////////////////////////////////////////////////////////////////////////////

function plate(){
          discoScreen=false
  startScreen=false
  plateScreen=true;
 
   image(image1,width/2,height/2,400,410);
    textSize(20);
  text('click on worms to remove them',width/2,30)
    for(var j=0;j<xpos.length; j++){
    image(image2, xpos[j], ypos[j],60,50);
  }

}

//brek////////////////////////////////////////////////////////////////////////

function mouseClicked(){
  if (startScreen===true){
  var d=dist(mouseX,mouseY,width/2,height/2+30)
  if (d<50){
    disco()
  }
  }
  if (plateScreen===true){
    for (var i=0;i<xpos.length;i++){
      let dis= dist(mouseX,mouseY,xpos[i],ypos[i]);
     
      if (dis<50){
        var t=i;
        xpos.splice(t,1);
        ypos.splice(t,1);
        if (xpos.length===0){
          lightScreen=true
          plateScreen=false
        
          
        }
      }
      }
    }
  if (lightScreen===true){
  for(var k = 0; k<8; k++){
      var distance = dist(mouseX, mouseY, windowX[k], windowY[k] );
      if(distance<25){
          
        fill(0);
          
        rect(windowX[k], windowY[k], 30, 30);
        windowN.push(k);
        print(windowN.length)
        
        }
   if (windowN.length===8){
     gameOver()
     lightScreen=false
   }
  }
}

} 