"use strict";
//TO-DO list
// add code that checks if a pawn has made move on cell that was attcked by the opponent's pawn (only if the pawn within an initial state).
// add code that grants a pawn exchange to bishop, knight, rook or queen, when it riches the opposite edge of the board.

// ------- help structures and methods start --------

// defines piece color
var PieceColorEnum = {
  NONE: 0,
  WHITE: 1,
  BLACK: 2
};

var BoardPosition = {
	WHITE_ON_TOP: 1,
	BLACK_ON_TOP: 2
};

// this function helps to create inheritence
var inheritsFrom = function (child, parent) {
    child.prototype = Object.create(parent.prototype);
};


function MoveDetails(piece, mRow, mCol) {
	this.piece = piece;
	this.row = mRow;
	this.col = mCol;
}


// ------- help structures and methods end --------


// ----------- Pieces Objects definition --------------------------

function Piece(row,col,img, pieceColor, pieceSize){
  this.row = row;
  this.col = col;
  this.pieceImage = new Image();
  this.pieceImage.src = img;
  this.pieceSize = pieceSize;
  this.x = col * pieceSize;
  this.y = row * pieceSize;
  this.pieceColor = pieceColor;
  this.isInitialPosition = true;
}

  // get valid posible moves for the current piece  
  Piece.prototype.getOpponentColor = function(){
	  	return this.pieceColor === PieceColorEnum.WHITE ?
											PieceColorEnum.BLACK :
											PieceColorEnum.WHITE;
  };

  // get valid posible moves for the current piece  
  Piece.prototype.getValidMoves = function(boardApperenceMap, boardPosition){
	  return [];
  };
  
  // get valid attack moves for the current piece  
  Piece.prototype.getAttackMoves = function(boardApperenceMap, boardPosition){
	  return [];
  };
  
  // get valid posible moves for the current piece  
  Piece.prototype.changePosition = function(row, col){	  
	   this.row = row;
	   this.col = col;
	   this.x = col * this.pieceSize;
       this.y = row * this.pieceSize;
       this.isInitialPosition = false;	   
  };
  
  // Draws this piece to a given context
  Piece.prototype.draw = function(ctx) {
  ctx.drawImage(this.pieceImage, this.x, this.y, this.pieceSize, this.pieceSize);
};

// Determine if a point is inside the piece's bounds
Piece.prototype.contains = function(mx, my) {
  // All we have to do is make sure the Mouse X,Y fall in the area between
  // the piece's X and (X + Width) and its Y and (Y + Height)
  return  (this.x <= mx) && (this.x + this.pieceSize >= mx) &&
          (this.y <= my) && (this.y + this.pieceSize >= my);
};

function Pawn(row,col, pieceColor, pieceSize) {
	
	var img = pieceColor == PieceColorEnum.WHITE ? 'img/pawn_w.svg' : 'img/pawn_b.svg';
	Piece.call(this, row, col, img, pieceColor, pieceSize);
}

inheritsFrom(Pawn, Piece);

Pawn.prototype.getValidMoves = function(boardApperenceMap, boardPosition){
	
   	Piece.prototype.getValidMoves.call(this);
	
	var res = [];
	
   if(boardPosition === BoardPosition.WHITE_ON_TOP)
   {
	   if(this.pieceColor === PieceColorEnum.WHITE){
		   if(this.row + 1 < 8 && 
		      boardApperenceMap[this.row + 1][this.col] === PieceColorEnum.NONE)
		   {
			   res.push(
			   {
				 row: this.row + 1,
				 col: this.col
				 });
		   }
		   if(this.isInitialPosition && 
		      boardApperenceMap[this.row + 1][this.col] === PieceColorEnum.NONE &&
			  boardApperenceMap[this.row + 2][this.col] === PieceColorEnum.NONE)
		   {
			   res.push(
			   {
				 row: this.row + 2,
				 col: this.col
				 });
		   }
		   
	   } else {
		   if(this.row - 1 >= 0 && 
		      boardApperenceMap[this.row - 1][this.col] === PieceColorEnum.NONE)
		   {
			   res.push(
			   {
				 row: this.row - 1,
				 col: this.col
				 });
		   }
		   if(this.isInitialPosition && 
		      boardApperenceMap[this.row - 1][this.col] === PieceColorEnum.NONE &&
			  boardApperenceMap[this.row - 2][this.col] === PieceColorEnum.NONE)
		   {
			   res.push(
			   {
				 row: this.row - 2,
				 col: this.col
				 });
		   }
	   }
   } else {
	   	   if(this.pieceColor === PieceColorEnum.WHITE){
			   		   
		   if(this.row - 1 >= 0 && 
		      boardApperenceMap[this.row - 1][this.col] === PieceColorEnum.NONE)
		   {
			   res.push(
			   {
				 row: this.row - 1,
				 col: this.col
				 });
		   }
		   if(this.isInitialPosition && 
		      boardApperenceMap[this.row - 1][this.col] === PieceColorEnum.NONE &&
			  boardApperenceMap[this.row - 2][this.col] === PieceColorEnum.NONE)
		   {
			   res.push(
			   {
				 row: this.row - 2,
				 col: this.col
				 });
		   }
		   
	   } else {
		   if(this.row + 1 < 8 && 
		      boardApperenceMap[this.row + 1][this.col] === PieceColorEnum.NONE)
		   {
			   res.push(
			   {
				 row: this.row + 1,
				 col: this.col
				 });
		   }
		   if(this.isInitialPosition && 
		      boardApperenceMap[this.row + 1][this.col] === PieceColorEnum.NONE &&
			  boardApperenceMap[this.row + 2][this.col] === PieceColorEnum.NONE)
		   {
			   res.push(
			   {
				 row: this.row + 2,
				 col: this.col
				 });
		   }
	   }
   }
    return res;
}

Pawn.prototype.getAttackMoves = function(boardApperenceMap, boardPosition){
	
   	Piece.prototype.getAttackMoves.call(this);
	
	var res = [];
	
   if(boardPosition === BoardPosition.WHITE_ON_TOP)
   {
	   if(this.pieceColor === PieceColorEnum.WHITE){	   
		   	if(this.row + 1 < 8 && this.col - 1 >= 0 &&
		      boardApperenceMap[this.row + 1][this.col - 1] === PieceColorEnum.BLACK){
			   res.push(
			   {
				 row: this.row + 1,
				 col: this.col - 1
				 });
		   }
		   	if(this.row + 1 < 8 && this.col + 1 < 8 &&
		      boardApperenceMap[this.row + 1][this.col + 1] === PieceColorEnum.BLACK){
			   res.push(
			   {
				 row: this.row + 1,
				 col: this.col + 1
				 });
		   }
	   } else {
		   if(this.row - 1 >= 0 && this.col - 1 >= 0 &&
		      boardApperenceMap[this.row - 1][this.col - 1] === PieceColorEnum.WHITE){
			   res.push(
			   {
				 row: this.row - 1,
				 col: this.col - 1
				 });
		   }
		   if(this.row - 1 >= 0 && this.col + 1 < 8 &&
		      boardApperenceMap[this.row - 1][this.col + 1] === PieceColorEnum.WHITE){
			   res.push(
			   {
				 row: this.row - 1,
				 col: this.col + 1
				 });
		   }
	   }
   } else {
	   	   if(this.pieceColor === PieceColorEnum.WHITE){	   
		   if(this.row - 1 >= 0 && this.col - 1 >= 0 &&
		      boardApperenceMap[this.row - 1][this.col - 1] === PieceColorEnum.BLACK){
			   res.push(
			   {
				 row: this.row - 1,
				 col: this.col - 1
				 });
		   }
		   if(this.row - 1 >= 0 && this.col + 1 < 8 &&
		      boardApperenceMap[this.row - 1][this.col + 1] === PieceColorEnum.BLACK){
			   res.push(
			   {
				 row: this.row - 1,
				 col: this.col + 1
				 });
		   }
	   } else {
		   
		   	if(this.row + 1 < 8 && this.col - 1 >= 0 &&
		      boardApperenceMap[this.row + 1][this.col - 1] === PieceColorEnum.WHITE) {
			   res.push(
			   {
				 row: this.row + 1,
				 col: this.col - 1
				 });
		   }
		   if(this.row + 1 < 8 && this.col + 1 < 8 &&
		      boardApperenceMap[this.row + 1][this.col + 1] === PieceColorEnum.WHITE){
			   res.push(
			   {
				 row: this.row + 1,
				 col: this.col + 1
				 });
		   }
	   }
   }
    return res;
}


