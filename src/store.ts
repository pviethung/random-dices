import { createRoot, createSignal } from 'solid-js';
import { Dice } from './types';

const getRandomValue = () => {
  const MAX_DOTS = 6;
  const MIN_DOTS = 1;
  return Math.floor(Math.random() * (MAX_DOTS - MIN_DOTS + 1)) + 1;
};

const createAppStore = () => {
  const [gameStarted, setGameStarted] = createSignal(false);
  const [rollCount, setRollCount] = createSignal(0);
  const [dices, setDices] = createSignal<Dice[]>(
    Array.from({ length: 10 }).map((v) => {
      const [freezed, setFreezed] = createSignal(false);
      return {
        value: getRandomValue(),
        freezed,
        setFreezed,
      };
    })
  );
  const [bestScore, setBestScore] = createSignal(
    (() => {
      const saved = localStorage.getItem('bestScore');
      if (saved) {
        return +saved;
      } else {
        return null;
      }
    })()
  );

  const setRandomDices = () =>
    setDices((prev) =>
      prev.map((v) => {
        return {
          value: v.freezed() ? v.value : getRandomValue(),
          freezed: v.freezed,
          setFreezed: v.setFreezed,
        };
      })
    );

  const saveBestScore = (score: number) => {
    setBestScore(score);
    localStorage.setItem('bestScore', score.toString());
  };

  return {
    bestScore,
    saveBestScore,
    randomDices: dices,
    setRandomDices,
    gameStarted,
    setGameStarted,
    rollCount,
    setRollCount,
  };
};

export default createRoot(createAppStore);
