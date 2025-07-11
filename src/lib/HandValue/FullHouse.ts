import Card from "../Card";
import Game from "../Game";
import {Nullable} from "../Interfaces";

export default function Fullhouse(game: Game, cards: Array<Card>, suits: { [key: string]: Array<Card> }, num_groups: Array<Array<Card>>, player_cards: Array<Card>, board: Array<Card>): Nullable<Array<Card>> {
  let three_of_a_kinds = [];
  let pairs = [];
  for (let num_group of num_groups) {
    const ln = num_group.length;
    if (ln === 2)
      pairs.push(num_group);
    else if (ln >= 3)
      three_of_a_kinds.push(num_group);
  }
  if ((three_of_a_kinds.length * 10) + pairs.length < 11)
    return null;
  if (three_of_a_kinds.length > 1)
    return [...three_of_a_kinds[0], ...three_of_a_kinds[1].slice(0, 2)];
  return [...three_of_a_kinds[0], ...pairs[0]];
}