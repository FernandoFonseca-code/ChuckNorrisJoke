window.onload = function () {
    createModal();
    let getJokeButton = document.getElementById("getJokeButton") as HTMLButtonElement;
    getJokeButton.onclick = getJoke;
}

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
    id: string;
    value: string;
   // categories: string[];

    constructor(jokeData:any) {
        this.id = jokeData.id;
        this.value = jokeData.value;
        //this.categories = jokeData.categories;
    }

    displayInModal(): void {
        const modal = document.querySelector(".modal") as HTMLElement;
        const modalContent = document.querySelector(".modal-content") as HTMLElement;
        if (modalContent) {
            modalContent.textContent = this.value;
        }
        if (modal) {
            modal.style.display = "block";
        }
    }
}

// Add modal HTML dynamically
function createModal(): void {
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
    /// This insertAdjacentHTML method is used to in the modalHTML at the end of the body element
    document.body.insertAdjacentHTML("beforeend", modalHTML);

    // Add modal close functionality
    let closeBtn = document.querySelector(".close");
    let modal = document.querySelector(".modal");
    if (closeBtn && modal) {
        closeBtn.addEventListener("click", () => {
            (modal as HTMLElement).style.display = "none";
        });
        window.addEventListener("click", (event) => {
            if (event.target === modal) {
                (modal as HTMLElement).style.display = "none";
            }
        });
    }
}