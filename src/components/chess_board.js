import React, {Component} from 'react'; 
import ChessBoard from 'chessboardjs'; 
import Chess from 'chess.js'; 
import $ from 'jquery'; 

class Board extends Component {

	constructor(props){
		super(props); 
	}

	componentDidMount(){

		var position = 'start', 
		  game = new Chess(),
		  statusEl = $('#status'),
		  fenEl = $('#fen'),
		  pgnEl = $('#pgn'), 
		  gameHistory = [],
		  //keeps track of what move it is to traverse game history
		  move = 0; 



		

		var onDragStart = function(source, piece, position, orientation) {
		  if (game.game_over() === true ||
		      (game.turn() === 'w' && piece.search(/^b/) !== -1) ||
		      (game.turn() === 'b' && piece.search(/^w/) !== -1)) {
		    return false;
		  }
		};

		var onDrop = function(source, target) {
		  var move = game.move({
		    from: source,
		    to: target,
		    promotion: 'q' 
		  });

		  if (move === null) return 'snapback';

		  updateStatus();
		};

		var onSnapEnd = function() {
		  board.position(game.fen());

		  //creates a separate piece of memory for forwarding moves
		  gameHistory = game.history().slice(); 
		  console.log(game.history());
		  move ++; 
		};

		var updateStatus = function() {
		  var status = '';

		  var moveColor = 'White';
		  if (game.turn() === 'b') {
		    moveColor = 'Black';
		  }

		  if (game.in_checkmate() === true) {
		    status = 'Game over, ' + moveColor + ' is in checkmate.';
		  }

		  else if (game.in_draw() === true) {
		    status = 'Game over, drawn position';
		  }

		  else {
		    status = moveColor + ' to move';

		    if (game.in_check() === true) {
		      status += ', ' + moveColor + ' is in check';
		    }
		  }

		  statusEl.html(status);
		  fenEl.html(game.fen());
		  pgnEl.html(game.pgn());
		};

		var cfg = {
		  draggable: true,
		  position: position,
		  onDragStart: onDragStart,
		  onDrop: onDrop,
		  onSnapEnd: onSnapEnd, 
		};


		var undoMove = function(){
			game.undo(); 
			board.position(game.fen()); 
			updateStatus(); 

		}

		const board = ChessBoard('board', cfg); 

		$('#backwardBtn').on('click', function(){
			undoMove(); 
			move = game.history().length; 
		});

		$('#forwardBtn').on('click', function(){

			game.move(gameHistory[move]); 

			if(move < gameHistory.length){
				move ++; 
			}

			board.position(game.fen()); 
			updateStatus(); 
		})

		$('#flipBtn').on('click', function(){
			board.flip(); 
		})

	}





	render(){
		return(
			<div>
				<div className="col-md-6" id="board" style={{width: 400}}></div>
				<div className="col-md-6">
					<input className="col-md-2" id="backwardBtn" type="button" value="<-" />
					<input className="col-md-2" id="forwardBtn" type="button" value="->" />
					<input className="col-md-2" id="flipBtn" type="button" value="flip" />

				</div>
				<div className="col-md-6">
					<p>Status: <span id="status"></span></p>
					<p>FEN: <span id="fen"></span></p>
					<p>PGN: <span id="pgn"></span></p>
				</div>
			</div>
		)
	}



}; 

export default Board; 