/**
 * FILE NAME: tile-game.js
 * WRITTEN BY: Alina Zheng 
 * DATE: 3/15/20
 * PURPOSE: CS204 assignment 5
 */

// 2D array representation of the current occupant of each grid square
var grid = [['a', 'b', 'c'],
            ['d', 'e', 'f'],
            ['g', 'h', 'blank']]; 

// global variables that keep track of the position of the blank tile
var blank_row = 2; 
var blank_col = 2; 

// global variables that keep track of the total number of rows and columns
var num_row = 3; 
var num_col = 3; 

// global variables that keep track of the tile to switch the blank with
var tile_row; 
var tile_col; 

//global array of the four directions 
var directions = [right, left, up, down]; 

/**
 * Takes an array, returns a random element
 * @param {array} array the array to find a random element of
 * @return the random element of the array
 */
function randomElt(array) {
    var random_index = Math.floor(array.length * Math.random());
    return array[random_index];
}


/**
 * Gets the tile to the right of the blank
 * @return the tile to the right of the blank
 */
function getBelowTile() {
    if (blank_row + 1 < num_row) {
        tile_row = blank_row + 1; 
        tile_col = blank_col; 
        return grid[tile_row][tile_col]; 
    }
}


/**
 * Gets the tile above the blank
 * @return the tile above the blank
*/
function getRightTile() {
    if (blank_col + 1 < num_col) {
        tile_row = blank_row; 
        tile_col = blank_col + 1; 
        return grid[tile_row][tile_col]; 
    }
}

/**
 * Gets the tile below the blank
 * @return the tile below the blank
 */
function getLeftTile() {
    if (blank_col - 1 >= 0) {
        tile_row = blank_row; 
        tile_col = blank_col - 1; 
        return grid[tile_row][tile_col]; 
    }
}

/**
 * Gets the tile to the left of the blank
 * @return the tile to the left of the blank
*/
function getAboveTile() {
    if (blank_row - 1 >= 0) {
        tile_row = blank_row - 1; 
        tile_col = blank_col; 
        return grid[tile_row][tile_col]; 
    }
}

/**
 * Switches the tile positions with the blank positions, updates the grid
 * @param {String} dir the direction 
 */
function switchTile(dir) {
    var tile = grid[tile_row][tile_col];
    var blank = grid[blank_row][blank_col]; 
    if (dir == up || dir == down) {
        temp = blank_row; 
        blank_row = tile_row; 
        tile_row =temp; 
    }
    else {
        temp = blank_col; 
        blank_col = tile_col; 
        tile_col = temp; 
    }
    grid[tile_row][tile_col] = tile; 
    grid[blank_row][blank_col] = blank;
    console.log(grid);  
}

/**
 * Takes a direction and determines the tle to slide
 * Slides the tile one space in the designated direction
 * Swtiches the blank tile and the moved tile in the grid 2D array
 * @param {String} dir the direction 
 */
function doMove(dir) {
    var temp; 
    var tile_id; 
    if (dir == right && getLeftTile() != null) {
        tile_id = "#" + getLeftTile(); 
        $(tile_id).animate({ left: "+=200px" }, 1000); 
        switchTile(right); 
    }
    else if (dir == left && getRightTile() != null) {
        tile_id = "#" + getRightTile(); 
        $(tile_id).animate({ left: "-=200px" }, 1000); 
        switchTile(left); 
    }
    else if (dir == up && getBelowTile() != null) {
        tile_id = "#" +  getBelowTile(); 
        $(tile_id).animate({ top: "-=200px" }, 1000); 
        switchTile(up); 
    }
    else if (dir == down && getAboveTile() != null) {
        tile_id = "#" + getAboveTile(); 
        $(tile_id).animate({ top: "+=200px" }, 1000);  
        switchTile(down); 
    }
}

//click handler functions for each of the direction buttons 
$("#up").click(function() {doMove(up)}); 
$("#down").click(function() {doMove(down)}); 
$("#left").click(function() {doMove(left)}); 
$("#right").click(function() {doMove(right)}); 

/**
 * Anonymous function, controls movements of tiles based on WASD keys
 */
$(document).keydown(function(e) {
    if (e.keyCode == 87) {
        doMove(up); 
    }
    else if (e.keyCode == 65) {
        doMove(left); 
    }
    else if (e.keyCode == 83) {
        doMove(down); 
    }
    else if (e.keyCode == 68) {
        doMove(right); 
    }
});

// click handler function for "scramble" button - WHY IS IT ACTING THIS WAY
$("#scrambleButton").click(function() {
    for (var i = 0; i < 30; i++) {
        var dir = randomElt(directions); 
        doMove(dir); 
    }
}); 
