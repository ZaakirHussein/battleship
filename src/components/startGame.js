import gameFlow from "../gameFlow";
import gameDisplay from "/src/dom/game-display/gameDisplay.js";
import { removeContent } from "../dom/helpers/pageTransition";

const startGame = (player, computer) => {
  // assigning event listener to start game
  const startGameBtn = document.querySelector(".ready-btn");
  const placeShipDisplay = document.querySelector(".place-ship-container");

  startGameBtn.addEventListener("click", function () {
    // removes position display and repopulates with game display
    removeContent(placeShipDisplay);
    gameDisplay(player, computer);

    // starts game flow
    gameFlow(player, computer);
  });
};

export default startGame;
