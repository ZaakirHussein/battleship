import { updateGameDisplay, retrieveClicked } from "/src/dom/domHelpers.js";
import { turnMsg } from "../dom/domHelpers";

const gameFlow = async (player, computer) => {
  const playerBoard = player.getPlayerBoard();
  const computerBoard = computer.getPlayerBoard();

  while (
    playerBoard.areAllShipsSunk() == false &&
    computerBoard.areAllShipsSunk() == false
  ) {
    const coordinates = await retrieveClicked();
    computerBoard.receiveAttack(coordinates, player);
    player.changeTurn();
    computer.changeTurn();
    playerBoard.setShipSunkBoardProp();
    computerBoard.setShipSunkBoardProp();
    updateGameDisplay(player, computer);
    computerPlay(player, computer);
    computer.changeTurn();
    player.changeTurn();
    computerBoard.setShipSunkBoardProp();
    playerBoard.setShipSunkBoardProp();
    updateGameDisplay(player, computer);

    continue;
  }
  endGame(playerBoard, computerBoard);
};

const computerPlay = (humanPlayer, computer) => {
  const humanBoardObj = humanPlayer.board;
  const humanBoardAccess = humanBoardObj.getBoardPieces();

  const eligibleBoard = humanBoardAccess.filter(
    (boardPiece) => boardPiece.status === null
  );

  const computerAttack = (coordinates) => {
    humanBoardObj.receiveAttack(coordinates, computer);
  };

  const generateRandomCoord = (() => {
    const randomBoardPiece =
      eligibleBoard[Math.floor(Math.random() * eligibleBoard.length)];
    const randomBoardPiecesCoord = randomBoardPiece.ID;
    computerAttack(randomBoardPiecesCoord);
  })();
};

const endGame = (playerBoard, computerBoard) => {
  if (computerBoard.areAllShipsSunk() === true) {
    turnMsg("Congrats, you beat the computer!");
    return true;
  }
  if (playerBoard.areAllShipsSunk() === true) {
    turnMsg("Unfortunately you have lost to the computer!");
    return true;
  }
  return false;
};

export default gameFlow;
