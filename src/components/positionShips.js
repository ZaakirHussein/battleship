import {
  dragAndDropDisplay,
  dragAndDropLogic,
  autoPlacementListener,
} from "../dom/domHelpers";

const positionShips = (player, computer) => {
  const playerBoard = player.getPlayerBoard();
  const positionShipContainer = document.querySelector(".grid-container");
  playerBoard.renderBoard(positionShipContainer, true, "position");

  const dragAndDrop = (() => {
    dragAndDropDisplay(player);
    dragAndDropLogic(player, computer);
  })();

  autoPlacementListener(player, computer);
};

export default positionShips;
