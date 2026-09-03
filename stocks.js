<!DOCTYPE html>
<html lang="id">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <title>Trading Radar | IDXNOVA</title>
  <link rel="stylesheet" href="style.css">
</head>

<body>

<header class="navbar">
  <a href="index.html" class="brand">
    <span class="brand-mark">N</span>
    <span>
      <strong>IDXNOVA</strong>
      <small>INDONESIAN STOCK INTELLIGENCE</small>
    </span>
  </a>

  <button class="menu-btn" onclick="toggleMenu()">☰</button>

  <nav id="navMenu">
    <a href="index.html">Home</a>
    <a href="trading.html">Trading</a>
    <a href="swing.html">Swing</a>
    <a href="investing.html">Investing</a>
    <a href="screener.html">Screener</a>
    <a href="watchlist.html">Watchlist</a>
    <a href="search.html">🔎 Search</a>
  </nav>
</header>

<main>

  <section class="hero">

    <div class="hero-content">
      <div class="badge">⚡ DAILY TRADING SCANNER</div>

      <h1>
        Temukan Momentum
        <span>Lebih Cepat.</span>
      </h1>

      <p>
        Saham diurutkan berdasarkan Trading Score dari database IDXNOVA.
      </p>
    </div>

    <div class="hero-panel">

      <div class="panel-top">
        <span>TRADING RADAR</span>
        <strong>DEMO MODE</strong>
      </div>

      <div class="sentiment-value">
        <h2 id="radarCount">Memuat...</h2>
        <p id="radarStatus">Menghubungkan database</p>
      </div>

      <div class="sentiment-info">
        <div>
          <small>Strategy</small>
          <strong>Trading</strong>
        </div>

        <div>
          <small>Data</small>
          <strong>IDXNOVA</strong>
        </div>
      </div>

    </div>

  </section>


  <section class="section">

    <div class="section-heading">
      <div>
        <span class="eyebrow">TRADING RADAR</span>
        <h2>Top Trading Opportunities</h2>
      </div>

      <span id="radarLabel" class="demo-label">MEMUAT...</span>
    </div>


    <div id="tradingStocks" class="stock-grid"></div>

  </section>

</main>


<footer>
  <div class="footer-brand">
    <strong>IDXNOVA</strong>
    <span>Indonesian Stock Intelligence</span>
  </div>

  <p>
    Data demonstrasi — bukan rekomendasi membeli atau menjual saham.
  </p>

  <small>© 2026 IDXNOVA. All rights reserved.</small>
</footer>


<!-- PANGGIL DATABASE -->
<script src="stocks.js"></script>


<script>

function toggleMenu() {
  document.getElementById("navMenu").classList.toggle("active");
}


const container = document.getElementById("tradingStocks");
const radarCount = document.getElementById("radarCount");
const radarStatus = document.getElementById("radarStatus");
const radarLabel = document.getElementById("radarLabel");


if (typeof STOCKS !== "undefined") {

  const stocks = [];

  for (const key in STOCKS) {
    stocks.push(STOCKS[key]);
  }


  stocks.sort(function(a, b) {
    return b.trading - a.trading;
  });


  radarCount.innerHTML =
    stocks.length + "<span> Saham</span>";

  radarStatus.textContent =
    "Database berhasil terhubung";

  radarLabel.textContent =
    stocks.length + " SAHAM";


  stocks.forEach(function(stock) {

    const card = document.createElement("article");

    card.className = "stock-card";


    card.innerHTML = `
      <div class="stock-header">

        <div>
          <h3>${stock.ticker}</h3>
          <p>${stock.tradingOutlook}</p>
        </div>

        <span class="positive">
          ▲ +${Number(stock.change).toFixed(2)}%
        </span>

      </div>

      <div class="stock-price">
        Rp${Number(stock.price).toLocaleString("id-ID")}
      </div>

      <div class="stock-footer">
        <span>Trading Score</span>
        <strong>${stock.trading}/100</strong>
      </div>
    `;


    container.appendChild(card);

  });


} else {

  radarCount.innerHTML = "ERROR";

  radarStatus.textContent =
    "stocks.js tidak terbaca";

  radarLabel.textContent =
    "DATA ERROR";

}

</script>

</body>
</html>
