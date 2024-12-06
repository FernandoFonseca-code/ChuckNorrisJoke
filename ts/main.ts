window.onload = function () {
    let getJokeButton = document.getElementById("getJokeButton") as HTMLButtonElement;
    getJokeButton.onclick = getJoke;
}

function getJoke() {
    let ChuckNorrisURL ="https://api.chucknorris.io/jokes/random";

    fetch(ChuckNorrisURL)
        // Get the response object and return the json data
        .then(response => response.json())
        .then(jsonData => {console.log(jsonData);})
}

class ChuckNorrisJoke {
    id: string;
    value: string;
    categories: string[];

    constructor(jokeData:any) {
        this.id = jokeData.id;
        this.value = jokeData.value;
        this.categories = jokeData.categories;
    }

}

