var joey,joeyimg,obstacle,ground,groundimg,gameOverImg,gameOver,obstacle1,obstacle2,obstacle3;
var Play=1,End=0,gamestate= Play;
var invisibleGround;
var obstaclesGroup;
var coin,coinimg,coinGrp,coinC,Jump,Music;

    
function preload()
{
  joeyimg= loadAnimation("boy1.png","boy2.png","boy2.png","boy3.png","boy4.png","boy5.png","boy6.png","boy7.png","boy8.png","boy9.png","boy10.png","boy11.png","boy12.png");
  
  
  
  groundimg= loadImage("BGmain.png");
  
  //gamerOverImg= loadImage("game-over.png");
  
  obstacle1 = loadImage("barriers.png");
  obstacle2 = loadImage("sign.png");
  obstacle3 = loadImage("rock.png");
  
  coinimg= loadImage("coin.png");
}

function setup()

{
  createCanvas(500,400);
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundimg);
  ground.x = ground.width /2;
  ground.scale=1.6
  
  joey = createSprite(50,345,20,50);
  joey.addAnimation("running", joeyimg);
  joey.scale = 0.6;
  
  
  gameOver = createSprite(263,225,150,40);
  gameOver.shapeColor="green";
  
  invisibleGround = createSprite(200,350,400,10);
  invisibleGround.visible = false;

  obstaclesGroup = new Group();
  coinGrp = new Group();
  
  score = 0;
  coinC = 0;
  
}

function draw()
{
  
  if(gamestate == Play){
    gameOver.visible = false;
    //move the ground
    //scoring
    score = score + Math.round(getFrameRate()/60);
    
    ground.velocityX = -(4+3*score/250);
    joey.collide(invisibleGround );
    
    if (ground.x < 0)
    {
      ground.x = ground.width/2;
    }
    
    spawnObstacles();
    spawnCoins();
    
    drawSprites();
    
    //jump when the space key is pressed
     if(keyDown("space")&& joey.y >= 100) {
     joey.velocityY = -12;
    }
    
    text("Score: "+ score, 435,26);
    text("Coins: "+coinC,10,24);

    //add gravity
    joey.velocityY = joey.velocityY + 0.8
    
    if(obstaclesGroup.isTouching(joey)){
        gamestate = End;
    }
  }
   else if (gamestate == End) {
      gameOver.visible = true;
      ground.velocityX = 0;
      joey.velocityY = 0;
     
      fill("red");
      stroke("blue");
      textSize(50);
      text("Game Over",130,200);
     
      stroke("yellow");
      fill("green");
      textSize(30);
      text("RESTART",195,235);
      
      score = 0;
      coinC = 0;
     
      //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    
    obstaclesGroup.setVelocityXEach(0);
     
     if (mousePressedOver(gameOver))
     {
       reset();
     }
   }
  
  
}

function spawnObstacles(){
 if (frameCount % 80 === 0){
   var obstacle = createSprite(500,315,10,40);
   obstacle.velocityX = -(4+3*score/250);
   obstacle.debug=false;
   obstacle.setCollider("circle",0,0,170);
   
    //generate random obstacles
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle3);
              break;
      default: break;
    }
   //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.2;
    obstacle.lifetime = 310;
   
   //add each obstacle to the group
    obstaclesGroup.add(obstacle);
 
}
}

function reset()
{
  gamestate = Play;
  
  gameOver.visible= false;
  
  obstaclesGroup.destroyEach();
  
  score=0;
}
function spawnCoins()
{
  if (frameCount % 50 === 0)
      {
        coin = createSprite((Math.round(random(10,490))),312);
        coin.addImage(coinimg);
        coin.scale=0.3
        coin.velocityX=-(4+3*score/250);
        coinGrp.add(coin);
      }
  if (joey.isTouching(coinGrp))
      {
        coinGrp.destroyEach();
        coinC=coinC+2;
      }
}