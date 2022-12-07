import Game from "./factories/gameFactory";
import { turnMsg } from "../dom/domHelpers";

const gameFlow = async (player, computer) => {
  const playerBoard = player.getPlayerBoard();
  const computerBoard = computer.getPlayerBoard();

  const playerBoardSunkStatus = playerBoard.areAllShipsSunk();
  const computerBoardSunkStatus = computerBoard.areAllShipsSunk();

  const game = new Game(player, playerBoard, computer, computerBoard);

  game.playRound();
};

export default gameFlow;