function Bishop(row,col, pieceColor, pieceSize) {
	
	var img = pieceColor == PieceColorEnum.WHITE ? 'img/bishop_w.svg' : 'img/bishop_b.svg';
	Piece.call(this, row, col, img, pieceColor, pieceSize);
}

inheritsFrom(Bishop, Piece);

Bishop.prototype.getValidMoves = function(boardApperenceMap, boardPosition){
	
   	Piece.prototype.getValidMoves.call(this);
	
	var res = [];	
	var possibleValues = [];	
	var i = this.row;
	var j = this.col;
	
	while((i = i - 1) >= 0 &&
       	  (j = j - 1) >= 0 && 
	    boardApperenceMap[i][j] === PieceColorEnum.NONE) {
		res.push({
			row: i,
			col: j
		});
	} 
	
	i = this.row;
	j = this.col;
	
	while((i = i + 1) < 8 &&
       	  (j = j - 1) >= 0 && 
	    boardApperenceMap[i][j] === PieceColorEnum.NONE) {
		res.push({
			row: i,
			col: j
		});
	} 
 	
	i = this.row;
	j = this.col;
	
	while((i = i + 1) < 8 &&
       	  (j = j + 1) < 8 && 
	    boardApperenceMap[i][j] === PieceColorEnum.NONE) {
		res.push({
			row: i,
			col: j
		});
	} 
    
	i = this.row;
	j = this.col;
	
	while((i = i - 1) >= 0 &&
       	  (j = j + 1) < 8 && 
	    boardApperenceMap[i][j] === PieceColorEnum.NONE) {
		res.push({
			row: i,
			col: j
		});
	} 
	
    return res;
}

Bishop.prototype.getAttackMoves = function(boardApperenceMap, boardPosition){
		
   	Piece.prototype.getAttackMoves.call(this);
	
	var res = [];	
	var possibleValues = [];	
	var i = this.row;
	var j = this.col;
	var opponentColor = this.getOpponentColor();
	
	while((i = i - 1) >= 0 &&
       	  (j = j - 1) >= 0) {		
		// found opponent
		if(boardApperenceMap[i][j] === opponentColor)
		{
			res.push({
			row: i,
			col: j
			});
			
			break;
		}		
		// stop the loop,our group's piece
		if(boardApperenceMap[i][j] === this.pieceColor)
		{
			break;
		}				
	} 
	
    i = this.row;
	j = this.col;
	
	while((i = i + 1) < 8 &&
       	  (j = j - 1) >= 0) {
		// found opponent
		if(boardApperenceMap[i][j] === opponentColor)
		{
			res.push({
			row: i,
			col: j
			});
			
			break;
		}		
		// stop the loop,our group's piece
		if(boardApperenceMap[i][j] === this.pieceColor)
		{
			break;
		}	
	} 
 	
	i = this.row;
	j = this.col;
	
	while((i = i + 1) < 8 &&
       	  (j = j + 1) < 8) {
		if(boardApperenceMap[i][j] === opponentColor)
		{
			res.push({
			row: i,
			col: j
			});
			
			break;
		}		
		// stop the loop,our group's piece
		if(boardApperenceMap[i][j] === this.pieceColor)
		{
			break;
		}	
	} 
    
	i = this.row;
	j = this.col;
	
	while((i = i - 1) >= 0 &&
       	  (j = j + 1) < 8) {
		if(boardApperenceMap[i][j] === opponentColor)
		{
			res.push({
			row: i,
			col: j
			});
			
			break;
		}		
		// stop the loop,our group's piece
		if(boardApperenceMap[i][j] === this.pieceColor)
		{
			break;
		}	
	} 
	
    return res;
}

function Knight(row,col, pieceColor, pieceSize) {
	
	var img = pieceColor == PieceColorEnum.WHITE ? 'img/knight_w.svg' : 'img/knight_b.svg';
	Piece.call(this, row, col, img, pieceColor, pieceSize);
}

inheritsFrom(Knight, Piece);

Knight.prototype.getValidMoves = function(boardApperenceMap, boardPosition){
	
   	Piece.prototype.getValidMoves.call(this);
	
	var res = [];	
	var possibleValues = [];
	
	possibleValues.push({
		 row: this.row - 2,
		 col: this.col - 1
	});
		possibleValues.push({
		 row: this.row - 1,
		 col: this.col - 2
	});
		possibleValues.push({
		 row: this.row + 1,
		 col: this.col - 2
	});
		possibleValues.push({
		 row: this.row + 2,
		 col: this.col - 1
	});
		possibleValues.push({
		 row: this.row + 2,
		 col: this.col + 1
	});
		possibleValues.push({
		 row: this.row + 1,
		 col: this.col + 2
	});
		possibleValues.push({
		 row: this.row - 1,
		 col: this.col + 2
	});
		possibleValues.push({
		 row: this.row - 2,
		 col: this.col + 1
	});
	
	for (let value of possibleValues) {
		if(value.row >= 0 && value.row < 8 &&
   		   value.col >= 0 && value.col < 8 && 
		   boardApperenceMap[value.row][value.col] === PieceColorEnum.NONE) {
			   	res.push({
				row: value.row,
				col: value.col
			});
		   }
	}   	     
    return res;
}

Knight.prototype.getAttackMoves = function(boardApperenceMap, boardPosition){
	
   	Piece.prototype.getAttackMoves.call(this);
	
	var res = [];	
	var possibleValues = [];
	var opponentColor = this.getOpponentColor();	
		
	possibleValues.push({
		 row: this.row - 2,
		 col: this.col - 1
	});
		possibleValues.push({
		 row: this.row - 1,
		 col: this.col - 2
	});
		possibleValues.push({
		 row: this.row + 1,
		 col: this.col - 2
	});
		possibleValues.push({
		 row: this.row + 2,
		 col: this.col - 1
	});
		possibleValues.push({
		 row: this.row + 2,
		 col: this.col + 1
	});
		possibleValues.push({
		 row: this.row + 1,
		 col: this.col + 2
	});
		possibleValues.push({
		 row: this.row - 1,
		 col: this.col + 2
	});
		possibleValues.push({
		 row: this.row - 2,
		 col: this.col + 1
	});
	
	for (let value of possibleValues) {
		if(value.row >= 0 && value.row < 8 &&
   		   value.col >= 0 && value.col < 8 && 
		   boardApperenceMap[value.row][value.col] === opponentColor) {
			   	res.push({
				row: value.row,
				col: value.col
			});
		   }
	}   	     
    return res;
}

