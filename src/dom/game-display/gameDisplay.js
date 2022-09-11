import createHeader from "/src/dom/header.js";
import displayFleetsAndBoards from "/src/dom/helpers/displayFleetsAndShips.js";
import turnDisplay from "./turnDisplay";

const gameDisplay = (player, computer) => {
  const turnContainer = document.body.appendChild(
    document.createElement("div")
  );
  turnContainer.classList.add("turn-container");
  const gameContainer = document.body.appendChild(
    document.createElement("div")
  );
  gameContainer.classList.add("game-container");

  // Display who's turn it is
  turnDisplay(player, computer);

  // Renders Player and Computer's gameboard and fleet
  displayFleetsAndBoards(player, computer);
};

export default gameDisplay;
