"use strict";
window.onload = function () {
    createModal();
    let getJokeButton = document.getElementById("getJokeButton");
    getJokeButton.onclick = getJoke;
};
function getJoke() {
    let ChuckNorrisURL = "https://api.chucknorris.io/jokes/random";
    fetch(ChuckNorrisURL)
        .then(response => response.json())
        .then(jsonData => {
        let joke = new ChuckNorrisJoke(jsonData);
        joke.displayInModal();
    })
        .catch(error => console.error('Error:', error));
}
class ChuckNorrisJoke {
    constructor(jokeData) {
        this.id = jokeData.id;
        this.value = jokeData.value;
    }
    displayInModal() {
        const modal = document.querySelector(".modal");
        const modalContent = document.querySelector(".modal-content");
        if (modalContent) {
            modalContent.textContent = this.value;
        }
        if (modal) {
            modal.style.display = "block";
        }
    }
}
function createModal() {
    const modalHTML = `
        <div class="modal">
            <div class="modal-background">
                <div class="modal-image">
                    <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExMWV6NDRyOXI4b2Q5dmx4YTE4NzlwamFpcjU4ZTZ3aWdiYzl5YmdvNyZlcD12MV9naWZzX3NlYXJjaCZjdD1n/3hvmlYNsOTFWE/giphy.gif" alt="Chuck Norris" />
                <div class="modal-content">
                </div>
                <span class="close">&times;</span>
            </div>
        </div>`;
    document.body.insertAdjacentHTML("beforeend", modalHTML);
    let closeBtn = document.querySelector(".close");
    let modal = document.querySelector(".modal");
    if (closeBtn && modal) {
        closeBtn.addEventListener("click", () => {
            modal.style.display = "none";
        });
        window.addEventListener("click", (event) => {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        });
    }
}
