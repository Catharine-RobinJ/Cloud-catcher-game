var score = 0;
var loss = 0;
var bg = createSprite(200, 200);
bg.setAnimation("bg");
bg.scale = 1.1;
var clouds = createGroup();
var state=0;
var gpa = createSprite(50, 350);
gpa.setAnimation("gpa");
gpa.scale = 0.3;
//var heart = createGroup();
var heart1 = createSprite(40, 40, 20, 20);
heart1.scale = 0.2;
heart1.setAnimation("heart");
var heart2 = createSprite(80, 40, 20, 20);
heart2.scale = 0.2;
heart2.setAnimation("heart");
var heart3 = createSprite(120, 40, 20, 20);
heart3.scale = 0.2;
heart3.setAnimation("heart");



var restart=createSprite(100,200);
restart.setAnimation("restart");
restart.scale=0.25;
restart.visible=false;

var lost=createSprite(200,250);
lost.setAnimation("lost");
lost.scale=0.25;
lost.visible=false;

var stars=createGroup();

function draw() {
  background("white");
 if(state==0){ 
  if(frameCount%200==0){
var star=createSprite(random(10,390));
star.setAnimation("star");
star.scale=0.1;
star.velocityY=2;
star.touched=false;
stars.add(star);
  } 
  

   
  if (frameCount % 90 === 0) {
    var cloud = createSprite(random(70, 320), random(40, 200));
    cloud.setAnimation("cloud");
    cloud.scale = 0.1;
    cloud.velocityY = 2;
    cloud.touched = false; // Initialize touched property
    clouds.add(cloud);
  }
  
  /*if (keyDown("up")) {
    gpa.y -= 2;
  } else if (keyDown("down")) {
    gpa.y += 2;
  } else if (keyDown("right")) {
    gpa.x += 2;
  } else if (keyDown("left")) {
    gpa.x -= 2;
  }
  */
 gpa.x=World.mouseX;
  for (var i = clouds.length - 1; i >= 0; i--) {
    var cloud = clouds[i];
    
    // Check if gpa touches the cloud
    if (gpa.isTouching(cloud) && !cloud.touched) {
      cloud.setAnimation("bronze");
      cloud.scale = 0.4;
      cloud.touched = true;
      cloud.touchTime = frameCount;
      
      cloud.depth=gpa.depth;
      gpa.depth=gpa.depth+1;
      
      // Debugging: Confirm the touch event
      console.log("Cloud touched at frame: " + cloud.touchTime);
    }

    // Check if the cloud was touched and if 5 frames have passed since it was touched
    if (cloud.touched && frameCount > cloud.touchTime + 5) {
      // Debugging: Confirm the destruction event
      console.log("Destroying cloud at frame: " + frameCount);
      cloud.destroy();
      score++;
      clouds.remove(cloud); // Remove cloud from the group
    }

    // Check if the cloud has moved off the screen
    if (cloud.y >= 450) {
      loss++;
      cloud.destroy();
      clouds.remove(cloud); // Remove cloud from the group
    }
  }
  
  // Destroy hearts based on the loss counter
  if (loss === 1) {
    heart1.destroy();
  } else if (loss === 2) {
    heart2.destroy();
  } else if (loss === 3) {
    heart3.destroy();
      state=1;
  }

 }else if(state==1){
   clouds.setVelocityYEach(0);
   restart.visible=true;
   lost.visible=true;
   
  
 }
  if(mousePressedOver(restart)){
     state=0;
     restart.visible=false;
   lost.visible=false;
   loss=0;
   score=0;
   }
 console.log(state);
  // Draw sprites and display score
  drawSprites();
  textSize(20);
  text("Score: " + score, 300, 30);
  //text("x " + loss, 150, 50); // Display loss for debugging
}
