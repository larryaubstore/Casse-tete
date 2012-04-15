var PUZZLE = PUZZLE || {};

PUZZLE.TileEntity = function(backPositionX, backPositionY, position) {  

    return {
        BackPositionX: backPositionX,
	    BackPositionY: backPositionY,
	    Position: position,
        FrontPositionX: backPositionX,
        FrontPositionY: backPositionY
    };
}
