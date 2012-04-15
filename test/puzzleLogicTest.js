module("puzzleLogic");
test("X Tiles Count", function() {

    var width = 799;
    var tileWidth = PUZZLE.logic.GetTileWidth(width, 4);
    var xTilesCount = PUZZLE.logic.GetXTilesCount(width, tileWidth);
    equal(xTilesCount,  
        4,  
        'Expected 4 as the result, result was: ' + xTilesCount);

});


test("Y Tiles Count", function() {

    var height = 570;
    var tileHeight = PUZZLE.logic.GetTileHeight(height, 4);
    var yTilesCount = PUZZLE.logic.GetYTilesCount(height, tileHeight);
    equal(yTilesCount,  
        4,  
        'Expected 4 as the result, result was: ' + yTilesCount);

});

test("Tile Array", function() {

    
    //    0   1   2   3
    //    4   5   6   7
    //    8   9  -1  10
    //    11  12  13  14
    var tileArray = PUZZLE.logic.GetTileArrays(4, 4, 10);

    var positionArray = tileArray.PositionArray;
    var pointerArray  = tileArray.PointerArray;

    for(var i = 0; i < 16; i++)
    {

        if( i < 10)
        {
            equal(i,
                positionArray[i],  
                'Expected ' + (i) + ' as the result, result was: ' + positionArray[i]);
        }
        else if( i > 10)
        {
            equal(i,
                positionArray[i],  
                'Expected ' + (i) + ' as the result, result was: ' + positionArray[i]);
        }
        //else if( i > 10)
        //{

        //    equal(i-1,
        //        positionArray[i],  
        //        'Expected ' + (i-1) + ' as the result, result was: ' + positionArray[i]);
        //}
        else
        {
            equal(-1,
                positionArray[i],  
                'Expected -1 as the result, result was: ' + positionArray[i]);
        }
    }

    // Results expected:    0, 1, 2, 3
    //                      0, 1, 2, 3
    //                      0, 1,    3
    //                      0, 1, 2, 3
    for(i = 0; i < 16; i++)
    {
            //if(i < 10)
            //{
                equal(i % 4,
                    pointerArray[i].BackPositionX,  
                    'Tiles Array: Expected ' + ( i % 4 ) + 
                    ' as the result, result was: ' + pointerArray[i].BackPositionX);
            //}
            //else
            //{

            //    equal((i+1) % 4,
            //        pointerArray[i].BackPositionX,  
            //        'Expected ' + ( (i+1) % 4 ) + ' as the result, result was: ' + pointerArray[i].BackPositionX);
            //}
    }


});


test("Move left", function() {

    //    0   1   2   3
    //    4   5   6   7
    //    8   9  -1  11
    //    12  13  14  15

    var width = 799;
    var height = 570;
    var tileDivider = 4;
    var gap = 9;

    //var puzzleEntity = PUZZLE.logic.InitPuzzle(799, 570, 4, 9);
    //var positions = puzzleEntity.Positions;
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
    var positions = puzzleEntity.Positions;


    equal(9,
        positions[9],
        'Initial position: Expected 9 as the result, result was: ' + positions[9]);

    equal(-1,
        positions[10],
        'Initial position: Expected -1 as the result, result was: ' + positions[10]);

    // Go left
    var posNext = PUZZLE.logic.GoLeft(puzzleEntity);

    //    0   1   2   3
    //    4   5   6   7
    //    8   9   11  -1 
    //    12  13  14  15
    
  
    equal(11,
        positions[10],
        'Second position: Expected 11 as the result, result was: ' + positions[10]);

    equal(-1,
        positions[11],
        'Second position: Expected -1 as the result, result was: ' + positions[11]);
});



