var PUZZLE = PUZZLE || {};


    PUZZLE.TileCssEntity = function(left, 
                    top, 
                    width, 
                    height,
                    backgroundPosition,
                    classesName) {  
            return {
                Left: left,                          
                Top: top,   
                Width: width,                                       
                Height: height,                             
                BackgroundPosition: backgroundPosition,   
                ClassesName: classesName 
            };
    }       

