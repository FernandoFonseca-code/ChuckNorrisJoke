window.onload = function () {
    createModal();
    let getJokeButton = document.getElementById("getRandomJokeButton") as HTMLButtonElement;
    getJokeButton.onclick = getJoke;

    let getCategoryJokeButton = document.getElementById("getCategoryJokeButton") as HTMLButtonElement;
    getCategoryJokeButton.onclick = getCategoryJoke;
}

class ChuckNorrisJoke {
    id: string;
    value: string;

    constructor(jokeData:any) {
        this.id = jokeData.id;
        this.value = jokeData.value;
    }
}

class JokeModal {
    private modal: HTMLElement | null;
    private modalContent: HTMLElement | null;

    constructor() {
        this.modal = document.querySelector(".modal");
        this.modalContent = document.querySelector(".modal-content");
    }

    display(joke: ChuckNorrisJoke): void {
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
        .then((joke: ChuckNorrisJoke) => {
            modal.display(joke);
        })
        .catch(error => console.error('Error:', error));
}

function getCategoryJoke(): void {
    let category = (document.getElementById("jokeCategories") as HTMLInputElement).value;
    let ChuckNorrisURL = `https://api.chucknorris.io/jokes/random?category=${category}`;
    let modal = new JokeModal();

    fetch(ChuckNorrisURL)
        .then(response => response.json())
        .then((joke: ChuckNorrisJoke) => {
            modal.display(joke);
        })
        .catch(error => console.error('Error:', error));
}

// Add modal HTML dynamically
function createModal(): void {
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
