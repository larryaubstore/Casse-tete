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

/*global clearInterval: false, clearTimeout: false, document: false, event: false, frames: false, history: false, Image: false, location: false, name: false, navigator: false, Option: false, parent: false, screen: false, setInterval: false, setTimeout: false, window: false, XMLHttpRequest: false, $: false */

var PUZZLE = PUZZLE || {};
PUZZLE.logic =  PUZZLE.logic || {};

PUZZLE.logic.GetTileWidth = function (width, tileDivider) {
    "use strict";
    var tileWidth = parseInt(width / tileDivider, 10);
    return tileWidth;
};

PUZZLE.logic.GetXTilesCount = function (width, tileWidth) {
    "use strict";
	var xTilesCount = parseInt(width / tileWidth, 10);
    return xTilesCount;
};

PUZZLE.logic.GetTileHeight = function (height, tileDivider) {
    "use strict";
    var tileHeight = parseInt(height / tileDivider, 10);
    return tileHeight;
};

PUZZLE.logic.GetYTilesCount = function (height, tileHeight) {
    "use strict";
	var yTilesCount = parseInt(height / tileHeight, 10);
    return yTilesCount;
};

PUZZLE.logic.GetTileArrays = function (xTilesCount, yTilesCount, randomPosition) {
    "use strict";
	var counterTile = 0, dataTiles = [], positions = [], counterY = 0, counterX = 0;

    // * 0 => 0
    // * 1 => 1
    // * 2 => 2
    // * 3 => 3 
    // * 4 => 4
    // * 5 => 5
	for (counterY = 0; counterY < yTilesCount; counterY += 1) {
		for (counterX = 0; counterX < xTilesCount; counterX += 1) {
			if (counterTile === randomPosition) {
                dataTiles[counterTile] = new PUZZLE.TileEntity(counterX,
                                                               counterY,
                                                               counterTile);
                positions.push(counterTile);
                counterTile += 1;
				positions.push(counterTile);
				counterX += 1;
			} else {
			    positions.push(counterTile);
			}

            dataTiles[counterTile] = new PUZZLE.TileEntity(counterX,
                                                           counterY,
                                                           counterTile);

			counterTile += 1;
		}
	}

    return {
        PositionArray: positions,
        PointerArray: dataTiles
    };
};

PUZZLE.logic.GoLeft = function (puzzleEntity) {
    "use strict";
    var posNext, posEmpty;
	posNext = puzzleEntity.Positions[puzzleEntity.EmptyPositionRandom + 1];
	posEmpty = puzzleEntity.Positions[puzzleEntity.EmptyPositionRandom];

	puzzleEntity.Positions[puzzleEntity.EmptyPositionRandom + 1] = posEmpty;
	puzzleEntity.Positions[puzzleEntity.EmptyPositionRandom] = posNext;
	puzzleEntity.EmptyPositionRandom += 1;

    return posNext;
};

PUZZLE.logic.GoRight = function (puzzleEntity) {
    "use strict";
    var posPrevious, posEmpty;
	posPrevious = puzzleEntity.Positions[puzzleEntity.EmptyPositionRandom - 1];
	posEmpty = puzzleEntity.Positions[puzzleEntity.EmptyPositionRandom];

	puzzleEntity.Positions[puzzleEntity.EmptyPositionRandom - 1] = posEmpty;
	puzzleEntity.Positions[puzzleEntity.EmptyPositionRandom] = posPrevious;
	puzzleEntity.EmptyPositionRandom -= 1;
    return posPrevious;
};


PUZZLE.logic.GoDown = function (puzzleEntity) {
    "use strict";
    var posPrevious, posEmpty;
	posPrevious = puzzleEntity.Positions[puzzleEntity.EmptyPositionRandom - puzzleEntity.RowTileCount];
	posEmpty = puzzleEntity.Positions[puzzleEntity.EmptyPositionRandom];

	puzzleEntity.Positions[puzzleEntity.EmptyPositionRandom - puzzleEntity.RowTileCount] =  posEmpty;
	puzzleEntity.Positions[puzzleEntity.EmptyPositionRandom] = posPrevious;

	puzzleEntity.EmptyPositionRandom -= puzzleEntity.RowTileCount;
    return posPrevious;
};

