import { useMemo, useState } from 'react';
import CardPreview from './components/CardPreview';
import { categories, defaultCard, type CardData } from './data/templates';
import { generateCardFromGemini } from './api/gemini';

export default function App() {
  const [category, setCategory] = useState(categories[0].id);
  const [promptText, setPromptText] = useState(categories[0].samplePrompt);
  const [card, setCard] = useState<CardData>(defaultCard);
  const [holo, setHolo] = useState(true);
  const [sparkles, setSparkles] = useState(true);
  const [borderGlow, setBorderGlow] = useState(true);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('');

  const accentColor = useMemo(
    () => categories.find((item) => item.id === category)?.accentColor || '#6a1b9a',
    [category],
  );

  const handleCreateCard = async () => {
    setLoading(true);
    setStatus('מבקש מה-Gemini ליצור כרטיס...');
    try {
      const generated = await generateCardFromGemini(promptText, category);
      setCard((prev) => ({
        ...prev,
        ...generated,
        backgroundColor: generated.backgroundColor || prev.backgroundColor,
      }));
      setStatus('הכרטיס נוצר בהצלחה!');
    } catch (error) {
      setStatus(`שגיאה: ${error instanceof Error ? error.message : 'לא ניתן ליצור כרטיס'}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-shell">
      <header className="app-header">
        <div>
          <h1>Cards Studio AI</h1>
          <p>אפליקציית ריאקט ליצירת כרטיסים מבוססי Gemini מתוך מאגר התבניות שלך.</p>
        </div>
      </header>

      <main className="app-main">
        <section className="controls-panel">
          <div className="control-group">
            <label htmlFor="category">קטגוריה</label>
            <select id="category" value={category} onChange={(e) => setCategory(e.target.value)}>
              {categories.map((item) => (
                <option key={item.id} value={item.id}>{item.label}</option>
              ))}
            </select>
          </div>

          <div className="control-group">
            <label htmlFor="promptText">טקסט הדרכה ל-Gemini</label>
            <textarea
              id="promptText"
              value={promptText}
              onChange={(event) => setPromptText(event.target.value)}
              rows={4}
            />
          </div>

          <div className="toggle-row">
            <label>
              <input type="checkbox" checked={holo} onChange={() => setHolo((prev) => !prev)} />
              שכבת הולוגרפיה
            </label>
            <label>
              <input type="checkbox" checked={sparkles} onChange={() => setSparkles((prev) => !prev)} />
              ניצוצות
            </label>
            <label>
              <input type="checkbox" checked={borderGlow} onChange={() => setBorderGlow((prev) => !prev)} />
              זוהר מסגרת
            </label>
          </div>

          <button className="primary-button" onClick={handleCreateCard} disabled={loading}>
            {loading ? 'יוצר...' : 'צור כרטיס עם Gemini'}
          </button>

          <div className="status-bar">{status}</div>
        </section>

        <section className="preview-section">
          <CardPreview card={card} accentColor={accentColor} holo={holo} sparkles={sparkles} borderGlow={borderGlow} />
          <div className="card-details">
            <h2>נתוני הכרטיס</h2>
            <dl>
              <dt>שם הכרטיס</dt>
              <dd>{card.cardName}</dd>
              <dt>סוג</dt>
              <dd>{card.cardType}</dd>
              <dt>נחישות</dt>
              <dd>{card.rarity}</dd>
              <dt>תיאור</dt>
              <dd>{card.description}</dd>
              <dt>טקסט טעם</dt>
              <dd>{card.flavorText}</dd>
              <dt>כוח</dt>
              <dd>{card.power}</dd>
              <dt>הגנה</dt>
              <dd>{card.defense}</dd>
              <dt>מהירות</dt>
              <dd>{card.speed}</dd>
            </dl>
          </div>
        </section>
      </main>
    </div>
  );
}
