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

    <button class="menu-btn" onclick="toggleMenu()" aria-label="Buka menu">
      ☰
    </button>

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
          Trading Radar menampilkan saham dari database IDXNOVA
          dan mengurutkannya berdasarkan Trading Score tertinggi.
        </p>
      </div>


      <div class="hero-panel">

        <div class="panel-top">
          <span>TRADING RADAR</span>
          <strong>DEMO MODE</strong>
        </div>

        <div class="sentiment-value">
          <h2 id="radarCount">0<span> Saham</span></h2>
          <p>Data Trading Radar</p>
        </div>

        <div class="sentiment-bar">
          <span id="radarBar" style="width: 0%"></span>
        </div>

        <div class="sentiment-info">
          <div>
            <small>Strategy</small>
            <strong>Trading Score</strong>
          </div>

          <div>
            <small>Status</small>
            <strong>Central Data</strong>
          </div>
        </div>

        <p class="demo-note">
          Data demonstrasi — bukan data pasar real-time.
        </p>

      </div>

    </section>


    <section class="section">

      <div class="section-heading">
        <div>
          <span class="eyebrow">TRADING RADAR</span>
          <h2>Top Trading Opportunities</h2>
        </div>

        <span id="radarLabel" class="demo-label">
          LOADING...
        </span>
      </div>


      <div id="tradingStocks" class="stock-grid"></div>


      <div
        id="noTradingResult"
        class="empty-watchlist"
        style="display: none;"
      >
        <div class="empty-icon">⚠️</div>
        <h3>Database belum terbaca</h3>
        <p>
          Pastikan file stocks.js berada di folder yang sama dengan trading.html.
        </p>
      </div>

    </section>


    <section class="cta">
      <span class="eyebrow">IDXNOVA TRADING</span>

      <h2>Find Momentum. Manage Risk.</h2>

      <p>
        Saham diurutkan berdasarkan Trading Score dari database pusat IDXNOVA.
      </p>

      <a href="screener.html">
        <button>Buka Stock Screener</button>
      </a>
    </section>

  </main>


  <footer>
    <div class="footer-brand">
      <strong>IDXNOVA</strong>
      <span>Indonesian Stock Intelligence</span>
    </div>

    <p>
      Trading Radar menggunakan data demonstrasi dan bukan rekomendasi
      membeli atau menjual saham.
    </p>

    <small>© 2026 IDXNOVA. All rights reserved.</small>
  </footer>


  <!-- DATABASE PUSAT -->
<script src="stocks.js"></script>

<script>
  function toggleMenu() {
    document.getElementById("navMenu").classList.toggle("active");
  }

  window.onload = function () {

    const container = document.getElementById("tradingStocks");
    const radarCount = document.getElementById("radarCount");
    const radarLabel = document.getElementById("radarLabel");
    const radarBar = document.getElementById("radarBar");
    const emptyState = document.getElementById("noTradingResult");

    // TES 1: Apakah stocks.js terbaca?
    if (typeof STOCKS === "undefined") {
      radarLabel.textContent = "STOCKS.JS TIDAK TERBACA";
      emptyState.style.display = "block";
      return;
    }

    // TES 2: Ambil semua data
    const stocks = Object.keys(STOCKS).map(function(key) {
      return STOCKS[key];
    });

    // TES 3: Urutkan berdasarkan Trading Score
    stocks.sort(function(a, b) {
      return Number(b.trading) - Number(a.trading);
    });

    // Update jumlah
    radarCount.innerHTML = stocks.length + "<span> Saham</span>";
    radarLabel.textContent = stocks.length + " SAHAM";
    radarBar.style.width = Math.min(100, stocks.length * 12) + "%";

    // Kosongkan container
    container.innerHTML = "";

    // Jika benar-benar tidak ada data
    if (stocks.length === 0) {
      emptyState.style.display = "block";
      radarLabel.textContent = "DATABASE KOSONG";
      return;
    }

    emptyState.style.display = "none";

    // Tampilkan saham
    stocks.forEach(function(stock) {

      const card = document.createElement("article");
      card.className = "stock-card";

      const change = Number(stock.change) || 0;

      card.innerHTML =
        '<div class="stock-header">' +
          '<div>' +
            '<h3>' + stock.ticker + '</h3>' +
            '<p>' + stock.tradingOutlook + '</p>' +
          '</div>' +
          '<span class="' + (change >= 0 ? 'positive' : 'negative') + '">' +
            (change >= 0 ? '▲ +' : '▼ ') +
            Math.abs(change).toFixed(2) + '%' +
          '</span>' +
        '</div>' +

        '<div class="stock-price">' +
          'Rp' + Number(stock.price).toLocaleString("id-ID") +
        '</div>' +

        '<div class="stock-footer">' +
          '<span>Trading Score</span>' +
          '<strong>' + stock.trading + '/100</strong>' +
        '</div>';

      card.onclick = function() {
        window.location.href =
          "stock.html?ticker=" + encodeURIComponent(stock.ticker);
      };

      card.style.cursor = "pointer";

      container.appendChild(card);

    });

  };
</script>

</body>
</html>
