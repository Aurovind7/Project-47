var player, playerImg;
var protein, proteinImg, proteinGrp;
var obstacle, obstacleImg1,obstacleImg2,obstacleImg3,obstacleImg4, obstacleGrp;
var score=0;
var ground,groundImg;
var backgroundImg;
var gameState=0

function preload(){
playerImg=loadImage("runningStage1.png")
groundImg=loadImage("grass.png")
proteinImg=loadImage("protein.png")
obstacleImg1=loadImage("anxiety.png")
obstacleImg2=loadImage("depression.jpg")
obstacleImg3=loadImage("fatigue.png")
obstacleImg4=loadImage("stress.jpg")
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  player=createSprite(windowWidth/2,windowHeight-400,100,50)
  ground=createSprite(windowWidth/2,windowHeight+850,windowWidth,20)
  player.addImage(playerImg)
  ground.addImage(groundImg)
  player.scale=0.3;
  ground.scale=1.8;
  proteinGrp=new Group();
  obstacleGrp=new Group();
}

function draw() {
  background(255,255,255);
  textSize(40)
  fill("gold")
  text("SCORE: "+score, windowWidth-300, 100)
  player.velocityY+=0.8
  
  if(gameState===0){
    score+=Math.round(getFrameRate()/60)
    if(frameCount%100===0){
      createProtein();
    }
    if(frameCount%70===0){
      createObstacle();
    }
    if(keyDown(UP_ARROW)){
      player.velocityY-=5
    }
    if(keyDown(LEFT_ARROW)){
      player.x-=15
    }
    if(keyDown(RIGHT_ARROW)){
      player.x+=15
    }
    if(keyDown(DOWN_ARROW)){
      player.velocityY+=3
    }
    if(score>=60){
      gameState=1
    }
    if(ground.isTouching(player)){
      gameState=3
    }
    if(proteinGrp.isTouching(player)){
      proteinGrp.destroyEach();
      score+=30
    }
    if(obstacleGrp.isTouching(player)){
      obstacleGrp.setVelocityEach(0)
      obstacleGrp.destroyEach();
      player.velocityY=0
      gameState=3
    }
  }
  if(gameState===1){
    score+=Math.round(getFrameRate()/60)
    if(frameCount%100===0){
      createProtein();
    }
    if(frameCount%50===0){
      createObstacle();
    }
    if(keyDown(UP_ARROW)){
      player.velocityY-=5
    }
    if(keyDown(LEFT_ARROW)){
      player.x-=15
    }
    if(keyDown(RIGHT_ARROW)){
      player.x+=15
    }
    if(keyDown(DOWN_ARROW)){
      player.velocityY+=3
    }
    if(score>=60){
      gameState=1
    }
    if(ground.isTouching(player)){
      gameState=3
    }
    if(proteinGrp.isTouching(player)){
      proteinGrp.destroyEach();
      score+=30
    }
    if(obstacleGrp.isTouching(player)){
      obstacleGrp.setVelocityEach(0)
      obstacleGrp.destroyEach();
      player.velocityY=0
      gameState=3
    }
  }

  if(gameState===3 || player==null){
    player.destroy();
    proteinGrp.destroyEach();
    obstacleGrp.destroyEach();
    textSize(200)
    fill("red")
    text("GAME OVER",windowWidth/2-600,windowHeight/2)
  }

  

  drawSprites();
}

function createProtein(){
  protein=createSprite(Math.round(random(50,windowWidth-50),-windowHeight,50,50))
  protein.addImage(proteinImg)
  protein.scale=0.3
  protein.velocityY=4
  proteinGrp.add(protein);
}

function createObstacle(){
  obstacle=createSprite(Math.round(random(50,windowWidth-50),-windowHeight,50,50))
  r=Math.round(random(1,4))
  if(r===1){
    obstacle.addImage(obstacleImg1)
  }else if(r===2){
    obstacle.addImage(obstacleImg2)
  }else if(r===3){
    obstacle.addImage(obstacleImg3)
  }else if(r===4){
    obstacle.addImage(obstacleImg4)
  }
  obstacle.scale=0.4
  obstacle.velocityY=4
  obstacleGrp.add(obstacle);
}