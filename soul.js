function game () {

//If is mobile create the gamepad
/*
if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
 
}
*/

//Get and hide the Menu
var main = document.getElementById("main");
main.style.display = "none";

//Get the canvas
var canvas = document.getElementById("sceen"),
ctx = canvas.getContext("2d");

//Show the canvas
canvas.style.display ="block";

//Give a relative size to the canvas
canvas.width = 640;
canvas.height = 640;

//Get the endGame container
var end = document.getElementById("endGame");
//Get the gameOver container
var over = document.getElementById("gameOver");

// Get the height of the document and viewport. offsetHeight is explained below.
var documentHeight = document.documentElement.offsetHeight;
var viewportHeight = window.innerHeight;
// Storage the information of the client view
var allHeight = documentHeight - viewportHeight;
// And scroll so the last "page" shows in the viewport
window.scrollTo(0, allHeight);

// The game map
var map = 
[
  [2,2,2,2,2,2,2,1,1,1,1,1,4,4,4,4,4,4,1,4],
  [1,2,2,1,1,1,2,2,2,2,2,2,2,1,1,1,1,4,4,4],
  [1,2,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,3,1],
  [1,2,3,1,1,1,1,1,1,1,4,4,4,4,4,4,4,4,3,1],
  [1,2,3,1,3,3,3,3,3,3,14,3,3,3,3,3,3,4,3,1],
  [2,2,3,1,3,1,1,1,1,1,4,4,4,4,4,4,3,4,3,1],
  [2,1,3,1,3,1,3,3,3,3,3,3,3,3,3,4,3,4,3,1],
  [2,2,3,1,3,1,3,1,4,4,4,4,4,4,3,4,3,4,3,1],
  [1,2,14,2,14,2,3,1,3,3,3,14,3,4,3,4,3,4,14,2],
  [2,2,3,2,3,1,3,1,3,4,1,4,3,4,3,4,3,1,3,2],
  [2,2,3,2,3,1,3,4,3,4,3,4,3,4,3,4,3,1,3,2],
  [2,1,3,2,3,1,3,1,3,4,3,4,3,4,3,4,3,1,3,2],
  [2,1,3,2,3,1,3,1,3,3,3,4,3,4,3,1,3,1,3,2],
  [2,1,3,2,3,1,3,1,4,4,4,4,3,4,3,2,14,2,14,2],
  [2,1,3,2,14,2,3,3,3,3,3,3,14,4,3,2,3,2,3,1],
  [2,1,3,2,3,2,2,1,2,2,2,2,2,1,3,2,3,2,3,1],
  [1,1,3,1,3,3,14,3,14,3,3,3,3,3,3,2,3,2,3,1],
  [1,1,3,1,2,1,2,1,2,2,2,2,2,2,2,2,3,2,3,2],
  [1,1,3,3,3,3,14,3,3,3,3,3,3,3,3,3,3,2,3,2],
  [1,1,1,1,2,1,2,2,2,2,2,2,2,2,2,2,2,2,3,2]
];

//The game objects map
var gameObjects =
[
  [6,10,10,0,0,0,0,0,0,0,0,0,0,0,0,0,10,0,0,7],
  [0,10,0,0,0,0,0,0,0,0,0,0,15,0,0,0,0,0,10,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,9,0,0,0,0,0,0,0,0,0],
  [11,11,9,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [15,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [11,11,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,11,11,11,9,0,0,0,0,0,9,10,0,0,0,0,0,0,9,11],
  [11,11,0,11,0,0,0,0,0,10,0,0,13,0,0,0,0,0,0,11],
  [11,11,0,10,0,0,0,0,0,0,16,0,0,0,0,0,0,0,0,11],
  [11,0,9,10,0,0,0,0,0,0,9,0,0,0,0,12,0,0,0,11],
  [11,0,0,10,0,0,0,0,15,0,0,0,0,0,0,0,0,0,0,11],
  [11,0,0,15,0,0,0,0,0,0,0,0,9,0,0,11,9,15,9,11],
  [11,0,0,11,9,11,0,0,0,9,0,0,11,0,9,11,0,0,0,0],
  [11,0,0,11,0,11,11,0,11,11,15,11,11,0,0,11,0,0,0,0],
  [0,0,9,0,0,0,11,0,11,0,0,0,0,0,9,11,0,0,0,0],
  [0,0,0,0,11,0,0,0,11,11,10,10,11,15,11,11,0,0,15,11],
  [0,0,0,0,0,0,9,0,0,0,0,0,0,0,0,0,9,0,0,11],
  [5,0,0,0,11,0,11,11,11,10,11,15,10,11,11,11,11,0,8,11]
];

//map and gameObjects code
var EMPTY = 0;
var MOUNTAIN = 1;
var GRASS = 2;
var WATER = 3;
var LAVA = 4;
var HEROWIND = 5;
var HEROEARTH = 6;
var HEROFIRE = 7;
var HEROWATER = 8;
var SPIDER = 9;
var MAGONEGRO = 10;
var CACTUS = 11;
var BOTON = 12;
var WALL = 13;
var BRIDGE = 14; 
var ROCK = 15;
var STONE = 16;

//The size of each tile cell
var SIZE = 32;

//Sprites we need to access by name
var currentHero = null;

//The number of rows and columns
var ROWS = map.length;
var COLUMNS = map[0].length;

//The number of columns on the tilesheet
var tilesheetColumns = 8;

//Arrays to store the game objects
var sprites = [];
var heroes = [];
var windObstacles = [];
var earthObstacles = [];
var fireObstacles = [];
var waterObstacles = [];
var mountains = [];
var rocks = [];
var monsters = [];
var plant = [];
var spiders = [];
var elementStone = [];
var assetsToLoad = [];
var assetsLoaded = 0;

//Load the tilesheet image
var image = new Image();
image.addEventListener("load", loadHandler, false);
image.src = "image.png";
assetsToLoad.push(image);

//Object to create();
var spriteObject =
{
  
  sourceX: 0,
  sourceY: 0,
  sourceWidth: 32,
  sourceHeight: 32,
  width: 32,
  height: 32,
  x: 0,
  y: 0,
  vx: 0,
  vy: 0,
  visible: true,
  
  //Getters
  centerX: function()
  {
    return this.x + (this.width / 2);
  },
  centerY: function()
  {
    return this.y + (this.height / 2);
  },
  halfWidth: function()
  {
    return this.width / 2;
  },
  halfHeight: function()
  {
    return this.height / 2;
  },
};    

 
//Game states
var LOADING = 0;
var BUILD_MAP = 1;
var PLAYING = 2;
var gameState = LOADING;

//Arrow key codes
var UP = 38;
var DOWN = 40;
var RIGHT = 39;
var LEFT = 37;
var SWITCHHEROSFIRE = 88; // Z
var SWITCHHEROSWATER = 67; // X
var SWITCHHEROSEARTH = 90; // C


//Allow to use key codes
var moveUp = false;
var moveDown = false;
var moveRight = false;
var moveLeft = false;
var switchHeroFire = false;
var switchHeroWater = false;
var switchHeroEarth = false;

//Add keyboard listeners
window.addEventListener("keydown", function(event)
{
  event.preventDefault();
  switch(event.keyCode)
  {
    case UP:
      moveUp = true;
      
      break;
	  
    case DOWN:
      moveDown = true;
      
      break;
	    
    case LEFT:
      moveLeft = true;
      break;  
	    
    case RIGHT:
      moveRight = true;
      break; 
    
    case SWITCHHEROSFIRE:
      switchHeroFire = true;
      break;

    case SWITCHHEROSWATER:
      switchHeroWater = true;
      break; 

    case SWITCHHEROSEARTH:
      switchHeroEarth = true;
      break;  
  }
}, false);

window.addEventListener("keyup", function(event)
{
  switch(event.keyCode)
  {
    case UP:
      moveUp = false;
     
      break;
	  
    case DOWN:
      moveDown = false;
      
      break;
	    
    case LEFT:
      moveLeft = false;
      break;  
	    
    case RIGHT:
      moveRight = false;
      break;

    case SWITCHHEROSFIRE:
      switchHeroFire = false;
      break;

    case SWITCHHEROSWATER:
      switchHeroWater = false;
      break; 

    case SWITCHHEROSEARTH:
      switchHeroEarth = false;
      break;

  }
}, false);

// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating
// requestAnimationFrame polyfill by Erik Möller
// fixes from Paul Irish and Tino Zijdel

(function() {

var lastTime = 0;
var vendors = ['ms', 'moz', 'webkit', 'o'];

for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) 
{
  window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
  window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame']
  window[vendors[x]+'CancelRequestAnimationFrame'];
}
 
if (!window.requestAnimationFrame)
  window.requestAnimationFrame = function(callback, element) {
  var currTime = new Date().getTime();
  var timeToCall = Math.max(0, 16 - (currTime - lastTime));
  var id = window.setTimeout(function() { callback(currTime + timeToCall); }, timeToCall);
  lastTime = currTime + timeToCall;
  return id;
};
 
if (!window.cancelAnimationFrame)
{
  window.cancelAnimationFrame = function(id) 
  {
    clearTimeout(id);
  };
}

}());

//Start the game animation loop
update();


function update()
{ 
  //The animation loop
  requestAnimationFrame(update);
  
  //Change what the game is doing based on the game state
  switch(gameState)
  {
    case LOADING:
      //console.log("loading...");
      break;
      
    case BUILD_MAP:
      buildMap(map);
      buildMap(gameObjects);
      gameState = PLAYING;
      break;
    
    case PLAYING:
      playGame();
      break;
    
  }
  
  //Render the game
  render();
}

function loadHandler()
{ 
  //variable that increase itself till get the assets loaded length
  assetsLoaded++;
  if(assetsLoaded === assetsToLoad.length)
  {
    //Remove the load handlers
    image.removeEventListener("load", loadHandler, false);
        
    //Build the map 
    gameState = BUILD_MAP;
  }
}

function buildMap(levelMap)
{
  for(var row = 0; row < ROWS; row++) 
  {	
    for(var column = 0; column < COLUMNS; column++) 
    { 
      var currentTile = levelMap[row][column];
    
      if(currentTile !== EMPTY)
      {
        //Find the tile's x and y position on the tile sheet
        var tilesheetX = Math.floor((currentTile - 1) % tilesheetColumns) * SIZE; 
        var tilesheetY = Math.floor((currentTile - 1) / tilesheetColumns) * SIZE;
        
        //Get each object to be created in the canvas
        switch (currentTile)
        {
          
            case MOUNTAIN:
            var mountain = Object.create(spriteObject);
            mountain.sourceX = tilesheetX;
            mountain.sourceY = tilesheetY;
            mountain.x = column * SIZE;
            mountain.y = row * SIZE;
            sprites.push(mountain);
            mountains.push(mountain);
            earthObstacles.push(mountain);
            fireObstacles.push(mountain);
            waterObstacles.push(mountain);
            break;

            case GRASS:
            var grass = Object.create(spriteObject);
            grass.sourceX = tilesheetX;
            grass.sourceY = tilesheetY;
            grass.x = column * SIZE;
            grass.y = row * SIZE;
            sprites.push(grass);
            waterObstacles.push(grass);
            break;
          
            case WATER:
            var water = Object.create(spriteObject);
            water.sourceX = tilesheetX;
            water.sourceY = tilesheetY;            
            water.x = column * SIZE;
            water.y = row * SIZE;
            sprites.push(water);
            earthObstacles.push(water);
            fireObstacles.push(water);
            break;
            
            case LAVA:
            lava = Object.create(spriteObject);
            lava.sourceX = tilesheetX;
            lava.sourceY = tilesheetY;            
            lava.x = column * SIZE;
            lava.y = row * SIZE;
            sprites.push(lava);
            windObstacles.push(lava);
            waterObstacles.push(lava);
            earthObstacles.push(lava);
            break;
           
           case ROCK:
            rock = Object.create(spriteObject);
            rock.sourceX = tilesheetX;
            rock.sourceY = tilesheetY;            
            rock.x = column * SIZE;
            rock.y = row * SIZE;
            sprites.push(rock);
            rocks.push(rock);
            waterObstacles.push(rock);
            waterObstacles.push(rock);
            fireObstacles.push(rock);
            earthObstacles.push(rock);
            break;

            case MAGONEGRO:
            magoNegro = Object.create(spriteObject);
            magoNegro.sourceX = tilesheetX;
            magoNegro.sourceY = tilesheetY;            
            magoNegro.x = column * SIZE;
            magoNegro.y = row * SIZE;
            sprites.push(magoNegro);
            monsters.push(magoNegro);
            windObstacles.push(magoNegro);
            earthObstacles.push(magoNegro);
            waterObstacles.push(magoNegro);
            break;

            case BRIDGE:
            bridge = Object.create(spriteObject);
            bridge.sourceX = tilesheetX;
            bridge.sourceY = tilesheetY;            
            bridge.x = column * SIZE;
            bridge.y = row * SIZE;
            sprites.push(bridge);
            break;

            case HEROWIND:
            herowind = Object.create(spriteObject);
            herowind.sourceX = tilesheetX;
            herowind.sourceY = tilesheetY;            
            herowind.x = column * SIZE;
            herowind.y = row * SIZE;
            sprites.push(herowind);
            heroes.push(herowind);
            break; 
            
            case HEROEARTH:
            heroearth = Object.create(spriteObject);
            heroearth.sourceX = tilesheetX;
            heroearth.sourceY = tilesheetY;            
            heroearth.x = column * SIZE;
            heroearth.y = row * SIZE;
            sprites.push(heroearth);
            heroes.push(heroearth);
            break;
            
            case HEROFIRE:
            herofire = Object.create(spriteObject);
            herofire.sourceX = tilesheetX;
            herofire.sourceY = tilesheetY;            
            herofire.x = column * SIZE;
            herofire.y = row * SIZE;
            sprites.push(herofire);
            heroes.push(herofire);
            break; 
            
            case HEROWATER:
            herowater = Object.create(spriteObject);
            herowater.sourceX = tilesheetX;
            herowater.sourceY = tilesheetY;            
            herowater.x = column * SIZE;
            herowater.y = row * SIZE;
            sprites.push(herowater);
            heroes.push(herowater);
            break; 
            
           case CACTUS:
            cactus = Object.create(spriteObject);
            cactus.sourceX = tilesheetX;
            cactus.sourceY = tilesheetY;            
            cactus.x = column * SIZE;
            cactus.y = row * SIZE;
            sprites.push(cactus);
            plant.push(cactus);
            windObstacles.push(cactus);
            fireObstacles.push(cactus);
            waterObstacles.push(cactus);
            break; 

            case STONE:
            stone = Object.create(spriteObject);
            stone.sourceX = tilesheetX;
            stone.sourceY = tilesheetY;            
            stone.x = column * SIZE;
            stone.y = row * SIZE;
            sprites.push(stone);
            elementStone.push(stone);
            break;

            case BOTON:
            boton = Object.create(spriteObject);
            boton.sourceX = tilesheetX;
            boton.sourceY = tilesheetY;            
            boton.x = column * SIZE;
            boton.y = row * SIZE;
            sprites.push(boton);
            break;

            case WALL:
            wall = Object.create(spriteObject);
            wall.sourceX = tilesheetX;
            wall.sourceY = tilesheetY;            
            wall.x = column * SIZE;
            wall.y = row * SIZE;
            sprites.push(wall);
            waterObstacles.push(wall);
            fireObstacles.push(wall);
            earthObstacles.push(wall);
            break;

            case SPIDER:
            spider = Object.create(spriteObject);
            spider.sourceX = tilesheetX;
            spider.sourceY = tilesheetY;            
            spider.x = column * SIZE;
            spider.y = row * SIZE;
            sprites.push(spider);
            spiders.push(spider);
            windObstacles.push(spider);
            fireObstacles.push(spider);
            earthObstacles.push(spider);
            break;  
        }
      }
    }
  }
}

//Function that allow to play the game
function playGame()
{ 

  countdown();
  //Use Wind Hero
  var currentHero = herowind;
  //Use Fire Hero
  if (switchHeroFire) {
    var currentHero = herofire;
  }
  //Use Water Hero
  if (switchHeroWater) {
    var currentHero = herowater; 
  }
  //Use Earth Hero
  if (switchHeroEarth) {
    var currentHero = heroearth;
  }

  //Up
  if(moveUp && !moveDown)
  {
    currentHero.vy = -6;
   //Return the scroll till the Hero is placed
    if (currentHero.y <= 320) {
      window.scroll(currentHero.x, 0);
    }
            if (currentHero.y >= 320) {
      window.scroll(currentHero.x, allHeight);
    }
  }

  //Down
  if(moveDown && !moveUp)
  {
    currentHero.vy =  6;
    
    if (currentHero.y <= 320) {
      window.scroll(currentHero.x, 0);
    }
            if (currentHero.y >= 320) {
      window.scroll(currentHero.x, allHeight);
    }
  }

  //Left
  if(moveLeft && !moveRight)
  {
    currentHero.vx = -6;
    if (currentHero.y <= 320) {
      window.scroll(currentHero.x, 0);
    }
            if (currentHero.y >= 320) {
      window.scroll(currentHero.x, allHeight);
    }
  }
  //Right
  if(moveRight && !moveLeft)
  {
    currentHero.vx = 6;
    if (currentHero.y <= 320) {
      window.scroll(currentHero.x, 0);
    }
            if (currentHero.y >= 320) {
      window.scroll(currentHero.x, allHeight);
    }
  }

  //Set the heroes's velocity to zero if none of the keys are being pressed
  if(!moveUp && !moveDown)
  {
    currentHero.vy = 0;
  }
  if(!moveLeft && !moveRight)
  {
    currentHero.vx = 0;
  }
  /*
  //Use just if you want it

   if(moveUp && moveLeft || moveDown && moveRight || moveUp && moveRight || moveDown && moveLeft)
  {
    currentHero.vy = 0;
    currentHero.vx = 0;
  }
  */

  //Move the heroes and keep it inside the screen boundaries
  currentHero.x = Math.max(0, Math.min(currentHero.x + currentHero.vx, canvas.width - currentHero.width)); 
  currentHero.y = Math.max(0, Math.min(currentHero.y + currentHero.vy, canvas.height - currentHero.height));

  //Check for collisions between the heroes and the mapObjects
  for(var i = 0; i < windObstacles.length; i++)
  {
    collisionDetector(herowind, windObstacles[i])
  }
  for(var i = 0; i < earthObstacles.length; i++)
  {
    collisionDetector(heroearth, earthObstacles[i])
  }
  for(var i = 0; i < fireObstacles.length; i++)
  {
    collisionDetector(herofire, fireObstacles[i])
  }
  for(var i = 0; i < waterObstacles.length; i++)
  {
    collisionDetector(herowater, waterObstacles[i])
  }
  for(var i = 0; i < monsters.length; i++)
  {
    kill(herofire, monsters[i]);
  }
  for(var i = 0; i < plant.length; i++)
  {
    kill(heroearth, plant[i]);
  }
  for(var i = 0; i < spiders.length; i++)
  {
    kill(herowater, spiders[i]);
  }
  for(var i = 0; i < rocks.length; i++)
  {
    moveRock(herowind, rocks[i]);
  }
    removeWall(herofire, boton);
    touchStone(herowater, stone);
}
  // store the countdown timer
   var miliseconds = 18;
   var seconds = 60;
   var minutes = 2;

//Countdown
function countdown(){

      var count = document.getElementById("countdown");
      var timer = document.getElementById("timer");
      timer.style.display ="block";
      count.style.display ="block";
      count.innerHTML = minutes + ":" + seconds;
    
        if (miliseconds>0){
            --miliseconds;
        }
        if (miliseconds === 0){
            miliseconds = 18;
            seconds--;
        }
      else if (seconds === 0) {
      seconds = 60;
      minutes--;  
      }
  
        if (minutes === -1) {
          miliseconds = false;
     timer.style.display ="none";
     count.style.display ="none";

          gameOver();
  }

    }


//collisionDetector
function collisionDetector(r1, r2)
{

  //Calculate the distance vector
  var vx = r1.centerX() - r2.centerX();
  var vy = r1.centerY() - r2.centerY();
  
  //Figure out the combined half-widths and half-heights
  var combinedHalfWidths = r1.halfWidth() + r2.halfWidth();
  var combinedHalfHeights = r1.halfHeight() + r2.halfHeight();
    
  //Check whether vx is less than the combined half widths 
  if(Math.abs(vx) < combinedHalfWidths) 
  {
    //A collision might be occurring! 
    //Check whether vy is less than the combined half heights 
    if(Math.abs(vy) < combinedHalfHeights)
    {
      //A collision has occurred! This is good! 
      //Find out the size of the overlap on both the X and Y axes
      var overlapX = combinedHalfWidths - Math.abs(vx);
      var overlapY = combinedHalfHeights - Math.abs(vy);
        
      //The collision has occurred on the axis with the
      //*smallest* amount of overlap. Let's figure out which
      //axis that is
        
      if(overlapX >=  overlapY)
      {
        //The collision is happening on the X axis 
        //But on which side? vy can tell us
        if(vy > 0)
        {
         
          //Move the rectangle out of the collision
          r1.y = r1.y + overlapY;
        }
        else 
        {
          //Move the rectangle out of the collision
          r1.y = r1.y - overlapY;
        }
      } 
      else 
      {
        //The collision is happening on the Y axis 
        //But on which side? vx can tell us
        if(vx > 0)
        {
          //Move the rectangle out of the collision
          r1.x = r1.x + overlapX;
        }
        else 
        {
          //Move the rectangle out of the collision
          r1.x = r1.x - overlapX;

        }
      } 
    }
    
  } 
} 

//moveRock

function moveRock(mr1, mr2)
{
  
  //Calculate the distance vector
  var vx = mr1.centerX() - mr2.centerX();
  var vy = mr1.centerY() - mr2.centerY();
  
  //Figure out the combined half-widths and half-heights
  var combinedHalfWidths = mr1.halfWidth() + mr2.halfWidth();
  var combinedHalfHeights = mr1.halfHeight() + mr2.halfHeight();
    
  //Check whether vx is less than the combined half widths 
  if(Math.abs(vx) < combinedHalfWidths) 
  {
    //A collision might be occurring! 
    //Check whether vy is less than the combined half heights 
    if(Math.abs(vy) < combinedHalfHeights)
    {
      //A collision has occurred! This is good! 
      //Find out the size of the overlap on both the X and Y axes
      var overlapX = combinedHalfWidths - Math.abs(vx);
      var overlapY = combinedHalfHeights - Math.abs(vy);
        
      //The collision has occurred on the axis with the
      //*smallest* amount of overlap. Let's figure out which
      //axis that is
        
      if(overlapX >=  overlapY)
      {
        //The collision is happening on the X axis 
        //But on which side? vy can tell us
        if(vy > 0)
        {
         
          //Move the rectangle out of the collision
          mr2.y = mr2.y -6;
        }
        else 
        {
                    
          //Move the rectangle out of the collision
          mr2.y = mr2.y +6;
        }
      } 
      else 
      {
        //The collision is happening on the Y axis 
        //But on which side? vx can tell us
        if(vx > 0)
        {
         
            
          //Move the rectangle out of the collision
          mr2.x = mr2.x -6;
        }
        else 
        {
        
            
          //Move the rectangle out of the collision
          mr2.x = mr2.x +6;

        }
      } 
    }
   
  } 
} 

//Kill

function kill(h1, m2)
{

  if (
    h1.x <= (m2.x + 16)
    && m2.x <= (h1.x + 16)
    && h1.y <= (m2.y + 16)
    && m2.y <= (h1.y + 16)
  ) {
   m2.x = m2.x -1000;
  }
} 

//Remove wall

function removeWall(w1, w2)
{

  if (
    w1.x <= (w2.x + 16)
    && w2.x <= (w1.x + 16)
    && w1.y <= (w2.y + 16)
    && w2.y <= (w1.y + 16)
  ) {
   wall.x = wall.x -1000;
   w2.visible = false;

  }
}

// touch the stone
function touchStone(s1, h2)
{

if (
    s1.x <= (h2.x + 16)
    && h2.x <= (s1.x + 16)
    && s1.y <= (h2.y + 16)
    && h2.y <= (s1.y + 16)
  ) {
    endGame();
  }

}

// Show when you win the game
function endGame()
{
 // console.log("The peace have been return to the world");
 canvas.style.display ="none";
 end.style.display ="block";
 miliseconds = false;

//location.reload();
}
// Show when you lose the game
function gameOver()
{
  //console.log("endGame");

   canvas.style.display ="none";
   over.style.display ="block";
}

// Render the game
function render()
{ 
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  //Display the sprites
  if(sprites.length !== 0)
  {
    for(var i = 0; i < sprites.length; i++)
	{
	  var sprite = sprites[i];
	  if(sprite.visible)
	  {
        ctx.drawImage
        (
           image, 
           sprite.sourceX, sprite.sourceY, 
           sprite.sourceWidth, sprite.sourceHeight,
           Math.floor(sprite.x), Math.floor(sprite.y), 
           sprite.width, sprite.height
        ); 
      }
    }
  }
  
  
}	
	
	
}; //End Game()	

