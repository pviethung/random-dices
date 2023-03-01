import { Component, createEffect } from 'solid-js';
import Confetti from './components/Confetti';
import DiceList from './components/DiceList';
import store from './store';

const App: Component = () => {
  const {
    bestScore,
    saveBestScore,
    randomDices,
    setRandomDices,
    rollCount,
    setRollCount,
    gameStarted,
    setGameStarted,
  } = store;
  const numberOfSameDice = () =>
    randomDices()
      .filter((v) => v.freezed())
      .reduce((total, current, idx, arr) => {
        if (idx === arr.length - 1) return total;
        if (current.value === arr[idx + 1].value) {
          return ++total;
        }
        return total;
      }, 0) + 1;

  createEffect(() => {
    if (numberOfSameDice() === 10) {
      saveBestScore(rollCount());
    }
  });

  return (
    <div class="flex justify-center items-center bg-blue-300 h-screen w-screen">
      <div class="p-5 rounded-lg bg-gray-100 text-center">
        <h1 class="text-4xl mb-4 font-bold">Random Dices!</h1>
        <p class="w-[300px] m-auto mb-4 text-xl font-light">
          Roll until all dice are the same. Click each die to freeze it at its
          current value between rolls.
        </p>
        <DiceList />
        <button
          class="mt-10 mb-4 py-3 w-[150px] font-bold bg-blue-500 text-xl rounded-lg text-white"
          onClick={() => {
            setRollCount((prev) => prev + 1);
            if (!gameStarted()) {
              setGameStarted(true);
              return;
            }
            setRandomDices();
          }}
        >
          {!gameStarted() ? 'Start Game' : 'Roll'}
        </button>
        <div class="flex justify-around text-xl">
          <div>
            <p>Rolls:</p>
            <p>{rollCount()}</p>
          </div>
          {bestScore() && (
            <div>
              <p>Best:</p>
              <p>{bestScore()}</p>
            </div>
          )}
        </div>
      </div>
      {numberOfSameDice() === 10 && <Confetti />}
    </div>
  );
};

export default App;