test("Test Randomize", function() {

    // 1
        //    0   1   2   3
        //    4   5   6   7
        //    8   9  -1  11
        //    12  13  14  15

    // 2
        //    0   1   2   3
        //    4   5   6   7
        //    8   -1  9   11
        //    12  13  14  15

    // 3
        //    0   1   2   3
        //    4   5   6   7
        //    -1  8   9   11
        //    12  13  14  15

    var width = 799;
    var height = 570;
    var tileDivider = 4;
    var gap = 9;

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
    var positions = puzzleEntity.Positions;
    var tiles = puzzleEntity.Tiles;

    equal(8,
        positions[8],
        'Expected 8 as the result, result was: ' + positions[8]);

    equal(9,
        positions[9],
        'Expected 9 as the result, result was: ' + positions[9]);

    var randomList = [];
    // Empty space go left two times
    randomList.push(2);
    randomList.push(2);

    equal(2,
        tiles[10].FrontPositionX,
        '[LEFT TEST] Initial FrontPositionX: Expected 2 as the result, result was: ' + tiles[10].FrontPositionX);
    equal(0,
        tiles[8].FrontPositionX,
        '[LEFT TEST] Initial FrontPositionX: Expected 0 as the result, result was: ' + tiles[8].FrontPositionX);

    PUZZLE.logic.Randomize(puzzleEntity, randomList);

    //    0   1   2   3
    //    4   5   6   7
    //    -1  8   9   11
    //    12  13  14  15
    equal(-1,
        positions[8],
        '[LEFT TEST] Expected -1 as the result, result was: ' + positions[8]);

    equal(8,
        positions[9],
        '[LEFT TEST] Expected 8 as the result, result was: ' + positions[9]);

    equal(0,
        tiles[10].FrontPositionX,
        '[LEFT TEST] FrontPositionX: Expected 0 as the result, result was: ' + tiles[10].FrontPositionX);
    equal(1,
        tiles[8].FrontPositionX,
        '[LEFT TEST] FrontPositionX: Expected 1 as the result, result was: ' + tiles[8].FrontPositionX);

    var rightList = [1, 1];
    PUZZLE.logic.Randomize(puzzleEntity, rightList);


    // Check if we have the initial table LEFT-LEFT-RIGHT-RIGHT 
    // should be equals to the initial position:
    // 1
        //    0   1   2   3
        //    4   5   6   7
        //    8   9  -1  11
        //    12  13  14  15
    equal(8,
        positions[8],
        '[RIGHT TEST] Expected 8 as the result, result was: ' + positions[8]);
    equal(9,
        positions[9],
        '[RIGHT TEST] Expected 9 as the result, result was: ' + positions[9]);

    equal(2,
        tiles[10].FrontPositionX,
        '[RIGHT TEST] Initial FrontPositionX: Expected 2 as the result, result was: ' + tiles[10].FrontPositionX);
    equal(0,
        tiles[8].FrontPositionX,
        '[RIGHT TEST] Initial FrontPositionX: Expected 0 as the result, result was: ' + tiles[8].FrontPositionX);

    var upList = [3,3];
    PUZZLE.logic.Randomize(puzzleEntity, upList);

    // 1
        //    0   1   2   3
        //    4   5   6   7
        //    8   9  -1  11
        //    12  13  14  15

    // 2
        //    0   1   2   3
        //    4   5  -1   7
        //    8   9   6   11
        //    12  13  14  15

    // 3
        //    0   1  -1   3
        //    4   5   2   7
        //    8   9   6   11
        //    12  13  14  15
    equal(-1,
        positions[2],
        '[UP TEST] Expected -1 as the result, result was: ' + positions[2]);
    equal(2,
        positions[6],
        '[UP TEST] Expected 2 as the result, result was: ' + positions[6]);

    equal(0,
        tiles[10].FrontPositionY,
        '[UP TEST] FrontPositionY: Expected 0 as the result, result was: ' + tiles[10].FrontPositionY);
    equal(1,
        tiles[2].FrontPositionY,
        '[UP TEST] FrontPositionY: Expected 1 as the result, result was: ' + tiles[2].FrontPositionY);

    // Check if we have the initial table UP-UP-DOWN-DOWN 
    // should be equals to the initial position:
    // 1
        //    0   1   2   3
        //    4   5   6   7
        //    8   9  -1  11
        //    12  13  14  15
    var downList = [4, 4];
    PUZZLE.logic.Randomize(puzzleEntity, downList);

    equal(6,
        positions[6],
        '[DOWN TEST] Expected 6 as the result, result was: ' + positions[6]);
    equal(-1,
        positions[10],
        '[DOWN TEST] Expected -1 as the result, result was: ' + positions[10]);

    equal(0,
        tiles[2].FrontPositionY,
        '[DOWN TEST] FrontPositionY: Expected 0 as the result, result was: ' + tiles[2].FrontPositionY);
    equal(2,
        tiles[10].FrontPositionY,
        '[DOWN TEST] FrontPositionY: Expected 2 as the result, result was: ' + tiles[10].FrontPositionY);


    // Test limit right
    var rightLimitList = [1, 1];
    PUZZLE.logic.Randomize(puzzleEntity, rightLimitList);
    equal(3,
        tiles[10].FrontPositionX,
        '[LIMIT RIGHT TEST] FrontPositionX: Expected 3 as the result, result was: ' + tiles[10].FrontPositionX);

    // Test limit down
    var downLimitList = [4, 4];
    PUZZLE.logic.Randomize(puzzleEntity, downLimitList);
    equal(3,
        tiles[10].FrontPositionY,
        '[LIMIT DOWN TEST] FrontPositionY: Expected 3 as the result, result was: ' + tiles[10].FrontPositionY);

    // Test limit left 
    var leftLimitList = [2, 2, 2, 2];
    PUZZLE.logic.Randomize(puzzleEntity, leftLimitList);
    equal(0,
        tiles[10].FrontPositionX,
        '[LIMIT LEFT TEST] FrontPositionX: Expected 0 as the result, result was: ' + tiles[10].FrontPositionX);

    // Test limit up 
    var upLimitList = [3, 3, 3, 3];
    PUZZLE.logic.Randomize(puzzleEntity, upLimitList);
    equal(0,
        tiles[10].FrontPositionY,
        '[LIMIT UP TEST] FrontPositionY: Expected 0 as the result, result was: ' + tiles[10].FrontPositionY);

    equal(-1,
        positions[0],
        'Expected -1 as the result, result was: ' + positions[0]);


});

