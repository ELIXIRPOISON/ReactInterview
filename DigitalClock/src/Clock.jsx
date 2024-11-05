import { useEffect, useState } from 'react';

// Constant arrays to define styles for each number on the digital clock.
const ALL_BORDERS = [
  'digit-border-top',
  'digit-border-left',
  'digit-border-right',
  'digit-border-bottom',
];

const NUMBER_STYLES = {
  0: {
    top: ['digit-border-top', 'digit-border-left', 'digit-border-right'],
    bottom: ['digit-border-bottom', 'digit-border-left', 'digit-border-right'],
  },
  1: { top: ['digit-border-right'], bottom: ['digit-border-right'] },
  2: {
    top: ['digit-border-top', 'digit-border-right', 'digit-border-bottom'],
    bottom: ['digit-border-top', 'digit-border-left', 'digit-border-bottom'],
  },
  3: {
    top: ['digit-border-top', 'digit-border-right', 'digit-border-bottom'],
    bottom: ['digit-border-top', 'digit-border-right', 'digit-border-bottom'],
  },
  4: {
    top: ['digit-border-left', 'digit-border-right', 'digit-border-bottom'],
    bottom: ['digit-border-right', 'digit-border-top'],
  },
  5: {
    top: ['digit-border-top', 'digit-border-left', 'digit-border-bottom'],
    bottom: ['digit-border-top', 'digit-border-right', 'digit-border-bottom'],
  },
  6: {
    top: ['digit-border-top', 'digit-border-left', 'digit-border-bottom'],
    bottom: ALL_BORDERS,
  },
  7: { top: ['digit-border-top', 'digit-border-right'], bottom: ['digit-border-right'] },
  8: { top: ALL_BORDERS, bottom: ALL_BORDERS },
  9: {
    top: ALL_BORDERS,
    bottom: ['digit-border-top', 'digit-border-right', 'digit-border-bottom'],
  },
};

// Digit component that displays each number as a collection of bordered squares.
function Digit({ number }) {
  const { top, bottom } = NUMBER_STYLES[number];
  return (
    <div className="digit">
      <div className={['digit-top', ...top].join(' ')} />
      <div className={['digit-bottom', ...bottom].join(' ')} />
    </div>
  );
}

// Separator component to separate hour, minute, and second segments.
function Separator() {
  return (
    <div className="clock-separator">
      <div className="separator-dot" />
      <div className="separator-dot" />
    </div>
  );
}

// Custom hook that provides the current date and time, updating every second.
function useCurrentDate() {
  const [date, setDate] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDate(new Date());
    }, 1000); // update every second

    return () => clearInterval(timer); // clean up on unmount
  }, []);

  return date;
}

// Utility function to format numbers to two digits
function padTwoDigit(number) {
  return number >= 10 ? String(number) : `0${number}`;
}

// Main Clock component, which displays the full digital clock
export default function Clock() {
  const date = useCurrentDate();

  let hours = date.getHours() % 12 || 12; // Convert 24-hour to 12-hour format
  const minutes = date.getMinutes();
  const seconds = date.getSeconds();

  const dateTimeDisplay = `${padTwoDigit(date.getHours())}:${padTwoDigit(minutes)}:${padTwoDigit(seconds)}`;

  return (
    <time className="digital-clock" dateTime={dateTimeDisplay}>
      <Digit number={Math.floor(hours / 10)} />
      <Digit number={hours % 10} />
      <Separator />
      <Digit number={Math.floor(minutes / 10)} />
      <Digit number={minutes % 10} />
      <Separator />
      <Digit number={Math.floor(seconds / 10)} />
      <Digit number={seconds % 10} />
    </time>
  );
}
