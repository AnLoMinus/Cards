// ניהול פאנל השליטה בשכבות - Layer Control Manager

// פתיחה וסגירה של פאנל השליטה
const panelToggle = document.getElementById('panelToggle');
const controlPanel = document.getElementById('controlPanel');

panelToggle.addEventListener('click', () => {
    controlPanel.classList.toggle('hidden');
});

// מערך לשמירת מצב השכבות
const layerStates = {
    glow: true,
    header: true,
    title: true,
    theme: true,
    'turning-points': true,
    timeline: true,
    teachings: true,
    values: true,
    rating: true,
    verse: true
};

/**
 * פונקציה לשינוי מצב שכבה
 * @param {string} layerName - שם השכבה
 * @param {HTMLElement} toggle - אלמנט הכפתור
 */
function toggleLayer(layerName, toggle) {
    const elements = document.querySelectorAll(`[data-layer-element="${layerName}"]`);
    
    if (toggle.classList.contains('active')) {
        // כיבוי השכבה
        toggle.classList.remove('active');
        elements.forEach(el => el.classList.add('layer-off'));
        layerStates[layerName] = false;
    } else {
        // הדלקת השכבה
        toggle.classList.add('active');
        elements.forEach(el => el.classList.remove('layer-off'));
        layerStates[layerName] = true;
    }
    
    // שמירת המצב
    saveLayerState();
}

// הוספת מאזינים לכל הכפתורים
const toggleSwitches = document.querySelectorAll('.toggle-switch');
toggleSwitches.forEach(toggle => {
    toggle.addEventListener('click', () => {
        const layerName = toggle.getAttribute('data-layer');
        toggleLayer(layerName, toggle);
    });
});

// כפתור הפעל הכל
document.getElementById('enableAll').addEventListener('click', () => {
    toggleSwitches.forEach(toggle => {
        const layerName = toggle.getAttribute('data-layer');
        if (!toggle.classList.contains('active')) {
            toggle.classList.add('active');
            const elements = document.querySelectorAll(`[data-layer-element="${layerName}"]`);
            elements.forEach(el => el.classList.remove('layer-off'));
            layerStates[layerName] = true;
        }
    });
    saveLayerState();
});

// כפתור כבה הכל
document.getElementById('disableAll').addEventListener('click', () => {
    toggleSwitches.forEach(toggle => {
        const layerName = toggle.getAttribute('data-layer');
        if (toggle.classList.contains('active')) {
            toggle.classList.remove('active');
            const elements = document.querySelectorAll(`[data-layer-element="${layerName}"]`);
            elements.forEach(el => el.classList.add('layer-off'));
            layerStates[layerName] = false;
        }
    });
    saveLayerState();
});

// כפתור איפוס - מחזיר הכל למצב התחלתי
document.getElementById('resetLayers').addEventListener('click', () => {
    toggleSwitches.forEach(toggle => {
        const layerName = toggle.getAttribute('data-layer');
        if (!toggle.classList.contains('active')) {
            toggle.classList.add('active');
            const elements = document.querySelectorAll(`[data-layer-element="${layerName}"]`);
            elements.forEach(el => el.classList.remove('layer-off'));
            layerStates[layerName] = true;
        }
    });
    saveLayerState();
});

/**
 * שמירת מצב השכבות ב-LocalStorage
 */
function saveLayerState() {
    localStorage.setItem('parashaLayers', JSON.stringify(layerStates));
    console.log('מצב שכבות נשמר:', layerStates);
}

/**
 * טעינת מצב השכבות מ-LocalStorage
 */
function loadLayerState() {
    const saved = localStorage.getItem('parashaLayers');
    if (saved) {
        const states = JSON.parse(saved);
        console.log('מצב שכבות נטען:', states);
        
        Object.keys(states).forEach(layerName => {
            const toggle = document.querySelector(`[data-layer="${layerName}"]`);
            if (toggle) {
                const shouldBeActive = states[layerName];
                const isActive = toggle.classList.contains('active');
                
                // אם המצב שונה מהשמור, שנה אותו
                if (shouldBeActive !== isActive) {
                    toggleLayer(layerName, toggle);
                }
            }
        });
    }
}

// טעינת מצב שמור בעת טעינת הדף (להפעלה, הסר את ההערה)
// loadLayerState();

// ייצוא פונקציות לשימוש חיצוני (אם נדרש)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        toggleLayer,
        saveLayerState,
        loadLayerState,
        layerStates
    };
}

