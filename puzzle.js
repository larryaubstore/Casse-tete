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

function viewModel(data) {


    this.EnableHover = function (parent, data) {

        var sel = $("#" + parent.IdName(data, parent));

        sel.removeClass("shadow");
        sel.addClass("enableHover");
    }

    this.DisableHover = function(parent, data) {
    
        var sel = $("#" + parent.IdName(data, parent));

        sel.removeClass("enableHover");
        sel.addClass("shadow");
    }

    this.EnableHoverRight = function(parent, data) {

        
        var sel = $("#" + parent.IdName(data, parent) + ", #rightArrow");
        // On ne démarre pas une animation
        // s'il y a une déjà en cours
        if(sel.filter(":animated").length === 0)
        {
            sel.animate({
         	    left: '+=' + parseInt(parent.TileWidth/3),
          	}, 500);
        }
    }


    this.DisableHoverRight = function(parent, data) {

        
        var sel = $("#" + parent.IdName(data, parent) + ", #rightArrow");
        if(sel.filter(":animated").length != 0)
        {
            sel.stop();
        }

        var diff = Math.abs(parent.PositionX(data, parent) 
            - sel.css("left").replace(/[^-\d\.]/g, ''));

       
        if(diff != 0)
        { 
            var timeAnimation = parseInt(500 
                / ((parent.TileWidth / 3) / diff));
            sel.animate({
                left: '-=' + diff,
            }, timeAnimation);
        }
    }

    this.ShowHideArrow = function(tile, selector)
    {
        // Limite droite
        if( (tile.EmptyPositionRandom % tile.RowTileCount) == (tile.RowTileCount - 1))
        {
            selector = selector.filter('#rightArrow, #upArrow, #downArrow');
        }

        // Limite gauche
        if( (tile.EmptyPositionRandom % tile.RowTileCount) == 0)
        {
            selector = selector.filter('#leftArrow, #upArrow, #downArrow');
        }


        var gridSize = tile.RowTileCount * tile.ColTileCount;
        // Limite bas
        if( tile.EmptyPositionRandom >=  (gridSize - tile.RowTileCount))
        {
            selector = selector.filter('#rightArrow, #leftArrow, #downArrow');
        }
       
        // Limite haut 
        if( tile.EmptyPositionRandom < tile.RowTileCount)
        {
            selector = selector.filter('#rightArrow, #leftArrow, #upArrow');
        }
    
        // Afficher/cacher les flèches
        //selector.fadeIn('fast');
        selector.fadeIn(150);
    }

    // Flag pour afficher le bouton "Show Error" 
    this.ShowError = ko.observable(true); 

	this.TileWidth = data.TileWidth;
    this.TileHeight = data.TileHeight;
	this.RowTileCount = data.RowTileCount;
	this.ColTileCount = data.ColTileCount;
	this.Positions = data.Positions;

    this.Tiles =  ko.observableArray(
		ko.utils.arrayMap(data.Tiles, function(tile) {
		return {
			BackPositionX: tile.BackPositionX,
			BackPositionY: tile.BackPositionY,
			Position:	ko.observable(tile.Position),
            FrontPositionX: tile.BackPositionX,
            FrontPositionY: tile.BackPositionY
		};
	}));

	this.Redraw = ko.observable(false);

    //this.Gap = 9;

    this.Gap = 9;

    this.ShowBorder = function()
    {

    }


    this.HideBorder = function()
    {

    }

    this.Collapse = function()
    {
        var tiles = this.Tiles();
        var positions = this.Positions;

        var tile;
        var selector;

        var deltaX;
        var concat;

        // Sélecteur pour les flèches
        var arrow = $('#rightArrow, #leftArrow, #upArrow, #downArrow');

        var xPosition;
        var yPosition;

        var scope = this;

        var tileRed;

        // On fait disparaître les flèches
        arrow.fadeOut(250);

        for(var i = 0; i <= tiles.length; i++)
        {
            position = positions[i];

            tileRed = $("#TILE_" + position);
            tileRed.removeClass("redTile");

            if(i < this.InitialPosition)
            {
                if(i != position)
                {
                    tileRed.addClass("redTile");
                }
            }
            else if(i > this.InitialPosition)
            {
                if(i != (position + 1))
                {
                    tileRed.addClass("redTile");
                }
            }
            else
            {
                if(position != -1)
                {
                    tileRed.addClass("redTile");
                }
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

        // Afficher/Cacher bouton
        this.ShowError(false);

    }

    this.Expand = function()
    {
        var tiles = this.Tiles();
        var positions = this.Positions;

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
                xPosition = parseInt(i % this.RowTileCount);
                yPosition = parseInt(i / this.RowTileCount);

                concat =   parseInt(xPosition*this.TileWidth + this.Gap*xPosition) + "px";
                concatY =  parseInt(yPosition*this.TileHeight + this.Gap*yPosition) + "px";

                selector.animate({ left:  concat, top: concatY }, 750, function() {
                    // On fait apparaître les flèches
                    arrow.fadeIn(250);
                });
            }
        }

        // On sélectionne tous les "tiles"
        var tileClassSelector = $("[id*=TILE_], .transparentTile");

        // On enlève les styles pour faciliter le visionnement
        tileClassSelector.addClass("shadow", 250);

        // Afficher/Cacher bouton
        this.ShowError(true);

    }
}


$(document).ready(function() {
	var width = 799;
	var height = 570;
    var tileDivider = 4;

    var puzzleEntity = PUZZLE.logic.InitPuzzle(width, 
                                               height, 
                                               tileDivider, 9, "puzzle");
});
