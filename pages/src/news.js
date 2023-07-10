const API_KEY = "d3e7f7974d4242908e6b7d3248e81ff5";
const url = "https://newsapi.org/v2/everything?q=";
// on window load fetchNews will be caalled and data will be fetched and rendered
window.addEventListener("load", () => fetchNews("India"));

// to reload the page on search or on click
function reload() {
    window.location.reload();
}


// to fetch the news with query parameters
async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);
}


// APPENDING the data to html page
function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";

    articles.forEach((article) => {
        // returning the news if there is no image
        if (!article.urlToImage) return;
        // clone the the node from template
        const cardClone = newsCardTemplate.content.cloneNode(true);
        // calling the  function to fill the property
        fillDataInCard(cardClone, article);
        // appending the new cards to cardscontainer
        cardsContainer.appendChild(cardClone);
    });
}


// function to fill the data in card 
function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector("#news-img");
    const newsTitle = cardClone.querySelector("#news-title");
    const newsSource = cardClone.querySelector("#news-source");
    const newsDesc = cardClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    // getting date and converting it into string according to time zone
    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });

    // 
    newsSource.innerHTML = `${article.source.name} · ${date}`;
// when card is clicked it will send you to the original article source page
    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}

let curSelectedNav = null;
function onNavItemClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = null;
});