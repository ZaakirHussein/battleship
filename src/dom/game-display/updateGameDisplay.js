import turnDisplay from "./turnDisplay";
import displayFleetsAndBoards from "/src/dom/helpers/displayFleetsAndShips.js";

const updateGameDisplay = (player, computer) => {
  turnDisplay(player, computer);
  displayFleetsAndBoards(player, computer);
};

export default updateGameDisplay;
