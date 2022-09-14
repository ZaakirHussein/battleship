import { updateGameDisplay } from "../dom/domHelpers";

const playRound = (player, computer) => {
  const playerBoard = player.getPlayerBoard();
  const computerBoard = computer.getPlayerBoard();
  const computerBoardDom = computerBoard.getCompCells();

  if (player.getTurnStatus()) {
    for (const cell of computerBoardDom) {
      cell.addEventListener("click", function () {
        let coordinates = cell.dataset.info;
        computerBoard.receiveAttack(coordinates, player);
        player.changeTurn();
        computer.changeTurn();
        updateGameDisplay(player, computer);
        computerBoard.areAllShipsSunk();
        playerBoard.areAllShipsSunk();
      });
    }
  }

  if (computer.getTurnStatus()) {
    computer.computerPlay(player, computer);
    computer.changeTurn();
    player.changeTurn();
    updateGameDisplay(player, computer);
    computerBoard.areAllShipsSunk();
    playerBoard.areAllShipsSunk();
  }
};

export default playRound;