function Rook(row,col, pieceColor, pieceSize) {
	
	var img = pieceColor == PieceColorEnum.WHITE ? 'img/rook_w.svg' : 'img/rook_b.svg';
	Piece.call(this, row, col, img, pieceColor, pieceSize);
}

inheritsFrom(Rook, Piece);

Rook.prototype.getValidMoves = function(boardApperenceMap, boardPosition){
	
   	Piece.prototype.getValidMoves.call(this);
	
	var res = [];
	var possibleValues = [];
	var i = this.row;
	var j = this.col;
	
	while((i = i - 1) >= 0 &&
	    boardApperenceMap[i][j] === PieceColorEnum.NONE) {
		res.push({
			row: i,
			col: j
		});
	} 
	
	i = this.row;
	j = this.col;
	
	while((j = j - 1) >= 0 && 
	    boardApperenceMap[i][j] === PieceColorEnum.NONE) {
		res.push({
			row: i,
			col: j
		});
	} 
 	
	i = this.row;
	j = this.col;
	
	while((i = i + 1) < 8 &&
	    boardApperenceMap[i][j] === PieceColorEnum.NONE) {
		res.push({
			row: i,
			col: j
		});
	} 
    
	i = this.row;
	j = this.col;
	
	while((j = j + 1) < 8 && 
	    boardApperenceMap[i][j] === PieceColorEnum.NONE) {
		res.push({
			row: i,
			col: j
		});
	} 
	
    return res;
}

Rook.prototype.getAttackMoves = function(boardApperenceMap, boardPosition){
		
   	Piece.prototype.getAttackMoves.call(this);
	
	var res = [];
	var possibleValues = [];
	var i = this.row;
	var j = this.col;
	var opponentColor = this.getOpponentColor();
	
	while((i = i - 1) >= 0) {		
		// found opponent
		if(boardApperenceMap[i][j] === opponentColor)
		{
			res.push({
			row: i,
			col: j
			});
			
			break;
		}		
		// stop the loop,our group's piece
		if(boardApperenceMap[i][j] === this.pieceColor)
		{
			break;
		}				
	} 
	
    i = this.row;
	j = this.col;
	
	while((j = j - 1) >= 0) {
		// found opponent
		if(boardApperenceMap[i][j] === opponentColor)
		{
			res.push({
			row: i,
			col: j
			});
			
			break;
		}		
		// stop the loop,our group's piece
		if(boardApperenceMap[i][j] === this.pieceColor)
		{
			break;
		}	
	} 
 	
	i = this.row;
	j = this.col;
	
	while((i = i + 1) < 8) {
		if(boardApperenceMap[i][j] === opponentColor)
		{
			res.push({
			row: i,
			col: j
			});
			
			break;
		}		
		// stop the loop,our group's piece
		if(boardApperenceMap[i][j] === this.pieceColor)
		{
			break;
		}	
	} 
    
	i = this.row;
	j = this.col;
	
	while((j = j + 1) < 8) {
		if(boardApperenceMap[i][j] === opponentColor)
		{
			res.push({
			row: i,
			col: j
			});
			
			break;
		}		
		// stop the loop,our group's piece
		if(boardApperenceMap[i][j] === this.pieceColor)
		{
			break;
		}	
	} 
	
    return res;
}

function Queen(row,col, pieceColor, pieceSize) {
	
	var img = pieceColor == PieceColorEnum.WHITE ? 'img/queen_w.svg' : 'img/queen_b.svg';
	Piece.call(this, row, col, img, pieceColor, pieceSize);
}

inheritsFrom(Queen, Piece);

Queen.prototype.getValidMoves = function(boardApperenceMap, boardPosition){
	
   	Piece.prototype.getValidMoves.call(this);
	
	var res = [];
	var possibleValues = [];
	var i = this.row;
	var j = this.col;
	
	while((i = i - 1) >= 0 &&
       	  (j = j - 1) >= 0 && 
	    boardApperenceMap[i][j] === PieceColorEnum.NONE) {
		res.push({
			row: i,
			col: j
		});
	} 
	
	i = this.row;
	j = this.col;
	
	while((i = i + 1) < 8 &&
       	  (j = j - 1) >= 0 && 
	    boardApperenceMap[i][j] === PieceColorEnum.NONE) {
		res.push({
			row: i,
			col: j
		});
	} 
 	
	i = this.row;
	j = this.col;
	
	while((i = i + 1) < 8 &&
       	  (j = j + 1) < 8 && 
	    boardApperenceMap[i][j] === PieceColorEnum.NONE) {
		res.push({
			row: i,
			col: j
		});
	} 
    
	i = this.row;
	j = this.col;
	
	while((i = i - 1) >= 0 &&
       	  (j = j + 1) < 8 && 
	    boardApperenceMap[i][j] === PieceColorEnum.NONE) {
		res.push({
			row: i,
			col: j
		});
	} 
	
	i = this.row;
	j = this.col;
	
	while((i = i - 1) >= 0 &&
	    boardApperenceMap[i][j] === PieceColorEnum.NONE) {
		res.push({
			row: i,
			col: j
		});
	} 
	
	i = this.row;
	j = this.col;
	
	while((j = j - 1) >= 0 && 
	    boardApperenceMap[i][j] === PieceColorEnum.NONE) {
		res.push({
			row: i,
			col: j
		});
	} 
 	
	i = this.row;
	j = this.col;
	
	while((i = i + 1) < 8 &&
	    boardApperenceMap[i][j] === PieceColorEnum.NONE) {
		res.push({
			row: i,
			col: j
		});
	} 
    
	i = this.row;
	j = this.col;
	
	while((j = j + 1) < 8 && 
	    boardApperenceMap[i][j] === PieceColorEnum.NONE) {
		res.push({
			row: i,
			col: j
		});
	} 
	
    return res;
}

Queen.prototype.getAttackMoves = function(boardApperenceMap, boardPosition){
		
   	Piece.prototype.getAttackMoves.call(this);
	
	var res = [];
	var possibleValues = [];
	var i = this.row;
	var j = this.col;
	var opponentColor = this.getOpponentColor();
	
	while((i = i - 1) >= 0 &&
       	  (j = j - 1) >= 0) {		
		// found opponent
		if(boardApperenceMap[i][j] === opponentColor)
		{
			res.push({
			row: i,
			col: j
			});
			
			break;
		}		
		// stop the loop,our group's piece
		if(boardApperenceMap[i][j] === this.pieceColor)
		{
			break;
		}				
	} 
	
    i = this.row;
	j = this.col;
	
	while((i = i + 1) < 8 &&
       	  (j = j - 1) >= 0) {
		// found opponent
		if(boardApperenceMap[i][j] === opponentColor)
		{
			res.push({
			row: i,
			col: j
			});
			
			break;
		}		
		// stop the loop,our group's piece
		if(boardApperenceMap[i][j] === this.pieceColor)
		{
			break;
		}	
	} 
 	
	i = this.row;
	j = this.col;
	
	while((i = i + 1) < 8 &&
       	  (j = j + 1) < 8) {
		if(boardApperenceMap[i][j] === opponentColor)
		{
			res.push({
			row: i,
			col: j
			});
			
			break;
		}		
		// stop the loop,our group's piece
		if(boardApperenceMap[i][j] === this.pieceColor)
		{
			break;
		}	
	} 
    
	i = this.row;
	j = this.col;
	
	while((i = i - 1) >= 0 &&
       	  (j = j + 1) < 8) {
		if(boardApperenceMap[i][j] === opponentColor)
		{
			res.push({
			row: i,
			col: j
			});
			
			break;
		}		
		// stop the loop,our group's piece
		if(boardApperenceMap[i][j] === this.pieceColor)
		{
			break;
		}	
	} 
	
    i = this.row;
	j = this.col;
	
	while((i = i - 1) >= 0) {		
		// found opponent
		if(boardApperenceMap[i][j] === opponentColor)
		{
			res.push({
			row: i,
			col: j
			});
			
			break;
		}		
		// stop the loop,our group's piece
		if(boardApperenceMap[i][j] === this.pieceColor)
		{
			break;
		}				
	} 
	
    i = this.row;
	j = this.col;
	
	while((j = j - 1) >= 0) {
		// found opponent
		if(boardApperenceMap[i][j] === opponentColor)
		{
			res.push({
			row: i,
			col: j
			});
			
			break;
		}		
		// stop the loop,our group's piece
		if(boardApperenceMap[i][j] === this.pieceColor)
		{
			break;
		}	
	} 
 	
	i = this.row;
	j = this.col;
	
	while((i = i + 1) < 8) {
		if(boardApperenceMap[i][j] === opponentColor)
		{
			res.push({
			row: i,
			col: j
			});
			
			break;
		}		
		// stop the loop,our group's piece
		if(boardApperenceMap[i][j] === this.pieceColor)
		{
			break;
		}	
	} 
    
	i = this.row;
	j = this.col;
	
	while((j = j + 1) < 8) {
		if(boardApperenceMap[i][j] === opponentColor)
		{
			res.push({
			row: i,
			col: j
			});
			
			break;
		}		
		// stop the loop,our group's piece
		if(boardApperenceMap[i][j] === this.pieceColor)
		{
			break;
		}	
	} 
	
    return res;
}

