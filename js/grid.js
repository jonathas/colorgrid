function generateGrid() {
	var numSquares = 2030;
	var randomSquare = 0;

	for(i=0; i < numSquares; i++) {
  		$('#grid').append('<div class="griditem"' + 'id="griditem_' + i +'">' + '</div>');

  		randomSquare = Math.floor(Math.random() * numSquares);

  		$('#griditem_' + randomSquare + 20).css('background-color', randomColor());
	}
	
}

$(document).ready(function() {
	generateGrid();
});
