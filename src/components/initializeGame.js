import PlayerFactory from "./factories/playerFactory";
import { nameStorage } from "./helpers/retrievePlayerName";
import positionShips from "./positionShips";
import { positionShipDisplay } from "../dom/dom";

const initializeGame = () => {
  const player = new PlayerFactory(nameStorage, true);
  const computer = new PlayerFactory("AI", false);
  const computerBoard = computer.getPlayerBoard();
  computerBoard.randomShipPlacement();

  positionShipDisplay(nameStorage);
  positionShips(player, computer);
};

export default initializeGame;
