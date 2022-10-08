//name-spacing
const Engine = Matter.Engine;
const Render = Matter.Render;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;
const Body = Matter.Body;
const Composites = Matter.Composites;
const Composite = Matter.Composite;

// creating global game variables
let engine;
let world;
var ground;
var melon, melon_con, melon_con2, melon_con3, melonImage
var rope, rope2, rope3
var blower
var bunny, bunnyImage
var muteButton
var cutButton, cutButton2, cutButton3
var backgroundImage
var blink
var eat
var sad
var airSound
var eatingSound
var ropeCutSound
var sadSound
var backgroundSound

function preload(){
  melonImage = loadImage("RTdMdp4Ac.png")
  bunnyImage = loadImage("th(1).jpg")
  backgroundImage = loadImage("background.png")


  blink = loadAnimation("blink_1.png", "blink_2.png", "blink_3.png")
  eat = loadAnimation("eat_0.png", "eat_1.png", "eat_2.png", "eat_3.png", "eat_4.png")
  sad = loadAnimation("sad_1.png", "sad_2.png", "sad_3.png")

  airSound = loadSound("air.wav")
  eatingSound = loadSound("eating_sound.mp3")
  ropeCutSound = loadSound("rope_cut.mp3")
  sadSound = loadSound("sad.wav")
  backgroundSound = loadSound("sound1.mp3")

  blink.playing = true
  eat.playing = true
  sad.playing = true

  eat.looping = false
  sad.looping = false
}

function setup() 
{
  var isMobile=/iPhone|iPad|iPod|Android/i.test(navigator.userAgent)
  if(isMobile){
    createCanvas(displayWidth,displayHeight);
  }
  else{
    createCanvas(windowWidth,windowHeight);
  }
  backgroundSound.play()
  backgroundSound.setVolume(0.1)
  frameRate(80);
  engine = Engine.create();
  world = engine.world;

  ground = new Ground(width/2,height-20,width,20);

  rope = new Rope(7,{x:width/2,y:50});
  rope2 = new Rope(13,{x:275,y:50});
  rope3 = new Rope(7,{x:width/2+125,y:200});

  melon = Bodies.circle(width/2,height/2,20);

  Matter.Composite.add(rope.body,melon);

  melon_con = new Link(rope,melon);
  melon_con2 = new Link(rope2,melon);
  melon_con3 = new Link(rope3,melon);

  blink.frameDelay = 15
  eat.frameDelay = 20
  bunny = createSprite(width/2-200, height-100)
  bunny.addAnimation("blinking", blink)
  bunny.addAnimation("eating", eat)
  bunny.addAnimation("sad", sad)
  bunny.changeAnimation("blinking")
  
  bunny.scale = 0.3

  
  cutButton = createImg("cut_btn.png")
  cutButton.position(width/2-15,50)
  cutButton.size(60,60)
  cutButton.mouseClicked(drop)

  cutButton2 = createImg("cut_btn.png")
  cutButton2.position(250,50)
  cutButton2.size(60,60)
  cutButton2.mouseClicked(drop2)

  cutButton3 = createImg("cut_btn.png")
  cutButton3.position(width/2+100,200)
  cutButton3.size(60,60)
  cutButton3.mouseClicked(drop3)

  muteButton = createImg("mute.png")
  muteButton.position(width-100,50)
  muteButton.size(60,60)
  muteButton.mouseClicked(mute)

  blower = createImg("balloon.png")
  blower.position(150, height/4)
  blower.size(240,120)
  blower.mouseClicked(blow)

}

function draw() 
{
  Engine.update(engine);
  rectMode(CENTER);
  ellipseMode(RADIUS);
  imageMode(CENTER)
  textSize(50);
  
  background(51);
  image(backgroundImage,width/2,height/2,width,height)
  ground.show();
  if(melon!=null){
    image(melonImage, melon.position.x, melon.position.y,100,100)
  }
 
  rope.show()
  rope2.show()
  rope3.show()

  if(collide(melon, bunny)==true){
    bunny.changeAnimation("eating")
    eatingSound.play()
  }

  if(melon!=null && melon.position.y > height-50){
    bunny.changeAnimation("sad")
    melon = null
    sadSound.play()
    backgroundSound.stop()
  }
 drawSprites()
   
}

function drop(){
  rope.break()
  ropeCutSound.play()
  melon_con.dettach()
  melon_con = null
}

function drop2(){
  rope2.break()
  ropeCutSound.play()
  melon_con2.dettach()
  melon_con2 = null
}

function drop3(){
  rope3.break()
  ropeCutSound.play()
  melon_con3.dettach()
  melon_con3 = null
}

// body = fruit, sprite = ground/bunny
function collide(body, sprite){
  if(body!=null){
    var distance = dist(body.position.x, body.position.y, sprite.position.x, sprite.position.y)
    if(distance <= 80){
      World.remove(world, melon)
      melon = null
      //true = collision
      return true
    }
      else{
      //false = no collision
       return false 
      }
  }
}

function blow(){
  Body.applyForce(melon, {x:0, y:0}, {x: 0.2, y: 0})
}

function keyPressed(){
  if(keyCode===32){
    blow()
    airSound.play()
    airSound.setVolume(0.5)
  }
}

function mute(){
  if(backgroundSound.isPlaying()){
    backgroundSound.stop()
  }
  else{
    backgroundSound.play()
  }
}