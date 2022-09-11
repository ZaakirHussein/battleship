import startGame from "./startGame";
import createListOfShips from "/src/dom/helpers/createListOfShips.js";

const positionShips = (player, computer) => {
  const playerBoard = player.getPlayerBoard();

  // function that allows user to place ships with drag and drop
  playerBoard.setShipCoordinates("Carrier", ["A1", "A2", "A3", "A4", "A5"]);
  playerBoard.setShipCoordinates("Battleship", ["B1", "B2", "B3", "B4"]);
  playerBoard.setShipCoordinates("Cruiser", ["D3", "D4", "D5"]);
  playerBoard.setShipCoordinates("Submarine", ["F1", "F2", "F3"]);
  playerBoard.setShipCoordinates("Destroyer", ["J4", "J5"]);

  const positionShipContainer = document.querySelector(".grid-container");
  playerBoard.renderBoard(positionShipContainer, true, "position");

  const placeShipContent = document.querySelector(".place-ship");

  createListOfShips(placeShipContent, player);
  startGame(player, computer);
};

export default positionShips;