function King(row,col, pieceColor, pieceSize) {
	
	var img = pieceColor == PieceColorEnum.WHITE ? 'img/king_w.svg' : 'img/king_b.svg';
	Piece.call(this, row, col, img, pieceColor, pieceSize);
}

inheritsFrom(King, Piece);

King.prototype.getValidMoves = function(boardApperenceMap, boardPosition){
	
   	Piece.prototype.getValidMoves.call(this);
	
	var res = [];	
	var possibleValues = [];
	
	possibleValues.push({
		 row: this.row - 1,
		 col: this.col
	});
		possibleValues.push({
		 row: this.row - 1,
		 col: this.col - 1
	});
		possibleValues.push({
		 row: this.row,
		 col: this.col - 1
	});
		possibleValues.push({
		 row: this.row + 1,
		 col: this.col - 1
	});
		possibleValues.push({
		 row: this.row + 1,
		 col: this.col
	});
		possibleValues.push({
		 row: this.row + 1,
		 col: this.col + 1
	});
		possibleValues.push({
		 row: this.row,
		 col: this.col + 1
	});
		possibleValues.push({
		 row: this.row - 1,
		 col: this.col + 1
	});
	
	for (let value of possibleValues) {
		if(value.row >= 0 && value.row < 8 &&
   		   value.col >= 0 && value.col < 8 && 
		   boardApperenceMap[value.row][value.col] === PieceColorEnum.NONE) {
			   	res.push({
				row: value.row,
				col: value.col
			});
		   }
	}   	     
    return res;
}

King.prototype.getAttackMoves = function(boardApperenceMap, boardPosition){
	
   	Piece.prototype.getAttackMoves.call(this);
	
	var res = [];	
	var possibleValues = [];
	var opponentColor = this.getOpponentColor();	
		
	possibleValues.push({
		 row: this.row - 1,
		 col: this.col
	});
		possibleValues.push({
		 row: this.row - 1,
		 col: this.col - 1
	});
		possibleValues.push({
		 row: this.row,
		 col: this.col - 1
	});
		possibleValues.push({
		 row: this.row + 1,
		 col: this.col - 1
	});
		possibleValues.push({
		 row: this.row + 1,
		 col: this.col
	});
		possibleValues.push({
		 row: this.row + 1,
		 col: this.col + 1
	});
		possibleValues.push({
		 row: this.row,
		 col: this.col + 1
	});
		possibleValues.push({
		 row: this.row - 1,
		 col: this.col + 1
	});
	
	for (let value of possibleValues) {
		if(value.row >= 0 && value.row < 8 &&
   		   value.col >= 0 && value.col < 8 && 
		   boardApperenceMap[value.row][value.col] === opponentColor) {
			   	res.push({
				row: value.row,
				col: value.col
			});
		   }
	}   	     
    return res;
}

King.prototype.isUnderCheck = function(boardApperenceMap, pieces, boardPosition) {
	
	for (let piece of pieces) {
		if(this.pieceColor != piece.pieceColor) {
			var attackMoves = piece.getAttackMoves(boardApperenceMap, boardPosition);
				for (let aMove of attackMoves) {
					if(this.row === aMove.row && this.col === aMove.col)
						return true;
				}
		}
	}
	
	return false;
}

// -------------- end Pieces objects definition ----------------------

// this function inits chess game
function init(){
	
	// global options;
	var cellSize = 50; // in px;
	
	var board = document.getElementById("board");
	board.width  = 8 * cellSize;
	board.height = 8 * cellSize;
	
	var boardPosition = BoardPosition.WHITE_ON_TOP;

	var currentMoveStatus = document.getElementById("currentMove");
	
	var s = new GameState(board, boardPosition, cellSize, currentMoveStatus);
	 s.initBoard();
}


