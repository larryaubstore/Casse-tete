var PUZZLE = PUZZLE || {};


    PUZZLE.PuzzleEntity = function(tileWidth, 
                    tileHeight, 
                    dataTiles, 
                    rowTileCount,
                    colTileCount,
                    positions,
                    initialPosition,
                    gap) {  
            return {
                TileWidth: tileWidth,                          
                TileHeight: tileHeight,   
                Tiles: dataTiles,                                       
                RowTileCount: rowTileCount,                             
                ColTileCount: colTileCount,   
                Positions: positions,
                InitialPosition: initialPosition,
                EmptyPositionRandom: initialPosition,
                Gap: gap
            };
    }       

