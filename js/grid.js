function generateGrid() {
	var numSquares = 2030;
	var randomSquare = 0;

	for(i=0; i < numSquares; i++) {
  		$('#grid').append('<div class="griditem"' + 'id="griditem_' + i +'">' + '</div>');

  		randomSquare = Math.floor(Math.random() * numSquares);

  		$('#griditem_' + randomSquare + 20).css('background-color', randomColor());
	}
	
}

function pickColor(element) {
	var attr = $(element.target).attr("style");

	if (typeof attr !== typeof undefined && attr !== false) {
	    var color = attr.split(":").slice(1).toString().replace(/\;|\s/g,"");
		$('#color').css('background-color', color);
	} else {
		$('#color').css('background-color', '');
	}		
}

$(document).ready(function() {
	generateGrid();

	$('.griditem').click(function(e) {
		pickColor(e);
	});
});