function GameState(canvas, boardPosition, cellSize, currentMoveStatus) {
  // **** First some setup! ****
  
  this.canvas = canvas;
  this.width = canvas.width;
  this.height = canvas.height;
  this.ctx = canvas.getContext('2d');
  // This complicates things a little but but fixes mouse co-ordinate problems
  // when there's a border or padding. See getMouse for more detail
  var stylePaddingLeft, stylePaddingTop, styleBorderLeft, styleBorderTop;
  if (document.defaultView && document.defaultView.getComputedStyle) {
    this.stylePaddingLeft = parseInt(document.defaultView.getComputedStyle(canvas, null)['paddingLeft'], 10)      || 0;
    this.stylePaddingTop  = parseInt(document.defaultView.getComputedStyle(canvas, null)['paddingTop'], 10)       || 0;
    this.styleBorderLeft  = parseInt(document.defaultView.getComputedStyle(canvas, null)['borderLeftWidth'], 10)  || 0;
    this.styleBorderTop   = parseInt(document.defaultView.getComputedStyle(canvas, null)['borderTopWidth'], 10)   || 0;
  }
  // Some pages have fixed-position bars (like the stumbleupon bar) at the top or left of the page
  // They will mess up mouse coordinates and this fixes that
  var html = document.body.parentNode;
  this.htmlTop = html.offsetTop;
  this.htmlLeft = html.offsetLeft;

  // **** Keep track of state! ****
  
  this.currentMove = PieceColorEnum.WHITE;
  this.currentMoveStatus = currentMoveStatus;
  this.currentMoveStatus.innerHTML = "WHITE";
  this.prevMove = new MoveDetails(null, 0, 0);
  this.isNeedPromotePawn = false;
  
  this.boardPosition = boardPosition;
  this.cellSize = cellSize;
  
  this.boardApperenceMap = this.initBoardApperenceMap();
  
  this.validMoveSignImage = new Image();
  this.validMoveSignImage.src = 'img/availableMove.png';
  
  this.valid = false; // when set to false, the canvas will redraw everything
  this.pieces = [];  // the collection of things to be drawn  
  this.kings = [];
  this.mouseDown = false; // Keep track of when we are dragging
  this.dragging = false;
  // the current selected object. In the future we could turn this into an array for multiple selection
  this.selection = null;
  this.startDraggingX = 0;
  this.startDraggingY = 0;
  this.startDraggingIsInitPos = null;
  this.dragoffx = 0; // See mousedown and mousemove events for explanation
  this.dragoffy = 0;
  
  // **** Then events! ****
  
  // This is an example of a closure!
  // Right here "this" means the GameState. But we are making events on the Canvas itself,
  // and when the events are fired on the canvas the variable "this" is going to mean the canvas!
  // Since we still want to use this particular GameState in the events we have to save a reference to it.
  // This is our reference!
  var myState = this;
  
  //fixes a problem where double clicking causes text to get selected on the canvas
  canvas.addEventListener('selectstart', function(e) { e.preventDefault(); return false; }, false);
  // Up, down, and move are for dragging
  canvas.addEventListener('mousedown', function(e) {
    var mouse = myState.getMouse(e);
    var mx = mouse.x;
    var my = mouse.y;
	
	if(myState.isNeedPromotePawn){
		// check if the user chose on of the promotion pieces (queen, rook, bishop, knight) and select it //TODO
	} else {		
	 for (var i = myState.pieces.length - 1; i >= 0; i--) {
      if (myState.pieces[i].contains(mx, my) && myState.pieces[i].pieceColor == myState.currentMove) {
        var mySel = myState.pieces[i];
        // Keep track of where in the object we clicked
        myState.dragoffx = mx - mySel.x;
        myState.dragoffy = my - mySel.y;
        myState.mouseDown = true;
        myState.selection = mySel;
        myState.valid = false;
        return; // the other piece was selected
      }
     }
	
	}
    // have not returned means that we have failed to select anything
    if (myState.selection) {
	  // make a move
	  var mRow = Math.floor(mouse.y / cellSize);
	  var mCol = Math.floor(mouse.x / cellSize);
	  var validMove = myState.testAndMakeMove(mRow, mCol);
	  
	  if(validMove)
	  {
		  myState.changeCurrentMove();
	  }
	  
      myState.selection = null;
      myState.valid = false; // Need to clear the old selection border
    }
  }, true);
  canvas.addEventListener('mousemove', function(e) {
    if (myState.mouseDown){
		
	  // store selection at the beggining of the dragging
	  if(myState.dragging == false)
	  {
		  myState.startDraggingX = myState.selection.x;
		  myState.startDraggingY = myState.selection.y;
		  myState.startDraggingIsInitPos = myState.selection.isInitialPosition;
	  }
	  myState.dragging = true;		
      var mouse = myState.getMouse(e);
      // We don't want to drag the object by its top-left corner, we want to drag it
      // from where we clicked. Thats why we saved the offset and use it here
      myState.selection.x = mouse.x - myState.dragoffx;
      myState.selection.y = mouse.y - myState.dragoffy;   
      myState.valid = false; // Something's dragging so we must redraw
    }
  }, true);
  canvas.addEventListener('mouseup', function(e) {
	
    // current is changed by drag and drop piece	
	if(myState.dragging)
	{
      var mouse = myState.getMouse(e);
      var mx = mouse.x;
      var my = mouse.y;
	
	// try to make move
	  var mRow = Math.floor(mouse.y / myState.cellSize);
	  var mCol = Math.floor(mouse.x / myState.cellSize);
	  var validMove = myState.testAndMakeMove(mRow, mCol);
	  
	  if(validMove)
	  {
		  myState.changeCurrentMove();
	  }
	  else
	  {	// in case the move is invalid, return the selected piece to the initial position
		var startRow = Math.floor(myState.startDraggingY / myState.cellSize);
	    var startCol = Math.floor(myState.startDraggingX / myState.cellSize);
		myState.selection.changePosition(startRow, startCol);
		myState.selection.isInitialPosition = myState.startDraggingIsInitPos; // revert isInitial position value;
	  }
	  
	}
	  
    myState.mouseDown = false;
	myState.dragging = false;

    myState.valid = false;  	// redraw on mouse up
  }, true);

  
  // **** Options! ****
  
  this.selectionColor = 'rgba(255, 102, 0, 0.5)';
  this.selectionWidth = 2;  
  this.interval = 30;
  setInterval(function() { myState.draw(); }, myState.interval);
}

GameState.prototype.addPiece = function(piece) {
  this.pieces.push(piece);
  
  // store the reference of the kings pieces
  if(King.prototype.isPrototypeOf(piece)) {
		  this.kings[piece.pieceColor] = piece;
  }
  
  this.valid = false;
}

// This method places pieces on board according board position
GameState.prototype.initBoard = function(){
	
    var playerOnePiecesColor = this.boardPosition === BoardPosition.WHITE_ON_TOP ? PieceColorEnum.BLACK : PieceColorEnum.WHITE;
	var playerTwoPiecesColor = this.boardPosition === BoardPosition.WHITE_ON_TOP ? PieceColorEnum.WHITE : PieceColorEnum.BLACK;
	
	var kingCol =  this.boardPosition === BoardPosition.WHITE_ON_TOP ? 3 :4;
	var queenCol = this.boardPosition === BoardPosition.WHITE_ON_TOP ? 4 :3;
	
	var pieceSize = this.cellSize; 
	
	  // bottom pieces	  
	  this.addPiece(new Pawn(6,0, playerOnePiecesColor, pieceSize));
	  this.addPiece(new Pawn(6,1, playerOnePiecesColor, pieceSize));
	  this.addPiece(new Pawn(6,2, playerOnePiecesColor, pieceSize));
	  this.addPiece(new Pawn(6,3, playerOnePiecesColor, pieceSize));
	  this.addPiece(new Pawn(6,4, playerOnePiecesColor, pieceSize));
	  this.addPiece(new Pawn(6,5, playerOnePiecesColor, pieceSize));
	  this.addPiece(new Pawn(6,6, playerOnePiecesColor, pieceSize));
	  this.addPiece(new Pawn(6,7, playerOnePiecesColor, pieceSize));
	  
	  this.addPiece(new Rook(7,0, playerOnePiecesColor, pieceSize));
	  this.addPiece(new Rook(7,7, playerOnePiecesColor, pieceSize));
	  
	  this.addPiece(new Knight(7,1, playerOnePiecesColor, pieceSize));
	  this.addPiece(new Knight(7,6, playerOnePiecesColor, pieceSize));
	  
	  this.addPiece(new Bishop(7,2, playerOnePiecesColor, pieceSize));
	  this.addPiece(new Bishop(7,5, playerOnePiecesColor, pieceSize));
	  
	  this.addPiece(new Queen(7,queenCol, playerOnePiecesColor, pieceSize));
	  this.addPiece(new King(7,kingCol, playerOnePiecesColor, pieceSize));
	  
	  // top pieces
	  this.addPiece(new Pawn(1,0, playerTwoPiecesColor, pieceSize));
	  this.addPiece(new Pawn(1,1, playerTwoPiecesColor, pieceSize));
	  this.addPiece(new Pawn(1,2, playerTwoPiecesColor, pieceSize));
	  this.addPiece(new Pawn(1,3, playerTwoPiecesColor, pieceSize));
	  this.addPiece(new Pawn(1,4, playerTwoPiecesColor, pieceSize));
	  this.addPiece(new Pawn(1,5, playerTwoPiecesColor, pieceSize));
	  this.addPiece(new Pawn(1,6, playerTwoPiecesColor, pieceSize));
	  this.addPiece(new Pawn(1,7, playerTwoPiecesColor, pieceSize));
	  
	  this.addPiece(new Rook(0,0, playerTwoPiecesColor, pieceSize));
	  this.addPiece(new Rook(0,7, playerTwoPiecesColor, pieceSize));
	  
	  this.addPiece(new Knight(0,1, playerTwoPiecesColor, pieceSize));
	  this.addPiece(new Knight(0,6, playerTwoPiecesColor, pieceSize));
	  
	  this.addPiece(new Bishop(0,2, playerTwoPiecesColor, pieceSize));
	  this.addPiece(new Bishop(0,5, playerTwoPiecesColor, pieceSize));
	  
	  this.addPiece(new Queen(0,queenCol, playerTwoPiecesColor, pieceSize));
	  this.addPiece(new King(0,kingCol, playerTwoPiecesColor, pieceSize));
}

