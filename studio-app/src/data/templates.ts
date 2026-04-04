export type CardData = {
  cardName: string;
  cardType: string;
  rarity: string;
  description: string;
  flavorText: string;
  power: number;
  defense: number;
  speed: number;
  backgroundColor: string;
};

export type CategoryTemplate = {
  id: string;
  label: string;
  accentColor: string;
  samplePrompt: string;
};

export const categories: CategoryTemplate[] = [
  {
    id: 'pokemon',
    label: 'Pokémon',
    accentColor: '#2a75bb',
    samplePrompt: 'כרטיס פוקימון הולוגרפי עם כוח אש',
  },
  {
    id: 'yugioh',
    label: 'Yu-Gi-Oh!',
    accentColor: '#0c1e34',
    samplePrompt: 'כרטיס מפלש יוגי-הו עם אפקט Shadow',
  },
  {
    id: 'dragonball',
    label: 'Dragon Ball',
    accentColor: '#f9a825',
    samplePrompt: 'כרטיס דרגון בול עם סגנון סופר סייג',
  },
  {
    id: 'naruto',
    label: 'Naruto',
    accentColor: '#f57c00',
    samplePrompt: 'כרטיס נארוטו עם שינגן',
  },
  {
    id: 'marvel',
    label: 'Marvel',
    accentColor: '#c62828',
    samplePrompt: 'כרטיס מרוול עם גיבור על חדש',
  },
  {
    id: 'finalfantasy',
    label: 'Final Fantasy',
    accentColor: '#4a148c',
    samplePrompt: 'כרטיס Final Fantasy עם לגיון קסום',
  },
  {
    id: 'digimon',
    label: 'Digimon',
    accentColor: '#1b5e20',
    samplePrompt: 'כרטיס דיגימון עם פיתוח אבולוציה',
  },
  {
    id: 'sparks-war',
    label: 'Sparks War',
    accentColor: '#ad1457',
    samplePrompt: 'כרטיס Sparks War אפל וקריסטלי',
  },
  {
    id: 'torah-portions',
    label: 'Torah Portions',
    accentColor: '#2e7d32',
    samplePrompt: 'כרטיס פרשת השבוע עם עיצוב מסורתי',
  },
];

export const defaultCard: CardData = {
  cardName: 'Nova Guardian',
  cardType: 'Legendary Warrior',
  rarity: 'Holographic Ultra Rare',
  description: 'A powerful protector with cosmic energy and a glowing aura.',
  flavorText: 'Born from the stars, this guardian shines brightest in the final battle.',
  power: 98,
  defense: 85,
  speed: 72,
  backgroundColor: '#171b2d',
};
