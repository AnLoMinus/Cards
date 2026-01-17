// סקריפט ייחודי לכרטיסי Marvel
document.addEventListener("DOMContentLoaded", function () {
  const marvelCards = document.querySelectorAll(".marvel-card");

  marvelCards.forEach((card) => {
    // אפקטים מיוחדים לאבני אינסוף
    if (card.classList.contains("stone-card")) {
      addInfinityStoneEffect(card);
    }

    // אפקט אאורה לדמויות Cosmic
    if (card.querySelector(".infinity-glow")) {
      addCosmicEffect(card);
    }

    // אפקט מיסטי
    if (card.querySelector(".mystic-aura")) {
      addMysticEffect(card);
    }

    // אפקט Gamma לכרטיסי Hulk
    if (card.dataset.rarity === "epic" && card.querySelector(".marvel-gamma")) {
      addGammaEffect(card);
    }
  });

  function addInfinityStoneEffect(card) {
    const stone = card.querySelector(".giant-stone");

    card.addEventListener("click", function (e) {
      // אפקט התפוצצות של אבן אינסוף
      createInfinityStoneBurst(card, e);

      // הבהוב עז
      if (stone) {
        stone.style.animation = "none";
        setTimeout(() => {
          stone.style.animation =
            "stoneFloat 3s ease-in-out infinite, stoneGlow 2s ease-in-out infinite, stoneFlash 0.5s ease";
        }, 10);
      }
    });
  }

  function createInfinityStoneBurst(card, event) {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    const stoneType = card.dataset.stone;
    const color = getStoneColor(stoneType);

    // יצירת התפוצצות אנרגיה
    for (let i = 0; i < 20; i++) {
      const burst = document.createElement("div");

      burst.style.cssText = `
                position: absolute;
                left: ${x}px;
                top: ${y}px;
                width: 8px;
                height: 8px;
                background: radial-gradient(circle, ${color}, transparent);
                border-radius: 50%;
                pointer-events: none;
                z-index: 100;
                box-shadow: 0 0 20px ${color};
            `;

      const angle = (Math.PI * 2 * i) / 20;
      const distance = 100 + Math.random() * 80;
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
          duration: 1200,
          easing: "ease-out",
        }
      );

      card.querySelector(".card-inner").appendChild(burst);
      setTimeout(() => burst.remove(), 1200);
    }
  }

  function getStoneColor(stone) {
    const colors = {
      power: "#9370db",
      space: "#4169e1",
      time: "#32cd32",
      mind: "#ffd700",
      reality: "#dc143c",
      soul: "#ff8c00",
    };

    return colors[stone] || "#ffd700";
  }

  function addCosmicEffect(card) {
    const infinityGlow = card.querySelector(".infinity-glow");

    card.addEventListener("mouseenter", function () {
      if (infinityGlow) {
        infinityGlow.style.opacity = "1";
        infinityGlow.style.transition = "opacity 0.5s ease";
      }
    });

    card.addEventListener("mouseleave", function () {
      if (infinityGlow) {
        infinityGlow.style.opacity = "0.5";
      }
    });
  }

  function addMysticEffect(card) {
    const mysticAura = card.querySelector(".mystic-aura");

    card.addEventListener("mouseenter", function () {
      if (mysticAura) {
        mysticAura.style.opacity = "1";
        mysticAura.style.transition = "opacity 0.5s ease";
      }
    });

    card.addEventListener("mouseleave", function () {
      if (mysticAura) {
        mysticAura.style.opacity = "0.6";
      }
    });
  }

  function addGammaEffect(card) {
    card.addEventListener("click", function (e) {
      // אפקט Gamma burst
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;

      for (let i = 0; i < 12; i++) {
        const gamma = document.createElement("div");

        gamma.style.cssText = `
                    position: absolute;
                    left: ${x}px;
                    top: ${y}px;
                    width: 6px;
                    height: 6px;
                    background: radial-gradient(circle, #32cd32, #228b22);
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 100;
                    box-shadow: 0 0 15px #32cd32;
                `;

        const angle = (Math.PI * 2 * i) / 12;
        const distance = 70 + Math.random() * 40;
        const tx = Math.cos(angle) * distance;
        const ty = Math.sin(angle) * distance;

        gamma.animate(
          [
            { transform: "translate(0, 0) scale(1)", opacity: 1 },
            { transform: `translate(${tx}px, ${ty}px) scale(0)`, opacity: 0 },
          ],
          {
            duration: 900,
            easing: "ease-out",
          }
        );

        card.querySelector(".card-inner").appendChild(gamma);
        setTimeout(() => gamma.remove(), 900);
      }
    });
  }
});

