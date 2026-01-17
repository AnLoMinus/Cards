// סקריפט ייחודי לכרטיסי פרשות השבוע
document.addEventListener("DOMContentLoaded", function () {
  const torahCards = document.querySelectorAll(".torah-card");

  torahCards.forEach((card) => {
    const book = card.dataset.book;
    const portionNum = parseInt(card.dataset.portion);

    // אפקטים מיוחדים לפי חומש
    addBookEffects(card, book);

    // אפקט מיוחד לפרשות מיתיות
    if (card.dataset.rarity === "mythic") {
      addMythicEffect(card);
    }

    // אפקט hover
    card.addEventListener("mouseenter", function () {
      createTorahBurst(card, book);
    });

    // אפקט קליק
    card.addEventListener("click", function (e) {
      createDivineSpark(card, e, book);
    });
  });

  function addBookEffects(card, book) {
    const aura = card.querySelector(`[class*="aura"]`);

    if (aura) {
      card.addEventListener("mouseenter", function () {
        aura.style.transition = "all 0.5s ease";
        aura.style.opacity = "1";
      });

      card.addEventListener("mouseleave", function () {
        aura.style.opacity = "0.7";
      });
    }
  }

  function addMythicEffect(card) {
    const borderGlow = card.querySelector(".border-glow");

    card.addEventListener("mouseenter", function () {
      if (borderGlow) {
        borderGlow.style.transition = "all 0.5s ease";
        borderGlow.style.transform = "scale(1.02)";
      }
    });

    card.addEventListener("mouseleave", function () {
      if (borderGlow) {
        borderGlow.style.transform = "scale(1)";
      }
    });
  }

  function createTorahBurst(card, book) {
    const cardInner = card.querySelector(".card-inner");
    const color = getBookColor(book);

    const burst = document.createElement("div");

    burst.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 30px;
            height: 30px;
            background: radial-gradient(circle, ${color}, transparent);
            border-radius: 50%;
            pointer-events: none;
            z-index: 100;
        `;

    burst.animate(
      [
        { width: "30px", height: "30px", opacity: 0.9 },
        { width: "250px", height: "250px", opacity: 0 },
      ],
      {
        duration: 800,
        easing: "ease-out",
      }
    );

    cardInner.appendChild(burst);
    setTimeout(() => burst.remove(), 800);
  }

  function createDivineSpark(card, event, book) {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const color = getBookColor(book);

    for (let i = 0; i < 12; i++) {
      const spark = document.createElement("div");

      spark.style.cssText = `
                position: absolute;
                left: ${x}px;
                top: ${y}px;
                width: 8px;
                height: 8px;
                background: radial-gradient(circle, ${color}, transparent);
                border-radius: 50%;
                pointer-events: none;
                z-index: 100;
                box-shadow: 0 0 15px ${color};
            `;

      const angle = (Math.PI * 2 * i) / 12;
      const distance = 70 + Math.random() * 50;
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance;

      spark.animate(
        [
          { transform: "translate(0, 0) scale(1)", opacity: 1 },
          {
            transform: `translate(${tx}px, ${ty}px) scale(0)`,
            opacity: 0,
          },
        ],
        {
          duration: 1100,
          easing: "ease-out",
        }
      );

      card.querySelector(".card-inner").appendChild(spark);
      setTimeout(() => spark.remove(), 1100);
    }
  }

  function getBookColor(book) {
    const colors = {
      genesis: "#d2691e",
      exodus: "#4169e1",
      leviticus: "#dc143c",
      numbers: "#daa520",
      deuteronomy: "#9370db",
    };

    return colors[book] || "#ffd700";
  }
});

// אפקט טעינה מיוחד
window.addEventListener("load", function () {
  const cards = document.querySelectorAll(".torah-card");

  cards.forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";

    setTimeout(() => {
      card.style.transition = "all 0.7s ease";
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }, index * 120);
  });
});

// פונקציות עזר ליצירת כרטיסי תורה
const TorahTemplates = {
  createPortion: function (data) {
    return `
            <div class="card-wrapper">
                <div class="card torah-card" data-book="${data.book}" data-portion="${data.portionNum}" data-rarity="${data.rarity}">
                    <div class="card-inner">
                        <div class="card-background ${data.book}-bg"></div>
                        <div class="${data.rarity === "mythic" ? "rainbow-layer" : "holographic-layer"}"></div>
                        <div class="hebrew-letters"></div>
                        <div class="sparkle-layer">
                            ${this.createSparkles(data.rarity === "mythic" ? 8 : 6)}
                        </div>
                        <div class="card-content torah-content">
                            <div class="torah-header">
                                <div class="book-badge ${data.book}">${data.bookHeb}</div>
                                <h2 class="torah-name">${data.name}</h2>
                                <div class="torah-subtitle">${data.nameEng}</div>
                            </div>
                            <div class="torah-artwork">
                                <div class="portion-number">
                                    <span class="number">${data.portionNum}</span>
                                    <span class="label">מתוך 54</span>
                                </div>
                                <div class="torah-image">
                                    <div class="${data.aura}"></div>
                                    <p class="placeholder-text torah-text">${data.icon}<br/>${data.hebrewText}</p>
                                </div>
                                <div class="chapters-info">
                                    <span class="chapter-range">${data.chapters}</span>
                                </div>
                            </div>
                            <div class="torah-info">
                                <div class="themes-section">
                                    <h3>נושאים מרכזיים</h3>
                                    <div class="theme-tags">
                                        ${data.themes.map((t) => `<span class="theme-tag">${t}</span>`).join("")}
                                    </div>
                                </div>
                                <div class="values-section">
                                    <h3>ערכים</h3>
                                    <div class="value-list">
                                        ${data.values.map((v) => `
                                            <div class="value-item">
                                                <span class="value-icon">${v.icon}</span>
                                                <span class="value-text">${v.text}</span>
                                            </div>
                                        `).join("")}
                                    </div>
                                </div>
                            </div>
                            <div class="torah-footer">
                                <div class="portion-code">פרשה ${data.portionNum}/54</div>
                                <div class="book-icon ${data.book}">${data.bookHeb}</div>
                                <div class="stars ${data.rarity}">${this.createStars(data.stars)}</div>
                            </div>
                        </div>
                        <div class="border-glow ${data.book}-glow"></div>
                    </div>
                </div>
            </div>
        `;
  },

  createSparkles: function (count) {
    let html = "";
    for (let i = 0; i < count; i++) {
      html += '<div class="sparkle"></div>';
    }
    return html;
  },

  createStars: function (count) {
    return "✡️".repeat(count);
  },
};

