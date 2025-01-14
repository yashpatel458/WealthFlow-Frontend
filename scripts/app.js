document.addEventListener("DOMContentLoaded", () => {
    fetch("data/data.json")
        .then(response => response.json())
        .then(data => {
            const path = window.location.pathname;

            switch (true) {
                case path.includes("index.html"):
                    populateDashboard(data.dashboard);
                    renderCharts(data.dashboard);
                    break;
                case path.includes("analytics.html"):
                    populateAnalytics(data.analytics);
                    break;
                case path.includes("products.html"):
                    setupProductsPage(data.products);
                    break;
                case path.includes("currency.html"):
                    setupCurrencyConverter(data.currencies);
                    break;
                case path.includes("about.html"):
                    break;
            }
        })
        .catch(error => console.error("Error loading data:", error));
});

// Populate Dashboard Metrics
function populateDashboard(dashboardData) {
    const aumTotal = document.getElementById("aum-total");
    const totalAssets = document.getElementById("total-assets");
    const totalRevenue = document.getElementById("total-revenue");
    const totalClients = document.getElementById("total-clients");
    const averageROI = document.getElementById("average-roi");

    if (aumTotal) aumTotal.textContent = `$${dashboardData.aumTotal.toLocaleString()}`;
    if (totalAssets) totalAssets.textContent = `$${dashboardData.totalAssets.toLocaleString()}`;
    if (totalRevenue) totalRevenue.textContent = `$${dashboardData.totalRevenue.toLocaleString()}`;
    if (totalClients) totalClients.textContent = dashboardData.totalClients;
    if (averageROI) averageROI.textContent = `${dashboardData.averageROI}%`;
}


