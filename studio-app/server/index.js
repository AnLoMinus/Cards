import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 4174;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = process.env.GEMINI_MODEL || 'text-bison-001';

app.use(cors());
app.use(express.json());

app.post('/api/generate-card', async (req, res) => {
  if (!GEMINI_API_KEY) {
    return res.status(500).json({ error: 'GEMINI_API_KEY environment variable is required.' });
  }

  const { promptText, category } = req.body;
  if (!promptText || !category) {
    return res.status(400).json({ error: 'promptText and category are required.' });
  }

  const prompt = `Generate a collectible card for the category ${category}. Return only valid JSON with the keys cardName, cardType, rarity, description, flavorText, power, defense, speed, backgroundColor. The card should feel cinematic, layered, and suitable for an interactive card preview.`;

  try {
    const response = await fetch(`https://gemini.googleapis.com/v1/models/${GEMINI_MODEL}:generateText`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${GEMINI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        prompt: { text: `${prompt}\n\nUser Request: ${promptText}` },
        temperature: 0.8,
        maxOutputTokens: 350,
      }),
    });

    const data = await response.json();
    const output = data.candidates?.[0]?.output || data.output?.[0]?.content?.[0]?.text || '';
    const card = parseGeminiOutput(output);

    return res.json({ card, raw: output });
  } catch (error) {
    return res.status(500).json({ error: error instanceof Error ? error.message : 'Unknown error' });
  }
});

function parseGeminiOutput(output) {
  const content = output.trim();
  const firstBrace = content.indexOf('{');
  const lastBrace = content.lastIndexOf('}');

  if (firstBrace !== -1 && lastBrace !== -1 && lastBrace > firstBrace) {
    try {
      const jsonText = content.slice(firstBrace, lastBrace + 1);
      const parsed = JSON.parse(jsonText);
      return {
        cardName: parsed.cardName || 'Unknown Hero',
        cardType: parsed.cardType || 'Legendary Entity',
        rarity: parsed.rarity || 'Rare',
        description: parsed.description || 'A mysterious card with hidden potential.',
        flavorText: parsed.flavorText || 'This card was forged from creative energy.',
        power: Number(parsed.power) || 70,
        defense: Number(parsed.defense) || 65,
        speed: Number(parsed.speed) || 60,
        backgroundColor: parsed.backgroundColor || '#151e2f',
      };
    } catch (e) {
      console.warn('JSON parse failed:', e);
    }
  }

  return {
    cardName: 'Mystic Champion',
    cardType: 'Arcane Soldier',
    rarity: 'Rare',
    description: 'A vivid card generated from an AI prompt.',
    flavorText: 'When in doubt, let the story guide the card.',
    power: 78,
    defense: 72,
    speed: 68,
    backgroundColor: '#171b2d',
  };
}

app.listen(PORT, () => {
  console.log(`Gemini proxy server is running on http://localhost:${PORT}`);
});
