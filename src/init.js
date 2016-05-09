window.onload = function(){
  window.Game = new Object();
  Game.canvascontainer = document.getElementById("canvascontainer");
  Game.canvas = document.createElement("canvas");
  Game.canvas.style.position = "absolute" ;
  Game.canvas.style.left = "0px" ;
  Game.canvas.style.top = "0px" ;
  Game.canvas.width = 800 ;
  Game.canvas.height = 623 ;
  setBackground();

  Game.groundh = 0 ;

  Game.ground1 = createGround() ;
  Game.ground1h = Game.groundh  ;

  Game.ground2 = createGround() ;
  Game.ground2h = Game.groundh  ;

  Game.scrollbarcanvas1 = createScrollBar() ;
  Game.scrollbarcanvas2 = createScrollBar() ;

  Game.birdcanvas = document.createElement("canvas");
  Game.birdcanvas.style.position = "absolute" ;
  Game.birdcanvas.style.left = "0px" ;
  Game.birdcanvas.style.top = "0px" ;
  Game.birdcanvas.width = 800 ;
  Game.birdcanvas.height = 623 ;

  Game.gameoverlogo = createGameOverLogo();
  Game.stopAnimation = false ;
 window.requestAnimationFrame(function(){
   renderGame();
  }, Game.canvas);
  Game.canvascontainer.appendChild(Game.canvas);
  Game.canvascontainer.appendChild(Game.birdcanvas);

}




function renderGame()
{
  var context = Game.canvas.getContext("2d");
  context.clearRect(0,0,Game.canvas.width, Game.canvas.height);
  renderScollBar(context);
  renderGround(context);
  renderBird();

  if(iscollision())
  {
    drop = true ;
    Game.birdcanvas.removeEventListener("click",canvasClick,true);
    Game.stopAnimation = true ;
    window.requestAnimationFrame(function(){
      renderGameOver();
    }, Game.canvas);
  }

  if(!Game.stopAnimation)
  {
	  window.requestAnimationFrame(renderGame,Game.canvas);
  }
};

function renderGameOver()
{
  var context = Game.canvas.getContext("2d");
  context.clearRect(0,0,Game.canvas.width, Game.canvas.height);
   context.drawImage(Game.ground2,Game.canvas.width-x2,0);
   context.drawImage(Game.ground1,Game.canvas.width-x1,0);
   context.drawImage(Game.gameoverlogo,250,100);
     
  context = Game.birdcanvas.getContext("2d")
  context.clearRect(100,y-4,68, 52);
  var img = document.createElement("img");
  img.src= "images/bird2.png";
  context.drawImage(img, 100,y);
  if(y < 535)
  {
	  y = y+3;
	  window.requestAnimationFrame(renderGameOver,Game.canvas);
  }
}


var x1 = 0 ;
var x2 = -400 ;
function renderGround(context)
{
  if(x1 > Game.canvas.width +70)
  {
	  Game.ground1 =  createGround() ;
	  Game.ground1h = Game.groundh  ;
	  x1 = 0 ;
  }
  context.drawImage(Game.ground1,Game.canvas.width-x1,0);
  if(x2 > Game.canvas.width +70)
  {
	  Game.ground2 =  createGround() ;
	  Game.ground2h = Game.groundh  ;
	  x2 = 0 ;
  }
  context.drawImage(Game.ground2,Game.canvas.width-x2,0);
  x1 = x1+3 ;
  x2 = x2+3 ;
}

var x3 = 0 ;
var x4 = 800 ;
function renderScollBar(context)
{
  context.drawImage(Game.scrollbarcanvas1, x3,572);
  x3 = x3-3 ;
  context.drawImage(Game.scrollbarcanvas2,x4 ,572);
  x4 = x4-3 ;
  if(x3 <-795)
  {
    x3 = 800 ;
  }
  if(x4 <-795)
  {
    x4 = 800 ;
  }
};

var y  = 525 ;
var drop = true ;
function renderBird()
{
  var context = Game.birdcanvas.getContext("2d");
  context.clearRect(100,y-3,64, 50);

  Game.bird = document.createElement("img");
  Game.bird.src= "images/bird1.png";
  context.drawImage(Game.bird, 100,y);
  if((drop)&&(y < 525))
  {
	   y = y+3;
  }
  Game.birdcanvas.addEventListener("click",canvasClick,true);
}

var h = 0 ;
function canvasClick(evt)
{
	h = y-50 ;
	drop = false ;
	window.requestAnimationFrame(function(){
          renderBirdFly();
    }, Game.bird);
}


function renderBirdFly()
{
  var context = Game.birdcanvas.getContext("2d");
  if((!drop)&&(y > h))
  {
	 context.clearRect(100,y,64, 50);
     y = y-4;
	 Game.bird = document.createElement("img");
     Game.bird.src= "images/bird1.png";
     context.drawImage(Game.bird, 100,y);
	 window.requestAnimationFrame(renderBirdFly,Game.bird);
  }else{
	 drop = true ;
  }
}

function iscollision()
{
	  if((Game.canvas.width-x1 >30)&&(Game.canvas.width-x1 <159)&&((y <=Game.ground1h+30)||(y >=(Game.ground1h+130)))){
          return true ;
	  }else if((Game.canvas.width-x2 >30)&&(Game.canvas.width-x2 <159)&&((y <=Game.ground2h+30)||(y >=(Game.ground2h+130)))){
          return true ;
	  }else{
		  return false;
	  }

}

window.requestAnimationFrame =
        window.__requestAnimationFrame ||
                window.requestAnimationFrame ||
                window.webkitRequestAnimationFrame ||
                window.mozRequestAnimationFrame ||
                window.oRequestAnimationFrame ||
                window.msRequestAnimationFrame ||
                (function () {
                    return function (callback, element) {
                        var lastTime = element.__lastTime;
                        if (lastTime === undefined) {
                            lastTime = 0;
                        }
                        var currTime = Date.now();
                        var timeToCall = Math.max(1, 33 - (currTime - lastTime));
                        window.setTimeout(callback, timeToCall);
                        element.__lastTime = currTime + timeToCall;
                    };
                })();
