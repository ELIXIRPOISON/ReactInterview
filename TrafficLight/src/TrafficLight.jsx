import { useEffect, useState } from 'react';

function Light({ backgroundColor }) {
  return (
    <div
      aria-hidden={true}
      className="traffic-light"
      style={{ backgroundColor }}
    />
  );
}

export default function TrafficLight({
  initialColor = 'green',
  config,
  layout = 'vertical',
}) {
  const [currentColor, setCurrentColor] = useState(initialColor);

  useEffect(() => {
    // Destructures `duration` and `next` properties for the current color from the config
    const { duration, next } = config[currentColor];

    // Sets up a timer to change the light color after the `duration`
    const timerId = setTimeout(() => {
      setCurrentColor(next);
    }, duration);

    // Cleans up the timer on component unmount
    return () => {
      clearTimeout(timerId);
    };
  }, [currentColor, config]);

  return (
    <div
      aria-live="polite"
      aria-label={`Current light: ${currentColor}`}
      className={[
        'traffic-light-container',
        layout === 'vertical' && 'traffic-light-container--vertical',
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {Object.keys(config).map((color) => (
        <Light
          key={color}
          backgroundColor={
            color === currentColor ? config[color].backgroundColor : undefined
          }
        />
      ))}
    </div>
  );
}
