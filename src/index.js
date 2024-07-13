// Variables
const generalBtn = document.getElementById("general");
const businessBtn = document.getElementById("business");
const sportsBtn = document.getElementById("sport");
const entertainmentBtn = document.getElementById("entertainment");
const technologyBtn = document.getElementById("technology");
const searchBtn = document.getElementById("searchBtn");

const newsQuery = document.getElementById("newsQuery");
const newsType = document.getElementById("newsType");
const newsdetails = document.getElementById("newsdetails");

// Array to hold news data
var newsDataArr = [];

// API key and endpoint
const API_KEY = "1d8f871544f94cf9bc6b9eff355319b8";
const HEADLINES_NEWS = "https://newsapi.org/v2/top-headlines?country=in&apiKey=";
const GENERAL_NEWS = "https://newsapi.org/v2/top-headlines?country=in&category=general&apiKey=";
const BUSINESS_NEWS = "https://newsapi.org/v2/top-headlines?country=in&category=business&apiKey=";
const SPORTS_NEWS = "https://newsapi.org/v2/top-headlines?country=in&category=sports&apiKey=";
const ENTERTAINMENT_NEWS = "https://newsapi.org/v2/top-headlines?country=in&category=entertainment&apiKey=";
const TECHNOLOGY_NEWS = "https://newsapi.org/v2/top-headlines?country=in&category=technology&pageSize=8&apiKey=";
const SEARCH_NEWS = "https://newsapi.org/v2/everything?q=";

// On window load, fetch and display headlines
window.onload = function() {
    newsType.innerHTML = "<h4>Headlines</h4>";
    fetchHeadlines();
};

// Event listeners for category buttons
generalBtn.addEventListener("click", function() {
    newsType.innerHTML = "<h4>General news</h4>";
    speak("General news");
    fetchGeneralNews();
});

businessBtn.addEventListener("click", function() {
    newsType.innerHTML = "<h4>Business</h4>";
    speak("Business news");
    fetchBusinessNews();
});

sportsBtn.addEventListener("click", function() {
    newsType.innerHTML = "<h4>Sports</h4>";
    speak("Sports news");
    fetchSportsNews();
});

entertainmentBtn.addEventListener("click", function() {
    newsType.innerHTML = "<h4>Entertainment</h4>";
    speak("Entertainment news");
    fetchEntertainmentNews();
});

technologyBtn.addEventListener("click", function() {
    newsType.innerHTML = "<h4>Technology</h4>";
    speak("Technology news");
    fetchTechnologyNews();
});

searchBtn.addEventListener("click", function() {
    newsType.innerHTML = "<h4>Search: " + newsQuery.value + "</h4>";
    speak("Search results for " + newsQuery.value);
    fetchQueryNews();
});

// Function to fetch headlines
const fetchHeadlines = async () => {
    try {
        const response = await fetch(HEADLINES_NEWS + API_KEY);
        if (response.ok) {
            const myJson = await response.json();
            newsDataArr = myJson.articles;
            displayNews();
        } else {
            console.error(`Error: ${response.status} ${response.statusText}`);
            newsdetails.innerHTML = "<h5>No data found.</h5>";
        }
    } catch (error) {
        console.error('Fetch error:', error);
        newsdetails.innerHTML = "<h5>No data found.</h5>";
    }
}


// Function to fetch general news
const fetchGeneralNews = async () => {
    const response = await fetch(GENERAL_NEWS + API_KEY);
    newsDataArr = [];
    if (response.status >= 200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        console.log(response.status, response.statusText);
        newsdetails.innerHTML = "<h5>No data found.</h5>"
        return;
    }
    displayNews();
}

// Function to fetch business news
const fetchBusinessNews = async () => {
    const response = await fetch(BUSINESS_NEWS + API_KEY);
    newsDataArr = [];
    if (response.status >= 200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        console.log(response.status, response.statusText);
        newsdetails.innerHTML = "<h5>No data found.</h5>"
        return;
    }
    displayNews();
}

// Function to fetch entertainment news
const fetchEntertainmentNews = async () => {
    const response = await fetch(ENTERTAINMENT_NEWS + API_KEY);
    newsDataArr = [];
    if (response.status >= 200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        console.log(response.status, response.statusText);
        newsdetails.innerHTML = "<h5>No data found.</h5>"
        return;
    }
    displayNews();
}

