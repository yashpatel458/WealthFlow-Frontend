document.addEventListener('DOMContentLoaded', function () {
    // Define your proxy server and the News API URL
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/'; // Use your proxy URL or set up a server-side proxy
    const newsApiUrl = 'https://newsapi.org/v2/everything?domains=wsj.com&apiKey=5bc90c8da5634b93ab403a933353e2ff'; 
    const fullApiUrl = `${proxyUrl}${newsApiUrl}`; // Combine proxy and API URL

    const newsContainer = document.getElementById('news-container');
    const errorMessage = document.getElementById('error-message');

    // Fetch news articles from the API through the proxy
    async function fetchNews() {
        try {
            const response = await fetch(fullApiUrl);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();

            if (data.status === 'ok' && data.articles.length > 0) {
                displayNews(data.articles);
            } else {
                showError('No news articles available.');
            }
        } catch (error) {
            console.error('Error fetching news:', error);
            showError('Failed to load news. Please try again later.');
        }
    }

    // Display news articles in the container
    function displayNews(articles) {
        newsContainer.innerHTML = ''; // Clear previous articles

        articles.forEach(article => {
            const newsCard = document.createElement('div');
            newsCard.className = 'col';

            newsCard.innerHTML = `
                <div class="card h-100 shadow-sm">
                    <img src="${article.urlToImage || 'https://via.placeholder.com/150'}" class="card-img-top" alt="${article.title}">
                    <div class="card-body">
                        <h5 class="card-title">${article.title}</h5>
                        <p class="card-text">${article.description || 'No description available.'}</p>
                        <a href="${article.url}" class="btn btn-success" target="_blank">Read More</a>
                    </div>
                    <div class="card-footer text-muted">
                        <small>Source: ${article.source.name || 'Unknown'}</small><br>
                        <small>Published: ${new Date(article.publishedAt).toLocaleDateString()}</small>
                    </div>
                </div>
            `;

            newsContainer.appendChild(newsCard);
        });
    }

    // Show error message
    function showError(message) {
        errorMessage.textContent = message;
        errorMessage.classList.remove('d-none');
    }

    // Fetch news on page load
    fetchNews();
});
