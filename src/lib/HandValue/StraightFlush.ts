import Card from "../Card";
import Game from "../Game";
import {Nullable} from "../Interfaces";

export default function StraightFlush(game: Game, cards: Array<Card>, suits: { [key: string]: Array<Card> }, num_groups: Array<Array<Card>>, player_cards: Array<Card>): Nullable<Array<Card>> {
  for (let suit in suits) {
    const _cards = suits[suit];
    if (_cards.length < 5)
      continue;
    _cards.sortCards();
    let matches: Array<Card> = [];

    for (let i = 0, j = _cards.length; i < j; i++) {
      if (i === 0)
        matches = [_cards[i]];
      else {
        const this_card = _cards[i];
        const prev_card = matches[matches.length - 1];
        if ((this_card.getRank() + 1) === prev_card.getRank()) {
          matches.push(this_card);
          const ln = matches.length;
          if (ln >= 5) {
            return matches.sort((a,b) => a.getRank() - b.getRank());
          }
        }
        else {
          matches = [this_card];
        }
      }
    }
  }

  return null;
}