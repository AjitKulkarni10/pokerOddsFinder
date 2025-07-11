import Player from "./Player";
import Deck from "./Deck";
import Game from "./Game";
import Board from "./Board";
import {Games as iGames, IHand, Nullable} from "./Interfaces";

export default class Table {

  protected players: Array<Player> = [];
  protected deck: Deck;
  protected game: Game;
  protected board: Board;

  constructor(game: iGames = "texas_holdem", protected seats: number = 9) {
    this.players = (new Array(seats) as any).fill(null).map((p: any, i: number) => new Player(i + 1, this));
    this.game = new Game(game, this);
    this.deck = new Deck(this.game);
    this.board = new Board(this);
  }

  getPlayersInHand() {
    return this.players.filter(player => player.inHand());
  }

  getDeck() {
    return this.deck;
  }

  getGame() {
    return this.game;
  }

  getBoard() {
    return this.board;
  }

  boardAction(fn: Function) {
    fn(this.board);
    return this;
  }

  setPlayerHand(hand: IHand, seat: number) {

    if (this.players.length < seat)
      throw new Error("Seat not available!");
    if (seat < 1 || seat > this.seats)
      throw new Error(`Seat ${seat} not available!`);
    if (!this.players[seat - 1].isEmpty())
      throw new Error(`Seat ${seat} taken!`);

    this.players[seat - 1].setHand(hand);

    return this;
  }

  addPlayer(hand: IHand) {
    let seat: number = this.players.findIndex(s => s.isEmpty()) + 1;
    return this.setPlayerHand(hand, seat)
  }

  calculate() {
    if (this.players.filter(player => player.inHand()).length < 2)
      throw new Error("Minimum 2 players required");

    return this.board.getResult();
  }

  setBoard(cards: Array<string>) {
    this.board.setFlop(cards.slice(0, 3));
    if (cards.length > 3)
      this.board.setTurn(cards[3]);
    if (cards.length === 5)
      this.board.setRiver(cards[4]);
    return this;
  }

}

