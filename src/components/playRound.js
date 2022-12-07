import { updateGameDisplay, retrieveClickedBox } from "../dom/domHelpers";

const changeTurn = (player1, player2) => {
  player1.changeTurn();
  player2.changeTurn();
  console.log(`${player1.getName()}: ${player1.getTurnStatus()}`);
  console.log(`${player2.getName()}: ${player2.getTurnStatus()}`);
};

const sunkShipBoardListener = (player1Board, player2Board) => {
  player1Board.setShipSunkBoardProp();
  player2Board.setShipSunkBoardProp();
};

const playRound = (player, playerBoard, computer, computerBoard) => {
  const userTurn = (async () => {
    const coordinates = await retrieveClickedBox();
    computerBoard.receiveAttack(coordinates, player);
    changeTurn(player, computer);
    sunkShipBoardListener(playerBoard, computerBoard);
    updateGameDisplay(player, computer);
    return playerBoard.areAllShipsSunk();
  })();

  if (computer.getTurnStatus()) {
    const computerTurn = (() => {
      setTimeout(() => {
        computerPlay(player, computer);
        changeTurn(computer, player);
        sunkShipBoardListener(computerBoard, playerBoard);
        updateGameDisplay(player, computer);
        return computerBoard.areAllShipsSunk();
      }, 3000);
    })();
  }
};

export default playRound;
