import { For } from 'solid-js';
import store from '../store';
import DiceListItem from './DiceListItem';

const DiceList = () => {
  const { randomDices } = store;

  return (
    <ul class="grid grid-cols-5 gap-5">
      <For each={randomDices()}>{(dice) => <DiceListItem dice={dice} />}</For>
    </ul>
  );
};
export default DiceList;
