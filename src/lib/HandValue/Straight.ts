import Card from "../Card";
import {flatUnique} from "../Utils";
import Game from "../Game";
import {Nullable} from "../Interfaces";

export default function Straight(game: Game, cards: Array<Card>, suits: { [key: string]: Array<Card> }, num_groups: Array<Array<Card>>, player_cards: Array<Card>): Nullable<Array<Card>> {
  let match: Array<Card> = [];
  for (let i = 0, j = cards.length; i < j; i++) {
    if (i === 0) {
      match = [cards[i]];
    }
    else {
      const this_card = cards[i];
      const prev_card = match[match.length - 1];
      let ln = match.length;
      if ((this_card.getRank() + 1) === prev_card.getRank()) {
        match.push(this_card);
        ln++;
      }
      else if (ln < 5) {
        match = [this_card];
      }

      if (ln >= 5) {
        return match;
      }
    }
  }
  return null;
}