PUZZLE.logic.GoUp = function (puzzleEntity) {
    "use strict";
    var posPrevious, posEmpty;
	posPrevious = puzzleEntity.Positions[puzzleEntity.EmptyPositionRandom + puzzleEntity.RowTileCount];
	posEmpty = puzzleEntity.Positions[puzzleEntity.EmptyPositionRandom];

	puzzleEntity.Positions[puzzleEntity.EmptyPositionRandom + puzzleEntity.RowTileCount] = posEmpty;
	puzzleEntity.Positions[puzzleEntity.EmptyPositionRandom] = posPrevious;
	puzzleEntity.EmptyPositionRandom += puzzleEntity.RowTileCount;
    return posPrevious;
};



PUZZLE.logic.GetRandomList = function (count) {
    "use strict";
    var randomNumber, randomList = [], i = 0;
    for (i = 0; i < count; i += 1) {
        // Générer un nombre aléatoire entre 1 et 4
        randomNumber = Math.floor((Math.random() * 4) + 1);
        randomList.push(randomNumber);
    }
    return randomList;
};


PUZZLE.logic.Randomize = function (puzzleEntity, randomList) {
    "use strict";
    var positions = puzzleEntity.Positions, position, randomNumber, pos, gridSize, tileSelector, i = 0, ptrEmpty, nextPos, ptrNext, previousPos, ptrPrevious;

    gridSize = puzzleEntity.RowTileCount * puzzleEntity.ColTileCount;


    for (i = 0; i < randomList.length; i += 1) {
        randomNumber = randomList[i];
        switch (randomNumber) {
        // Right 
        case 1:
            // We can go right 
            if (((puzzleEntity.EmptyPositionRandom + 1) % puzzleEntity.RowTileCount) !== 0) {
                ptrEmpty = puzzleEntity.Tiles[puzzleEntity.InitialPosition];
                ptrEmpty.FrontPositionX = ptrEmpty.FrontPositionX + 1;
                    
                nextPos = puzzleEntity.Positions[puzzleEntity.EmptyPositionRandom + 1];
                ptrNext = puzzleEntity.Tiles[nextPos];
                ptrNext.FrontPositionX = ptrNext.FrontPositionX - 1;

                pos = PUZZLE.logic.GoLeft(puzzleEntity);
            }
            break;
        // Left 
        case 2:
            // We can go left 
            if (((puzzleEntity.EmptyPositionRandom + 1) % puzzleEntity.RowTileCount) !== 1) {
                ptrEmpty = puzzleEntity.Tiles[puzzleEntity.InitialPosition];
                ptrEmpty.FrontPositionX = ptrEmpty.FrontPositionX - 1;
                   
                previousPos = puzzleEntity.Positions[puzzleEntity.EmptyPositionRandom - 1];
                ptrPrevious = puzzleEntity.Tiles[previousPos];
                ptrPrevious.FrontPositionX = ptrPrevious.FrontPositionX + 1;
                    
                pos = PUZZLE.logic.GoRight(puzzleEntity);
            }
            break;
        // Up 
        case 3:
            // We can go up 
            if (puzzleEntity.EmptyPositionRandom >= puzzleEntity.RowTileCount) {
                ptrEmpty = puzzleEntity.Tiles[puzzleEntity.InitialPosition];
                ptrEmpty.FrontPositionY = ptrEmpty.FrontPositionY - 1;

                nextPos = puzzleEntity.Positions[puzzleEntity.EmptyPositionRandom - puzzleEntity.RowTileCount];
                ptrNext = puzzleEntity.Tiles[nextPos];
                ptrNext.FrontPositionY = ptrNext.FrontPositionY + 1;
                    
                pos = PUZZLE.logic.GoDown(puzzleEntity);
            }
            break;
        // Down 
        case 4:
            // We can go down
            if (puzzleEntity.EmptyPositionRandom <  (gridSize - puzzleEntity.RowTileCount)) {
                ptrEmpty = puzzleEntity.Tiles[puzzleEntity.InitialPosition];
                ptrEmpty.FrontPositionY = ptrEmpty.FrontPositionY + 1;

                previousPos = puzzleEntity.Positions[puzzleEntity.EmptyPositionRandom + puzzleEntity.RowTileCount];
                ptrPrevious = puzzleEntity.Tiles[previousPos];
                ptrPrevious.FrontPositionY = ptrPrevious.FrontPositionY - 1;
                    
                pos = PUZZLE.logic.GoUp(puzzleEntity);
            }
            break;
        }
    }
};

