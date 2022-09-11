import PlayerFactory from "./factories/playerFactory";
import { nameStorage } from "./helpers/retrievePlayerName";
import positionShips from "./positionShips";
import placeShipDisplay from "/src/dom/place-ships-display/placeShipDisplay.js";

const initializeGame = () => {
  const player = new PlayerFactory(nameStorage, true);
  const computer = new PlayerFactory("AI", false);
  const computerBoard = computer.getPlayerBoard();
  // create function taht randomly assigns computer board coordinates
  computerBoard.setShipCoordinates("Carrier", ["A1", "B1", "C1", "D1", "E1"]);
  computerBoard.setShipCoordinates("Battleship", ["A3", "B3", "C3", "D3"]);
  computerBoard.setShipCoordinates("Cruiser", ["C5", "D5", "E5"]);
  computerBoard.setShipCoordinates("Submarine", ["B7", "C7", "D7"]);
  computerBoard.setShipCoordinates("Destroyer", ["C10", "D10"]);

  placeShipDisplay(nameStorage);
  positionShips(player, computer);
};

export default initializeGame;
