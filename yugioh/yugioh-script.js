// סקריפט ייחודי לכרטיסי יוגיהו
document.addEventListener('DOMContentLoaded', function() {
    const yugiohCards = document.querySelectorAll('.yugioh-card');
    
    yugiohCards.forEach(card => {
        // אפקט שכבות על כרטיסי XYZ
        if (card.dataset.cardType === 'xyz') {
            addXYZEffect(card);
        }
        
        // אפקט הבהוב לכוכבים
        animateStars(card);
    });
    
    function addXYZEffect(card) {
        const cardInner = card.querySelector('.card-inner');
        
        // יצירת שכבת אפקט XYZ נוספת
        const xyzOverlay = document.createElement('div');
        xyzOverlay.className = 'xyz-overlay';
        xyzOverlay.style.cssText = `
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: radial-gradient(circle at var(--x, 50%) var(--y, 50%), 
                rgba(255, 215, 0, 0.3) 0%, 
                transparent 50%);
            pointer-events: none;
            z-index: 2;
            opacity: 0;
            transition: opacity 0.3s;
        `;
        
        cardInner.insertBefore(xyzOverlay, cardInner.firstChild);
        
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = ((e.clientX - rect.left) / rect.width) * 100;
            const y = ((e.clientY - rect.top) / rect.height) * 100;
            
            xyzOverlay.style.setProperty('--x', x + '%');
            xyzOverlay.style.setProperty('--y', y + '%');
            xyzOverlay.style.opacity = '1';
        });
        
        card.addEventListener('mouseleave', () => {
            xyzOverlay.style.opacity = '0';
        });
    }
    
    function animateStars(card) {
        const stars = card.querySelectorAll('.star, .rank-star');
        stars.forEach((star, index) => {
            star.style.animationDelay = (index * 0.1) + 's';
        });
    }
});

// פונקציות עזר ליצירת כרטיסי יוגיהו
const YugiohTemplates = {
    createMonster: function(data) {
        return `
            <div class="card-wrapper">
                <div class="card yugioh-card" data-card-type="${data.type}">
                    <div class="card-inner">
                        <div class="card-background yugioh-${data.type}"></div>
                        <div class="holographic-layer"></div>
                        <div class="yugioh-border"></div>
                        <div class="card-content yugioh-content">
                            <div class="yugioh-header">
                                <h2 class="yugioh-name">${data.name}</h2>
                                <div class="yugioh-attribute ${data.attribute}">${data.attributeIcon}</div>
                            </div>
                            <div class="yugioh-image-container">
                                <div class="yugioh-level">
                                    ${this.createStars(data.level)}
                                </div>
                                <div class="yugioh-artwork">
                                    <img src="${data.image}" alt="${data.name}">
                                </div>
                            </div>
                            <div class="yugioh-info-box">
                                <div class="yugioh-type-line">
                                    <span>[${data.monsterType}]</span>
                                </div>
                                <div class="yugioh-description">
                                    ${data.description}
                                </div>
                            </div>
                            <div class="yugioh-stats">
                                <div class="atk">ATK/ ${data.atk}</div>
                                <div class="def">DEF/ ${data.def}</div>
                            </div>
                            <div class="yugioh-footer">
                                <div class="card-code">${data.code}</div>
                                <div class="edition">${data.edition}</div>
                                <div class="holographic-mark">${data.rarity}</div>
                            </div>
                        </div>
                        <div class="border-glow yugioh-glow"></div>
                    </div>
                </div>
            </div>
        `;
    },
    
    createStars: function(level) {
        let stars = '';
        for (let i = 0; i < level; i++) {
            stars += '<span class="star">⭐</span>';
        }
        return stars;
    },
    
    createSpell: function(data) {
        return `
            <div class="card-wrapper">
                <div class="card yugioh-card" data-card-type="spell">
                    <div class="card-inner">
                        <div class="card-background yugioh-spell"></div>
                        <div class="holographic-layer"></div>
                        <div class="yugioh-border spell-border"></div>
                        <div class="card-content yugioh-content">
                            <div class="yugioh-header">
                                <h2 class="yugioh-name">${data.name}</h2>
                                <div class="yugioh-spell-icon">🔮</div>
                            </div>
                            <div class="yugioh-image-container spell-container">
                                <div class="yugioh-artwork">
                                    <img src="${data.image}" alt="${data.name}">
                                </div>
                            </div>
                            <div class="yugioh-info-box spell-box">
                                <div class="yugioh-type-line">
                                    <span>[Spell Card / ${data.spellType}]</span>
                                </div>
                                <div class="yugioh-description spell-effect">
                                    ${data.effect}
                                </div>
                            </div>
                            <div class="yugioh-footer">
                                <div class="card-code">${data.code}</div>
                                <div class="edition">${data.edition}</div>
                                <div class="holographic-mark">${data.rarity}</div>
                            </div>
                        </div>
                        <div class="border-glow spell-glow"></div>
                    </div>
                </div>
            </div>
        `;
    }
};

