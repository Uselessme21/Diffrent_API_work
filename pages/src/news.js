const url = 'https://newsdata.io/api/1/news?apikey=pub_272507cb7948e32211c26c08e2896c71130b7';

// on window load fetchNews will be caalled and data will be fetched and rendered
window.addEventListener("load", () => fetchNews("India"));

// to reload the page on search or on click
function reload() {
    window.location.reload();
}


// to fetch the news with query parameters
async function fetchNews(query) {
    try {
        const response = await fetch(url+'&q='+query);
        const result = await response.json();
        console.log(result.results);
        const data=result.results
        console.log(data);
        bindData(data);
    } catch (error) {
        console.error(error);
    }
   
}


// APPENDING the data to html page
function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";

    articles.forEach((article) => {
        // returning the news if there is no image
        // if (!article.image_url
        //     ) return;
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

    newsImg.src = article.image_url?article.image_url:'./assets/logo.png'   ;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    // getting date and converting it into string according to time zone
    const date = new Date(article.pubDate
        ).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });

    // 
    newsSource.innerHTML = `${article.source_id
    } · ${date}`;
// when card is clicked it will send you to the original article source page
  
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