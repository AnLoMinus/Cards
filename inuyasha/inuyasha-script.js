// סקריפט ייחודי לכרטיסי אינויאשה
document.addEventListener('DOMContentLoaded', function() {
    const inuyashaCards = document.querySelectorAll('.inuyasha-card');
    
    inuyashaCards.forEach(card => {
        // אפקט אאורה לשדים
        if (card.querySelector('.demon-aura')) {
            addDemonAuraEffect(card);
        }
        
        // אפקט שבר אבן החן
        if (card.classList.contains('jewel-card')) {
            addJewelEffect(card);
        }
    });
    
    function addDemonAuraEffect(card) {
        const aura = card.querySelector('.demon-aura');
        
        card.addEventListener('mouseenter', function() {
            if (aura) {
                aura.style.opacity = '1';
                aura.style.transition = 'opacity 0.5s ease';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (aura) {
                aura.style.opacity = '0.5';
            }
        });
    }
    
    function addJewelEffect(card) {
        const jewel = card.querySelector('.giant-jewel');
        
        card.addEventListener('click', function(e) {
            // אפקט הבהוב של שבר
            if (jewel) {
                jewel.style.animation = 'none';
                setTimeout(() => {
                    jewel.style.animation = 'jewelFloat 3s ease-in-out infinite, jewelGlow 2s ease-in-out infinite, jewelFlash 0.5s ease';
                }, 10);
            }
            
            // יצירת ניצוצות ורודים וזהובים
            createJewelSparkles(card, e);
        });
    }
    
    function createJewelSparkles(card, event) {
        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        for (let i = 0; i < 10; i++) {
            const sparkle = document.createElement('div');
            const colors = ['#ffd700', '#ee82ee', '#da70d6', '#ffb6c1'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            sparkle.style.cssText = `
                position: absolute;
                left: ${x}px;
                top: ${y}px;
                width: 5px;
                height: 5px;
                background: ${color};
                border-radius: 50%;
                pointer-events: none;
                z-index: 100;
                box-shadow: 0 0 10px ${color};
            `;
            
            const angle = (Math.PI * 2 * i) / 10;
            const distance = 70 + Math.random() * 50;
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance;
            
            sparkle.animate([
                { transform: 'translate(0, 0) scale(1)', opacity: 1 },
                { transform: `translate(${tx}px, ${ty}px) scale(0)`, opacity: 0 }
            ], {
                duration: 1000,
                easing: 'ease-out'
            });
            
            card.querySelector('.card-inner').appendChild(sparkle);
            setTimeout(() => sparkle.remove(), 1000);
        }
    }
});

// אנימציית flash לשברים
const style = document.createElement('style');
style.textContent = `
    @keyframes jewelFlash {
        0%, 100% { transform: scale(1); }
        50% { transform: scale(1.2); }
    }
`;
document.head.appendChild(style);

