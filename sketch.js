var END = 0;
var PLAY = 1;
var START = 2;
var gameState = START;
var FighterImg,Background1Img,BulletImg,AlienImg;
var Bullet;
var score;
var alienCount;
var lives;
var restart;
var flag = 0;

function preload(){
  FighterImg = loadImage("Images/Fighter.png");
  Background1Img = loadImage("Images/Background.png");
  BulletImg = loadImage("Images/Bullet.png");
  AlienImg = loadImage("Images/Alien.png");
  GameOverImg = loadImage("Images/GameOver.png");
  StartImg = loadImage("Images/Start.png");
  restartImg = loadImage("Images/Restart.png")

  ExplosionAnim = loadAnimation("Images/Explosion3.png","Images/Explosion2.png","Images/Explosion1.png");
  
  LaserSound = loadSound("Sounds/Lazer.mp3");
  ExplosionSound = loadSound("Sounds/Explosion (2).wav");
  GameoverSound = loadSound("Sounds/Game Over.wav");
  GamestartSound = loadSound("Sounds/Game Start.wav");
}
function setup() {
  createCanvas(1365,625);
  background1 = createSprite(690,310);
  background1.addImage(Background1Img);
  background1.scale = 2.2;

  fighter = createSprite(400, 540,);
  fighter.addImage(FighterImg);
  fighter.scale = 0.1
  fighter.visible = false;
  test = createSprite(750,140,1500,5);
  test.visible = false;

  GameOver = createSprite(600,300);
  GameOver.addImage("over",GameOverImg);
  GameOver.scale = 2;
  GameOver.visible = false;

  target = createSprite(650,600,1400,5);
  target.visible = false;

  start=createSprite(650,350);
  start.addImage(StartImg);
  start.scale = 0.8;

  restart = createSprite(650,430);
  restart.addImage(restartImg);
  restart.scale = 0.1
  restart.visible = false;

  AlienGrp = new Group();
  BulletGrp = new Group();
  invisibleGroup=new Group();
  
  score = 0;
  alienCount = 0;
  lives = 3;
}

function draw() {
  background(0);
  drawSprites();

 if( gameState === START){

  textAlign(CENTER);
  textSize(50);
  fill("green");
  stroke("blue");
  text("Are you ready to shoot , click to start",650,200);
  if(mousePressedOver(start)){
    gameState= PLAY;
    start.visible = false;
    fighter.visible = true;
  }
 }
else if (gameState === PLAY){
  background1.velocityY = 3;
  GameOver.visible = false;
  fighter.visible = true;
  restart.visible = false
  flag = 0;
  textSize(40);
  fill("red");
  textFont("Algerian");
  text("Score: "+score,50,60);
  text("Aliens Destroyed: "+alienCount,50,100);

  if(background1.y>700){
    background1.y = 200;
  }
  if(keyWentDown("D")){
    fighter.velocityX = 20;
  }
  if(keyWentUp("D")){
    fighter.velocityX = 0;
  }
  if(keyWentDown("A")){
    fighter.velocityX = -20;
  }
  if(keyWentUp("A")){
    fighter.velocityX = 0;
  }
  if(keyWentDown("Space")){
    Bullet = createSprite(200,200,20,20)
    Bullet.position.x = fighter.position.x+55;
    Bullet.position.y = fighter.position.y-60;
    Bullet.velocity.y = -15;
    Bullet.addImage("bullet",BulletImg);
    Bullet.scale = 0.5;
    Bullet.setCollider("circle",-118,-70,20);
    Bullet.lifetime = 150;
    BulletGrp.add(Bullet);
    LaserSound.play();
   }
   if (frameCount % 60 === 0){
    var Alien = createSprite(400,-30);
    Alien.addImage("villan",AlienImg);
    Alien.velocityY = (5 + score/50);
    Alien.scale = 0.5;
    Alien.position.x =  Math.round(random(200,1300));
    Alien.lifetime = 150;
    AlienGrp.add(Alien);
    invisible=createSprite(Alien.x,Alien.y,10,10);
    invisible.velocityY= (5 + score/50); 
    invisible.addAnimation("fire",ExplosionAnim);
    invisible.lifetime=200;
  
     invisibleGroup.add(invisible)
   invisibleGroup.setDepthEach(7);
    AlienGrp.setDepthEach(8)
  }
if(fighter.isTouching(AlienGrp)){
  gameState = END;
  flag++;
}
for(var i = 0;i<AlienGrp.length;i++){
  for(var j = 0;j<BulletGrp.length;j++){
    for(var k=0;k<invisibleGroup.length;k++){
    if(BulletGrp.isTouching(AlienGrp)){
      score = score+10
      alienCount = alienCount+1
      invisibleGroup.get(k).scale=3
      invisibleGroup.get(k).lifetime=15
      AlienGrp.get(i).destroy();
      BulletGrp.get(j).destroy();
      ExplosionSound.play();
  
    }
      }
  }
}
if(AlienGrp.isTouching(target)){
gameState = END;
flag++;
}
  }

  else if (gameState === END){
restart.visible = true;
     if(mousePressedOver(restart)){
      gameState= PLAY;
      score = 0;
      alienCount = 0;
      AlienGrp.destroyEach()

    }
    textSize(40);
    fill("white");
    textFont("Algerian");
    text("Score: "+score,650,500);
    text("Aliens Destroyed: "+alienCount,650,550);
    AlienGrp.setVelocityYEach(0);
    fighter.visible = false;
    GameOver.visible = true;
    AlienGrp.setLifetimeEach(-1);
    background1.velocityY = 0;
    invisibleGroup.setVelocityYEach(0);
    invisibleGroup.destroyEach();

    
  }
  if(flag === 1){
    GameoverSound.play();
    flag = 0;
  }
  

}

