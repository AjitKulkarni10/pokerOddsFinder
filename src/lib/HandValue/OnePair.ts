import Card from "../Card";
import Game from "../Game";
import {Nullable} from "../Interfaces";

export default function OnePair(game: Game, cards: Array<Card>, suits: { [key: string]: Array<Card> }, num_groups: Array<Array<Card>>, player_cards: Array<Card>, board: Array<Card>): Nullable<Array<Card>> {

  let pair = num_groups.find(g => g.length === 2) as Array<Card>;

  if (pair) {
    return [...pair, ...cards.filter(card => {
      return card.getNum() !== pair[0].getNum();
    }).slice(0, 3)];
  }
  return null;
}