function renderCharts(dashboardData) {

    // AUM Growth (Line Chart)
    const ctxAUM = document.getElementById("aum-line-chart").getContext("2d");
    new Chart(ctxAUM, {
        type: "line",
        data: {
            labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
            datasets: [{
                label: "AUM Growth",
                data: [200000, 400000, 600000, 800000, 1000000, dashboardData.totalAssets],
                borderColor: "rgba(75, 192, 192, 1)",
                backgroundColor: "rgba(75, 192, 192, 0.2)",
                fill: true
            }]
        }
    });

    // Quarterly Revenue (Bar Chart)
    const ctxRevenue = document.getElementById("revenue-bar-chart").getContext("2d");
    new Chart(ctxRevenue, {
        type: "bar",
        data: {
            labels: ["Q1", "Q2", "Q3", "Q4"],
            datasets: [{
                label: "Revenue",
                data: dashboardData.revenueTrends.slice(0, 4),
                backgroundColor: "rgb(0,187,152)"
            }]
        }
    });

    // Asset Distribution (Pie Chart)
    const ctxAssets = document.getElementById("asset-pie-chart").getContext("2d");
    new Chart(ctxAssets, {
        type: "doughnut",
        data: {
            labels: ["Stocks", "Bonds", "ETFs", "Cash"],
            datasets: [{
                label: "Asset Distribution",
                data: [40, 30, 20, 5], // Example data
                backgroundColor: ["#00a3ae", "#4682b4", "#5f9ea0", "#87cefa"]           
             }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: true
        }
    });

    // Radar Chart (Investment Comparison)
    const ctxRadar = document.getElementById("radar-chart").getContext("2d");
    new Chart(ctxRadar, {
        type: "radar",
        data: {
            labels: ["Q1", "Q2", "Q3", "Q4"],
            datasets: [{
                label: "Investment Comparison",
                data: dashboardData.revenueTrends,
                backgroundColor: "rgba(58, 192, 192, 0.2)",
            }]
        }
    });

    

}







// Populate Analytics
function populateAnalytics(analyticsData) {
    const dropdown = document.getElementById("analytics-options");
    const tableHead = document.getElementById("analytics-table-head");
    const tableBody = document.getElementById("analytics-table-body");
    const searchBar = document.getElementById("search-bar");

    // Function to populate table with data
    function populateTable(dataType) {
        const dataToDisplay = analyticsData[dataType];

        // Generate table headers dynamically
        tableHead.innerHTML = Object.keys(dataToDisplay[0])
            .map(key => `<th>${key}</th>`).join("");

        // Generate table body dynamically
        tableBody.innerHTML = dataToDisplay
            .map(item => `<tr>${Object.values(item).map(val => `<td>${val}</td>`).join("")}</tr>`)
            .join("");
    }

    // Event listener for dropdown change (Client Data / Investment Data)
    dropdown.addEventListener("change", () => {
        populateTable(dropdown.value);
    });

    // Event listener for search input to filter table data
    searchBar.addEventListener("input", () => {
        const searchTerm = searchBar.value.toLowerCase();
        const rows = tableBody.querySelectorAll("tr");

        rows.forEach(row => {
            const cells = row.querySelectorAll("td");
            const match = Array.from(cells).some(cell => 
                cell.textContent.toLowerCase().includes(searchTerm)
            );
            row.style.display = match ? "" : "none";
        });
    });

    // Initialize the table with Client Data by default
    populateTable("clientData");
}


document.getElementById("export-btn").addEventListener("click", function () {
    const table = document.querySelector("table");
    const rows = table.querySelectorAll("tr");

    let csvContent = "";
    
    // Iterate over rows and create the CSV content
    rows.forEach((row, index) => {
        const cells = row.querySelectorAll("td, th");
        
        // Format investment and ROI values correctly for CSV export
        const rowData = Array.from(cells).map((cell, cellIndex) => {
            let text = cell.textContent.trim();
            
            // Format Investment column (e.g., $450,000)
            if (cellIndex === 1) {
                text = `$${parseInt(text.replace(/[^0-9.-]+/g, "")).toLocaleString()}`;
            } 
            // Format ROI column (e.g., 18.5%)
            else if (cellIndex === 2) {
                text = `${text}%`;
            }
            return text;
        }).join(",");
        
        // Add row to the CSV content
        csvContent += index < rows.length ? rowData + "\n" : rowData;
    });

    // Create a hidden link to trigger the download
    const link = document.createElement("a");
    link.href = 'data:text/csv;charset=utf-8,' + encodeURIComponent(csvContent);
    link.target = '_blank';
    link.download = 'analytics_data.csv'; // Set default download file name
    link.click();
});




// Products Page Setup
function setupProductsPage(products) {
    const productList = document.getElementById("product-list");
    const filterSelect = document.getElementById("product-filter");

    // Populate products initially
    populateProducts(products);

    // Set up filtering
    filterSelect.addEventListener("change", () => {
        const filterValue = filterSelect.value;
        const filteredProducts = filterValue === "all"
            ? products
            : products.filter(product => product.type === filterValue);
        populateProducts(filteredProducts);
    });
}

function populateProducts(products) {
    const productList = document.getElementById("product-list");
    if (!productList) return; // Ensure the element exists
    productList.innerHTML = products.map(product => `
        <div class="product-card" data-type="${product.type}">
            <h3>${product.name}</h3>
            <p>${product.description}</p>
            <p class="product-stats"><strong>Type:</strong> ${product.type}</p>
            <p class="product-stats"><strong>Risk Level:</strong> ${product.riskLevel}</p>
            ${product.currentPrice ? `<p class="product-stats"><strong>Price:</strong> $${product.currentPrice}</p>` : ""}
            ${product.yield ? `<p class="product-stats"><strong>Yield:</strong> ${product.yield}%</p>` : ""}
        </div>
    `).join("");
}

// Setup Currency Converter
function setupCurrencyConverter(currencies) {
    const fromCurrency = document.getElementById("from-currency");
    const toCurrency = document.getElementById("to-currency");
    const amount = document.getElementById("amount");
    const convertBtn = document.getElementById("convert-currency");
    const result = document.getElementById("conversion-result");

    const exchangeRates = {
        "USD": {
            "EUR": 0.85,
            "INR": 74.5,
            "JPY": 110.5,
            "CAD": 1.28 // USD to CAD rate
        },
        "EUR": {
            "USD": 1.18,
            "INR": 87.5,
            "JPY": 130.5,
            "CAD": 1.50 // EUR to CAD rate
        },
        "INR": {
            "USD": 0.013,
            "EUR": 0.011,
            "JPY": 1.49,
            "CAD": 0.017 // INR to CAD rate
        },
        "JPY": {
            "USD": 0.009,
            "EUR": 0.0076,
            "INR": 0.67,
            "CAD": 0.012 // JPY to CAD rate
        },
        "CAD": {
            "USD": 0.78, // CAD to USD rate
            "EUR": 0.67, // CAD to EUR rate
            "INR": 59.5, // CAD to INR rate
            "JPY": 85.5 // CAD to JPY rate
        }
    };

    // Populate the currency dropdowns
    currencies.forEach(currency => {
        const option1 = document.createElement("option");
        option1.value = currency;
        option1.textContent = currency;
        fromCurrency.appendChild(option1);

        const option2 = document.createElement("option");
        option2.value = currency;
        option2.textContent = currency;
        toCurrency.appendChild(option2);
    });

    // Conversion on button click
    convertBtn.addEventListener("click", () => {
        const amountValue = parseFloat(amount.value);
        if (isNaN(amountValue) || amountValue <= 0) {
            result.textContent = "Please enter a valid amount.";
            return;
        }
        
        // Get selected currencies
        const fromCurrencyValue = fromCurrency.value;
        const toCurrencyValue = toCurrency.value;

        // Handle same currency selection
        if (fromCurrencyValue === toCurrencyValue) {
            result.textContent = `No conversion needed. ${amountValue} ${fromCurrencyValue} is the same.`;
            return;
        }

        // Get conversion rate
        const rate = exchangeRates[fromCurrencyValue][toCurrencyValue];

        // Calculate and display result
        const convertedAmount = (amountValue * rate).toFixed(2);
        result.textContent = `${amountValue} ${fromCurrencyValue} = ${convertedAmount} ${toCurrencyValue}`;
    });
}

// Initialize with currencies
document.addEventListener("DOMContentLoaded", function() {
    const currencies = ["USD", "EUR", "INR", "JPY", "CAD"];
    setupCurrencyConverter(currencies);
});


// app.js

document.addEventListener("DOMContentLoaded", () => {
    const signOutButton = document.getElementById("signOutButton");

    // Redirect to login.html if not logged in
    if (!sessionStorage.getItem("loggedIn") && !window.location.href.includes("login.html")) {
        window.location.href = "login.html";
        return; // Prevent further execution
    }

    // Handle sign-out button
    if (signOutButton) {
        signOutButton.addEventListener("click", () => {
            sessionStorage.removeItem("loggedIn");
            window.location.href = "login.html";
        });
    }
});


