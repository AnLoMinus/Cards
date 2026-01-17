# 🏗️ מבנה הקלף - פרשת בראשית

## 📂 מבנה הקבצים

```
01-בראשית/
├── index.html              # קובץ HTML ראשי
├── README.md               # תיעוד הפרשה
├── STRUCTURE.md           # מדריך מבנה (קובץ זה)
├── styles/                # תיקיית סגנונות
│   ├── base.css           # סטיילים בסיסיים
│   ├── glow-layer.css     # שכבת זוהר
│   ├── header-layer.css   # שכבת כותרת חומש
│   ├── title-layer.css    # שכבת שם פרשה
│   ├── theme-layer.css    # שכבת נושא מרכזי
│   ├── sections-layer.css # שכבת סקציות תוכן
│   ├── values-layer.css   # שכבת ערכים
│   ├── rating-layer.css   # שכבת דירוג
│   ├── verse-layer.css    # שכבת פסוק
│   └── control-panel.css  # עיצוב פאנל השליטה
└── scripts/               # תיקיית סקריפטים
    └── layer-control.js   # ניהול שכבות (אופציונלי)
```

---

## 🎨 שכבות הקלף

כל שכבה בקלף היא **מודולרית** וניתנת להדלקה/כיבוי בנפרד:

### 1. ✨ שכבת זוהר (Glow Layer)
- **קובץ:** `styles/glow-layer.css`
- **תיאור:** אפקט זוהר מסתובב סביב הקלף
- **אלמנט:** `.card-glow`

### 2. 📕 כותרת חומש (Header Layer)
- **קובץ:** `styles/header-layer.css`
- **תיאור:** תג עליון עם שם החומש
- **אלמנט:** `.header`

### 3. 🕎 שם הפרשה (Title Layer)
- **קובץ:** `styles/title-layer.css`
- **תיאור:** שם הפרשה בעברית ואנגלית + מספור
- **אלמנט:** `.parasha-title`

### 4. 🌍 נושא מרכזי (Theme Layer)
- **קובץ:** `styles/theme-layer.css`
- **תיאור:** מילת מפתח מרכזית של הפרשה
- **אלמנט:** `.theme-box`

### 5. 🔸 נקודות מפנה (Turning Points Layer)
- **קובץ:** `styles/sections-layer.css`
- **תיאור:** אירועים מכוננים בפרשה
- **אלמנט:** `[data-layer-element="turning-points"]`

### 6. 🕰️ ציר זמן (Timeline Layer)
- **קובץ:** `styles/sections-layer.css`
- **תיאור:** התהליך הכרונולוגי של הפרשה
- **אלמנט:** `[data-layer-element="timeline"]`

### 7. 📜 עקרונות נלמדים (Teachings Layer)
- **קובץ:** `styles/sections-layer.css`
- **תיאור:** לקחים ומסרים מהפרשה
- **אלמנט:** `[data-layer-element="teachings"]`

### 8. 🌿 ערכים ומידות (Values Layer)
- **קובץ:** `styles/values-layer.css`
- **תיאור:** תגיות ערכים רוחניים
- **אלמנט:** `[data-layer-element="values"]`

### 9. ⭐ דירוג (Rating Layer)
- **קובץ:** `styles/rating-layer.css`
- **תיאור:** קטגוריה ועוצמה רוחנית
- **אלמנט:** `[data-layer-element="rating"]`

### 10. 📖 פסוק מוביל (Verse Layer)
- **קובץ:** `styles/verse-layer.css`
- **תיאור:** פסוק מרכזי מהפרשה
- **אלמנט:** `[data-layer-element="verse"]`

---

## 🎛️ פאנל השליטה

### תכונות:
- ✅ **הדלק/כבה שכבות** - כל שכבה בנפרד
- ✅ **הפעל הכל** - הדלקת כל השכבות בבת אחת
- ❌ **כבה הכל** - כיבוי כל השכבות
- 🔄 **איפוס** - חזרה למצב התחלתי
- 💾 **שמירה אוטומטית** - LocalStorage (מושבת כעת)

### מיקום:
- **Desktop:** פינה שמאלית עליונה
- **Mobile:** מתאים למסך קטן

---

## 🔧 שינויים שבוצעו

### ✅ הוסר:
1. ❌ **הגבלת רוחב** - `width: 400px` הוסר
2. ❌ **אנימציות 3D** - אפקט עכבר הוסר לגמרי
3. ❌ **אנימציית Hover** - translateY הוסר

### ✅ נוסף:
1. ✨ **מבנה מודולרי** - כל שכבה בקובץ נפרד
2. 🎛️ **פאנל שליטה** - ניהול מלא של השכבות
3. 📱 **רספונסיבי מלא** - מתאים לכל מסכים
4. 🎨 **שליטה דינמית** - JavaScript לניהול שכבות

---

## 💻 שימוש ב-JavaScript

### אופציה 1: JavaScript משובץ (כעת)
הקוד נמצא בתוך `index.html` בתג `<script>`

### אופציה 2: קובץ נפרד
להשתמש בקובץ `scripts/layer-control.js`:

```html
<script src="scripts/layer-control.js"></script>
```

---

## 🎯 פונקציות JavaScript עיקריות

```javascript
// החלפת מצב שכבה
toggleLayer(layerName, toggle)

// שמירת מצב
saveLayerState()

// טעינת מצב שמור
loadLayerState()

// מערך מצב השכבות
layerStates = {...}
```

---

## 🚀 הרחבות עתידיות

- [ ] ייצוא הגדרות כ-JSON
- [ ] ייבוא הגדרות
- [ ] מצבים מוגדרים מראש (Presets)
- [ ] שמירה בענן
- [ ] שיתוף הגדרות

---

## 📝 הערות למפתחים

1. **כל שכבה עצמאית** - ניתן להסיר/להוסיף קבצי CSS
2. **data-layer-element** - מזהה ייחודי לכל שכבה
3. **class="layer-off"** - מחלקה לכיבוי שכבה
4. **LocalStorage** - מושבת כעת, להפעלה הסר הערה ב-JS

---

**עודכן:** 14.10.2025  
**גרסה:** 2.0 - מבנה מודולרי

