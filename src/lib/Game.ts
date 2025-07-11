import Table from "./Table";
import Card from "./Card";
import Player from "./Player";
import {AvailableGames, CardNumbers, Games as iGames, Nullable} from "./Interfaces";
import * as HandValue from "./HandValue/index";

export default class Game {

  private trips_beats_straight = false;

  constructor(private game: iGames, private Table: Table) {
    if (!~AvailableGames.indexOf(game))
      throw new Error(`${game} not available! Choose any of ${AvailableGames.join(", ")}`);
  }

  isTexasHoldem() {
    return this.game == "texas_holdem";
  }

  getGame() {
    return this.game;
  }

  getResult(players: Array<Player>, board: Array<Card>) {
    return players.filter(player => player.inHand()).map(player => this.getHandStrentgh(board, player.getCards() as Array<Card>));
  }

  private getHandStrentgh(board: Array<Card>, player_cards: Array<Card>) {

    const cards = [...board, ...player_cards].sortCards();

    let _cards = cards.slice(0);

    let suits = {
      h: [],
      d: [],
      c: [],
      s: []
    } as { [key: string]: Array<Card> };

    let num_groups: Array<Array<Card>> = [];

    _cards.forEach((card: Card) => {
      if (card.isAce() && !card.isLowAce()) {
        const AceOne = new Card(card.getSuit(), CardNumbers.ACE, this).setAsLowAce();
        cards.push(AceOne);
        suits[AceOne.getSuit()].push(AceOne);
      }
      suits[card.getSuit()].push(card);

      let index;
      if ((index = num_groups.findIndex(g => g[0].getNum() === card.getNum())) > -1)
        num_groups[index].push(card);
      else
        num_groups.push([card]);
    });

    let rank = "";
    let rank_str = "HIGH_CARD";

    let hand: Nullable<Array<Card>>;

    if ((hand = HandValue.StraightFlush(this, cards, suits, num_groups, player_cards)) !== null) {
      if (hand[0].getNum() === "T") {
        rank = "10";
        rank_str = "ROYAL_FLUSH";
      }
      else {
        rank = "9";
        rank_str = "STRAIGHT_FLUSH";
      }
    }
    else if ((hand = HandValue.Quads(this, cards, suits, num_groups, player_cards, board)) !== null) {
      rank = "8";
      rank_str = "QUADS";
    }

    else if ((hand = HandValue.TwoPairs(this, cards, suits, num_groups, player_cards, board)) !== null) {
      rank = "3";
      rank_str = "TWO_PAIRS";
    }
    else if ((hand = HandValue.OnePair(this, cards, suits, num_groups, player_cards, board)) !== null) {
      rank = "2";
      rank_str = "ONE_PAIR";
    }
    else {
      rank = "0";
      hand = HandValue.HighCards(this, cards, suits, num_groups, player_cards, board);
      rank_str = "HIGH_CARDS";
    }

    let points = rank;
    (hand as Array<Card>).forEach(card => {
      points += card.getRank(true);
    });

    return {
      points: parseInt(points),
      rank: {
        rank,
        str: rank_str
      },
      hand,
      cards
    };
  }

}


