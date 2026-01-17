// סקריפט ייחודי לכרטיסי מלחמת הניצוצות - Sparks War
document.addEventListener("DOMContentLoaded", function () {
  const sparksCards = document.querySelectorAll(".sparks-card");

  sparksCards.forEach((card) => {
    const cardType = card.dataset.cardType;

    // אפקטים לכרטיסי אור
    if (cardType === "light-weapon") {
      addLightWeaponEffects(card);
    }

    // אפקטים לכרטיסי חושך
    if (cardType === "dark-weapon") {
      addDarkWeaponEffects(card);
    }

    // אפקט hover מיוחד
    card.addEventListener("mouseenter", function () {
      if (cardType === "light-weapon") {
        createLightBurst(card);
      } else if (cardType === "dark-weapon") {
        createDarkSmoke(card);
      }
    });
  });

  // אפקטים לכלי אור
  function addLightWeaponEffects(card) {
    card.addEventListener("click", function (e) {
      createDivineBurst(card, e);
      playLightSound();
    });

    // אפקט רטט של אור
    const lightAura = card.querySelector(".light-aura, .wisdom-aura, .clean-aura, .tech-aura, .love-aura, .marriage-aura, .powder-aura, .eternal-aura");
    if (lightAura) {
      card.addEventListener("mouseenter", function () {
        lightAura.style.transition = "all 0.5s ease";
        lightAura.style.opacity = "1";
      });

      card.addEventListener("mouseleave", function () {
        lightAura.style.opacity = "0.6";
      });
    }
  }

  // אפקטים לכלי חושך
  function addDarkWeaponEffects(card) {
    card.addEventListener("click", function (e) {
      createDarkExplosion(card, e);
      playDarkSound();
    });

    // אפקט רטט של חושך
    const darkAura = card.querySelector(".dark-aura, .dust-aura, .evil-tech-aura, .split-aura");
    if (darkAura) {
      card.addEventListener("mouseenter", function () {
        darkAura.style.transition = "all 0.5s ease";
        darkAura.style.opacity = "1";
        darkAura.style.transform = "scale(1.1)";
      });

      card.addEventListener("mouseleave", function () {
        darkAura.style.opacity = "0.7";
        darkAura.style.transform = "scale(1)";
      });
    }
  }

  // יצירת התפוצצות אלוהית
  function createDivineBurst(card, event) {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    for (let i = 0; i < 16; i++) {
      const particle = document.createElement("div");

      particle.style.cssText = `
                position: absolute;
                left: ${x}px;
                top: ${y}px;
                width: 6px;
                height: 6px;
                background: radial-gradient(circle, #ffd700, #fffacd);
                border-radius: 50%;
                pointer-events: none;
                z-index: 100;
                box-shadow: 0 0 15px #ffd700;
            `;

      const angle = (Math.PI * 2 * i) / 16;
      const distance = 80 + Math.random() * 60;
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance;

      particle.animate(
        [
          { transform: "translate(0, 0) scale(1)", opacity: 1 },
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

      card.querySelector(".card-inner").appendChild(particle);
      setTimeout(() => particle.remove(), 1000);
    }
  }

  // יצירת התפוצצות אפלה
  function createDarkExplosion(card, event) {
    const rect = card.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    for (let i = 0; i < 12; i++) {
      const particle = document.createElement("div");

      particle.style.cssText = `
                position: absolute;
                left: ${x}px;
                top: ${y}px;
                width: 8px;
                height: 8px;
                background: radial-gradient(circle, #ff4444, #8b0000);
                border-radius: 50%;
                pointer-events: none;
                z-index: 100;
                box-shadow: 0 0 20px #ff4444;
            `;

      const angle = (Math.PI * 2 * i) / 12;
      const distance = 70 + Math.random() * 50;
      const tx = Math.cos(angle) * distance;
      const ty = Math.sin(angle) * distance;

      particle.animate(
        [
          { transform: "translate(0, 0) scale(1)", opacity: 1 },
          {
            transform: `translate(${tx}px, ${ty}px) scale(0)`,
            opacity: 0,
          },
        ],
        {
          duration: 800,
          easing: "ease-out",
        }
      );

      card.querySelector(".card-inner").appendChild(particle);
      setTimeout(() => particle.remove(), 800);
    }
  }

  // יצירת התפוצצות אור
  function createLightBurst(card) {
    const cardInner = card.querySelector(".card-inner");
    const burst = document.createElement("div");

    burst.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            width: 20px;
            height: 20px;
            background: radial-gradient(circle, #ffd700, transparent);
            border-radius: 50%;
            pointer-events: none;
            z-index: 100;
        `;

    burst.animate(
      [
        {
          width: "20px",
          height: "20px",
          opacity: 0.8,
        },
        {
          width: "200px",
          height: "200px",
          opacity: 0,
        },
      ],
      {
        duration: 600,
        easing: "ease-out",
      }
    );

    cardInner.appendChild(burst);
    setTimeout(() => burst.remove(), 600);
  }

  // יצירת עשן כהה
  function createDarkSmoke(card) {
    const cardInner = card.querySelector(".card-inner");
    const smoke = document.createElement("div");

    smoke.style.cssText = `
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            width: 100px;
            height: 100px;
            background: radial-gradient(circle, rgba(139, 0, 0, 0.5), transparent);
            border-radius: 50%;
            pointer-events: none;
            z-index: 100;
        `;

    smoke.animate(
      [
        {
          bottom: "0",
          width: "100px",
          height: "100px",
          opacity: 0.8,
        },
        {
          bottom: "100%",
          width: "200px",
          height: "200px",
          opacity: 0,
        },
      ],
      {
        duration: 1500,
        easing: "ease-out",
      }
    );

    cardInner.appendChild(smoke);
    setTimeout(() => smoke.remove(), 1500);
  }

  // אפקטי קול (סימולציה)
  function playLightSound() {
    // כאן ניתן להוסיף אפקטי קול אמיתיים
    console.log("✨ Divine light activated!");
  }

  function playDarkSound() {
    // כאן ניתן להוסיף אפקטי קול אמיתיים
    console.log("💀 Dark power unleashed!");
  }

  // אפקט מיוחד לכרטיסים מיתיים
  const mythicCards = document.querySelectorAll('[data-rarity="mythic"]');
  mythicCards.forEach((card) => {
    card.addEventListener("mouseenter", function () {
      const borderGlow = card.querySelector(".border-glow");
      if (borderGlow) {
        borderGlow.style.transition = "all 0.5s ease";
        borderGlow.style.transform = "scale(1.02)";
      }
    });

    card.addEventListener("mouseleave", function () {
      const borderGlow = card.querySelector(".border-glow");
      if (borderGlow) {
        borderGlow.style.transform = "scale(1)";
      }
    });
  });
});

// פונקציות עזר ליצירת כרטיסים
const SparksTemplates = {
  createLightWeapon: function (data) {
    return `
            <div class="card-wrapper">
                <div class="card sparks-card" data-card-type="light-weapon" data-rarity="${data.rarity}" data-legion="${data.legion}">
                    <div class="card-inner">
                        <div class="card-background ${data.background}"></div>
                        <div class="${data.rarity === "mythic" || data.rarity === "legendary" ? "rainbow-layer" : "holographic-layer"}"></div>
                        ${data.pattern ? `<div class="${data.pattern}"></div>` : ""}
                        <div class="sparkle-layer">
                            ${this.createSparkles(data.rarity === "mythic" ? 8 : 6)}
                        </div>
                        <div class="card-content sparks-content">
                            <div class="sparks-header">
                                <div class="legion-badge ${data.legion}">${data.legionName}</div>
                                <h2 class="sparks-name">${data.name}</h2>
                                <div class="sparks-subtitle">${data.subtitle}</div>
                            </div>
                            <div class="sparks-artwork">
                                <div class="power-stats">
                                    <div class="stat power">
                                        <span class="stat-label">עוצמה</span>
                                        <span class="stat-value">${data.power}</span>
                                    </div>
                                    <div class="stat defense">
                                        <span class="stat-label">הגנה</span>
                                        <span class="stat-value">${data.defense}</span>
                                    </div>
                                    <div class="stat speed">
                                        <span class="stat-label">מהירות</span>
                                        <span class="stat-value">${data.speed}</span>
                                    </div>
                                </div>
                                <div class="sparks-image">
                                    <div class="${data.aura}"></div>
                                    <p class="placeholder-text">${data.icon}<br/>${data.name}</p>
                                </div>
                                <div class="rarity-indicator">
                                    <span class="rarity-badge ${data.rarity}">${data.rarityText}</span>
                                </div>
                            </div>
                            <div class="sparks-info">
                                <div class="abilities-section">
                                    ${this.createAbilities(data.abilities)}
                                </div>
                            </div>
                            <div class="sparks-footer">
                                <div class="card-number">${data.cardNumber}</div>
                                <div class="element-icon light">אור</div>
                                <div class="stars">${this.createStars(data.stars)}</div>
                            </div>
                        </div>
                        <div class="border-glow ${data.glow}"></div>
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
    return "★".repeat(count);
  },

  createAbilities: function (abilities) {
    return abilities
      .map(
        (ability) => `
            <div class="ability sparks-ability ${ability.type}">
                <h3><span class="ability-icon">${ability.icon}</span> ${ability.name}</h3>
                <p>${ability.text}</p>
            </div>
        `
      )
      .join("");
  },
};

// אפקט מיוחד לטעינת הדף
window.addEventListener("load", function () {
  const cards = document.querySelectorAll(".sparks-card");

  cards.forEach((card, index) => {
    card.style.opacity = "0";
    card.style.transform = "translateY(30px)";

    setTimeout(() => {
      card.style.transition = "all 0.6s ease";
      card.style.opacity = "1";
      card.style.transform = "translateY(0)";
    }, index * 100);
  });
});

