"use strict";
window.onload = function () {
    createModal();
    let getJokeButton = document.getElementById("getRandomJokeButton");
    getJokeButton.onclick = getJoke;
    let getCategoryJokeButton = document.getElementById("getCategoryJokeButton");
    getCategoryJokeButton.onclick = getCategoryJoke;
};
class ChuckNorrisJoke {
    constructor(jokeData) {
        this.id = jokeData.id;
        this.value = jokeData.value;
    }
}
class JokeModal {
    constructor() {
        this.modal = document.querySelector(".modal");
        this.modalContent = document.querySelector(".modal-content");
    }
    display(joke) {
        if (this.modalContent) {
            this.modalContent.textContent = joke.value;
        }
        if (this.modal) {
            this.modal.style.display = "block";
        }
    }
}
function getJoke() {
    let ChuckNorrisURL = "https://api.chucknorris.io/jokes/random";
    let modal = new JokeModal();
    fetch(ChuckNorrisURL)
        .then(response => response.json())
        .then((joke) => {
        modal.display(joke);
    })
        .catch(error => console.error('Error:', error));
}
function getCategoryJoke() {
    let category = document.getElementById("jokeCategories").value;
    let ChuckNorrisURL = `https://api.chucknorris.io/jokes/random?category=${category}`;
    let modal = new JokeModal();
    fetch(ChuckNorrisURL)
        .then(response => response.json())
        .then((joke) => {
        modal.display(joke);
    })
        .catch(error => console.error('Error:', error));
}
function createModal() {
    let modalHTML = `
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
