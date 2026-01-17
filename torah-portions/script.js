// אפקטים אינטראקטיביים לכרטיסים
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.card');
    
    cards.forEach(card => {
        // אפקט תנועה תלת מימדית
        card.addEventListener('mousemove', handleMouseMove);
        card.addEventListener('mouseenter', handleMouseEnter);
        card.addEventListener('mouseleave', handleMouseLeave);
        
        // אפקט קליק
        card.addEventListener('click', handleCardClick);
    });
    
    function handleMouseMove(e) {
        const card = e.currentTarget;
        const rect = card.getBoundingClientRect();
        
        // חישוב מיקום העכבר ביחס לכרטיס
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        // נורמליזציה לטווח -1 עד 1
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / centerY * -15; // סיבוב X (למעלה/למטה)
        const rotateY = (x - centerX) / centerX * 15;  // סיבוב Y (שמאל/ימין)
        
        // עדכון הטרנספורמציה
        const cardInner = card.querySelector('.card-inner');
        cardInner.style.transform = `
            perspective(1000px)
            rotateX(${rotateX}deg)
            rotateY(${rotateY}deg)
            scale3d(1.05, 1.05, 1.05)
        `;
        
        // עדכון מיקום השכבה ההולוגרפית
        const holoLayer = card.querySelector('.holographic-layer, .crystal-layer, .rainbow-layer');
        if (holoLayer) {
            const xPercent = (x / rect.width) * 100;
            const yPercent = (y / rect.height) * 100;
            holoLayer.style.backgroundPosition = `${xPercent}% ${yPercent}%`;
        }
        
        // עדכון זוהר המסגרת
        const borderGlow = card.querySelector('.border-glow');
        if (borderGlow) {
            const angle = Math.atan2(y - centerY, x - centerX) * (180 / Math.PI);
            borderGlow.style.setProperty('--glow-angle', `${angle}deg`);
        }
    }
    
    function handleMouseEnter(e) {
        const card = e.currentTarget;
        card.style.zIndex = '10';
    }
    
    function handleMouseLeave(e) {
        const card = e.currentTarget;
        const cardInner = card.querySelector('.card-inner');
        
        // החזרה למצב התחלתי
        cardInner.style.transform = `
            perspective(1000px)
            rotateX(0deg)
            rotateY(0deg)
            scale3d(1, 1, 1)
        `;
        
        card.style.zIndex = '1';
        
        // איפוס השכבה ההולוגרפית
        const holoLayer = card.querySelector('.holographic-layer, .crystal-layer, .rainbow-layer');
        if (holoLayer) {
            holoLayer.style.backgroundPosition = '50% 50%';
        }
    }
    
    function handleCardClick(e) {
        const card = e.currentTarget;
        
        // אפקט הבהוב
        card.classList.add('card-flash');
        setTimeout(() => {
            card.classList.remove('card-flash');
        }, 600);
        
        // יצירת ניצוצות נוספים
        createSparkles(card, e);
    }
    
    function createSparkles(card, event) {
        const rect = card.getBoundingClientRect();
        const x = event.clientX - rect.left;
        const y = event.clientY - rect.top;
        
        for (let i = 0; i < 8; i++) {
            const sparkle = document.createElement('div');
            sparkle.className = 'temp-sparkle';
            sparkle.style.left = x + 'px';
            sparkle.style.top = y + 'px';
            
            const angle = (Math.PI * 2 * i) / 8;
            const distance = 50 + Math.random() * 50;
            const tx = Math.cos(angle) * distance;
            const ty = Math.sin(angle) * distance;
            
            sparkle.style.setProperty('--tx', tx + 'px');
            sparkle.style.setProperty('--ty', ty + 'px');
            
            card.querySelector('.card-inner').appendChild(sparkle);
            
            setTimeout(() => sparkle.remove(), 1000);
        }
    }
    
    // אנימציה אוטומטית של ניצוצות
    function animateSparkles() {
        const sparkles = document.querySelectorAll('.sparkle');
        sparkles.forEach(sparkle => {
            const delay = Math.random() * 3;
            sparkle.style.animationDelay = delay + 's';
        });
    }
    
    animateSparkles();
    
    // אתחול תפריט השכבות
    initLayersMenu();
});