// Function to fetch sports news
const fetchSportsNews = async () => {
    const response = await fetch(SPORTS_NEWS + API_KEY);
    newsDataArr = [];
    if (response.status >= 200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        console.log(response.status, response.statusText);
        newsdetails.innerHTML = "<h5>No data found.</h5>"
        return;
    }
    displayNews();
}

// Function to fetch technology news
const fetchTechnologyNews = async () => {
    const response = await fetch(TECHNOLOGY_NEWS + API_KEY);
    newsDataArr = [];
    if (response.status >= 200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        console.log(response.status, response.statusText);
        newsdetails.innerHTML = "<h5>No data found.</h5>"
        return;
    }
    displayNews();
}

// Function to fetch news based on query
const fetchQueryNews = async () => {
    if (newsQuery.value == null)
        return;
    const response = await fetch(SEARCH_NEWS + encodeURIComponent(newsQuery.value) + "&apiKey=" + API_KEY);
    newsDataArr = [];
    if (response.status >= 200 && response.status < 300) {
        const myJson = await response.json();
        newsDataArr = myJson.articles;
    } else {
        console.log(response.status, response.statusText);
        newsdetails.innerHTML = "<h5>No data found.</h5>"
        return;
    }
    displayNews();
}

// Function to display news
function displayNews() {
    newsdetails.innerHTML = "";
    if (newsDataArr.length === 0) {
        newsdetails.innerHTML = "<h5>No data found.</h5>"
        return;
    }
    newsDataArr.forEach(news => {
        var date = news.publishedAt.split("T");
        var col = document.createElement('div');
        col.className = "col-sm-12 col-md-4 col-lg-3 p-2 card";
        var card = document.createElement('div');
        card.className = "p-2";
        var image = document.createElement('img');
        image.setAttribute("height", "matchparent");
        image.setAttribute("width", "100%");
        image.src = news.urlToImage;
        var cardBody = document.createElement('div');
        var newsHeading = document.createElement('h5');
        newsHeading.className = "card-title";
        newsHeading.innerHTML = news.title;
        var dateHeading = document.createElement('h6');
        dateHeading.className = "text-primary";
        dateHeading.innerHTML = date[0];
        var discription = document.createElement('p');
        discription.className = "text-muted";
        discription.innerHTML = news.description;
        var link = document.createElement('a');
        link.className = "btn btn-dark";
        link.setAttribute("target", "_blank");
        link.href = news.url;
        link.innerHTML = "Read more";
        cardBody.appendChild(newsHeading);
        cardBody.appendChild(dateHeading);
        cardBody.appendChild(discription);
        cardBody.appendChild(link);
        card.appendChild(image);
        card.appendChild(cardBody);
        col.appendChild(card);
        newsdetails.appendChild(col);
    });
}

// Speech recognition setup
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.continuous = true;
recognition.lang = 'en-US';
recognition.interimResults = false;

// Function to speak text
function speak(text) {
    if ('speechSynthesis' in window) {
        const speech = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(speech);
        console.log(`Speaking: ${text}`); // Debugging line
    } else {
        console.log('Speech Synthesis not supported in this browser.');
    }
}

// Speech recognition event handling
recognition.onresult = function(event) {
    const transcript = event.results[event.results.length - 1][0].transcript.trim().toLowerCase();
    console.log(`Recognized: ${transcript}`); // Debugging line
    if (transcript.includes('general')) {
        newsType.innerHTML = "<h4>General news</h4>";
        speak("General news");
        fetchGeneralNews();
    } else if (transcript.includes('business')) {
        newsType.innerHTML = "<h4>Business</h4>";
        speak("Business news");
        fetchBusinessNews();
    } else if (transcript.includes('sports')) {
        newsType.innerHTML = "<h4>Sports</h4>";
        speak("Sports news");
        fetchSportsNews();
    } else if (transcript.includes('entertainment')) {
        newsType.innerHTML = "<h4>Entertainment</h4>";
        speak("Entertainment news");
        fetchEntertainmentNews();
    } else if (transcript.includes('technology')) {
        newsType.innerHTML = "<h4>Technology</h4>";
        speak("Technology news");
        fetchTechnologyNews();
    }
};

recognition.start();
