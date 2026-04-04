import type { CardData } from '../data/templates';

export async function generateCardFromGemini(promptText: string, category: string): Promise<Partial<CardData>> {
  const response = await fetch('/api/generate-card', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ promptText, category }),
  });

  if (!response.ok) {
    const body = await response.json().catch(() => ({}));
    throw new Error(body.error || 'שגיאה בחיבור ל-Gemini');
  }

  const result = await response.json();
  return result.card;
}
