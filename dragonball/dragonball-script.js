// סקריפט ייחודי לכרטיסי דרגון בול
document.addEventListener('DOMContentLoaded', function() {
    const dbCards = document.querySelectorAll('.db-card');
    
    dbCards.forEach(card => {
        // אפקט אאורה מיוחד לכרטיסים Ultra
        if (card.dataset.rarity === 'ultra' || card.dataset.rarity === 'secret') {
            addAuraEffect(card);
        }
        
        // אפקט התפוצצות כוח
        card.addEventListener('click', function(e) {
            createPowerBurst(card, e);
        });
    });
    
    function addAuraEffect(card) {
        const aura = card.querySelector('.energy-aura, .rainbow-layer');
        if (aura) {
            // אנימציה מתקדמת של אאורה
            aura.style.animation = 'auraPulse 2s ease-in-out infinite, auraRotate 20s linear infinite';
        }
    }
    
    function createPowerBurst(card, event) {
        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        // יצירת אפקט התפוצצות
        for (let i = 0; i < 12; i++) {
            const burst = document.createElement('div');
            burst.className = 'power-burst';
            burst.style.cssText = `
                position: absolute;
                left: ${x}px;
                top: ${y}px;
                width: 4px;
                height: 4px;
                background: radial-gradient(circle, #ffd60a, #ff006e);
                border-radius: 50%;
                pointer-events: none;
                z-index: 100;
            `;
            
            const angle = (Math.PI * 2 * i) / 12;
            const distance = 80 + Math.random() * 40;
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance;
            
            const duration = 0.6 + Math.random() * 0.4;
            burst.animate([
                {
                    transform: 'translate(0, 0) scale(1)',
                    opacity: 1
                },
                {
                    transform: `translate(${tx}px, ${ty}px) scale(0)`,
                    opacity: 0
                }
            ], {
                duration: duration * 1000,
                easing: 'ease-out'
            });
            
            card.querySelector('.card-inner').appendChild(burst);
            
            setTimeout(() => burst.remove(), duration * 1000);
        }
    }
});

// פונקציות עזר ליצירת כרטיסי דרגון בול
const DragonBallTemplates = {
    createCharacter: function(data) {
        return `
            <div class="card-wrapper">
                <div class="card db-card" data-card-type="character" data-rarity="${data.rarity}">
                    <div class="card-inner">
                        <div class="card-background db-${data.color}"></div>
                        <div class="energy-aura ${data.color}-aura"></div>
                        ${data.rarity === 'ultra' || data.rarity === 'secret' ? '<div class="rainbow-layer"></div>' : ''}
                        <div class="sparkle-layer">
                            ${this.createSparkles(data.sparkles || 5)}
                        </div>
                        <div class="card-content db-content">
                            <div class="db-header">
                                <div class="db-cost ${data.rarity === 'ultra' ? 'ultra' : ''}">
                                    <span class="cost-number">${data.cost}</span>
                                </div>
                                <h2 class="db-name ${data.rarity === 'ultra' ? 'ultra-name' : ''}">${data.name}</h2>
                                <div class="db-color ${data.color}">${data.colorIcon}</div>
                            </div>
                            <div class="db-character-art">
                                <div class="power-level ${data.rarity === 'ultra' ? 'ultra' : ''}">
                                    <span class="power-label">כוח:</span>
                                    <span class="power-value">${data.power}</span>
                                </div>
                                <div class="character-image">
                                    <img src="${data.image}" alt="${data.name}">
                                </div>
                            </div>
                            <div class="db-info-section">
                                <div class="character-title ${data.rarity === 'ultra' ? 'ultra-title' : ''}">
                                    <span class="title-text">${data.type}</span>
                                </div>
                                <div class="db-abilities">
                                    ${this.createAbilities(data.abilities)}
                                </div>
                                <div class="db-combo ${data.rarity === 'ultra' ? 'ultra' : ''}">
                                    <span class="combo-label">Combo Power:</span>
                                    <span class="combo-value">+${data.combo}</span>
                                </div>
                            </div>
                            <div class="db-footer">
                                <div class="card-number">${data.code}</div>
                                <div class="series-icon">DB⭐</div>
                                <div class="rarity-symbol ${data.rarityClass}">${data.rarityText}</div>
                            </div>
                        </div>
                        <div class="border-glow db-glow-${data.color}"></div>
                    </div>
                </div>
            </div>
        `;
    },
    
    createSparkles: function(count) {
        let html = '';
        for (let i = 0; i < count; i++) {
            html += '<div class="sparkle"></div>';
        }
        return html;
    },
    
    createAbilities: function(abilities) {
        return abilities.map(ability => `
            <div class="ability ${ability.special ? 'special' : ''} ${ability.ultra ? 'ultra-ability' : ''}">
                <h3><span class="ability-icon">${ability.icon}</span> ${ability.name}</h3>
                <p>${ability.description}</p>
            </div>
        `).join('');
    }
};

