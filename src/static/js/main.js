/* globals Deferred, js */

var loaders = [];
var imgpath = 'static/img/';
var imageloadprogress = 0;
var imageloadtotal = 0;

var allimages = [
	{
		'name': 'pictures',
		'images': ['city.jpg'],
		'dir': ''
	},
];

//preload images
function loadFile(src,array,num){
	var deferred = new Deferred();
	var sprite = new Image();
	sprite.onload = function() {
		array[num] = sprite;
		deferred.resolve();
		imageloadprogress++;
		//document.getElementById('loading').style.width = (imageloadprogress / imageloadtotal) * 100 + '%';
	};
	sprite.src = src;
    return deferred.promise();
}

//loop through and call all the preload images
function callAllPreloads(array,dir){
    for(var z = 0; z < array.length; z++){
        loaders.push(loadFile(dir + array[z], array, z));
    }
}

for(var im = 0; im < allimages.length; im++){
	imageloadtotal += allimages[im].images.length;
	callAllPreloads(allimages[im].images, imgpath + allimages[im].dir + '/');
}

function NewPiece(x,y,w,h,solvedx,solvedy,spritex,spritey,piecetype){
	this.x = x;
	this.y = y;
	this.w = w;
	this.h = h;
	this.solvedx = solvedx;
	this.solvedy = solvedy;
	this.spritex = spritex;
	this.spritey = spritey;
	this.piecetype = piecetype;
	this.visible = 1;
	this.solved = 0;
	this.offsetx = -1;
	this.offsety = -1;

	this.drawPiece = function(){
		if(this.visible || this.solved){
            var arcx = 0;
            var arcy = 0;
            var arcradius = 0;
            var arcstartAngle = 0;
            var arcendAngle = 0;
            var arccounterClockwise = true;

            js.ctx.save();
            js.ctx.beginPath();
            js.ctx.moveTo(this.x, this.y); //top left corner

            //draw a sticky bit in, top edge
            if(this.piecetype === 5 || this.piecetype === 7 || this.piecetype === 8 || this.piecetype === 12){
                arcx = this.x + (this.w / 2);
                arcy = this.y;
                arcradius = this.h / 6;
                arcstartAngle = 1 * Math.PI;
                arcendAngle = 0 * Math.PI;
                arccounterClockwise = true;
                js.ctx.arc(arcx, arcy, arcradius, arcstartAngle, arcendAngle, arccounterClockwise);
            }
            //sticky bit out, top edge
            if(this.piecetype === 9 || this.piecetype === 6 || this.piecetype === 10 || this.piecetype === 11 || this.piecetype === 13 || this.piecetype === 14){
                arcx = this.x + (this.w / 2);
                arcy = this.y;
                arcradius = this.h / 6;
                arcstartAngle = 1 * Math.PI;
                arcendAngle = 0 * Math.PI;
                arccounterClockwise = false;
                js.ctx.arc(arcx, arcy, arcradius, arcstartAngle, arcendAngle, arccounterClockwise);
            }

            js.ctx.lineTo(this.x + this.w,this.y); //top right corner

            //draw a sticky bit in, right edge
            if(this.piecetype === 1 || this.piecetype === 3 || this.piecetype === 6 || this.piecetype === 9 || this.piecetype === 11 || this.piecetype === 13){
                arcx = this.x + this.w;
                arcy = this.y + (this.h / 2);
                arcradius = this.h / 6;
                arcstartAngle = 1.5 * Math.PI;
                arcendAngle = 0.5 * Math.PI;
                arccounterClockwise = true;
                js.ctx.arc(arcx, arcy, arcradius, arcstartAngle, arcendAngle, arccounterClockwise);
            }
            //draw a sticky bit out, right edge
            if(this.piecetype === 2 || this.piecetype === 5 || this.piecetype === 7 || this.piecetype === 12){
                arcx = this.x + this.w;
                arcy = this.y + (this.h / 2);
                arcradius = this.h / 6;
                arcstartAngle = 1.5 * Math.PI;
                arcendAngle = 0.5 * Math.PI;
                arccounterClockwise = false;
                js.ctx.arc(arcx, arcy, arcradius, arcstartAngle, arcendAngle, arccounterClockwise);
            }

            js.ctx.lineTo(this.x + this.w, this.y + this.h); //bottom right corner

            //draw a sticky bit in, bottom edge
            if(this.piecetype === 2 || this.piecetype === 5 || this.piecetype === 7 || this.piecetype === 8){
                arcx = this.x + (this.w / 2);
                arcy = this.y + this.h;
                arcradius = this.h / 6;
                arcstartAngle = 0 * Math.PI;
                arcendAngle = 1 * Math.PI;
                arccounterClockwise = true;
                js.ctx.arc(arcx, arcy, arcradius, arcstartAngle, arcendAngle, arccounterClockwise);
            }
            //sticky bit out, bottom edge
            if(this.piecetype === 1 || this.piecetype === 3 || this.piecetype === 4 || this.piecetype === 6 || this.piecetype === 9 || this.piecetype === 10){
                arcx = this.x + (this.w / 2);
                arcy = this.y + this.h;
                arcradius = this.h / 6;
                arcstartAngle = 0 * Math.PI;
                arcendAngle = 1 * Math.PI;
                arccounterClockwise = false;
                js.ctx.arc(arcx, arcy, arcradius, arcstartAngle, arcendAngle, arccounterClockwise);
            }

            js.ctx.lineTo(this.x, this.y + this.h); //bottom left corner

            //draw a sticky bit in, left edge
            if(this.piecetype === 3 || this.piecetype === 4 || this.piecetype === 6 || this.piecetype === 10 || this.piecetype === 13 || this.piecetype === 14){
                arcx = this.x;
                arcy = this.y + (this.h / 2);
                arcradius = this.h / 6;
                arcstartAngle = 0.5 * Math.PI;
                arcendAngle = 1.5 * Math.PI;
                arccounterClockwise = true;
                js.ctx.arc(arcx, arcy, arcradius, arcstartAngle, arcendAngle, arccounterClockwise);
            }
            //draw a sticky bit out, left edge
            if(this.piecetype === 2 || this.piecetype === 7 || this.piecetype === 8 || this.piecetype === 12){
                arcx = this.x;
                arcy = this.y + (this.h / 2);
                arcradius = this.h / 6;
                arcstartAngle = 0.5 * Math.PI;
                arcendAngle = 1.5 * Math.PI;
                arccounterClockwise = false;
                js.ctx.arc(arcx, arcy, arcradius, arcstartAngle, arcendAngle, arccounterClockwise);
            }

            js.ctx.lineTo(this.x, this.y); //top left corner - back to origin
            js.ctx.closePath();
            
            js.ctx.clip();
            js.ctx.drawImage(js.puzzle, 0 - this.solvedx + this.x, 0 - this.solvedy + this.y, js.canvasw, js.canvash);
            js.ctx.stroke();
            js.ctx.restore();

		}
	};
}


