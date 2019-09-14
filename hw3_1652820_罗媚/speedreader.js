// author: May
// create-date: 4.14.2019
// to implement a speedreader fit to RSVP method
/* jshint esversion: 6 */
/* eslint-disable no-implicit-globals */
"use strict";

// Start up javascript code once the page has finished loading
window.onload = function () {
    document.getElementById("start").onclick = start;
    document.getElementById("stop").onclick = stop;
    document.getElementById("stop").disabled = true;
    document.getElementById("speed").onchange = changeSpeed;
    document.getElementById("medium").checked = true;
    document.getElementsByName("size").onclick = changeSize;
};

window.speed = 171;

/** Start animation of text, show a single word in each frame. */
function start() {
    // console.log("start");
    // console.log("speed when start",window.speed);
    document.getElementById("start").disabled = true;
    document.getElementById("stop").disabled = false;
    document.getElementById("text").disabled = true;
    let text = document.getElementById("text").value;
    // console.log(text);
    text = text.replace(/[()!?,.:;]+/g, "");
    window.words = text.split(/\s/g);
    window.i = 0;
    window.ind = 0;
    const end = window.words.length * 2;
    window.interval = setInterval(function show() {
        if (window.i < end) {
            if (window.i % 2 === 0) {
                document.getElementById("show").innerHTML = window.words[window.ind];
                window.ind++;
            }
            window.i++;
        } else {
            stop();
        }
    }, window.speed);
}

/** Stop animation when stop button is cilcked or all the words have been shown.*/
function stop() {
    document.getElementById("stop").disabled = true;
    document.getElementById("start").disabled = false;
    document.getElementById("show").innerHTML = "";
    document.getElementById("text").disabled = false;
    clearInterval(window.interval);
}

/** Change size of display word.*/
function changeSize() {
    // console.log("into change size function");
    let buttons = document.getElementsByName("size");
    let show = document.getElementById("show");
    for (let i = 0; i < buttons.length; i++) {
        let key = buttons[i];
        if (key.checked) {
            if (key.value === "medium") {
                show.style.fontSize = "36pt";
            } else if (key.value === "big") {
                show.style.fontSize = "48pt";
            } else {
                show.style.fontSize = "60pt";
            }
        } else {
            key.style.background = "lightgray";
        }
    }
}

/** Change the speed that the animation is playing.*/
function changeSpeed() {
    // console.log("into change speed function");
    let timewpm = ["200", "300", "350", "400", "450", "500"];
    let timems = [300, 200, 171, 150, 133, 120];
    let val = document.getElementById("speed").value;
    window.speed = timems[timewpm.indexOf(val)];
    // console.log("val",val,"  speed",speed);
}

