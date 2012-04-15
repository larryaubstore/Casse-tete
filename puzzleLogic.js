/*
    Casse-Tete - Javascript puzzle
    Copyright (C) 2012 Laurence Morin-Daoust 

    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU General Public License as published by
    the Free Software Foundation, either version 3 of the License, or
    (at your option) any later version.

    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU General Public License for more details.

    You should have received a copy of the GNU General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/      


var PUZZLE = PUZZLE || {};
PUZZLE.logic = {};

PUZZLE.logic.GetTileWidth = function(width, tileDivider)
{
    var tileWidth = parseInt(width / tileDivider);
    return tileWidth; 
}

PUZZLE.logic.GetXTilesCount = function(width, tileWidth)
{
	var xTilesCount = parseInt(width / tileWidth);
    return xTilesCount; 
}

PUZZLE.logic.GetTileHeight = function(height, tileDivider)
{

    var tileHeight = parseInt(height / tileDivider);
    return tileHeight;
}

PUZZLE.logic.GetYTilesCount = function(height, tileHeight)
{
	var yTilesCount = parseInt(height / tileHeight);
    return yTilesCount;
}

PUZZLE.logic.GetTileArrays = function(xTilesCount, yTilesCount, randomPosition)
{
	var counterTile = 0;
	var dataTiles = [];

    // * 0 => 0
    // * 1 => 1
    // * 2 => 2
    // * 3 => -1
    // * 4 => 3
    // * 5 => 4
	var positions = [];

	for(var counterY = 0; counterY < yTilesCount; counterY++)
	{
		for(var counterX = 0; counterX < xTilesCount; counterX++)
		{
			if(counterTile == randomPosition)
			{
                dataTiles[counterTile] = new PUZZLE.TileEntity(counterX,
                                                               counterY, 
                                                               counterTile);
                positions.push(counterTile);
                counterTile++;
				positions.push(counterTile);
				counterX++;
			}
			else
			{
			    positions.push(counterTile);
			}

            dataTiles[counterTile] = new PUZZLE.TileEntity(counterX,
                                                           counterY, 
                                                           counterTile);

			counterTile++;
		}
	}

    return {
        PositionArray: positions,
        PointerArray: dataTiles
    };
}

PUZZLE.logic.GoLeft = function(puzzleEntity)
{
	var posNext = puzzleEntity.Positions[puzzleEntity.EmptyPositionRandom+1];
	var posEmpty = puzzleEntity.Positions[puzzleEntity.EmptyPositionRandom];

	puzzleEntity.Positions[puzzleEntity.EmptyPositionRandom+1] = posEmpty;
	puzzleEntity.Positions[puzzleEntity.EmptyPositionRandom] = posNext;
	puzzleEntity.EmptyPositionRandom++;


    return posNext;
}

PUZZLE.logic.GoRight = function(puzzleEntity)
{
	var posPrevious = puzzleEntity.Positions[puzzleEntity.EmptyPositionRandom-1];
	var posEmpty = puzzleEntity.Positions[puzzleEntity.EmptyPositionRandom];

	puzzleEntity.Positions[puzzleEntity.EmptyPositionRandom-1] = posEmpty;
	puzzleEntity.Positions[puzzleEntity.EmptyPositionRandom] = posPrevious;
	puzzleEntity.EmptyPositionRandom--;
    return posPrevious;
}


PUZZLE.logic.GoDown = function(puzzleEntity)
{
	var posPrevious = puzzleEntity.Positions[puzzleEntity.EmptyPositionRandom-puzzleEntity.RowTileCount];
	var posEmpty = puzzleEntity.Positions[puzzleEntity.EmptyPositionRandom];

	puzzleEntity.Positions[puzzleEntity.EmptyPositionRandom-puzzleEntity.RowTileCount] =  posEmpty;
	puzzleEntity.Positions[puzzleEntity.EmptyPositionRandom] = posPrevious;

	puzzleEntity.EmptyPositionRandom-=puzzleEntity.RowTileCount;
    return posPrevious;
}

PUZZLE.logic.GoUp = function(puzzleEntity)
{
	var posPrevious = 
	   puzzleEntity.Positions[puzzleEntity.EmptyPositionRandom+puzzleEntity.RowTileCount];
	var posEmpty = puzzleEntity.Positions[puzzleEntity.EmptyPositionRandom];

	puzzleEntity.Positions[puzzleEntity.EmptyPositionRandom+puzzleEntity.RowTileCount] = 
	   posEmpty;
	puzzleEntity.Positions[puzzleEntity.EmptyPositionRandom] = 
	   posPrevious;
	puzzleEntity.EmptyPositionRandom += puzzleEntity.RowTileCount;
    return posPrevious;
}



PUZZLE.logic.GetRandomList = function(count)
{

    var randomNumber;
    var randomList = [];
    for(var i = 0; i < count; i++)
    {
        // Générer un nombre aléatoire entre 1 et 4
        randomNumber = Math.floor((Math.random()*4)+1);
        randomList.push(randomNumber);
    }
    return randomList;
}


PUZZLE.logic.Randomize = function(puzzleEntity, randomList)
{

    var positions = puzzleEntity.Positions;
    var position;
    var randomNumber;

    var pos;

    var gridSize = puzzleEntity.RowTileCount * puzzleEntity.ColTileCount;

    var tileSelector;

    for(var i = 0; i < randomList.length; i++)
    {
        randomNumber = randomList[i];
        switch(randomNumber)
        {
            // Droite
            case 1:
                // On peut déplacer à droite
                if( ( (puzzleEntity.EmptyPositionRandom+1) % puzzleEntity.RowTileCount) 
                    != 0)
                {   
                    var ptrEmpty = puzzleEntity.Tiles[puzzleEntity.InitialPosition];
                    ptrEmpty.FrontPositionX = ptrEmpty.FrontPositionX+1;
                    
                    var nextPos = puzzleEntity.Positions[puzzleEntity.EmptyPositionRandom+1]; 
                    var ptrNext = puzzleEntity.Tiles[nextPos];
                    ptrNext.FrontPositionX = ptrNext.FrontPositionX-1;

                    pos = PUZZLE.logic.GoLeft(puzzleEntity);
                }
                break;
            // Gauche 
            case 2:
                // On peut déplacer à gauche 
                if( ( (puzzleEntity.EmptyPositionRandom+1) 
                    % puzzleEntity.RowTileCount) != 1)
                {
                    var ptrEmpty = puzzleEntity.Tiles[puzzleEntity.InitialPosition];
                    ptrEmpty.FrontPositionX = ptrEmpty.FrontPositionX-1;
                   
                    var previousPos = puzzleEntity.Positions[puzzleEntity.EmptyPositionRandom-1]; 
                    var ptrPrevious = puzzleEntity.Tiles[previousPos];
                    ptrPrevious.FrontPositionX = ptrPrevious.FrontPositionX+1;
                    
                    pos = PUZZLE.logic.GoRight(puzzleEntity);
                }
                break;
            // Haut
            case 3:
                // on peut déplacer en haut
                if( puzzleEntity.EmptyPositionRandom >= puzzleEntity.RowTileCount)
                {
                    var ptrEmpty = puzzleEntity.Tiles[puzzleEntity.InitialPosition];
                    ptrEmpty.FrontPositionY = ptrEmpty.FrontPositionY-1;

                    var nextPos = puzzleEntity.Positions[puzzleEntity.EmptyPositionRandom-puzzleEntity.RowTileCount];
                    var ptrNext = puzzleEntity.Tiles[nextPos];
                    ptrNext.FrontPositionY = ptrNext.FrontPositionY+1;
                    
                    pos = PUZZLE.logic.GoDown(puzzleEntity);
                }
                break;
            // Bas
            case 4:
                if( puzzleEntity.EmptyPositionRandom <  (gridSize - puzzleEntity.RowTileCount))
                {
                    var ptrEmpty = puzzleEntity.Tiles[puzzleEntity.InitialPosition];
                    ptrEmpty.FrontPositionY = ptrEmpty.FrontPositionY+1;

                    var previousPos = puzzleEntity.Positions[puzzleEntity.EmptyPositionRandom
                                                             +puzzleEntity.RowTileCount];
                    var ptrPrevious = puzzleEntity.Tiles[previousPos];
                    ptrPrevious.FrontPositionY = ptrPrevious.FrontPositionY-1;
                    
                    pos = PUZZLE.logic.GoUp(puzzleEntity);
                } 
                break;
        }
    }
}

PUZZLE.logic.DomCreation = function(width, height, puzzleEntity)
{
    var tileWrapperDiv = document.createElement('div');
    tileWrapperDiv.setAttribute('class', 'tilewrapper');

    var positionDiv = document.createElement('div');
    positionDiv.setAttribute('class', 'position');

    var tileDiv;
    var tile;

    var tileCssEntity;
    var id;

    var position;

    for(var i = 0; i < puzzleEntity.Tiles.length; i++)
    {
        tile = puzzleEntity.Tiles[i];

        if(i != puzzleEntity.InitialPosition)
        {
        
            id = PUZZLE.logic.IdName(i, puzzleEntity);
            tileCssEntity = PUZZLE.logic.GetTileCssEntity(tile, puzzleEntity, 
                'tile tileimage shadow border');
                
            tileDiv = PUZZLE.logic.GenerateTileAttributes(tileCssEntity, id, 
                false, true);

            // Append tile to the list
            positionDiv.appendChild(tileDiv);
        }
    }

    position = puzzleEntity.Positions[puzzleEntity.EmptyPositionRandom];
    tile = puzzleEntity.Tiles[position];

    var initialXPos = tile.FrontPositionX;
    var rightArrowPos = tile.FrontPositionX - 1;
    var leftArrowPos = tile.FrontPositionX + 1;

    var upArrowPos = tile.FrontPositionY + 1;
    var downArrowPos = tile.FrontPositionY - 1;



    tile.FrontPositionX = rightArrowPos;
    tileCssEntity = PUZZLE.logic.GetTileCssEntity(tile, puzzleEntity, 
        'tile border shadow transparentTile');
    tileDiv = PUZZLE.logic.GenerateTileAttributes(tileCssEntity, 
        "rightArrow", true, false);
    positionDiv.appendChild(tileDiv);


    tile.FrontPositionX = leftArrowPos;
    tileCssEntity = PUZZLE.logic.GetTileCssEntity(tile, puzzleEntity, 
        'tile border shadow transparentTile');
    tileDiv = PUZZLE.logic.GenerateTileAttributes(tileCssEntity, 
        "leftArrow", true, false);
    positionDiv.appendChild(tileDiv);

    tile.FrontPositionX = initialXPos;
    tile.FrontPositionY = upArrowPos;
    tileCssEntity = PUZZLE.logic.GetTileCssEntity(tile, puzzleEntity, 
        'tile border shadow transparentTile');
    tileDiv = PUZZLE.logic.GenerateTileAttributes(tileCssEntity, 
        "upArrow", true, false);
    positionDiv.appendChild(tileDiv);

    tile.FrontPositionX = initialXPos;
    tile.FrontPositionY = downArrowPos;
    tileCssEntity = PUZZLE.logic.GetTileCssEntity(tile, puzzleEntity, 
        'tile border shadow transparentTile');
    tileDiv = PUZZLE.logic.GenerateTileAttributes(tileCssEntity, 
        "downArrow", true, false);
    positionDiv.appendChild(tileDiv);

    tileWrapperDiv.appendChild(positionDiv);
    return tileWrapperDiv;
}

PUZZLE.logic.GetTileCssEntity = function(tile, puzzleEntity, classesName)
{
    // Generate properties
    var left = PUZZLE.logic.PositionXStyle(tile, puzzleEntity);
    var top = PUZZLE.logic.PositionYStyle(tile, puzzleEntity);
    var width = PUZZLE.logic.TileSizeStyleX(puzzleEntity);
    var height = PUZZLE.logic.TileSizeStyleY(puzzleEntity);
    var backgroundPos = PUZZLE.logic.BackGroundPos(tile, puzzleEntity);

    var tileCssEntity = new PUZZLE.TileCssEntity(left,
                                                 top,
                                                 width,
                                                 height,
                                                 backgroundPos,
                                                 classesName);
    return tileCssEntity;
}

PUZZLE.logic.GenerateTileAttributes = function(tileCssEntity, id, zIndex, visible)
{

    // Create tile 'div'
    var tileDiv = document.createElement('div');
    tileDiv.setAttribute('class', tileCssEntity.ClassesName);

    var styleAttribute =   'left:' + tileCssEntity.Left + ';' +
                            'top:' + tileCssEntity.Top + ';' + 
                            'width:' + tileCssEntity.Width + ';' +
                            'height:' + tileCssEntity.Height + ';' +
                            'background-position:' + tileCssEntity.BackgroundPosition + ';';


    if(zIndex == true)
    {
        styleAttribute += 'z-index: 1;'
    }

    if(visible == false)
    {
        //styleAttribute += 'visibility: hidden;';
        styleAttribute += 'display: none;';
    }
    
    tileDiv.setAttribute('style', styleAttribute);

    if(id != null)
    {
        tileDiv.setAttribute('id', id); 
    }

    return tileDiv;
}


PUZZLE.logic.ClicDroit = function(event) {
    var puzzleEntity = event.data.puzzleEntity;
    var posPrevious = PUZZLE.logic.GoRight(puzzleEntity);
    var arrow = $('#rightArrow, #leftArrow, #upArrow, #downArrow');

    // Fait disparaître les flèches
    $.when(arrow.fadeOut(125)).then(function() {
        // Quand les flèches sont cachées
        // bouge le "tile"
	    var tileSelector = $('#TILE_' + posPrevious);
        tileSelector.animate({
            left: '+=' + parseInt(puzzleEntity.TileWidth + puzzleEntity.Gap) ,
      	    }, 250, function() {
                // Déplace les flèches à leurs nouvelles positions
        		arrow.animate({left:  '-=' + parseInt(puzzleEntity.TileWidth + puzzleEntity.Gap) }, 125);
                // Fait apparaître/disparaître les flèches
                PUZZLE.logic.ShowHideArrow(puzzleEntity, arrow);
            });
    });
}

PUZZLE.logic.ClicGauche = function(event) {
    var puzzleEntity = event.data.puzzleEntity;
    var posNext = PUZZLE.logic.GoLeft(puzzleEntity);

    var arrow = $('#rightArrow, #leftArrow, #upArrow, #downArrow');
    // Fait disparaître les flèches
    $.when(arrow.fadeOut(125)).then(function() {
            // Quand les flèches sont cachées
            // bouge le "tile"
		    var tileSelector = $('#TILE_' + posNext);
            tileSelector.animate({
            left: '-=' + parseInt(puzzleEntity.TileWidth + puzzleEntity.Gap) ,
      	    }, 250, function() {
                // Déplace les flèches à leurs nouvelles positions
        		arrow.animate({ left:  '+=' + parseInt(puzzleEntity.TileWidth + puzzleEntity.Gap) }, 125);
                // Fait apparaître/disparaître les flèches
                PUZZLE.logic.ShowHideArrow(puzzleEntity, arrow);
            });
    });
}

PUZZLE.logic.ClicDown = function(event) {
    var puzzleEntity = event.data.puzzleEntity;
    var posPrevious = PUZZLE.logic.GoDown(puzzleEntity);

    var arrow = $('#rightArrow, #leftArrow, #upArrow, #downArrow');
    // Fait disparaître les flèches
    $.when(arrow.fadeOut(125)).then(function() {
            // Quand les flèches sont cachées
            // bouge le "tile"
		    var tileSelector = $('#TILE_' + posPrevious);
            tileSelector.animate({
            top: '+=' + parseInt(puzzleEntity.TileHeight + puzzleEntity.Gap) ,
      	    }, 250, function() {
                // Déplace les flèches à leurs nouvelles positions
        		arrow.animate({top: '-=' + parseInt(puzzleEntity.TileHeight + puzzleEntity.Gap)}, 125);
                // Fait apparaître/disparaître les flèches
                PUZZLE.logic.ShowHideArrow(puzzleEntity, arrow);
            });
    });
}

PUZZLE.logic.ClicUp = function(event) {

    var puzzleEntity = event.data.puzzleEntity;
    var posPrevious = PUZZLE.logic.GoUp(puzzleEntity); 

    var arrow = $('#rightArrow, #leftArrow, #upArrow, #downArrow');
    // Fait disparaître les flèches
    $.when(arrow.fadeOut(125)).then(function() {
            // Quand les flèches sont cachées
            // bouge le "tile"
		    var tileSelector = $('#TILE_' + posPrevious);
            tileSelector.animate({
            top: '-=' + parseInt(puzzleEntity.TileHeight + puzzleEntity.Gap ) ,
      	    }, 250, function() {
                // Déplace les flèches à leurs nouvelles positions
        		arrow.animate({top: '+=' + parseInt(puzzleEntity.TileHeight + puzzleEntity.Gap) }, 125);
                // Fait apparaître/disparaître les flèches
                PUZZLE.logic.ShowHideArrow(puzzleEntity, arrow);
            });
    });
}

PUZZLE.logic.ShowHideArrow = function(puzzleEntity, selector)
{

    var posLeftArrow = puzzleEntity.Positions[puzzleEntity.EmptyPositionRandom+1];
    var posRightArrow = puzzleEntity.Positions[puzzleEntity.EmptyPositionRandom-1];
    var posDownArrow = puzzleEntity.Positions[puzzleEntity.EmptyPositionRandom+puzzleEntity.RowTileCount];
    var posUpArrow = puzzleEntity.Positions[puzzleEntity.EmptyPositionRandom-puzzleEntity.RowTileCount];

    // Limite droite
    if( ((puzzleEntity.EmptyPositionRandom+1) % puzzleEntity.RowTileCount) == 0)
    {
        selector = selector.filter('#rightArrow, #upArrow, #downArrow');
    }

    // Limite gauche
    if( ((puzzleEntity.EmptyPositionRandom+1) % puzzleEntity.RowTileCount) == 1)
    {
        selector = selector.filter('#leftArrow, #upArrow, #downArrow');
    }


    var gridSize = puzzleEntity.RowTileCount * puzzleEntity.ColTileCount;
    // Limite bas
    if( puzzleEntity.EmptyPositionRandom >=  (gridSize - puzzleEntity.RowTileCount))
    {
        selector = selector.filter('#rightArrow, #leftArrow, #downArrow');
    }
   
    // Limite haut 
    if( puzzleEntity.EmptyPositionRandom < puzzleEntity.RowTileCount)
    {
        selector = selector.filter('#rightArrow, #leftArrow, #upArrow');
    }

    // Afficher/cacher les flèches
    selector.fadeIn(150);
}

PUZZLE.logic.Collapse = function(event)
{
    var puzzleEntity = event.data.puzzleEntity;
    var tiles = puzzleEntity.Tiles;
    var positions = puzzleEntity.Positions;

    var tile;
    var selector;

    var deltaX;
    var concat;

    // Sélecteur pour les flèches
    var arrow = $('#rightArrow, #leftArrow, #upArrow, #downArrow');

    var xPosition;
    var yPosition;

    var scope = puzzleEntity;

    var tileRed;

    // On fait disparaître les flèches
    arrow.fadeOut(250);

    for(var i = 0; i <= tiles.length; i++)
    {
        position = positions[i];

        tileRed = $("#TILE_" + position);
        tileRed.removeClass("redTile");

        if(i != position)
        {
            tileRed.addClass("redTile");
        }

        // Tous les "tiles" sauf l'emplacement vide
        if(position != -1)
        {
            tile = tiles[position];

            // Sélecteur pour le "tile"
            selector = $("#TILE_" + position);

            // Calculer les position des "tiles"
            xPosition = parseInt(i % scope.RowTileCount);
            yPosition = parseInt(i / scope.RowTileCount);

            concat =   parseInt(xPosition*scope.TileWidth) + "px";
            concatY =  parseInt(yPosition*scope.TileHeight) + "px";

            selector.animate({ left:  concat, top: concatY }, 750);
        }
    }

    // On sélectionne tous les "tiles"
    var tileClassSelector = $(".tile");
    // On enlève les styles pour faciliter le visionnement
    tileClassSelector.removeClass("shadow", 750);
}

PUZZLE.logic.Expand = function(event)
{
    var puzzleEntity = event.data.puzzleEntity;
    var tiles = puzzleEntity.Tiles;
    var positions = puzzleEntity.Positions;

    var tile;
    var selector;

    var deltaX;
    var concat;

    // Sélecteur pour les flèches
    var arrow = $('#rightArrow, #leftArrow, #upArrow, #downArrow');

    var xPosition;
    var yPosition;

    for(var i = 0; i <= tiles.length; i++)
    {
        position = positions[i];

        tileRed = $("#TILE_" + position);
        tileRed.removeClass("redTile");

        // Tous les "tiles" sauf l'emplacement vide
        if(position != -1)
        {
            tile = tiles[position];

            // Sélecteur pour le "tile"
            selector = $("#TILE_" + position);

            // Calculer les position des "tiles"
            xPosition = parseInt(i % puzzleEntity.RowTileCount);
            yPosition = parseInt(i / puzzleEntity.RowTileCount);

            concat =   parseInt(xPosition*puzzleEntity.TileWidth + puzzleEntity.Gap*xPosition) + "px";
            concatY =  parseInt(yPosition*puzzleEntity.TileHeight + puzzleEntity.Gap*yPosition) + "px";

            selector.animate({ left:  concat, top: concatY }, 750, function() {
                // On fait apparaître les flèches
                //arrow.fadeIn(250);
            PUZZLE.logic.ShowHideArrow(puzzleEntity, arrow);
                
            });
        }
    }

    // On sélectionne tous les "tiles"
    var tileClassSelector = $("[id*=TILE_], .transparentTile");

    // On enlève les styles pour faciliter le visionnement
    //tileClassSelector.addClass("tile", 750);
    tileClassSelector.addClass("shadow", 250);
}


PUZZLE.logic.BindArrowClick = function(puzzleEntity)
{
    $("#rightArrow").bind('click', {puzzleEntity: puzzleEntity}, PUZZLE.logic.ClicDroit);
    $("#leftArrow").bind('click', {puzzleEntity: puzzleEntity}, PUZZLE.logic.ClicGauche);
    $("#upArrow").bind('click', {puzzleEntity: puzzleEntity}, PUZZLE.logic.ClicUp);
    $("#downArrow").bind('click', {puzzleEntity: puzzleEntity}, PUZZLE.logic.ClicDown);
    $("#hideErrorsBtn").bind('click', {puzzleEntity: puzzleEntity}, PUZZLE.logic.Expand);
    $("#showErrorsBtn").bind('click', {puzzleEntity: puzzleEntity}, PUZZLE.logic.Collapse);
}

PUZZLE.logic.RightArrowVisible = function(position, puzzleEntity) {
	if(position == (puzzleEntity.Positions[puzzleEntity.EmptyPositionRandom - 1]) ) 
	{
		return true;
	}
	else
	{
		return false;
	}
}

PUZZLE.logic.LeftArrowVisible = function(position, puzzleEntity) {
	if(position == (puzzleEntity.Positions[puzzleEntity.EmptyPositionRandom + 1] ))
	{
		return true;
	}
	else
	{
		return false;
	}
}

PUZZLE.logic.DownArrowVisible = function(position, puzzleEntity) {

	if(position == 
	(puzzleEntity.Positions[puzzleEntity.EmptyPositionRandom - puzzleEntity.RowTileCount]))
	{
		return true;
	}
	else
	{
		return false;
	}
}

PUZZLE.logic.UpArrowVisible = function(position, puzzleEntity) {

    // devrait etre 5 au lieu de 9
	if(position == 
	(puzzleEntity.Positions[puzzleEntity.EmptyPositionRandom + puzzleEntity.RowTileCount] ))
	{
		return true;
	}
	else
	{
		return false;
	}
}

PUZZLE.logic.PositionX = function(tile, model) {
    return(tile.FrontPositionX*model.TileWidth + model.Gap*tile.FrontPositionX)
}

PUZZLE.logic.PositionXStyle = function(tile, model)
{
    return(this.PositionX(tile, model) + "px");
}

PUZZLE.logic.PositionY = function(tile, model) {
    return(tile.FrontPositionY*model.TileHeight + model.Gap*tile.FrontPositionY)
}

PUZZLE.logic.PositionYStyle = function(tile, model)
{
    return(this.PositionY(tile, model) + "px");
}

PUZZLE.logic.IdName = function(position, model) {
	return("TILE_" + position);
}

PUZZLE.logic.TileSizeStyleX = function(model) {
	return(model.TileWidth + "px");
}

PUZZLE.logic.TileSizeStyleY = function(model) {
	return(model.TileHeight + "px");
}

PUZZLE.logic.BackGroundPos = function(tile, model) {
   	return(((tile.BackPositionX*model.TileWidth)*-1) 
	+ "px" + " " + (tile.BackPositionY*model.TileHeight*-1) + "px");
}

PUZZLE.logic.InitPuzzle = function(width, height, tileDivider, gap, rootId)
{
    var tileWidth = PUZZLE.logic.GetTileWidth(width, tileDivider);
    var tileHeight = PUZZLE.logic.GetTileHeight(height, tileDivider);
    var xTilesCount = PUZZLE.logic.GetXTilesCount(width, tileWidth);
    var yTilesCount = PUZZLE.logic.GetYTilesCount(height, tileHeight);

    var randomPosition = parseInt(xTilesCount / 2) +
        parseInt( (yTilesCount / 2) * xTilesCount );

    var tileArray = PUZZLE.logic.GetTileArrays(xTilesCount, yTilesCount, randomPosition);

    var puzzleEntity = PUZZLE.PuzzleEntity(tileWidth,
                    tileHeight, 
                    tileArray.PointerArray,
                    xTilesCount,
                    yTilesCount,
                    tileArray.PositionArray,
                    randomPosition, 
                    gap); 

    
    var randomList = PUZZLE.logic.GetRandomList(20);

    PUZZLE.logic.Randomize(puzzleEntity, randomList);

    var dom = PUZZLE.logic.DomCreation(width, height, puzzleEntity); 

    // Append puzzle to the DOM
    document.getElementById(rootId).appendChild(dom);
    var arrow = $('#rightArrow, #leftArrow, #upArrow, #downArrow');

    //arrow.fadeOut();
    PUZZLE.logic.ShowHideArrow(puzzleEntity, arrow);

    PUZZLE.logic.BindArrowClick(puzzleEntity);

    return puzzleEntity;
}