(function( window, undefined ) {
var js = {
	canvas: 0,
	ctx: 0,
	canvasw: 0,
	canvash: 0,
	idealw: 1,
	idealh: 1,
	canvasmode: 1,
	piececountx: 5, //number of pieces across, fixme must be odd number
	piececounty: 3, //number of pieces down, fixme must be an odd number
	puzzle: 0,
	pieces: [],
	solvedpieces: [],
	clickedpiece: -1,

    general: {
        init: function(){
			js.canvas = document.getElementById('canvas');
            if(!js.canvas.getContext){
                document.getElementById('canvas').innerHTML = 'Your browser does not support canvas. Sorry.';
            }
            else {
                js.ctx = js.canvas.getContext('2d');
                js.puzzle = allimages[0].images[0];
				js.idealw = js.puzzle.width;
				js.idealh = js.puzzle.height;
				//console.log(js.idealw,js.idealh);
                this.initCanvasSize();
	            this.setupEvents();
	            this.createPieces();
	            setInterval(js.general.drawPieces,10);
	            //this.drawCanvas();
            }
        },

        //initialise the size of the canvas based on the ideal aspect ratio and the size of the parent element
		initCanvasSize: function(){
			var parentel = document.getElementById('canvasparent');
			var targetw = parentel.offsetWidth;
			var targeth = parentel.offsetHeight;

			if(js.canvasmode === 1){ //resize the canvas to maintain aspect ratio depending on screen size (may result in gaps either side)
				var sizes = js.general.calculateAspectRatio(js.idealw,js.idealh,targetw,targeth);
				js.canvas.width = js.canvasw = sizes[0];
				js.canvas.height = js.canvash = sizes[1];
			}
			else { //make canvas always full width, with appropriately scaled height (may go off bottom of page)
				js.canvas.width = targetw;
				var scaleh = js.general.calculatePercentage(targetw,js.idealw);
				js.canvas.height = (js.idealh / 100) * scaleh;
			}
        },
        //given a width and height representing an aspect ratio, and the size of the containing thing, return the largest w and h matching that aspect ratio
		calculateAspectRatio: function(idealw,idealh,parentw,parenth){
			var aspect = Math.floor((parenth / idealh) * idealw);
			var cwidth = Math.min(idealw, parentw);
			var cheight = Math.min(idealh, parenth);
			var w = Math.min(parentw,aspect);
			var h = (w / idealw) * idealh;
			return([w,h]);
		},
        //returns the percentage amount that object is of wrapper
        calculatePercentage: function(object,wrapper){
			return((100 / wrapper) * object);
		},
        clearCanvas: function(){
            js.canvas.width = js.canvas.width; //this is apparently a hack but seems to work
        },
        randomNumber: function(min,max){
			return((Math.random() * (max - min) + min));
		},


		//click events
        setupEvents: function(){
			var ondown = ((document.ontouchstart!==null)?'mousedown':'touchstart');
			js.canvas.addEventListener(ondown,function(e){
				//console.log('click down');
				var clicked = js.general.clickDown(e);
				js.general.clickPiece(clicked[0],clicked[1]);
			},false);

			var onup = ((document.ontouchstart!==null)?'mouseup':'touchend');
			js.canvas.addEventListener(onup,function(e){
				//console.log('click up');
				js.general.releasePiece();
			},false);

			var onmove = ((document.ontouchstart!==null)?'mousemove':'touchmove');
			js.canvas.addEventListener(onmove,function(e){
				if(js.clickedpiece !== -1){
					js.general.movePiece(e);
				}
			},false);
		},

		//find where on the canvas the mouse/touch is
		clickDown: function(e){
			var rect = js.canvas.getBoundingClientRect();
			var x = e.clientX - rect.left;
			var y = e.clientY - rect.top;
			if(typeof e.changedTouches !== 'undefined'){
				x = e.changedTouches[0].pageX - rect.left;
				y = e.changedTouches[0].pageY - rect.top;
			}
			//console.log(x,y);
			return([x,y]);
		},
		
		//identify which piece has been clicked on
		clickPiece: function(x,y){
			for(var i = 0; i < js.pieces.length; i++){
				if(js.general.checkCollision(js.pieces[i],x,y)){
					//console.log('found one');
					console.log('Type of piece is',js.pieces[i].piecetype);
					js.clickedpiece = i;
					js.general.hideAllPieces();
					js.pieces[i].visible = 1;
					js.pieces[i].offsetx = x - js.pieces[i].x;
					js.pieces[i].offsety = y - js.pieces[i].y;
					break;
				}
			}
		},

		//let go of the current piece
		releasePiece: function(){
			if(js.clickedpiece !== -1){
				for(var p = 0; p < js.pieces.length; p++){
					js.pieces[p].visible = 1;
				}
				js.pieces[js.clickedpiece].offsetx = 0;
				js.pieces[js.clickedpiece].offsety = 0;
				js.general.checkSolved();
				js.clickedpiece = -1;
			}
		},

		//once selected, move a piece with the mouse
		movePiece: function(e){
			var movement = js.general.clickDown(e);
			js.pieces[js.clickedpiece].x = movement[0] - js.pieces[js.clickedpiece].offsetx;
			js.pieces[js.clickedpiece].y = movement[1] - js.pieces[js.clickedpiece].offsety;
		},

		//once finished moving a piece, check to see if it is in place
		checkSolved: function(){
			//console.log(js.pieces[js.clickedpiece].x,js.pieces[js.clickedpiece].solvedx);

			var newx = js.pieces[js.clickedpiece].x;
			var newy = js.pieces[js.clickedpiece].y;
			var sx = js.pieces[js.clickedpiece].solvedx;
			var sy = js.pieces[js.clickedpiece].solvedy;

			var tolerance = 20;
			//if the piece is solved
			if(Math.abs(newx - sx) < tolerance && Math.abs(newy - sy) < tolerance){
				js.pieces[js.clickedpiece].x = sx;
				js.pieces[js.clickedpiece].y = sy;
				js.pieces[js.clickedpiece].solved = 1;
				
				var tmp = js.pieces[js.clickedpiece];
				//remove the piece from the array of pieces and add to the solved array
				//means we can always draw the solved pieces first, beneath the unsolved
				js.pieces.splice(js.clickedpiece,1);
				js.solvedpieces.push(tmp);
			}
		},


		checkCollision: function(obj,x,y){
			if(!obj.solved){
				//rule out any possible collisions, remembering that all y numbers are inverted on canvas
			    //y is below obj bottom edge
			    if(y > obj.y + obj.h){
			        return(0);
				}
			    //y is above top edge
			    if(y < obj.y){
			        return(0);
				}
			    //x is beyond right edge
			    if(x > obj.x + obj.w){
			        return(0);
				}
			    //x is less than left edge
			    if(x < obj.x){
			        return(0);
				}
				return(1); //collision
			}
			else {
				return(0);
			}
		},

		hideAllPieces: function(){
			//console.log('hideAllPieces');
			for(var p = 0; p < js.pieces.length; p++){
				js.pieces[p].visible = 0;
			}
		},
		
		//create all the pieces of the puzzle
		createPieces: function(){
			var w = js.canvasw / js.piececountx;
			var h = js.canvash / js.piececounty;

			for(var y = 0; y < js.piececounty; y++){
				for(var x = 0; x < js.piececountx; x++){
                    /*
					var piecex = w * x; //fixme randomise later
					var piecey = h * y;
					*/
					var piecex = js.general.randomNumber(0,js.canvasw - w);
					var piecey = js.general.randomNumber(0,js.canvash - h);
					var solvedx = w * x;
					var solvedy = h * y;
					var spritex = 0;
					var spritey = 0;
					var piecetype = 0;

                    //FIXME some repetition here
					if(x === 0){ //left edge
                        if(y === 0){
    						piecetype = 1; //top left
                        }
                        else if(y === js.piececounty - 1){
    						piecetype = 11; //bottom left
                        }
                        else if(!js.general.isEven(y)){
                            piecetype = 5; //left edge, type 1
                        }
                        else if(js.general.isEven(y)){
                            piecetype = 9; //left edge, type 2
                        }
					}
					else if(y === 0){ //top edge
					    if(x === js.piececountx - 1){
                            piecetype = 4; //top right, fixme repeated below
                        }
                        else if(!js.general.isEven(x)){
                            piecetype = 2; //top edge, type 1
                        }
                        else if(js.general.isEven(x)){
                            piecetype = 3; //top edge, type 2
                        }
                    }
					else if(x === js.piececountx - 1){ //right edge
                        if(y === 0){
    						piecetype = 4; //top right
                        }
                        else if(y === js.piececounty - 1){
    						piecetype = 14; //bottom right
    					}
    					else if(!js.general.isEven(y)){
                            piecetype = 8;
                        }
                        else if(js.general.isEven(y)){
                            piecetype = 10;
                        }
					}
					else if(y === js.piececounty - 1){ //bottom edge
                        if(!js.general.isEven(x)){
                            piecetype = 12;
                        }
                        else {
                            piecetype = 13;
                        }
                    }
                    else {
                        if(!js.general.isEven(x)){
                            if(!js.general.isEven(y)){
                                piecetype = 6;
                            }
                            else {
                                piecetype = 7;
                            }
                        }
                        else {
                            if(!js.general.isEven(y)){
                                piecetype = 7;
                            }
                            else {
                                piecetype = 6;
                            }
                        }
                    }

					var newpiece = new NewPiece(piecex,piecey,w,h,solvedx,solvedy,spritex,spritey,piecetype);
					js.pieces.push(newpiece);
				}
			}
		},
		
        isEven: function(n) {
            return n % 2 == 0;
        },

		drawPieces: function(){
			js.general.clearCanvas();
			var piececount = js.solvedpieces.length;
			for(var p = 0; p < piececount; p++){
				js.solvedpieces[p].drawPiece();
			}
			piececount = js.pieces.length;
			for(var q = 0; q < piececount; q++){
				js.pieces[q].drawPiece();
			}
		},
/*
		drawCanvas: function(){
			//js.ctx.drawImage(allimages[0].images[0], 0, 0, js.canvasw, js.canvash);

			var piecew = js.canvasw / js.piececountx;
			var pieceh = js.canvash / js.piececounty;

			for(var y = 0; y < js.piececounty; y++){
				for(var x = 0; x < js.piececountx; x++){
					if(x === 0 && y === 0){
						console.log('top left',x,y);
					}
					if(x === js.piececountx - 1 && y === 0){
						console.log('top right',x,y);
					}
					if(x === 0 && y === js.piececounty - 1){
						console.log('bottom left',x,y);
					}
					if(x === js.piececountx - 1 && y === js.piececounty - 1){
						console.log('bottom right',x,y);
					}

					js.ctx.lineWidth = 1;

					var startx = piecew * x;
					var starty = pieceh * y;
					js.general.drawPuzzlePiece1(startx,starty,piecew,pieceh);
				}
			}
		},
		//this is the top left corner piece
		drawPuzzlePiece1: function(startx,starty,piecew,pieceh){
			js.ctx.beginPath();
			js.ctx.moveTo(startx, starty);
			js.ctx.lineTo(startx + piecew,starty);
			js.ctx.lineTo(startx + piecew,starty + pieceh);
			js.ctx.lineTo(startx, starty + pieceh);
			js.ctx.lineTo(startx, starty);
			js.ctx.stroke();
		};
*/
	}

};
window.js = js;
})(window);

window.onload = function(){
    Deferred.when(loaders).then(
    	function(){
		    js.general.init();
		    //js.general.addClass(document.getElementById('loading'),'fadeout');
		}
    );

	var resize;
	window.addEventListener('resize', function(event){
		clearTimeout(resize);
		resize = setTimeout(js.general.initCanvasSize,200);
	});
};