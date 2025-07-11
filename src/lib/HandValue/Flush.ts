import Card from "../Card";
import Game from "../Game";
import {Nullable} from "../Interfaces";

export default function hasFlush(game: Game, cards: Array<Card>, suits: { [key: string]: Array<Card> }, num_groups: Array<Array<Card>>, player_cards: Array<Card>, board: Array<Card>): Nullable<Array<Card>> {
  let match, ln;
  for (let suit in suits) {
    if (
      suits[suit].length >= 5
      && (ln = (match = suits[suit].filter(c => !c.isLowAce())).length) >= 5
    ) {
        return match.slice(0, 5)
    }
  }
  return null;
}