PUZZLE.logic.DomCreation = function (width, height, puzzleEntity) {
    "use strict";
    var tileWrapperDiv, positionDiv, tileDiv, tile, tileCssEntity, id, position, i, initialXPos, rightArrowPos, leftArrowPos, upArrowPos, downArrowPos;
    tileWrapperDiv = document.createElement('div');
    tileWrapperDiv.setAttribute('class', 'tilewrapper');

    positionDiv = document.createElement('div');
    positionDiv.setAttribute('class', 'position');

    for (i = 0; i < puzzleEntity.Tiles.length; i += 1) {
        tile = puzzleEntity.Tiles[i];

        if (i !== puzzleEntity.InitialPosition) {
        
            id = PUZZLE.logic.IdName(i, puzzleEntity);
            tileCssEntity = PUZZLE.logic.GetTileCssEntity(tile, puzzleEntity, 'tile tileimage shadow border');
                
            tileDiv = PUZZLE.logic.GenerateTileAttributes(tileCssEntity, id, false, true);
            
            // Append tile to the list
            positionDiv.appendChild(tileDiv);
        }
    }

    position = puzzleEntity.Positions[puzzleEntity.EmptyPositionRandom];
    tile = puzzleEntity.Tiles[position];

    initialXPos = tile.FrontPositionX;
    rightArrowPos = tile.FrontPositionX - 1;
    leftArrowPos = tile.FrontPositionX + 1;

    upArrowPos = tile.FrontPositionY + 1;
    downArrowPos = tile.FrontPositionY - 1;



    tile.FrontPositionX = rightArrowPos;
    tileCssEntity = PUZZLE.logic.GetTileCssEntity(tile, puzzleEntity, 'tile border shadow transparentTile');
    tileDiv = PUZZLE.logic.GenerateTileAttributes(tileCssEntity,  "rightArrow", true, false);
    positionDiv.appendChild(tileDiv);


    tile.FrontPositionX = leftArrowPos;
    tileCssEntity = PUZZLE.logic.GetTileCssEntity(tile, puzzleEntity, 'tile border shadow transparentTile');
    tileDiv = PUZZLE.logic.GenerateTileAttributes(tileCssEntity, "leftArrow", true, false);
    positionDiv.appendChild(tileDiv);

    tile.FrontPositionX = initialXPos;
    tile.FrontPositionY = upArrowPos;
    tileCssEntity = PUZZLE.logic.GetTileCssEntity(tile, puzzleEntity, 'tile border shadow transparentTile');
    tileDiv = PUZZLE.logic.GenerateTileAttributes(tileCssEntity, "upArrow", true, false);
    positionDiv.appendChild(tileDiv);

    tile.FrontPositionX = initialXPos;
    tile.FrontPositionY = downArrowPos;
    tileCssEntity = PUZZLE.logic.GetTileCssEntity(tile, puzzleEntity, 'tile border shadow transparentTile');
    tileDiv = PUZZLE.logic.GenerateTileAttributes(tileCssEntity, "downArrow", true, false);
    positionDiv.appendChild(tileDiv);

    tileWrapperDiv.appendChild(positionDiv);
    return tileWrapperDiv;
};

