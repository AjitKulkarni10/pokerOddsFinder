import Card from "../Card";
import Game from "../Game";
import {Nullable} from "../Interfaces";

export default function Quads(game: Game, cards: Array<Card>, suits: { [key: string]: Array<Card> }, num_groups: Array<Array<Card>>, player_cards: Array<Card>, board: Array<Card>): Nullable<Array<Card>> {
  let matches = num_groups.filter(g => g.length === 4);
  if (matches.length > 0) {

    for (const match of matches) {
      const highest_kicker = cards.filter(card => {
        return card.getNum() !== match[0].getNum();
      })[0];

      return [...match, highest_kicker]
    }
  }
  return null;
}