// אנימציית flash לאבני אינסוף
const style = document.createElement("style");
style.textContent = `
    @keyframes stoneFlash {
        0%, 100% { transform: translateY(0) scale(1); }
        50% { transform: translateY(-10px) scale(1.15); }
    }
`;
document.head.appendChild(style);

// פונקציות עזר ליצירת כרטיסי Marvel
const MarvelTemplates = {
  createHero: function (data) {
    return `
            <div class="card-wrapper">
                <div class="card marvel-card" data-card-type="hero" data-rarity="${
                  data.rarity
                }">
                    <div class="card-inner">
                        <div class="card-background marvel-${data.theme}"></div>
                        <div class="${
                          data.rarity === "legendary" ? "rainbow-layer" : "holographic-layer"
                        }"></div>
                        ${
                          data.pattern
                            ? `<div class="${data.pattern}"></div>`
                            : ""
                        }
                        <div class="sparkle-layer">
                            ${this.createSparkles(
                              data.rarity === "legendary" ? 7 : 5
                            )}
                        </div>
                        <div class="card-content marvel-content">
                            <div class="marvel-header">
                                <div class="hero-badge ${data.rarity}">${
      data.rarity.toUpperCase()
    }</div>
                                <h2 class="marvel-name">${data.name}</h2>
                                <div class="hero-title">${data.realName}</div>
                            </div>
                            <div class="marvel-artwork">
                                <div class="power-stats">
                                    <div class="stat">
                                        <span class="stat-icon">⚔️</span>
                                        <span class="stat-value">${data.atk}</span>
                                    </div>
                                    <div class="stat">
                                        <span class="stat-icon">🛡️</span>
                                        <span class="stat-value">${data.def}</span>
                                    </div>
                                </div>
                                <div class="marvel-image">
                                    <img src="${data.image}" alt="${data.name}">
                                </div>
                                <div class="team-affiliation">
                                    ${data.teams
                                      .map(
                                        (team) =>
                                          `<span class="team-badge ${team.toLowerCase()}">${team.toUpperCase()}</span>`
                                      )
                                      .join("")}
                                </div>
                            </div>
                            <div class="marvel-info">
                                <div class="abilities-section">
                                    ${this.createAbilities(data.abilities)}
                                </div>
                                <div class="powers-list">
                                    ${data.powers
                                      .map(
                                        (power) =>
                                          `<span class="power-tag">${power}</span>`
                                      )
                                      .join("")}
                                </div>
                            </div>
                            <div class="marvel-footer">
                                <div class="card-number">${data.cardNumber}</div>
                                <div class="universe-icon">${data.universe}</div>
                                <div class="rarity-symbol ${data.rarity}">${
      data.raritySymbol
    }</div>
                            </div>
                        </div>
                        <div class="border-glow marvel-glow-${data.theme}"></div>
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
            <div class="ability marvel-ability ${
              ability.legendary ? "legendary-ability" : ""
            }">
                <h3><span class="ability-icon">${ability.icon}</span> ${
          ability.name
        }</h3>
                <p>${ability.text}</p>
            </div>
        `
      )
      .join("");
  },
};

