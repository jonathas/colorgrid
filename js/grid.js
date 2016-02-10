function generateGrid() {
	var numSquares = 2013;

	for(i=0; i < numSquares; i++) {
  		$('#grid').append('<div class="griditem"' + 'id="griditem_' + i +'">' + '</div>')
  		
  		
  		$('#griditem_' + i).css('background-color', randomColor());
	}
}

$(document).ready(function() {
	generateGrid();
});