GameState.prototype.clear = function() {
  this.ctx.clearRect(0, 0, this.width, this.height);
}

GameState.prototype.drawBoardBackground = function(){
	
	var ctx = this.ctx;
	
	ctx.fillStyle="#5C5C5C";
		
	var r;
	for(var i = 0; i < 8; i++){
				
		r = i % 2 == 0 ? 1 : 0;
			
		for(var j = r; j < 8; j+=2) {
				ctx.fillRect(this.cellSize * i, this.cellSize * j, this.cellSize, this.cellSize);
		}
	}	
} 

GameState.prototype.initBoardApperenceMap = function() {
	
	var rows = new Array(8);
	for (var i = 0; i < 8; i++) {
      rows[i] = new Array(8);
	  
	  var val;
	  
	  if(this.boardPosition === BoardPosition.WHITE_ON_TOP)
	  {
		  if(i == 0 || i == 1)
		  {
			  val = PieceColorEnum.WHITE;
		  }
		  else if (i == 6 || i == 7)
		  {
			  val = PieceColorEnum.BLACK;
		  }
		  else
		  {
			  val = PieceColorEnum.NONE;
		  }
		  
	  }
	  else
	  {
		  if(i == 0 || i == 1)
		  {
			  val = PieceColorEnum.BLACK;
		  }
		  else if (i == 6 || i == 7)
		  {
			  val = PieceColorEnum.WHITE;
		  }
		  else
		  {
			  val = PieceColorEnum.NONE;
		  }
	  }
	    
	  for(var j = 0; j < 8; j++) {
		  rows[i][j] = val;
	  }	  
    }
		
	return rows;
}

GameState.prototype.isCurrentPlayerHasMoves = function(){
	
	// chaeck if any piece (except the king has valid move)
	for(let piece of this.pieces){
				if(piece.pieceColor === this.currentMove && !King.prototype.isPrototypeOf(piece)){
					var validMoves = piece.getValidMoves(this.boardApperenceMap, this.boardPosition);
					if(validMoves.length > 0){
						return true;
					}
					var attackMoves = piece.getAttackMoves(this.boardApperenceMap, this.boardPosition);
					if(attackMoves.length > 0){
						return true;
					}
				}
			}
			
	// check if kings makes turn and would not be under check.
	var king = this.kings[this.currentMove];
	var validMove = this.canPreventCheckMate(king, king);
	
	return validMove;
}
///
/// Makes move, checks if king under the check and revert the move back
///
GameState.prototype.isValidMove = function(piece, king, mRow, mCol){
			
			var validMove = false;
			var prevSelRow = piece.row;
		    var prevSelCol = piece.col;
			var prevBoardColor = this.boardApperenceMap[mRow][mCol];
	
	        // make move;	
			this.boardApperenceMap[piece.row][piece.col] = PieceColorEnum.NONE;						  
			this.boardApperenceMap[mRow][mCol] = piece.pieceColor;
			piece.changePosition(mRow, mCol);
			  
	        //check if the king is under check
			validMove = !king.isUnderCheck(this.boardApperenceMap, this.pieces, this.boardPosition) ? true : false;
			
			 //revert the move
			 this.boardApperenceMap[mRow][mCol] = prevBoardColor;						  
			 this.boardApperenceMap[prevSelRow][prevSelCol] = piece.pieceColor;
			 piece.changePosition(prevSelRow, prevSelCol);
									
			return validMove;
}

 // check that a rook is located on position
// check that the rook's initial position is true
GameState.prototype.isRookCanCastling = function(mRow, mCol){
	for (let piece of this.pieces){
		if(Rook.prototype.isPrototypeOf(piece) && 
		   piece.row === mRow && piece.col === mCol && 
		   piece.pieceColor === this.selection.pieceColor){
			return true;
		}
	}
	return false;
}

GameState.prototype.findPieceAndChangeItPosition = function(mRow, mCol, newRow, newCol){
	for (let piece of this.pieces){
		if(piece.row === mRow && piece.col === mCol){
			this.boardApperenceMap[piece.row][piece.col] = PieceColorEnum.NONE;						  
			this.boardApperenceMap[newRow][newCol] = piece.pieceColor;
			piece.changePosition(newRow, newCol);  
			break;
		}
	}	
}

GameState.prototype.testAndMakePawnPessantAttackMove = function(mRow, mCol){
	
	var validMove = false;
    var prevSelRow = this.selection.row;
    var prevSelCol = this.selection.col; 
	  
    if(this.boardApperenceMap[mRow][mCol] === PieceColorEnum.NONE && // check if the cell is empty
	   Pawn.prototype.isPrototypeOf(this.prevMove.piece)&& // check if the last move piece is pawn
       Pawn.prototype.isPrototypeOf(this.selection)     && // check if the selection piece is pawn
	   this.prevMove.piece.pieceColor !== this.selection.pieceColor && // check that those pieces are opponents
	   this.prevMove.piece.row === this.selection.row &&  // check that they is located on the same row
	   this.prevMove.piece.col === this.prevMove.col) // check if last move  piece column is the same as prev column coordinate
	{
      if ((this.prevMove.piece.row + 2 === this.prevMove.row && this.prevMove.piece.row + 1 === mRow) ||
	       (this.prevMove.piece.row - 2 === this.prevMove.row && this.prevMove.piece.row - 1 === mRow)){
        
	   // make move;			  
	   this.boardApperenceMap[this.selection.row][this.selection.col] = PieceColorEnum.NONE;						  
	   this.boardApperenceMap[mRow][mCol] = this.selection.pieceColor;
	   var removedPiece = this.removePiece(this.prevMove.piece.row, this.prevMove.piece.col); // remove piece 
	   this.selection.changePosition(mRow, mCol);
	   
	   //check if the selection king is under check
	   if(!this.kings[this.selection.pieceColor].isUnderCheck(this.boardApperenceMap, this.pieces, this.boardPosition)) {
		validMove = true;
	    } else {
		  //revert the move
		  this.boardApperenceMap[mRow][mCol] = PieceColorEnum.NONE;						  
		  this.boardApperenceMap[prevSelRow][prevSelCol] = this.selection.pieceColor;
		  this.selection.changePosition(prevSelRow, prevSelCol);
		  this.addPiece(removedPiece);
	    }	   
	  }
    }
	return validMove;
}

