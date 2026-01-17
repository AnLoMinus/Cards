// סקריפט ייחודי לכרטיסי נארוטו
document.addEventListener('DOMContentLoaded', function() {
    const narutoCards = document.querySelectorAll('.naruto-card');
    
    narutoCards.forEach(card => {
        // אפקט שרינגן
        if (card.querySelector('.sharingan-overlay')) {
            addSharinganEffect(card);
        }
        
        // אפקט צ'אקרה
        addChakraEffect(card);
    });
    
    function addSharinganEffect(card) {
        const sharingan = card.querySelector('.sharingan-overlay');
        
        card.addEventListener('mouseenter', function() {
            if (sharingan) {
                sharingan.style.opacity = '0.6';
                sharingan.style.transition = 'opacity 0.5s ease';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (sharingan) {
                sharingan.style.opacity = '0.3';
            }
        });
    }
    
    function addChakraEffect(card) {
        card.addEventListener('click', function(e) {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            // יצירת אפקט צ'אקרה
            for (let i = 0; i < 6; i++) {
                const chakra = document.createElement('div');
                chakra.style.cssText = `
                    position: absolute;
                    left: ${x}px;
                    top: ${y}px;
                    width: 6px;
                    height: 6px;
                    background: radial-gradient(circle, #64b5f6, #2196f3);
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 100;
                    box-shadow: 0 0 10px #64b5f6;
                `;
                
                const angle = (Math.PI * 2 * i) / 6;
                const distance = 60 + Math.random() * 30;
                const tx = Math.cos(angle) * distance;
                const ty = Math.sin(angle) * distance;
                
                chakra.animate([
                    { transform: 'translate(0, 0) scale(1)', opacity: 1 },
                    { transform: `translate(${tx}px, ${ty}px) scale(0)`, opacity: 0 }
                ], {
                    duration: 800,
                    easing: 'ease-out'
                });
                
                card.querySelector('.card-inner').appendChild(chakra);
                setTimeout(() => chakra.remove(), 800);
            }
        });
    }
});

