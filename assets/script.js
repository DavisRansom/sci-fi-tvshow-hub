var inputEl = document.querySelector('#input1');
var searchButton = document.querySelector('#showSearchButton');
var outputEl = document.querySelector('#resultsArea')

async function showSearch() {
    //grab the input from inputEl
    const searchTerm = inputEl.value;
    //use the value from the inputEl within an API call
    const url = `https://api.tvmaze.com/search/shows?q=${searchTerm}`;
    //extract the JSON from the response
    const response = await fetch(url);
    const json = await response.json();
    //filter out anything that is not Science-Fiction
    const sfShows = json.filter(show=>show.show.genres.includes("Science-Fiction"));
    //convert JSON into html - showing the data on the page
    appendShowInfo(sfShows);
}

function appendShowInfo (sfShows) {
    //take in an array
    var HTML = sfShows.length?"":"<p>No Science Fiction Results</p>";
    for (let {show} of sfShows){
        const name = show.name;
        const img = show.image.medium;
        const showSummary = show.summary;
        const showSite = show.officialSite;
        HTML += `
            <figure>
                <img src="${img}">
                <figcaption>
                    <h2>${name}</h2>
                    ${showSummary}
                    <a href="${showSite}">Visit Official Site</a>
                </figcaption>
            </figure>
        `;
    }
    outputEl.innerHTML=HTML;
} 

searchButton.addEventListener("click", showSearch);