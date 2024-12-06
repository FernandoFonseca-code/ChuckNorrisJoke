"use strict";
window.onload = function () {
    let getJokeButton = document.getElementById("getJokeButton");
    getJokeButton.onclick = getJoke;
};
function getJoke() {
    let ChuckNorrisURL = "https://api.chucknorris.io/jokes/random";
    fetch(ChuckNorrisURL)
        .then(response => response.json())
        .then(jsonData => { console.log(jsonData); });
}