test("Model properties", function() {

    var width = 799;
    var height = 570;
    var puzzleEntity = PUZZLE.logic.InitPuzzle(width, height, 4, 9, "puzzle"); 

    equal(9,
        puzzleEntity.Gap,
        'Expected 9 as the result, result was: ' + puzzleEntity.Gap);

});


test("DOM creation", function() {

    var width = 799;
    var height = 570;
    var tileDivider = 4;
    var gap = 9;

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
    var positions = puzzleEntity.Positions;
    var tiles = puzzleEntity.Tiles;
    //var puzzleEntity = PUZZLE.logic.InitPuzzle(width, height, 4, 9);

    var tilesLength = puzzleEntity.Tiles.length;

    ok(tilesLength != 0, "Tiles length != 0");


    var dom = PUZZLE.logic.DomCreation(width, height, puzzleEntity);

    equal("position",
        dom.children[0].className,
        'Expected "position" as the result, result was: ' + dom.children[0].className);

    equal("TILE_0",
        dom.children[0].children[0].id,
        'Expected "TILE_0" as the result, result was: ' + dom.children[0].children[0].id);
    equal("TILE_1",
        dom.children[0].children[1].id,
        'Expected "TILE_1" as the result, result was: ' + dom.children[0].children[1].id);
    equal("TILE_2",
        dom.children[0].children[2].id,
        'Expected "TILE_2" as the result, result was: ' + dom.children[0].children[2].id);

    var children = dom.children[0];

    
    // 0 --> TILE_0
    // 1 --> TILE_1
    // 2 --> TILE_2
    // 3 --> TILE_3
    // 4 --> TILE_4
    // 5 --> TILE_5
    // 6 --> TILE_6
    // 7 --> DOWN_ARROW
    // 8 --> TILE_7
    // 9 --> TILE_8
    // 10 -> TILE_9
    // 11 -> RIGHT_ARROW
    // 12 -> TILE_11
    // 13 -> LEFT_ARROW
    // 14 -> TILE_12
    // 15 -> TILE_13
    // 16 -> TILE_14
    // 17 -> UP_ARROW
    // 18 -> TILE_15
    //////////////////

    // 0 --> 0
    // 1 --> 1
    // 2 --> 2
    // 3 --> 3
    // 4 --> 4
    // 5 --> 5
    // 6 --> 6
    // 7 --> 7
    // 8 --> 8
    // 9 --> 9
    // 10 -> -1
    // 11 -> 11
    // 12 -> 12
    // 13 -> 13
    // 14 -> 14
    // 15 -> 15
    
    var leftList = [1];
    PUZZLE.logic.Randomize(puzzleEntity, leftList);

    dom = PUZZLE.logic.DomCreation(width, height, puzzleEntity);
    children = dom.children[0];

    // 4 arrows - 1
    ok(tilesLength == dom.children[0].children.length - 3, "Tiles length == DOM tiles length");
});


test("Tile css entity", function() {

    var width = 799;
    var height = 570;
    var puzzleEntity = PUZZLE.logic.InitPuzzle(width, height, 4, 9, "puzzle");

    ok(puzzleEntity.Tiles.length != 0, "Tiles length != 0");
    var aTile = puzzleEntity.Tiles[0];

    var tileCssEntity = PUZZLE.logic.GetTileCssEntity(aTile, puzzleEntity, "transparent tile");

    ok(tileCssEntity.Left != undefined, "tileCssEntity.Left != undefined");
    ok(tileCssEntity.Top != undefined, "tileCssEntity.Top != undefined");
    ok(tileCssEntity.Width != undefined, "tileCssEntity.Width != undefined");
    ok(tileCssEntity.Height != undefined, "tileCssEntity.Height != undefined");
    ok(tileCssEntity.BackgroundPosition != undefined, "tileCssEntity.BackgroundPosition != undefined");
    ok(tileCssEntity.ClassesName != undefined, "tileCssEntity.ClassesName != undefined");
});
