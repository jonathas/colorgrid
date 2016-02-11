var numSquares = 2030;
var selectedColor = "";
var actionHistory = [];
var gamePoints = 0;

function generateGrid() {
	$('#grid').html('');
	setGamePoints();

	for(var i = 0; i < numSquares; i++) {
  		$('#grid').append('<div class="griditem"' + 'id="griditem_' + i +'">' + '</div>');
	}

	randomlyFillGrid();
}

function randomlyFillGrid() {
	var randomSquare = 0;
	var gridItem = "";

	for(var i = 0; i < numSquares; i++) {
		randomSquare = Math.floor(Math.random() * numSquares);
		gridItem = 'griditem_' + randomSquare + 20;

		$('#' + gridItem).css('background-color', randomColor()).attr('original', true);
	}
}

function pickColor(element) {
	var color = extractColor($(element.target).attr("style"));

	if(color !== undefined) {
		selectedColor = color;
    	$('#color').css('background-color', selectedColor);
	}    

	setColorGridItem(element);
}

function extractColor(styleAttr) {
	if (typeof styleAttr !== typeof undefined && styleAttr !== false) {
		return styleAttr.split(":").slice(1).toString().replace(/\;|\s/g,"");
	}

	return undefined;
}

function setColorGridItem(element) {
	if(selectedColor === "") {
		return;
	} 

	var id = element.target.id;

	//Can I color it?
	var neighbors = getGridItemNeighbors(element);

	for (var key in neighbors) {
	    if(neighbors[key] !== null) {
	    	var neighborColor = extractColor($('#' + neighbors[key]).attr("style"));
	    	if(neighborColor !== undefined && neighborColor !== selectedColor) {
	    		return;
	    	}
	    }
	}

	if(!$('#' + id).attr('original')) {
		setGamePoints('add');
	}

	$('#' + id).css('background-color', selectedColor);

	actionHistory.push({id:id,color:selectedColor});
}

function getGridItemNeighbors(element) {
	var elementID = parseInt(element.target.id.split("_").slice(1));
	var top = (elementID - 58 > 0) ? "griditem_" + (elementID - 58) : null;
	var right = (element.target.nextSibling) ? element.target.nextSibling.id : null;
	var bottom = (elementID + 58 < numSquares) ? "griditem_" + (elementID + 58) : null;
	var left = (element.target.previousSibling) ? element.target.previousSibling.id : null;

	var topRight = (top !== null && right !== null) ? "griditem_" + (elementID - 57) : null;
	var topLeft = (top !== null && left !== null) ? "griditem_" + (elementID - 59) : null;

	var bottomRight = (bottom !== null && right !== null) ? "griditem_" + (elementID + 59) : null;
	var bottomLeft = (bottom !== null && left !== null) ? "griditem_" + (elementID + 57) : null;

	//Clockwise
	return {current:element.target.id,top:top,topRight:topRight,right:right,bottomRight:bottomRight,bottom:bottom,bottomLeft:bottomLeft,left:left,topLeft:topLeft};
}

function undoColorGridItem() {
	if(actionHistory.length === 0) {
		return;
	}

	var last = actionHistory.pop();
	setGamePoints('sub');

	if($('#' + last.id).attr('original')) {
		undoColorGridItem();
		return;
	}

	$('#' + last.id).css('background-color', '');
}

function setGamePoints(action) {
	if(action === 'sub') {
		(gamePoints > 0) ? gamePoints-- : null;
	} else if(action === 'add') {
		gamePoints++;
	}

	$('#points').text(gamePoints);
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