// Castling rules
// 1. the king and the rook in an initial position
// 2. no pieces are located between them
// 3. the king is not under check and he is not passing squeres that under attack
GameState.prototype.testAndMakeCastlingMove = function(mRow, mCol){
	
	var validMove = false;
	
	if(King.prototype.isPrototypeOf(this.selection)){	
	
		var king = this.selection;
		
		if(this.boardPosition === BoardPosition.WHITE_ON_TOP &&  (mRow === 0 || mRow == 7)){
			if(mCol === 1){
			 if(king.isInitialPosition === true) {
				if(this.boardApperenceMap[king.row][mCol] === PieceColorEnum.NONE &&
				   this.boardApperenceMap[king.row][mCol + 1] === PieceColorEnum.NONE && 
				   this.boardApperenceMap[king.row][mCol - 1] === king.pieceColor &&
				   !king.isUnderCheck(this.boardApperenceMap, this.pieces, this.boardPosition)) {
			        //ceck if rook can castling, test that mCol + 1 is not under attack and test and make move to mCol
					if(this.isRookCanCastling(mRow, mCol - 1) && this.isValidMove(king, king, mRow, mCol + 1) && this.isValidMove(king, king, mRow, mCol)) {
						validMove = true;
						this.findPieceAndChangeItPosition(mRow, mCol-1, mRow, mCol + 1); // move the rook	
						this.findPieceAndChangeItPosition(mRow, mCol + 2, mRow, mCol); // move the king							
					}
				}
			}
		}else if(mCol === 5){
			if(king.isInitialPosition === true) {
			if(this.boardApperenceMap[king.row][mCol] === PieceColorEnum.NONE &&
			   this.boardApperenceMap[king.row][mCol + 1] === PieceColorEnum.NONE &&
			   this.boardApperenceMap[king.row][mCol - 1] === PieceColorEnum.NONE &&				   
			   this.boardApperenceMap[king.row][mCol + 2] === king.pieceColor &&
			   !king.isUnderCheck(this.boardApperenceMap, this.pieces, this.boardPosition)) {
				//ceck if rook can castling, test that mCol - 1 is not under attack and test and make move to mCol
				if(this.isRookCanCastling(mRow, mCol +2) && this.isValidMove(king, king, mRow, mCol - 1) && this.isValidMove(king, king, mRow, mCol)) {
					validMove = true;
					this.findPieceAndChangeItPosition(mRow, mCol+ 2, mRow, mCol - 1); // move the rook	
					this.findPieceAndChangeItPosition(mRow, mCol - 2, mRow, mCol); // move the king							
				}
			}
		  }
		 } 
		} else if(this.boardPosition === BoardPosition.BLACK_ON_TOP &&  (mRow === 0 || mRow == 7)) {
			if(mCol === 2){
					 if(king.isInitialPosition === true) {
						if(this.boardApperenceMap[king.row][mCol] === PieceColorEnum.NONE &&
						   this.boardApperenceMap[king.row][mCol + 1] === PieceColorEnum.NONE &&
						   this.boardApperenceMap[king.row][mCol - 1] === PieceColorEnum.NONE && 						   
						   this.boardApperenceMap[king.row][mCol - 2] === king.pieceColor &&
						   !king.isUnderCheck(this.boardApperenceMap, this.pieces, this.boardPosition)) {
							//ceck if rook can castling, test that mCol + 1 is not under attack and test and make move to mCol
							if(this.isRookCanCastling(mRow, mCol - 2) && this.isValidMove(king, king, mRow, mCol + 1) && this.isValidMove(king, king, mRow, mCol)) {
								validMove = true;
								this.findPieceAndChangeItPosition(mRow, mCol-2, mRow, mCol + 1); // move the rook	
								this.findPieceAndChangeItPosition(mRow, mCol + 2, mRow, mCol); // move the king							
							}
						}
					}
			} else if(mCol === 6){
			if(king.isInitialPosition === true) {
			if(this.boardApperenceMap[king.row][mCol] === PieceColorEnum.NONE &&
			   this.boardApperenceMap[king.row][mCol - 1] === PieceColorEnum.NONE &&			   
			   this.boardApperenceMap[king.row][mCol - 2] === king.pieceColor &&
			   !king.isUnderCheck(this.boardApperenceMap, this.pieces, this.boardPosition)) {
				//ceck if rook can castling, test that mCol - 1 is not under attack and test and make move to mCol
				if(this.isRookCanCastling(mRow, mCol + 1) && this.isValidMove(king, king, mRow, mCol - 1) && this.isValidMove(king, king, mRow, mCol)) {
					validMove = true;
					this.findPieceAndChangeItPosition(mRow, mCol+ 1, mRow, mCol - 1); // move the rook	
					this.findPieceAndChangeItPosition(mRow, mCol - 2, mRow, mCol); // move the king							
				}
			}
		  }
		 }
		}
	}
	
	return validMove;
}

GameState.prototype.testAndPreparePawnPromotion = function() {
	if(Pawn.prototype.isPrototypeOf(this.selection) && this.selection.row === 0 || this.selection === 7){
		//4 cells and add 4 pieces to it (queen, rook, bishop, knight) //TODO
		this.isNeedPromotePawn = true;
	}
}

GameState.prototype.testAndPromotePawn = function() {
	// test if the selected item is one of the drawn pieces //TODO
	// remove the pawn and add the selected promotion.
}

// @mRow - row that mouse points to
// @mCol - column that mouse points to
// this method make move if mRow and mCol are valid values for the current selection
// returns true if move is succeeded, otherwise returns false
//
GameState.prototype.testAndMakeMove = function(mRow, mCol) {

	  var validMove = false;
	  var prevSelRow = this.selection.row;
      var prevSelCol = this.selection.col;  
	  var prevBoardColor = this.boardApperenceMap[mRow][mCol];
	  
	  if(this.selection != null)
	  {
		  
		if(this.isNeedPromotePawn) {
			validMove = testAndPromotePawn(mRow, mCol); //TODO
			return validMove;
		}
		  
		var validMoves = this.selection.getValidMoves(this.boardApperenceMap, this.boardPosition);
	    for(var i = 0; i < validMoves.length; i++){
		  if(validMoves[i].row == mRow && validMoves[i].col == mCol)
		  {		  
			  // make move;			  
			  this.boardApperenceMap[this.selection.row][this.selection.col] = PieceColorEnum.NONE;						  
			  this.boardApperenceMap[mRow][mCol] = this.selection.pieceColor;
			  this.selection.changePosition(mRow, mCol);
			  
			  //check if the selection king is under check
			  if(!this.kings[this.selection.pieceColor].isUnderCheck(this.boardApperenceMap, this.pieces, this.boardPosition)) {
			    validMove = true;
			  } else {
				  //revert the move
				  this.boardApperenceMap[mRow][mCol] = PieceColorEnum.NONE;						  
			      this.boardApperenceMap[prevSelRow][prevSelCol] = this.selection.pieceColor;
			      this.selection.changePosition(prevSelRow, prevSelCol);
			  }				  			 			 
			  break;
		  }
	   }
        // user did not moved the piece / check if user made attack
		if(!validMove) {
			var attackMoves = this.selection.getAttackMoves(this.boardApperenceMap, this.boardPosition);
			for(var i = 0; i < attackMoves.length; i++){
			  if(attackMoves[i].row == mRow && attackMoves[i].col == mCol)
			  {			
				this.boardApperenceMap[this.selection.row][this.selection.col] = PieceColorEnum.NONE;						  
				this.boardApperenceMap[mRow][mCol] = this.selection.pieceColor;
				var removedPiece = this.removePiece(mRow, mCol); // remove piece 
				this.selection.changePosition(mRow, mCol);

				//check if the selection king is under check
				if(!this.kings[this.selection.pieceColor].isUnderCheck(this.boardApperenceMap, this.pieces, this.boardPosition)) {
			     validMove = true;
			    } else {
				  //revert the move
				  this.boardApperenceMap[mRow][mCol] = prevBoardColor;						  
			      this.boardApperenceMap[prevSelRow][prevSelCol] = this.selection.pieceColor;
			      this.selection.changePosition(prevSelRow, prevSelCol);
				  this.addPiece(removedPiece);
			    }
				
				break;
			  }
		   }
		 }
		 
		 if(!validMove){
			validMove = this.testAndMakeCastlingMove(mRow, mCol);
		}
		
		if(!validMove){
			validMove = this.testAndMakePawnPessantAttackMove(mRow, mCol);
		}
				
		if(validMove){ // store previous move 
			this.prevMove.piece = this.selection;
			this.prevMove.col = prevSelCol;
			this.prevMove.row = prevSelRow;
		}
		
		if(validMove) {
			this.testAndPreparePawnPromotion(); //TODO
		}
	   
	  }
	  
	  return validMove;
} 

