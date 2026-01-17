// סקריפט ייחודי לכרטיסי Final Fantasy TCG
document.addEventListener("DOMContentLoaded", function () {
  const ffCards = document.querySelectorAll(".ff-card");

  ffCards.forEach((card) => {
    // אפקט אלמנט
    addElementEffect(card);

    // אפקט זימון מיוחד לכרטיסי Summon
    if (card.dataset.cardType === "summon") {
      addSummonEffect(card);
    }

    // אנימציית Crystal Pattern
    animateCrystalPattern(card);
  });

  function addElementEffect(card) {
    const element = card.dataset.element;

    card.addEventListener("mouseenter", function () {
      const crystalPattern = card.querySelector(".crystal-pattern");
      if (crystalPattern) {
        crystalPattern.style.opacity = "1";
        crystalPattern.style.transition = "opacity 0.3s ease";
      }
    });

    card.addEventListener("mouseleave", function () {
      const crystalPattern = card.querySelector(".crystal-pattern");
      if (crystalPattern) {
        crystalPattern.style.opacity = "0.7";
      }
    });
  }

  function addSummonEffect(card) {
    card.addEventListener("click", function (e) {
      // אפקט התפוצצות זימון
      createSummonBurst(card, e);

      // הבהוב חזק
      const cardInner = card.querySelector(".card-inner");
      cardInner.style.filter = "brightness(1.5)";
      setTimeout(() => {
        cardInner.style.filter = "brightness(1)";
      }, 200);
    });
  }

  function createSummonBurst(card, event) {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const element = card.dataset.element;
    const colors = getElementColors(element);

    // יצירת התפוצצות
    for (let i = 0; i < 16; i++) {
      const burst = document.createElement("div");
      const color = colors[Math.floor(Math.random() * colors.length)];

      burst.style.cssText = `
                position: absolute;
                left: ${x}px;
                top: ${y}px;
                width: 6px;
                height: 6px;
                background: radial-gradient(circle, ${color}, transparent);
                border-radius: 50%;
                pointer-events: none;
                z-index: 100;
                box-shadow: 0 0 15px ${color};
            `;

      const angle = (Math.PI * 2 * i) / 16;
      const distance = 80 + Math.random() * 60;
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance;

      burst.animate(
        [
          {
            transform: "translate(0, 0) scale(1)",
            opacity: 1,
          },
          {
            transform: `translate(${tx}px, ${ty}px) scale(0)`,
            opacity: 0,
          },
        ],
        {
          duration: 1000,
          easing: "ease-out",
        }
      );

      card.querySelector(".card-inner").appendChild(burst);
      setTimeout(() => burst.remove(), 1000);
    }
  }

  function getElementColors(element) {
    const colorMap = {
      fire: ["#ff4444", "#ff8800", "#ffd700"],
      ice: ["#88d3f0", "#4db8e8", "#1a8fb8"],
      lightning: ["#ffd700", "#ffaa00", "#fff"],
      water: ["#4fc3f7", "#29b6f6", "#0288d1"],
      wind: ["#90ee90", "#50c878", "#fff"],
      earth: ["#d4a574", "#a67c52", "#7a5230"],
      dark: ["#8b5cf6", "#6a0dad", "#4b0082"],
      light: ["#fff9e6", "#ffe680", "#ffd633"],
    };

    return colorMap[element] || ["#ffd700", "#fff"];
  }

  function animateCrystalPattern(card) {
    const pattern = card.querySelector(".crystal-pattern");
    if (pattern) {
      // אנימציה מקרית
      const delay = Math.random() * 2;
      pattern.style.animationDelay = delay + "s";
    }
  }
});

