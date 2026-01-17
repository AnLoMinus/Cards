// סקריפט ייחודי לכרטיסי דיגימון
document.addEventListener('DOMContentLoaded', function() {
    const digimonCards = document.querySelectorAll('.digimon-card');
    
    digimonCards.forEach(card => {
        // אפקט התפתחות לכרטיסי Mega
        if (card.dataset.cardType === 'mega') {
            addEvolutionEffect(card);
        }
        
        // אנימציית DP
        animateDP(card);
    });
    
    function addEvolutionEffect(card) {
        card.addEventListener('mouseenter', function() {
            const dpValue = card.querySelector('.dp-value');
            if (dpValue) {
                dpValue.style.transform = 'scale(1.1)';
                dpValue.style.transition = 'transform 0.3s ease';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const dpValue = card.querySelector('.dp-value');
            if (dpValue) {
                dpValue.style.transform = 'scale(1)';
            }
        });
    }
    
    function animateDP(card) {
        const dpNumber = card.querySelector('.dp-number');
        if (dpNumber) {
            const targetValue = parseInt(dpNumber.textContent);
            let currentValue = 0;
            const increment = targetValue / 30;
            
            const interval = setInterval(() => {
                currentValue += increment;
                if (currentValue >= targetValue) {
                    currentValue = targetValue;
                    clearInterval(interval);
                }
                // אנימציה תתבצע רק פעם אחת בטעינה
            }, 30);
        }
    }
});

// פונקציות עזר ליצירת כרטיסי דיגימון
const DigimonTemplates = {
    createDigimon: function(data) {
        return `
            <div class="card-wrapper">
                <div class="card digimon-card" data-card-type="${data.level}">
                    <div class="card-inner">
                        <div class="card-background digimon-${data.level}"></div>
                        <div class="holographic-layer"></div>
                        <div class="digimon-pattern"></div>
                        ${data.mega ? '<div class="rainbow-layer"></div>' : ''}
                        <div class="card-content digimon-content">
                            <div class="digimon-header">
                                <div class="digimon-level ${data.level}-level">
                                    <span>Lv.${data.levelNumber}</span>
                                </div>
                                <h2 class="digimon-name ${data.mega ? 'mega-name' : ''}">${data.name}</h2>
                                <div class="digimon-cost ${data.mega ? 'mega-cost' : ''}">
                                    <span class="cost-value">${data.cost}</span>
                                </div>
                            </div>
                            <div class="digimon-art ${data.mega ? 'mega-art' : ''}">
                                <div class="dp-value ${data.mega ? 'mega-dp' : ''}">
                                    <span class="dp-label">DP</span>
                                    <span class="dp-number">${data.dp}</span>
                                </div>
                                <div class="digimon-image">
                                    <img src="${data.image}" alt="${data.name}">
                                </div>
                            </div>
                            <div class="digimon-info">
                                <div class="digimon-type ${data.mega ? 'mega-type' : ''}">
                                    <div class="type-badge ${data.level}-badge">${data.levelName}</div>
                                    <div class="attribute-badge ${data.attribute}">${data.attributeIcon} ${data.attributeName}</div>
                                </div>
                                <div class="digimon-effect ${data.mega ? 'mega-effect' : ''}">
                                    <h3><span class="effect-icon">${data.effectIcon}</span> ${data.effectName}</h3>
                                    <p>${data.effectText}</p>
                                </div>
                                <div class="evolution-cost ${data.mega ? 'mega-evo' : ''}">
                                    <span class="evo-label">Evolution Cost:</span>
                                    <span class="evo-value">${data.evoCost}</span>
                                </div>
                            </div>
                            <div class="digimon-footer">
                                <div class="card-number">${data.cardNumber}</div>
                                <div class="rarity ${data.rarityClass}">${data.rarity}</div>
                            </div>
                        </div>
                        <div class="border-glow digimon-glow-${data.level}"></div>
                    </div>
                </div>
            </div>
        `;
    }
};

