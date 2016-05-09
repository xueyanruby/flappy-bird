function setBackground()
{
  Game.backgroundcanvas = document.createElement("canvas");
  Game.backgroundcanvas.style.position = Game.canvas.style.position ;
  Game.backgroundcanvas.style.left = Game.canvas.style.left ;
  Game.backgroundcanvas.style.top = Game.canvas.style.top ;
  Game.backgroundcanvas.width = Game.canvas.width ;
  Game.backgroundcanvas.height = Game.canvas.height ;
  Game.backgroundcanvas.style.background = "#71c5cf";
  var cvs = Game.backgroundcanvas.getContext("2d");

//白云
  cvs.translate(0,Game.canvas.height-200);
  cvs.fillStyle = "#e9fad8";
  
  var maxradius =  80 ;
  var minradius = 40;
  var k = 0.6 * minradius;
  for(var i = k ; i < Game.canvas.width ;i = i+ k)
  {
    cvs.beginPath();
    cvs.arc(i,100,minradius+(maxradius-minradius)*Math.random(), Math.PI,2*Math.PI);
    cvs.closePath();
    cvs.fill();
  }
  cvs.fillRect(0,80,Game.canvas.width,70);

 //房子
  var maxheight = 80 ;
  var minheight = 40 ;
  var maxwidth = 40;
  var minwidth = 20 ;
  var d = 20 ;
  cvs.translate(0, 70); 
  cvs.fillStyle = "#deefcb";
  var w = 0  ;
  var h = 0 ; 
  for(var i = 10 ; i < Game.canvas.width ;i=i+d+w)
  {
    w = minwidth+(maxwidth-minwidth)*Math.random();
	h = minheight+(maxheight-minheight)*Math.random();
    cvs.fillRect(i,(maxheight-h),w,h);
  }
  cvs.fillStyle = "#dff1c4";
  cvs.strokeStyle = "#9fd5d5";
  cvs.lineWidth = 3 ;
  d = 10 ;
  for(var i = 0 ; i < Game.canvas.width ;i=i+d+w)
  {
    w = minwidth+(maxwidth-minwidth)*Math.random();
	h = minheight+(maxheight-minheight)*Math.random();
    cvs.fillRect(i,(maxheight-h),w,h);
	cvs.strokeRect(i,(maxheight-h),w,h);
  }
 //草坪
   cvs.fillStyle = "#81e18b";
   cvs.fillRect(0,80,Game.canvas.width,40);

 //树
   var maxtreeheight = 50 ;
   var mintreeheight = 30 ;
   var maxh = 110 ;
   var minh = 85 ;

 //沙滩
   cvs.fillStyle = "#dcd795";
   cvs.fillRect(0,120,Game.canvas.width,10);
  Game.canvascontainer.appendChild(Game.backgroundcanvas);
}

function createGameOverLogo()
{
   var gameoverlogo = document.createElement("canvas");
   var cvs =  gameoverlogo.getContext("2d");
   cvs.font="30px Verdana";
  // 创建渐变
  var gradient=ctx.createLinearGradient(0,0,c.width,0);
  gradient.addColorStop("0","magenta");
  gradient.addColorStop("0.5","blue");
  gradient.addColorStop("1.0","red");
  // 用渐变填色
   cvs.fillStyle=gradient;
   cvs.fillText("Game Over!",10,90);
   return gameoverlogo ;
}

function createGround()
{
  var x = 3 ;
  var y = 0 ;
  var h = Game.canvas.height -260 ;//两根柱子上下间距150
  var minh = 30 ;
  var maxh = h-30 ;
  var th =  minh+(maxh-minh)*Math.random() ;
  var bh = h-th ;
  var w = 70 ;
  Game.groundh  = th ;
  var groundcanvas = document.createElement("canvas");
  groundcanvas.style.position = Game.canvas.style.position ;
  groundcanvas.style.left = Game.canvas.style.left ;
  groundcanvas.style.top = Game.canvas.style.top ;
  groundcanvas.width = 70 ;
  groundcanvas.height = Game.canvas.height ;

  var groundLightGreen = "#97e556";
  var groundDarkGreen = "#73be29";
  var groundDarkerGreen = "#4b7e19";
  var groundBorder = "#4c3f48";
  var cvs =  groundcanvas.getContext("2d");

  var grd=cvs.createLinearGradient(x,y,x+w,y);
  grd.addColorStop(0,groundLightGreen);
  grd.addColorStop(0.1,groundDarkGreen);
  grd.addColorStop(0.5,groundDarkerGreen);
  grd.addColorStop(0.9,groundDarkGreen);
  grd.addColorStop(1, groundLightGreen);
  cvs.fillStyle=grd;
  cvs.strokeStyle = groundBorder ;
  cvs.fillRect(x,y,w-6,th);
  cvs.strokeRect(x,y,w-6,th);
  cvs.fillRect(x-3,y+th,w,30);
  cvs.strokeRect(x-3,y+th,w,30);


  cvs.fillRect(x-3,y+th+180,w,30);
  cvs.strokeRect(x-3,y+th+180,w,30);
  cvs.fillRect(x,y+th+210,w-6,bh);
  cvs.strokeRect(x,y+th+210,w-6,bh);

  return groundcanvas ;
  //Game.canvascontainer.appendChild(Game.groundcanvas);
}

function createScrollBar()
{
	var scrollbarcanvas = document.createElement("canvas");

    scrollbarcanvas.width = Game.canvas.width ;
    scrollbarcanvas.height = 10 ;
    var cvs =  scrollbarcanvas.getContext("2d");
    var groundLightGreen = "#97e556";
    var groundDarkGreen = "#73be29";
    var groundDarkerGreen = "#4b7e19";
	var fillcolor = groundLightGreen

	var w = 5 ;
	var h = 10 ;
    for(var x =0 ; x<=Game.canvas.width+2.5*w;x=x+2.5*w)
	{
	  var grd=cvs.createLinearGradient(x,0,x, h);
      grd.addColorStop(0,groundLightGreen);
      grd.addColorStop(0.5,groundDarkGreen);
      grd.addColorStop(1,groundLightGreen);

	  cvs.fillStyle = grd ;
	  cvs.beginPath();
      cvs.moveTo(x,0);
	  cvs.lineTo(x+w,0);
	  cvs.lineTo(x+w/2,h);
	  cvs.lineTo(x-w/2,h);
	  cvs.closePath();
	  cvs.fill();

	  grd=cvs.createLinearGradient(x+w,0,x+w, h);
      grd.addColorStop(0,groundDarkGreen);
      grd.addColorStop(0.5,groundDarkerGreen);
      grd.addColorStop(1,groundDarkGreen);
	  cvs.fillStyle = grd ;
	  cvs.beginPath();
      cvs.moveTo(x+w,0);
	  cvs.lineTo(x+2.5*w,0);
	  cvs.lineTo(x+w*2,h);
	  cvs.lineTo(x+w/2,h);
	  cvs.closePath();
	  cvs.fill();

	}
	 // Game.canvascontainer.appendChild(scrollbarcanvas);
 
	return scrollbarcanvas ;
}