// פונקציות עזר ליצירת כרטיסי Final Fantasy
const FinalFantasyTemplates = {
  createForward: function (data) {
    return `
            <div class="card-wrapper">
                <div class="card ff-card" data-card-type="forward" data-element="${
                  data.element
                }">
                    <div class="card-inner">
                        <div class="card-background ff-${data.element}"></div>
                        <div class="holographic-layer"></div>
                        <div class="crystal-pattern"></div>
                        ${
                          data.rarity === "L"
                            ? '<div class="rainbow-layer"></div>'
                            : ""
                        }
                        <div class="sparkle-layer">
                            ${this.createSparkles(data.rarity === "L" ? 7 : 5)}
                        </div>
                        <div class="card-content ff-content">
                            <div class="ff-header">
                                <div class="element-icon ${
                                  data.element
                                }-icon">${data.elementIcon}</div>
                                <div class="card-name-section">
                                    <h2 class="ff-name">${data.name}</h2>
                                    <div class="ff-job">${data.job}</div>
                                </div>
                                <div class="cost-section">
                                    <div class="cp-cost">
                                        <span class="cost-label">CP</span>
                                        <span class="cost-value">${
                                          data.cost
                                        }</span>
                                    </div>
                                </div>
                            </div>
                            <div class="ff-artwork">
                                <div class="power-display">
                                    <span class="power-value">${
                                      data.power
                                    }</span>
                                </div>
                                <div class="ff-image">
                                    <img src="${data.image}" alt="${data.name}">
                                </div>
                            </div>
                            <div class="ff-info-section">
                                <div class="ff-abilities">
                                    ${this.createAbilities(data.abilities)}
                                </div>
                                <div class="category-info">
                                    <span class="category-label">Category:</span>
                                    <span class="category-value">${
                                      data.category
                                    }</span>
                                </div>
                            </div>
                            <div class="ff-footer">
                                <div class="card-number">${
                                  data.cardNumber
                                }</div>
                                <div class="rarity ff-${data.rarityClass}">${
      data.rarity
    }</div>
                                <div class="series-icon">${data.series}</div>
                            </div>
                        </div>
                        <div class="border-glow ff-glow-${data.element}"></div>
                    </div>
                </div>
            </div>
        `;
  },

  createSummon: function (data) {
    return `
            <div class="card-wrapper">
                <div class="card ff-card" data-card-type="summon" data-element="${
                  data.element
                }">
                    <div class="card-inner">
                        <div class="card-background ff-${data.element}"></div>
                        <div class="rainbow-layer"></div>
                        <div class="sparkle-layer">
                            ${this.createSparkles(7)}
                        </div>
                        <div class="card-content ff-content summon-content">
                            <div class="ff-header summon-header">
                                <div class="element-icon ${
                                  data.element
                                }-icon">${data.elementIcon}</div>
                                <div class="card-name-section">
                                    <h2 class="ff-name summon-name">${
                                      data.name
                                    }</h2>
                                    <div class="ff-job">Summon</div>
                                </div>
                                <div class="cost-section">
                                    <div class="cp-cost summon-cost">
                                        <span class="cost-label">CP</span>
                                        <span class="cost-value">${
                                          data.cost
                                        }</span>
                                    </div>
                                </div>
                            </div>
                            <div class="ff-artwork summon-artwork">
                                <div class="summon-badge">SUMMON</div>
                                <div class="ff-image">
                                    <img src="${data.image}" alt="${data.name}">
                                </div>
                            </div>
                            <div class="ff-info-section summon-info">
                                <div class="summon-effect">
                                    <h3><span class="ability-icon">${
                                      data.abilityIcon
                                    }</span> ${data.abilityName}</h3>
                                    <p>${data.effect}</p>
                                    ${
                                      data.note
                                        ? `<p class="effect-note">${data.note}</p>`
                                        : ""
                                    }
                                </div>
                                <div class="category-info">
                                    <span class="category-label">Category:</span>
                                    <span class="category-value">${
                                      data.category
                                    }</span>
                                </div>
                            </div>
                            <div class="ff-footer">
                                <div class="card-number">${
                                  data.cardNumber
                                }</div>
                                <div class="rarity ff-legend">L</div>
                                <div class="series-icon">SUMMON</div>
                            </div>
                        </div>
                        <div class="border-glow ff-glow-${data.element}"></div>
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

  createAbilities: function (abilities) {
    return abilities
      .map(
        (ability) => `
            <div class="ability ff-ability">
                <h3><span class="ability-icon">${ability.icon}</span> ${ability.name}</h3>
                <p>${ability.text}</p>
            </div>
        `
      )
      .join("");
  },
};
