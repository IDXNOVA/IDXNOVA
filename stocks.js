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
  <script src="./stocks.js"></script>


  <script>

    function toggleMenu() {
      document.getElementById("navMenu").classList.toggle("active");
    }


    function openStock(ticker) {
      window.location.href =
        "stock.html?ticker=" + encodeURIComponent(ticker);
    }


    function formatPrice(price) {
      return "Rp" + Number(price).toLocaleString("id-ID");
    }


    function renderTradingStocks() {

      const container = document.getElementById("tradingStocks");
      const emptyState = document.getElementById("noTradingResult");

      /*
        CEK APAKAH STOCKS.JS BERHASIL DIMUAT
      */
      if (typeof STOCKS === "undefined") {

        console.error("STOCKS tidak ditemukan");

        emptyState.style.display = "block";

        document.getElementById("radarLabel").textContent =
          "DATA ERROR";

        return;
      }


      /*
        AMBIL SEMUA SAHAM DARI DATABASE
        YANG MEMILIKI TRADING SCORE
      */
      const stocks = Object.values(STOCKS)
        .filter(function(stock) {
          return typeof stock.trading === "number";
        })
        .sort(function(a, b) {
          return b.trading - a.trading;
        });


      container.innerHTML = "";


      /*
        UPDATE JUMLAH
      */
      document.getElementById("radarCount").innerHTML =
        stocks.length + "<span> Saham</span>";


      document.getElementById("radarLabel").textContent =
        stocks.length + " SAHAM";


      document.getElementById("radarBar").style.width =
        Math.min(100, stocks.length * 12) + "%";


      /*
        JIKA DATA KOSONG
      */
      if (stocks.length === 0) {

        emptyState.style.display = "block";

        return;
      }


      emptyState.style.display = "none";


      /*
        BUAT KARTU
      */
      stocks.forEach(function(stock) {

        const card = document.createElement("article");

        card.className = "stock-card";
        card.style.cursor = "pointer";


        const changeSymbol =
          stock.change >= 0 ? "▲ +" : "▼ ";


        const changeClass =
          stock.change >= 0 ? "positive" : "negative";


        card.innerHTML = `
          <div class="stock-header">

            <div>
              <h3>${stock.ticker}</h3>
              <p>${stock.tradingOutlook || stock.name}</p>
            </div>

            <span class="${changeClass}">
              ${changeSymbol}${Math.abs(stock.change).toFixed(2)}%
            </span>

          </div>

          <div class="stock-price">
            ${formatPrice(stock.price)}
          </div>

          <div class="stock-footer">
            <span>Trading Score</span>
            <strong>${stock.trading}/100</strong>
          </div>
        `;


        card.addEventListener("click", function() {
          openStock(stock.ticker);
        });


        container.appendChild(card);

      });

    }


    renderTradingStocks();

  </script>

</body>
</html>
