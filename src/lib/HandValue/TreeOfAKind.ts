import Card from "../Card";
import Game from "../Game";
import {Nullable} from "../Interfaces";

export default function TreeOfAKind(game: Game, cards: Array<Card>, suits: { [key: string]: Array<Card> }, num_groups: Array<Array<Card>>, player_cards: Array<Card>, board: Array<Card>): Nullable<Array<Card>> {
  for (let i in num_groups) {
    let num_group = num_groups[i];
    if (num_group.length >= 3) {
        return [
          ...num_group,
          ...cards.filter(card => {
            return card.getNum() !== num_group[0].getNum();
          }).slice(0, 2)
        ];
    }
  }
  return null;
}