GameState.prototype.changeCurrentMove = function() {
	
	if(!this.isNeedPromotePawn) {
		this.currentMove = this.currentMove == PieceColorEnum.WHITE ?
												PieceColorEnum.BLACK :
												PieceColorEnum.WHITE;
		this.currentMoveStatus.innerHTML = this.currentMove == PieceColorEnum.WHITE ?
												"WHITE" :
												"BLACK";
		// check for checkmate
		if(this.checkForCheckMate()) {
			
			var prevMoveColor = this.currentMove == PieceColorEnum.WHITE ? "BLACK" : "WHITE";		
			this.currentMoveStatus.innerHTML = "Check Mate. " + prevMoveColor + " WON!!!";
		// check for check
		} else if(this.kings[this.currentMove].isUnderCheck(this.boardApperenceMap, this.pieces, this.boardPosition)){
				this.currentMoveStatus.innerHTML += " you are under check!!!";
		// opponent player does not have valid moves
		} else if(!this.isCurrentPlayerHasMoves()) {
			this.currentMoveStatus.innerHTML += " does not have valid moves. Drawn game. ";
		}
	}	
}

GameState.prototype.removePiece = function(mRow, mCol) {
	
	var removedPiece;
	
	for(var i = 0; i<this.pieces.length; i++) {
		if(this.pieces[i].row === mRow && this.pieces[i].col === mCol) {
			removedPiece = this.pieces[i];
			this.pieces.splice(i, 1);
			break;
		}
	}
	
	return removedPiece;
}

///
/// This method checks if piece makes valid or attack move and king would not be under check.
///
GameState.prototype.canPreventCheckMate = function(piece, king){
		
		var validMove = false;
		
		var validMoves = piece.getValidMoves(this.boardApperenceMap, this.boardPosition);			  
	    for(var i = 0; i < validMoves.length; i++){		  
			// in case a valid move found, stop searching
			if(this.isValidMove(piece, king, validMoves[i].row, validMoves[i].col)){
				validMove = true;
				break;
			}
	   }
	
		if(!validMove){ 
			var attackMoves = piece.getAttackMoves(this.boardApperenceMap, this.boardPosition);		  
			for(var i = 0; i < attackMoves.length; i++){
				// in case a valid move found, stop searching
				if(this.isValidMove(piece, king, attackMoves[i].row, attackMoves[i].col)){
					validMove = true;
					break;
				}
		   }
		}		
		return validMove;
}

GameState.prototype.checkForCheckMate = function() {
	
	var isCheckMate = false;
	var validMove = false;
	
	var king = this.kings[this.currentMove];
	var prevSelRow = king.row;
	var prevSelCol = king.col;
	
	if(king.isUnderCheck(this.boardApperenceMap, this.pieces, this.boardPosition)) {

		// 1. check if king can run away from the check
		// 2. check if king can make attack move and run from the check 
		validMove = this.canPreventCheckMate(king, king);
				
		if(!validMove){
			
			//3. Check if one of the pieces can protect the king.
			var selColorPieces = [];
			
			for(let piece of this.pieces){
				if(piece.pieceColor === king.pieceColor && !King.prototype.isPrototypeOf(piece)){
					selColorPieces.push(piece);
				}
			}
			
			for(var i = 0; i < selColorPieces.length; i++){
			
				validMove = this.canPreventCheckMate(selColorPieces[i], king);
				// in case a valid move found, stop searching
				if(validMove){
					break;
				}
			}
			
			if(!validMove){
				isCheckMate = true;
			}		
		}
    }
	return isCheckMate;
}

// While draw is called as often as the INTERVAL variable demands,
// It only ever does something if the canvas gets invalidated by our code
GameState.prototype.draw = function() {
  // if our state is invalid, redraw and validate!
  if (!this.valid) {
    var ctx = this.ctx;
    var pieces = this.pieces;
    this.clear();
    
    // ** Add stuff you want drawn in the background all the time here **
    this.drawBoardBackground();
	
	
	// draw selection
    // right now this is just a stroke along the edge of the selected Piece`
    if (this.selection != null) {
      var mySel = this.selection;
	  
	  var validMoves = mySel.getValidMoves(this.boardApperenceMap, this.boardPosition);
	  
	  for(var m = 0; m < validMoves.length; m++){
	
			var xSel = validMoves[m].col * this.cellSize;
			var ySel = validMoves[m].row * this.cellSize;
			
			ctx.drawImage(this.validMoveSignImage, xSel, ySel, this.cellSize, this.cellSize);
	  }
	  
	  // option to draw rectangle around selected piece
	  
      //ctx.strokeRect(mySel.x,mySel.y,mySel.w + 20,mySel.h + 20);
	  //ctx.strokeStyle = this.selectionColor;
      //ctx.lineWidth = this.selectionWidth;
	  
      // draw piece selection background
	  if(!this.dragging){
	   // draw rectangle background when not dragging
	   ctx.fillStyle = this.selectionColor;
       ctx.fillRect(mySel.x,mySel.y, mySel.pieceSize, mySel.pieceSize);
	  }
	  else{
	   // draw circle background when dragging
	   ctx.beginPath();
	   ctx.fillStyle = this.selectionColor;
	   ctx.arc(mySel.x + mySel.pieceSize/2,mySel.y + mySel.pieceSize / 2, mySel.pieceSize / 2, 0, 2 * Math.PI);
	   ctx.fill();
	  }
    }
	
    // draw all pieces
    var l = pieces.length;
    for (var i = 0; i < l; i++) {
      var piece = pieces[i];
      // We can skip the drawing of elements that have moved off the screen:
      if (piece.x > this.width || piece.y > this.height ||
          piece.x + piece.pieceSize < 0 || piece.y + piece.pieceSize < 0) continue;
      pieces[i].draw(ctx);
    }
    
    if(this.isNeedPromotePawn) {
		// draw the rectangle //TODO
		// draw the pieces (queen, rook, bishop, knight)
	}
    
    // ** Add stuff you want drawn on top all the time here **
    
    this.valid = true;
  }
}

// Creates an object with x and y defined, set to the mouse position relative to the state's canvas
// If you wanna be super-correct this can be tricky, we have to worry about padding and borders
GameState.prototype.getMouse = function(e) {
  var element = this.canvas, offsetX = 0, offsetY = 0, mx, my;
  
  // Compute the total offset
  if (element.offsetParent !== undefined) {
    do {
      offsetX += element.offsetLeft;
      offsetY += element.offsetTop;
    } while ((element = element.offsetParent));
  }

  // Add padding and border style widths to offset
  // Also add the <html> offsets in case there's a position:fixed bar
  offsetX += this.stylePaddingLeft + this.styleBorderLeft + this.htmlLeft;
  offsetY += this.stylePaddingTop + this.styleBorderTop + this.htmlTop;

  mx = e.pageX - offsetX;
  my = e.pageY - offsetY;
  
  // We return a simple javascript object (a hash) with x and y defined
  return {x: mx, y: my};
}





