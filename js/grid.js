var selectedColor = "";
var actionHistory = [];

function generateGrid() {
	var numSquares = 2030;
	var randomSquare = 0;

	$('#grid').html('');

	for(var i = 0; i < numSquares; i++) {
  		$('#grid').append('<div class="griditem"' + 'id="griditem_' + i +'">' + '</div>');

  		randomSquare = Math.floor(Math.random() * numSquares);

  		$('#griditem_' + randomSquare + 20).css('background-color', randomColor());
	}
	
}

function pickColor(element) {
	var attr = $(element.target).attr("style");

	if (typeof attr !== typeof undefined && attr !== false) {
	    selectedColor = attr.split(":").slice(1).toString().replace(/\;|\s/g,"");
	    $('#color').css('background-color', selectedColor);
	}

	colorGridItem(element);
}

function colorGridItem(element) {
	var id = $(element.target).attr("id");
	$('#' + id).css('background-color', selectedColor);

	actionHistory.push({id:id,color:selectedColor});
}

function undoColorGridItem() {
	if(actionHistory.length === 0) {
		return;
	}

	var last = actionHistory[actionHistory.length-1];

	$('#' + last.id).css('background-color', '');
	actionHistory.pop();
}

$(document).ready(function() {
	generateGrid();

	$('.griditem').click(function(e) {
		pickColor(e);
	});

	$('#undo').click(function(e) {
		undoColorGridItem();
	});

	$('#reset').click(function(e) {
		location.reload();
	});
});
