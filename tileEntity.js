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

PUZZLE.TileEntity = function (backPositionX, backPositionY, position) {
    "use strict";
    return {
        BackPositionX: backPositionX,
	    BackPositionY: backPositionY,
	    Position: position,
        FrontPositionX: backPositionX,
        FrontPositionY: backPositionY
    };
};
