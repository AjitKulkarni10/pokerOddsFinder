import Card from "../Card";
import Game from "../Game";
import {Nullable} from "../Interfaces";

export default function hasTwoPairs(game: Game, cards: Array<Card>, suits: { [key: string]: Array<Card> }, num_groups: Array<Array<Card>>, player_cards: Array<Card>, board: Array<Card>): Nullable<Array<Card>> {

  let pairs = num_groups.filter(g => g.length === 2);

  if (pairs.length >= 2) {

    if (pairs.length > 2) {
      pairs.sort((a, b) => {
        return b[0].getRank() - a[0].getRank();
      });
    }
    return [
      ...pairs[0],
      ...pairs[1],
      ...[cards.filter(card => {
        return card.getNum() !== pairs[0][0].getNum() && card.getNum() !== pairs[1][0].getNum();
      })[0]]
    ];
  }
  return null;
}