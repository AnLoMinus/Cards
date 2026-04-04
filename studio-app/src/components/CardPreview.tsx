import { useMemo, useState } from 'react';
import type { CardData } from '../data/templates';

type CardPreviewProps = {
  card: CardData;
  accentColor: string;
  holo: boolean;
  sparkles: boolean;
  borderGlow: boolean;
};

export default function CardPreview({ card, accentColor, holo, sparkles, borderGlow }: CardPreviewProps) {
  const [transform, setTransform] = useState('perspective(1000px) rotateX(0deg) rotateY(0deg)');

  const cardStyle = useMemo(
    () => ({
      background: card.backgroundColor,
      borderColor: accentColor,
      boxShadow: borderGlow ? `0 0 32px ${accentColor}` : '0 0 16px rgba(0,0,0,0.25)',
      transform,
    }),
    [accentColor, borderGlow, card.backgroundColor, transform],
  );

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    const { currentTarget, clientX, clientY } = event;
    const rect = currentTarget.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;
    const rotateX = ((y - rect.height / 2) / rect.height) * -18;
    const rotateY = ((x - rect.width / 2) / rect.width) * 18;
    setTransform(`perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02,1.02,1.02)`);
  };

  const handlePointerLeave = () => {
    setTransform('perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)');
  };

  return (
    <div
      className="card-preview"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      style={cardStyle}
    >
      {holo && <div className="card-layer holo-layer" />}
      {sparkles && <div className="card-layer sparkle-overlay" />}
      <div className="card-frame">
        <div className="card-header" style={{ borderColor: accentColor }}>
          <span className="card-type">{card.cardType}</span>
          <span className="card-rarity">{card.rarity}</span>
        </div>
        <div className="card-title" style={{ color: accentColor }}>{card.cardName}</div>
        <div className="card-description">{card.description}</div>
        <div className="card-stats">
          <div>
            <strong>Power</strong>
            <span>{card.power}</span>
          </div>
          <div>
            <strong>Defense</strong>
            <span>{card.defense}</span>
          </div>
          <div>
            <strong>Speed</strong>
            <span>{card.speed}</span>
          </div>
        </div>
        <div className="card-flavor">{card.flavorText}</div>
      </div>
    </div>
  );
}