// בקרת תפריט שכבות
function initLayersMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const menuContent = document.getElementById('menuContent');
    const closeMenu = document.getElementById('closeMenu');
    
    // בדיקה שהאלמנטים קיימים
    if (!menuToggle || !menuContent || !closeMenu) {
        console.log('תפריט השכבות לא נמצא בדף זה');
        return;
    }
    
    // פתיחה/סגירה של התפריט
    menuToggle.addEventListener('click', (e) => {
        e.stopPropagation();
        menuContent.classList.toggle('active');
    });
    
    closeMenu.addEventListener('click', (e) => {
        e.stopPropagation();
        menuContent.classList.remove('active');
    });
    
    // סגירה בלחיצה מחוץ לתפריט
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.layers-menu')) {
            menuContent.classList.remove('active');
        }
    });
    
    // בקרת שכבות בודדות
    const layerControls = {
        'layer-background': '.card-background',
        'layer-holographic': '.holographic-layer',
        'layer-crystal': '.crystal-layer',
        'layer-rainbow': '.rainbow-layer',
        'layer-sparkles': '.sparkle-layer',
        'layer-border-glow': '.border-glow',
        'layer-content': '.card-content'
    };
    
    Object.keys(layerControls).forEach(controlId => {
        const checkbox = document.getElementById(controlId);
        if (checkbox) {
            checkbox.addEventListener('change', function() {
                const selector = layerControls[controlId];
                const elements = document.querySelectorAll(selector);
                
                elements.forEach(el => {
                    if (this.checked) {
                        el.classList.remove('layer-hidden');
                    } else {
                        el.classList.add('layer-hidden');
                    }
                });
            });
        }
    });
    
    // בקרת אפקט 3D
    const layer3D = document.getElementById('layer-3d');
    if (layer3D) {
        layer3D.addEventListener('change', function() {
            const cards = document.querySelectorAll('.card');
            cards.forEach(card => {
                if (this.checked) {
                    card.classList.remove('no-3d-effect');
                } else {
                    card.classList.add('no-3d-effect');
                }
            });
        });
    }
    
    // בקרת צללי טקסט
    const layerTextShadow = document.getElementById('layer-text-shadow');
    if (layerTextShadow) {
        layerTextShadow.addEventListener('change', function() {
            const body = document.body;
            if (this.checked) {
                body.classList.remove('no-text-shadow');
            } else {
                body.classList.add('no-text-shadow');
            }
        });
    }
    
    // כפתורי פעולות מהירות
    const enableAll = document.getElementById('enableAll');
    const disableAll = document.getElementById('disableAll');
    const resetLayers = document.getElementById('resetLayers');
    
    if (enableAll) {
        enableAll.addEventListener('click', () => {
            document.querySelectorAll('.layer-control input[type="checkbox"]').forEach(cb => {
                cb.checked = true;
                cb.dispatchEvent(new Event('change'));
            });
        });
    }
    
    if (disableAll) {
        disableAll.addEventListener('click', () => {
            document.querySelectorAll('.layer-control input[type="checkbox"]').forEach(cb => {
                cb.checked = false;
                cb.dispatchEvent(new Event('change'));
            });
        });
    }
    
    if (resetLayers) {
        resetLayers.addEventListener('click', () => {
            document.querySelectorAll('.layer-control input[type="checkbox"]').forEach(cb => {
                cb.checked = true;
                cb.dispatchEvent(new Event('change'));
            });
            document.body.classList.remove('no-text-shadow');
            document.querySelectorAll('.card').forEach(card => {
                card.classList.remove('no-3d-effect');
            });
        });
    }
    
    // מצבי Preset
    const presetButtons = document.querySelectorAll('.preset-btn');
    presetButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const preset = this.dataset.preset;
            applyPreset(preset);
        });
    });
}

function applyPreset(preset) {
    const checkboxes = {
        background: document.getElementById('layer-background'),
        holographic: document.getElementById('layer-holographic'),
        crystal: document.getElementById('layer-crystal'),
        rainbow: document.getElementById('layer-rainbow'),
        sparkles: document.getElementById('layer-sparkles'),
        borderGlow: document.getElementById('layer-border-glow'),
        content: document.getElementById('layer-content'),
        effect3d: document.getElementById('layer-3d'),
        textShadow: document.getElementById('layer-text-shadow')
    };
    
    const presets = {
        full: {
            background: true,
            holographic: true,
            crystal: true,
            rainbow: true,
            sparkles: true,
            borderGlow: true,
            content: true,
            effect3d: true,
            textShadow: true
        },
        minimal: {
            background: true,
            holographic: false,
            crystal: false,
            rainbow: false,
            sparkles: false,
            borderGlow: false,
            content: true,
            effect3d: false,
            textShadow: false
        },
        'effects-only': {
            background: false,
            holographic: true,
            crystal: true,
            rainbow: true,
            sparkles: true,
            borderGlow: true,
            content: false,
            effect3d: true,
            textShadow: false
        }
    };
    
    const settings = presets[preset];
    if (settings) {
        Object.keys(settings).forEach(key => {
            if (checkboxes[key]) {
                checkboxes[key].checked = settings[key];
                checkboxes[key].dispatchEvent(new Event('change'));
            }
        });
    }
}

// פונקציות עזר לתבניות
const CardTemplates = {
    // יצירת כרטיס חדש
    createCard: function(data) {
        const template = `
            <div class="card-wrapper">
                <div class="card" data-card-type="${data.type || 'holographic'}">
                    <div class="card-inner">
                        <div class="card-background ${data.bgClass || ''}"></div>
                        <div class="${data.effectLayer || 'holographic-layer'}"></div>
                        <div class="sparkle-layer">
                            ${this.createSparkles(data.sparkleCount || 5)}
                        </div>
                        <div class="card-content">
                            ${this.createCardContent(data)}
                        </div>
                        <div class="border-glow"></div>
                    </div>
                </div>
            </div>
        `;
        return template;
    },
    
    createSparkles: function(count) {
        let sparkles = '';
        for (let i = 0; i < count; i++) {
            sparkles += '<div class="sparkle"></div>';
        }
        return sparkles;
    },
    
    createCardContent: function(data) {
        return `
            <div class="card-header">
                <h2 class="pokemon-name">${data.name}</h2>
                <div class="hp">HP ${data.hp}</div>
            </div>
            <div class="pokemon-image">
                <div class="energy-symbol ${data.energyType}">${data.energySymbol}</div>
            </div>
            <div class="pokemon-info">
                <div class="ability">
                    <h3>${data.abilityTitle}</h3>
                    <p>${data.abilityDesc}</p>
                </div>
                <div class="attacks">
                    <div class="attack">
                        <div class="attack-cost">${data.attackCost}</div>
                        <div class="attack-info">
                            <h4>${data.attackName}</h4>
                            <span class="damage">${data.damage}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card-footer">
                <div class="rarity">${data.rarity}</div>
            </div>
        `;
    }
};

