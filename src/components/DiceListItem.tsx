import { Component, For, JSX, Match, Switch } from 'solid-js';
import store from '../store';
import { Dice } from '../types';

const Wrapper: Component<{
  dots: number;
  children: JSX.Element;
}> = (props) => {
  return (
    <Switch>
      <Match when={props.dots === 1}>
        <div class="flex justify-center items-center">{props.children}</div>
      </Match>
      <Match when={props.dots === 2}>
        <div class="flex justify-between [&>div:first-child]:items-start [&>div:last-child]:items-end">
          {props.children}
        </div>
      </Match>
      <Match when={props.dots === 3}>
        <div class="flex justify-between [&>div:first-child]:items-start [&>div:last-child]:items-end">
          {props.children}
        </div>
      </Match>
      <Match when={props.dots === 4}>
        <div class="grid grid-cols-2 gap-2">{props.children}</div>
      </Match>
      <Match when={props.dots === 5}>
        <div class="grid grid-cols-2 grid-rows-3 gap-2 [&>div:nth-child(3)]:col-span-2">
          {props.children}
        </div>
      </Match>
      <Match when={props.dots === 6}>
        <div class="grid grid-cols-2 grid-rows-3 gap-2">{props.children}</div>
      </Match>
    </Switch>
  );
};

const DiceListItem: Component<{
  dice: Dice;
}> = (props) => {
  const { gameStarted } = store;

  return (
    <li
      onClick={() => {
        if (!gameStarted()) return;
        props.dice.setFreezed((prev: any) => !prev);
      }}
      class="w-20 h-20 p-[6px] rounded-lg [&>div]:w-full [&>div]:h-full"
      classList={{
        'bg-white': !props.dice.freezed(),
        'bg-red-500': props.dice.freezed(),
      }}
    >
      <Wrapper dots={props.dice.value}>
        <For each={Array.from({ length: props.dice.value })}>
          {(t: any) => (
            <div class="flex items-center justify-center">
              <div
                class="w-5 h-5 rounded-full bg-red-500"
                classList={{
                  'bg-white': props.dice.freezed(),
                  'bg-red-500': !props.dice.freezed(),
                }}
              />
            </div>
          )}
        </For>
      </Wrapper>
    </li>
  );
};
export default DiceListItem;