PUZZLE.logic.GetTileCssEntity = function (tile, puzzleEntity, classesName) {
    "use strict";
    var left, top, width, height, backgroundPos, tileCssEntity;
    // Generate properties
    left = PUZZLE.logic.PositionXStyle(tile, puzzleEntity);
    top = PUZZLE.logic.PositionYStyle(tile, puzzleEntity);
    width = PUZZLE.logic.TileSizeStyleX(puzzleEntity);
    height = PUZZLE.logic.TileSizeStyleY(puzzleEntity);
    backgroundPos = PUZZLE.logic.BackGroundPos(tile, puzzleEntity);

    tileCssEntity = new PUZZLE.TileCssEntity(left,
                                                 top,
                                                 width,
                                                 height,
                                                 backgroundPos,
                                                 classesName);
    return tileCssEntity;
};

PUZZLE.logic.GenerateTileAttributes = function (tileCssEntity, id, zIndex, visible) {
    "use strict";
    // Create tile 'div'
    var tileDiv = document.createElement('div'), styleAttribute;
    tileDiv.setAttribute('class', tileCssEntity.ClassesName);

    styleAttribute =   'left:' + tileCssEntity.Left + ';' +
                       'top:' + tileCssEntity.Top + ';' +
                       'width:' + tileCssEntity.Width + ';' +
                       'height:' + tileCssEntity.Height + ';' +
                       'background-position:' + tileCssEntity.BackgroundPosition + ';';

    if (zIndex === true) {
        styleAttribute += 'z-index: 1;';
    }

    if (visible === false) {
        styleAttribute += 'display: none;';
    }
    
    tileDiv.setAttribute('style', styleAttribute);

    if (id !== null) {
        tileDiv.setAttribute('id', id);
    }

    return tileDiv;
};


PUZZLE.logic.ClicDroit = function (event) {
    "use strict";
    var puzzleEntity, posPrevious, arrow;
    puzzleEntity = event.data.puzzleEntity;
    posPrevious = PUZZLE.logic.GoRight(puzzleEntity);
    arrow = $('#rightArrow, #leftArrow, #upArrow, #downArrow');

    // Fait disparaître les flèches
    $.when(arrow.fadeOut(125)).then(function () {
        // Quand les flèches sont cachées
        // bouge le "tile"
	    var tileSelector = $('#TILE_' + posPrevious);
        tileSelector.animate({ left: '+=' + parseInt(puzzleEntity.TileWidth + puzzleEntity.Gap, 10)  }, 250, function () {
            // Déplace les flèches à leurs nouvelles positions
            arrow.animate({left:  '-=' + parseInt(puzzleEntity.TileWidth + puzzleEntity.Gap, 10) }, 125);
                // Fait apparaître/disparaître les flèches
            PUZZLE.logic.ShowHideArrow(puzzleEntity, arrow);
        });
    });
};

PUZZLE.logic.ClicGauche = function (event) {
    "use strict";
    var puzzleEntity, posNext, arrow, tileSelector;
    puzzleEntity = event.data.puzzleEntity;
    posNext = PUZZLE.logic.GoLeft(puzzleEntity);

    arrow = $('#rightArrow, #leftArrow, #upArrow, #downArrow');
    // Fait disparaître les flèches
    $.when(arrow.fadeOut(125)).then(function () {
        // Quand les flèches sont cachées
        // bouge le "tile"
		tileSelector = $('#TILE_' + posNext);
        tileSelector.animate({ left: '-=' + parseInt(puzzleEntity.TileWidth + puzzleEntity.Gap, 10) }, 250, function () {
            // Déplace les flèches à leurs nouvelles positions
            arrow.animate({ left:  '+=' + parseInt(puzzleEntity.TileWidth + puzzleEntity.Gap, 10) }, 125);
            // Fait apparaître/disparaître les flèches
            PUZZLE.logic.ShowHideArrow(puzzleEntity, arrow);
        });
    });
};

