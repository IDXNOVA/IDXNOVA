
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

    <button
      class="menu-btn"
      onclick="toggleMenu()"
      aria-label="Buka menu"
    >
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

    <!-- HERO -->
    <section class="hero">

      <div class="hero-content">

        <div class="badge">⚡ DAILY TRADING SCANNER</div>

        <h1>
          Temukan Momentum
          <span>Lebih Cepat.</span>
        </h1>

        <p>
          Trading Radar membantu memantau saham Indonesia berdasarkan
          momentum, volume, volatilitas, dan peluang breakout.
        </p>

      </div>


      <div class="hero-panel">

        <div class="panel-top">
          <span>TRADING RADAR</span>
          <strong>DEMO MODE</strong>
        </div>

        <div class="sentiment-value">
          <h2 id="radarCount">
            0<span> Saham</span>
          </h2>

          <p>Radar aktif</p>
        </div>

        <div class="sentiment-bar">
          <span id="radarBar" style="width: 0%"></span>
        </div>

        <div class="sentiment-info">

          <div>
            <small>Strategy</small>
            <strong>Trading</strong>
          </div>

          <div>
            <small>Data</small>
            <strong>Central</strong>
          </div>

        </div>

        <p class="demo-note">
          Scanner saat ini menggunakan data demonstrasi dari database pusat.
        </p>

      </div>

    </section>


    <!-- TRADING FILTER -->
    <section class="section">

      <div class="section-heading">

        <div>
          <span class="eyebrow">TRADING FILTER</span>
          <h2>Radar Scanner</h2>
        </div>

        <span class="demo-label">CENTRAL DATA</span>

      </div>


      <div class="feature-grid">

        <article>
          <span>01</span>
          <h3>⚡ Momentum</h3>
          <p>
            Saham dengan kekuatan pergerakan harga yang meningkat.
          </p>
        </article>

        <article>
          <span>02</span>
          <h3>📊 Volume Spike</h3>
          <p>
            Mendeteksi aktivitas volume yang lebih tinggi dari biasanya.
          </p>
        </article>

        <article>
          <span>03</span>
          <h3>🚀 Breakout</h3>
          <p>
            Memantau saham yang mendekati atau menembus level penting.
          </p>
        </article>

        <article>
          <span>04</span>
          <h3>🔥 High Score</h3>
          <p>
            Menampilkan saham dengan Trading Score tinggi dari database IDXNOVA.
          </p>
        </article>

      </div>

    </section>


    <!-- TRADING OPPORTUNITIES -->
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


      <div
        id="tradingStocks"
        class="stock-grid"
      ></div>


      <div
        id="noTradingResult"
        class="empty-watchlist"
        style="display: none;"
      >

        <div class="empty-icon">⚡</div>

        <h3>Belum ada saham di Trading Radar</h3>

        <p>
          Belum ada saham dengan Trading Score yang memenuhi kriteria.
        </p>

      </div>

    </section>


    <!-- CTA -->
    <section class="cta">

      <span class="eyebrow">IDXNOVA TRADING</span>

      <h2>Find Momentum. Manage Risk.</h2>

      <p>
        Gunakan Trading Radar untuk melihat saham dengan Trading Score
        yang memenuhi kriteria scanner IDXNOVA.
      </p>

      <a href="screener.html">
        <button>
          Buka Stock Screener
        </button>
      </a>

    </section>

  </main>


  <footer>

    <div class="footer-brand">
      <strong>IDXNOVA</strong>
      <span>Indonesian Stock Intelligence</span>
    </div>

    <p>
      Trading Radar saat ini menggunakan data demonstrasi dan bukan
      rekomendasi untuk membeli atau menjual saham.
    </p>

    <small>
      © 2026 IDXNOVA. All rights reserved.
    </small>

  </footer>


  <!-- DATABASE PUSAT -->
  <script src="stocks.js"></script>


  <script>

    function toggleMenu() {

      document
        .getElementById("navMenu")
        .classList
        .toggle("active");

    }


    function openStock(ticker) {

      window.location.href =
        "stock.html?ticker=" +
        encodeURIComponent(ticker);

    }


    /*
      AMBIL SAHAM DENGAN
      TRADING SCORE >= 75
    */
    function getTradingStocks() {

      return Object
        .values(STOCKS)
        .filter(function(stock) {

          return (
            typeof stock.trading === "number" &&
            stock.trading >= 75
          );

        })
        .sort(function(a, b) {

          return b.trading - a.trading;

        });

    }


    /*
      FORMAT HARGA RUPIAH
    */
    function formatPrice(price) {

      return "Rp" +
        Number(price).toLocaleString("id-ID");

    }


    /*
      TAMPILKAN TRADING RADAR
    */
    function renderTradingStocks() {

      const container =
        document.getElementById("tradingStocks");

      const emptyState =
        document.getElementById("noTradingResult");

      const stocks =
        getTradingStocks();


      container.innerHTML = "";


      /*
        UPDATE JUMLAH SAHAM
      */
      document
        .getElementById("radarCount")
        .innerHTML =
        stocks.length +
        "<span> Saham</span>";


      document
        .getElementById("radarLabel")
        .textContent =
        stocks.length + " SAHAM";


      /*
        UPDATE PROGRESS BAR
      */
      document
        .getElementById("radarBar")
        .style
        .width =
        Math.min(
          100,
          stocks.length * 20
        ) + "%";


      /*
        JIKA TIDAK ADA SAHAM
      */
      if (stocks.length === 0) {

        emptyState.style.display = "block";

        return;

      }


      emptyState.style.display = "none";


      /*
        BUAT KARTU SAHAM
      */
      stocks.forEach(function(stock) {

        const card =
          document.createElement("article");


        card.className = "stock-card";

        card.style.cursor = "pointer";


        const changeSymbol =
          stock.change >= 0
            ? "▲ +"
            : "▼ ";


        const changeClass =
          stock.change >= 0
            ? "positive"
            : "negative";


        card.innerHTML = `

          <div class="stock-header">

            <div>
              <h3>${stock.ticker}</h3>

              <p>${stock.tradingOutlook}</p>
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

            <strong>
              ${stock.trading}/100
            </strong>

          </div>

        `;


        card.addEventListener(
          "click",
          function() {

            openStock(stock.ticker);

          }
        );


        container.appendChild(card);

      });

    }


    /*
      JALANKAN SAAT HALAMAN DIBUKA
    */
    renderTradingStocks();

  </script>

</body>
</html>
