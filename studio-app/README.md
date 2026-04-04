# Cards Studio App

יישום ריאקט שמייצר כרטיסים אינטראקטיביים ומתחבר ל-Gemini דרך פרוקסי Backend.
המטרה: להטמיע את האפליקציה ב-Google Studio AI וליצור כרטיסים בהשראת המאגר `Cards`.

## מבנה

- `src/` - קוד ריאקט
- `src/components/` - רכיבי תצוגה
- `src/api/` - חיבור ל-Gemini
- `src/data/` - קטגוריות ותבניות כרטיס
- `server/` - שרת Node קטן לפעולות Gemini

## התקנה

1. `cd studio-app`
2. `npm install`
3. העתק `.env.example` ל-`.env`
4. מלא את `GEMINI_API_KEY`

## הפעלה

- להריץ רק את ה-frontend: `npm run dev`
- להריץ את ה-backend: `npm run dev:server`

בגרסה מקומית, אפשר לפתוח שני טרמינלים ולהריץ את שני הצעדים.

## בנייה

- `npm run build`

הקבצים ל-Deploy ייוצרו בתיקייה `dist/`.

## שימוש ב-Google Studio AI

1. פרסם את תיקיית `dist/` ל-host סטטי (GitHub Pages, Netlify, Firebase Hosting וכו').
2. הוסף iframe או web component בדף Studio AI שמטען את ה-URL של האתר.
3. אם תשתמש ב-Gemini בייצור, שמור את המפתח ב-backend מאובטח ואל תחשוף אותו בצד לקוח.

## הערות

- `server/index.js` מקבל בקשה מ-frontend ומעביר אותה ל-Gemini.
- אם תרצה, ניתן לשנות את הפרומפט בקובץ `src/api/gemini.ts` כדי להתאים את תבניות הכרטיסים שלך.