PUZZLE.logic.ClicDown = function (event) {
    "use strict";
    var puzzleEntity, posPrevious, arrow, tileSelector;
    puzzleEntity = event.data.puzzleEntity;
    posPrevious = PUZZLE.logic.GoDown(puzzleEntity);

    arrow = $('#rightArrow, #leftArrow, #upArrow, #downArrow');
    // Fait disparaître les flèches
    $.when(arrow.fadeOut(125)).then(function () {
        // Quand les flèches sont cachées
        // bouge le "tile"
		tileSelector = $('#TILE_' + posPrevious);
        tileSelector.animate({ top: '+=' + parseInt(puzzleEntity.TileHeight + puzzleEntity.Gap, 10)  }, 250, function () {
            // Déplace les flèches à leurs nouvelles positions
            arrow.animate({top: '-=' + parseInt(puzzleEntity.TileHeight + puzzleEntity.Gap, 10)}, 125);
            // Fait apparaître/disparaître les flèches
            PUZZLE.logic.ShowHideArrow(puzzleEntity, arrow);
        });
    });
};

PUZZLE.logic.ClicUp = function (event) {
    "use strict";
    var puzzleEntity, posPrevious, arrow, tileSelector;
    puzzleEntity = event.data.puzzleEntity;
    posPrevious = PUZZLE.logic.GoUp(puzzleEntity);

    arrow = $('#rightArrow, #leftArrow, #upArrow, #downArrow');
    // Fait disparaître les flèches
    $.when(arrow.fadeOut(125)).then(function () {
            // Quand les flèches sont cachées
            // bouge le "tile"
        tileSelector = $('#TILE_' + posPrevious);
        tileSelector.animate({top: '-=' + parseInt(puzzleEntity.TileHeight + puzzleEntity.Gap, 10) }, 250, function () {
            // Déplace les flèches à leurs nouvelles positions
            arrow.animate({top: '+=' + parseInt(puzzleEntity.TileHeight + puzzleEntity.Gap, 10) }, 125);
            // Fait apparaître/disparaître les flèches
            PUZZLE.logic.ShowHideArrow(puzzleEntity, arrow);
        });
    });
};

PUZZLE.logic.ShowHideArrow = function (puzzleEntity, selector) {
    "use strict";

    var posLeftArrow, posRightArrow, posDownArrow, posUpArrow, gridSize;
    posLeftArrow = puzzleEntity.Positions[puzzleEntity.EmptyPositionRandom + 1];
    posRightArrow = puzzleEntity.Positions[puzzleEntity.EmptyPositionRandom - 1];
    posDownArrow = puzzleEntity.Positions[puzzleEntity.EmptyPositionRandom + puzzleEntity.RowTileCount];
    posUpArrow = puzzleEntity.Positions[puzzleEntity.EmptyPositionRandom - puzzleEntity.RowTileCount];

    // Limite droite
    if (((puzzleEntity.EmptyPositionRandom + 1) % puzzleEntity.RowTileCount) === 0) {
        selector = selector.filter('#rightArrow, #upArrow, #downArrow');
    }

    // Limite gauche
    if (((puzzleEntity.EmptyPositionRandom + 1) % puzzleEntity.RowTileCount) === 1) {
        selector = selector.filter('#leftArrow, #upArrow, #downArrow');
    }


    gridSize = puzzleEntity.RowTileCount * puzzleEntity.ColTileCount;
    // Limite bas
    if (puzzleEntity.EmptyPositionRandom >=  (gridSize - puzzleEntity.RowTileCount)) {
        selector = selector.filter('#rightArrow, #leftArrow, #downArrow');
    }
   
    // Limite haut 
    if (puzzleEntity.EmptyPositionRandom < puzzleEntity.RowTileCount) {
        selector = selector.filter('#rightArrow, #leftArrow, #upArrow');
    }

    // Afficher/cacher les flèches
    selector.fadeIn(150);
};

