#!/usr/bin/env node

const readlineSync = require('readline-sync');
import Table from "./lib/Table";
import Card from "./lib/Card";
import Result from "./lib/Result";
import { CardsFromString, Log } from "./lib/Utils";

// 🔹 Prompt the user for board and player hands

const boardInput = readlineSync.question(" Cards : 2-9 , T(10) , J , Q , K , A , \n Suits : h(heart), d(diamond), c(club), s(spade) \n Enter community cards (e.g. 5sTd9cTh): ");
const playersInput = readlineSync.question("Enter player hands separated by commas (e.g. AcKh,7d7c): ");

const options = {
  board: boardInput.trim(),
  player: playersInput.split(",").map(hand => hand.trim())
};

const log = Log.PrintLn;

let PrintResult = (result: Result) => {
  log();
  log(Log.color(`Board`, 'grey') + "   " + table.getBoard().getCards().map(c => Log.color(c.toString(), c.color())).join(" "));
  log();
  log(`Player        Hand         Wins      Ties`, 'grey');
  result.getPlayers().forEach(player => {
    log(`${Log.color(player.getName(), 'cyan')}     ${(player.getPlayer().getCards() as Array<Card>).map(c => Log.color(c.toString(), c.color())).join(" ")}     ${Log.color(player.getWinsPercentageString().padStart(7, " "), player.isWinner() ? "green" : "white")}    ${Log.color(player.getTiesPercentageString().padStart(6, " "), "white")}`);
  });

  log();
  log(`${result.getIterations()} iterations in ${result.getTime()}ms`, 'grey');
};

let table: Table;

try {
  table = new Table(); // default game
  options.player.forEach((p: string) => {
    table.addPlayer(CardsFromString(p));
  });

  if (options.board)
    table.setBoard(CardsFromString(options.board));

  PrintResult(table.calculate());

} catch (e) {
  log(e.toString(), 'red');
}
