document.addEventListener("DOMContentLoaded", function () {
    const URL = "https://newsapi.org/v2/everything?q=";
    const pageSize = 18;

    window.addEventListener('load', () => fetchNews("world", 20));
    window.addEventListener('load' , () => fetchHnews())

    const searchText = document.getElementById("search-text");

    window.search = function () {
        const query = searchText.value.trim(); // Trim to remove leading/trailing whitespaces
        if (!query) return;
        fetchNews(query);
    };

    async function fetchHnews(){
        const res = await fetch(`${URL}japan&apiKey=${api_key}&pageSize=1`)
        data = await res.json();
        console.log("hero data:",data)
        hbindData(data.articles);
    }
    function hbindData(articles){
    const newsContainer = document.getElementById('hnews-container');
        newsContainer.innerHTML = '';

        articles.forEach(article => {
            if (!article.urlToImage) return;
            const card = document.createElement('div');
            card.classList.add('hnewscard');

            card.innerHTML = `
                <div class="hnewsimg">
                    <img class="himg" src="${article.urlToImage}" alt="" srcset="">
                </div>
                <div class="hright">
                <h1 class="hspan">Trending-NEWS</h1>
                <div class="hnews-title">${article.title}</div>
                <div class="hsource"><span class="spanhsource">Source:</span> ${article.source.name}</div>
                <div class="hnews-desc"><p>${article.description}</p></div>
                </div>
            `;

            newsContainer.appendChild(card);
        });
    }

    async function fetchNews(query) {
        const res = await fetch(`${URL}${query}&apiKey=${api_key}&pageSize=${pageSize}`);
        const data = await res.json();
        console.log(data);
        bindData(data.articles);
    }

    function bindData(articles) {
        const newsContainer = document.getElementById('news-container');
        newsContainer.innerHTML = '';

        articles.forEach(article => {
            if (!article.urlToImage) return;
            const card = document.createElement('div');
            card.classList.add('newscard');

            card.innerHTML = `
                <div class="newsimg">
                    <img class="img" src="${article.urlToImage}" alt="" srcset="">
                </div>
                <div class="news-title">${article.title}</div>
                <div class="news-source"><span class="source">Source:</span> ${article.source.name}</div>
                <div class="news-desc"><p>${article.description}</p></div>
            `;

            newsContainer.appendChild(card);
        });
    }

    // for navbar
    window.addEventListener("scroll", function () {
        var nav = this.document.querySelector(".navbar"); // Updated selector
        nav.classList.toggle("sticky", window.scrollY > 0);
    });

    const homeLink = document.querySelector(".navitem-2");
    homeLink.addEventListener("click", function () {
        // Scroll to the top of the page
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    const contactLink = document.querySelector('.navitem-4')
    const aboutLink = document.querySelector(".navitem-3");
    aboutLink.addEventListener("click", bottom);
    contactLink.addEventListener("click", bottom);

    function bottom() {
        // Scroll to the bottom of the page
        window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
    };

    // footer 
    const quickLinksList = document.getElementById("quickLinksList");
    if (quickLinksList) {
        // Add click event listeners to each <li> element
        const quickLinksItems = quickLinksList.querySelectorAll("li");

        quickLinksItems.forEach(item => {
            item.addEventListener("click", () => {
                // Log the text content of the clicked item to the console
                fetchNews(item.textContent);
                window.scrollTo({ top: 0, behavior: "smooth"});
            });
        });
    }
});