PUZZLE.logic.Collapse = function (event) {
    "use strict";
    var puzzleEntity, tiles, positions, tile, selector, deltaX, concat, arrow, xPosition, yPosition, scope, tileRed, i, position, concatY, tileClassSelector;
    puzzleEntity = event.data.puzzleEntity;
    tiles = puzzleEntity.Tiles;
    positions = puzzleEntity.Positions;



    // Sélecteur pour les flèches
    arrow = $('#rightArrow, #leftArrow, #upArrow, #downArrow');


    scope = puzzleEntity;


    // On fait disparaître les flèches
    arrow.fadeOut(250);

    for (i = 0; i <= tiles.length; i += 1) {
        position = positions[i];

        tileRed = $("#TILE_" + position);
        tileRed.removeClass("redTile");

        if (i !== position) {
            tileRed.addClass("redTile");
        }

        // Tous les "tiles" sauf l'emplacement vide
        if (position !== -1) {
            tile = tiles[position];

            // Sélecteur pour le "tile"
            selector = $("#TILE_" + position);

            // Calculer les position des "tiles"
            xPosition = parseInt(i % scope.RowTileCount, 10);
            yPosition = parseInt(i / scope.RowTileCount, 10);

            concat =   parseInt(xPosition * scope.TileWidth, 10) + "px";
            concatY =  parseInt(yPosition * scope.TileHeight, 10) + "px";

            selector.animate({ left:  concat, top: concatY }, 750);
        }
    }

    // On sélectionne tous les "tiles"
    tileClassSelector = $(".tile");
    // On enlève les styles pour faciliter le visionnement
    tileClassSelector.removeClass("shadow", 750);
};

PUZZLE.logic.Expand = function (event) {
    "use strict";
    var puzzleEntity, tiles, positions, tile, selector, deltaX, concat, arrow, xPosition, yPosition, i, position, tileRed, concatY, tileClassSelector, cbShowHideArrow;
    puzzleEntity = event.data.puzzleEntity;
    tiles = puzzleEntity.Tiles;
    positions = puzzleEntity.Positions;

    // Sélecteur pour les flèches
    arrow = $('#rightArrow, #leftArrow, #upArrow, #downArrow');

    cbShowHideArrow = function showHideArrow() {
        // On fait apparaître les flèches
        //arrow.fadeIn(250);
        PUZZLE.logic.ShowHideArrow(puzzleEntity, arrow);
    };


    for (i = 0; i <= tiles.length; i += 1) {
        position = positions[i];

        tileRed = $("#TILE_" + position);
        tileRed.removeClass("redTile");

        // Tous les "tiles" sauf l'emplacement vide
        if (position !== -1) {
            tile = tiles[position];

            // Sélecteur pour le "tile"
            selector = $("#TILE_" + position);

            // Calculer les position des "tiles"
            xPosition = parseInt(i % puzzleEntity.RowTileCount, 10);
            yPosition = parseInt(i / puzzleEntity.RowTileCount, 10);

            concat =   parseInt(xPosition * puzzleEntity.TileWidth + puzzleEntity.Gap * xPosition, 10) + "px";
            concatY =  parseInt(yPosition * puzzleEntity.TileHeight + puzzleEntity.Gap * yPosition, 10) + "px";

            selector.animate({ left:  concat, top: concatY }, 750, cbShowHideArrow);
        }
    }

    // On sélectionne tous les "tiles"
    tileClassSelector = $("[id*=TILE_], .transparentTile");

    // On enlève les styles pour faciliter le visionnement
    //tileClassSelector.addClass("tile", 750);
    tileClassSelector.addClass("shadow", 250);
};


PUZZLE.logic.BindArrowClick = function (puzzleEntity) {
    "use strict";
    $("#rightArrow").bind('click', {puzzleEntity: puzzleEntity}, PUZZLE.logic.ClicDroit);
    $("#leftArrow").bind('click', {puzzleEntity: puzzleEntity}, PUZZLE.logic.ClicGauche);
    $("#upArrow").bind('click', {puzzleEntity: puzzleEntity}, PUZZLE.logic.ClicUp);
    $("#downArrow").bind('click', {puzzleEntity: puzzleEntity}, PUZZLE.logic.ClicDown);
    $("#hideErrorsBtn").bind('click', {puzzleEntity: puzzleEntity}, PUZZLE.logic.Expand);
    $("#showErrorsBtn").bind('click', {puzzleEntity: puzzleEntity}, PUZZLE.logic.Collapse);
};

PUZZLE.logic.RightArrowVisible = function (position, puzzleEntity) {
    "use strict";
    var result;
	if (position === (puzzleEntity.Positions[puzzleEntity.EmptyPositionRandom - 1])) {
		result = true;
	} else {
	    result = false;
	}
    return result;
};

