import createListOfShips from "/src/dom/helpers/createListOfShips.js";

const displayFleetsAndBoards = (player, computer) => {
  const gameContainer = document.querySelector(".game-container");

  while (gameContainer.hasChildNodes()) {
    gameContainer.firstChild.remove();
  }

  const leftGame = gameContainer.appendChild(document.createElement("div"));
  leftGame.classList.add("left-game");
  const playerFleetDisplay = createListOfShips(leftGame, player);
  const playerBoard = player.getPlayerBoard();
  playerBoard.renderBoard(leftGame, true);

  const rightGame = gameContainer.appendChild(document.createElement("div"));
  rightGame.classList.add("right-game");
  const computerBoard = computer.getPlayerBoard();
  computerBoard.renderBoard(rightGame);
  const computerFleetDisplay = createListOfShips(rightGame, computer);
};

export default displayFleetsAndBoards;
