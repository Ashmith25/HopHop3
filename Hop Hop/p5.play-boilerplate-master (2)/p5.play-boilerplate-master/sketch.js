var backgroundImage,ground;
var Pillar1,Pillar2;
var PillarGroup;
var gameState="play";

function preload(){
 backgroundImage=loadImage("Images/BG3.png"); 
 BirdImage=loadAnimation("Images/Bird1.0.png","Images/Bird2.0.png","Images/Bird3.0.png");
 PillarImage=loadImage("Images/Obstacle.png");
 GameOverImage=loadImage("Images/GameOver.jpg");
 RestartImage=loadImage("Images/Restart.png");
}

function setup() {
  createCanvas(1000,600);
  ground=createSprite(600, 200, 1500, 400);
  ground.addImage(backgroundImage);
  ground.velocityX=-3;
  ground.scale=1.2;
  Hop=createSprite(100,100,20,20);
  Hop.addAnimation("Hop",BirdImage);
  GameOver=createSprite(500,300,20,20);
  GameOver.addImage("GameOver",GameOverImage);
  GameOver.scale=0.2;
  Restart=createSprite(500,350,20,20);
  Restart.addImage("Restart",RestartImage);
  Restart.scale=0.2;
  PillarGroup=new Group();
}

function draw() {
  background(0); 
  if(gameState==="play"){
    GameOver.visible=false;
    Restart.visible=false;
    if(ground.x<400){
      ground.x=600;
    }
    if(keyDown("space")){
      Hop.velocityY=-15;
    }
    Hop.velocityY=Hop.velocityY+1;
    spawnObstacles();
    if(Hop.isTouching(PillarGroup)||Hop.y>510){
     gameState="end";
    }
  } 
  else if(gameState==="end"){
   PillarGroup.destroyEach();
   Hop.destroy();
   GameOver.visible=true;
   Restart.visible=true; 
   ground.velocityX=0;
   if(mousePressedOver(Restart)){
    reset(); 
   }
  }
   console.log(gameState);
  drawSprites();
}

function spawnObstacles(){
if(frameCount%80===0){
  Pillar1=createSprite(500,random(20,100),20,random(10,100));
  Pillar1.velocityX=-5;
  Pillar1.addImage(PillarImage);
  Pillar1.scale=0.5;
  Pillar2=createSprite(1100,580,20,random(10,100));
  Pillar2.velocityX=-5;
  Pillar2.addImage(PillarImage);
  Pillar2.scale=0.5;
  PillarGroup.add(Pillar1);
  PillarGroup.add(Pillar2);
}  
}
function reset(){
 gameState="play";
 GameOver.visible=false;
 Restart.visible=false;
 PillarGroup.destroyEach();
}

/*function keyPressed(){
  if(keyCode===32){
  //  Hop.x=Hop.x+4;
  //  Hop.y=Hop.y+10;
    console.log("keyPressed");
  }
}
function keyReleased(){
  if(keyCode===32){
    Hop.x=Hop.x+4;
    Hop.y=Hop.y-10;
    console.log("keyReleased");
  }
}*/
