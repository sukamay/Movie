// author: May
// create-date: 4.20.2019
// to implement a fifteen puzzle
/* jshint esversion: 6 */
/* jslint globalstrict: true */
/* jslint node: true */
/* eslint-disable no-implicit-globals */

(function () {
    "use strict";

    /**
     * onload: initial puzzle and add event listener
     */
    window.onload = function () {
        let puzzle = document.getElementById("puzzlearea");
        for (let i = 0; i < 16; i++) {
            let node = document.createElement("div");
            node.className = "tile";
            let a = (i % 4) * (-100);
            let b = parseInt(i / 4) * (-100);
            node.id = "tile_" + parseInt(i / 4) + "_" + (i % 4);
            node.style.backgroundPosition = a + "px " + b + "px";
            node.textContent = (i + 1).toString();
            node.addEventListener('click', move, false);
            puzzle.appendChild(node);
        }
        document.getElementById("tile_3_3").className = "tile corner";
        document.getElementById("tile_2_3").className = "tile next";
        document.getElementById("tile_3_2").className = "tile next";
        document.getElementById("shufflebutton").onclick = shuffle;

        let body = document.querySelectorAll('body');
        let h = document.querySelectorAll('h1');
        let win = document.createElement("div");
        win.id = "win";
        win.textContent = "You win!";
        body[0].insertBefore(win, h[0]);
    };

    /**
     * when the function is called , the puzzle tiles are rearranged into a random ordering
     * so that the user has a challenging puzzle to solve.
     */
    function shuffle() {
        console.time('shuffle time');
        let puzzle = [[0, 1, 2, 3], [4, 5, 6, 7], [8, 9, 10, 11], [12, 13, 14, 15]];
        let cx = 3, cy = 3;
        let times = 1000;
        let neighbor = [];
        let count = 0;
        for (let j = 0; j < times; j++) {
            count = 0;
            if (cx > 0) {
                neighbor[count++] = [cx - 1, cy];
            }
            if (cx < 3) {
                neighbor[count++] = [cx + 1, cy];
            }
            if (cy > 0) {
                neighbor[count++] = [cx, cy - 1];
            }
            if (cy < 3) {
                neighbor[count++] = [cx, cy + 1];
            }
            let ind = parseInt(Math.random() * count);
            let temp = puzzle[neighbor[ind][0]][neighbor[ind][1]];
            puzzle[neighbor[ind][0]][neighbor[ind][1]] = puzzle[cx][cy];
            puzzle[cx][cy] = temp;
            [cx, cy] = neighbor[ind];
        }
        count = 0;
        if (cx > 0) {
            neighbor[count++] = puzzle[cx - 1][cy];
        }
        if (cx < 3) {
            neighbor[count++] = puzzle[cx + 1][cy];
        }
        if (cy > 0) {
            neighbor[count++] = puzzle[cx][cy - 1];
        }
        if (cy < 3) {
            neighbor[count] = puzzle[cx][cy + 1];
        }
        let tiles = document.querySelectorAll('.tile');
        tiles.forEach(function (val, ind) {
            let order = puzzle[ind % 4][parseInt(ind / 4)];
            val.textContent = (order + 1).toString();
            if (neighbor.indexOf(order) > -1) {
                val.className = "tile next";
            } else if (order === 15) {
                val.className = "tile corner";
            } else {
                val.className = "tile";
            }
            val.style.backgroundPosition = (order % 4) * (-100) + "px " +
                parseInt(order / 4) * (-100) + "px";
        });
        console.timeEnd('shuffle time');
    }

    /**
     * check if the puzzle is solved right now.
     * @returns {boolean} if the puzzle is solved.
     */
    window.checkWin = function () {
        let tiles = document.querySelectorAll('.tile');
        for (let i = 0; i < 16; i++) {
            let pos = tiles[i].id.split('_');
            if (parseInt(pos[1]) * 4 + parseInt(pos[2]) + 1 !== parseInt(tiles[i].textContent)) {
                return false;
            }
        }
        // alert("You win!");
        document.getElementById("win").style.display = "block";
        let delay = 2000;
        setTimeout(function () {
            document.getElementById("win").style.display = "none";
        }, delay);
        return true;
    };

    /**
     * judge the tile is movable, if movable, move it
     */
    function move() {
        let n;
        n = this.className.match(/next/g);
        if (n) {
            let c = document.querySelectorAll('.corner');
            let node = document.createElement("div");
            node.className = this.className;
            node.textContent = this.textContent;
            node.style.backgroundPosition = window.getComputedStyle(this).backgroundPosition;
            node.id = c[0].id;
            c[0].id = this.id;
            node.addEventListener('click', move, false);
            document.getElementById("puzzlearea").insertBefore(node, c[0]);
            document.getElementById("puzzlearea").replaceChild(c[0], this);
            document.querySelectorAll('.next').forEach(
                function (value) {
                    console.log(value);
                    value.className = "tile";
                }
            );
            let pos = c[0].id.split('_');
            let x = parseInt(pos[1]), y = parseInt(pos[2]);
            setNext(x, y);
            window.checkWin();
        }
    }

    /**
     * helper function, get the element in given position in the puzzle
     * @param {number} x - row of the tile
     * @param {number} y - column of the tile.
     *@returns {Element} the element in given position
     */
    function setNext(x, y) {
        let name;
        if (x > 0) {
            name = "tile_" + (x - 1) + "_" + y;
            document.getElementById(name).className = "tile next";
        }
        if (x < 3) {
            name = "tile_" + (x + 1) + "_" + y;
            document.getElementById(name).className = "tile next";
        }
        if (y > 0) {
            name = "tile_" + x + "_" + (y - 1);
            document.getElementById(name).className = "tile next";
        }
        if (y < 3) {
            name = "tile_" + x + "_" + (y + 1);
            document.getElementById(name).className = "tile next";
        }
        return document.getElementById(name);
    }

})();