PUZZLE.logic.LeftArrowVisible = function (position, puzzleEntity) {
    "use strict";
    var result;
	if (position === (puzzleEntity.Positions[puzzleEntity.EmptyPositionRandom + 1])) {
		result = true;
	} else {
		result =  false;
	}
    return result;
};

PUZZLE.logic.DownArrowVisible = function (position, puzzleEntity) {
    "use strict";
    var result;
	if (position === (puzzleEntity.Positions[puzzleEntity.EmptyPositionRandom - puzzleEntity.RowTileCount])) {
		result =  true;
	} else {
		result =  false;
	}
    return result;
};

PUZZLE.logic.UpArrowVisible = function (position, puzzleEntity) {
    "use strict";
    var result;
    // devrait etre 5 au lieu de 9
	if (position === (puzzleEntity.Positions[puzzleEntity.EmptyPositionRandom + puzzleEntity.RowTileCount])) {
		result = true;
	} else {
		result =  false;
	}
    return result;
};

PUZZLE.logic.PositionX = function (tile, model) {
    "use strict";
    return (tile.FrontPositionX * model.TileWidth + model.Gap * tile.FrontPositionX);
};

PUZZLE.logic.PositionXStyle = function (tile, model) {
    "use strict";
    return (this.PositionX(tile, model) + "px");
};

PUZZLE.logic.PositionY = function (tile, model) {
    "use strict";
    return (tile.FrontPositionY * model.TileHeight + model.Gap * tile.FrontPositionY);
};

PUZZLE.logic.PositionYStyle = function (tile, model) {
    "use strict";
    return (this.PositionY(tile, model) + "px");
};

PUZZLE.logic.IdName = function (position, model) {
    "use strict";
	return ("TILE_" + position);
};

PUZZLE.logic.TileSizeStyleX = function (model) {
    "use strict";
	return (model.TileWidth + "px");
};

PUZZLE.logic.TileSizeStyleY = function (model) {
    "use strict";
	return (model.TileHeight + "px");
};

PUZZLE.logic.BackGroundPos = function (tile, model) {
    "use strict";
    return (((tile.BackPositionX * model.TileWidth) * -1) + "px" + " " + (tile.BackPositionY * model.TileHeight * -1) + "px");
};

PUZZLE.logic.InitPuzzle = function (width, height, tileDivider, gap, rootId) {
    "use strict";
    var tileWidth, tileHeight, xTilesCount, yTilesCount, randomPosition, tileArray, puzzleEntity, randomList, dom, root, arrow, result;
    tileWidth = PUZZLE.logic.GetTileWidth(width, tileDivider);
    tileHeight = PUZZLE.logic.GetTileHeight(height, tileDivider);
    xTilesCount = PUZZLE.logic.GetXTilesCount(width, tileWidth);
    yTilesCount = PUZZLE.logic.GetYTilesCount(height, tileHeight);

    randomPosition = parseInt(xTilesCount / 2, 10) + parseInt((yTilesCount / 2) * xTilesCount, 10);

    tileArray = PUZZLE.logic.GetTileArrays(xTilesCount, yTilesCount, randomPosition);

    puzzleEntity = PUZZLE.PuzzleEntity(tileWidth,
                    tileHeight,
                    tileArray.PointerArray,
                    xTilesCount,
                    yTilesCount,
                    tileArray.PositionArray,
                    randomPosition,
                    gap);

    
    randomList = PUZZLE.logic.GetRandomList(20);

    PUZZLE.logic.Randomize(puzzleEntity, randomList);

    dom = PUZZLE.logic.DomCreation(width, height, puzzleEntity);

    // Append puzzle to the DOM
    root = document.getElementById(rootId);

    if (root !== undefined) {
        root.appendChild(dom);
        arrow = $('#rightArrow, #leftArrow, #upArrow, #downArrow');

        PUZZLE.logic.ShowHideArrow(puzzleEntity, arrow);
        PUZZLE.logic.BindArrowClick(puzzleEntity);
        result = puzzleEntity;
    } else {
        result = null;
    }
    return result;
};
