import {
  updateGameDisplay,
  retrieveClickedBox,
  turnMsg,
  endGame,
} from "../../dom/domHelpers";

function Game(player, playerBoard, computer, computerBoard) {
  const playRound = () => {
    humanTurn();
  };

  const humanTurn = async () => {
    if (player.getTurnStatus()) {
      const coordinates = await retrieveClickedBox();
      computerBoard.receiveAttack(coordinates, player);
      changeTurn(player, computer);
      sunkShipBoardListener(playerBoard, computerBoard);
      updateGameDisplay(player, computer);
      isGameOver();
      setTimeout(() => {
        computerTurn();
      }, 1200);
    }
  };
  const computerTurn = () => {
    if (computer.getTurnStatus()) {
      computerPlay(player, computer);
      changeTurn(computer, player);
      sunkShipBoardListener(computerBoard, playerBoard);
      updateGameDisplay(player, computer);
      isGameOver();
      humanTurn();
    }
  };

  const isGameOver = () => {
    const winMsg = "Congrats, you beat the computer!";
    const lossMsg = "Unfortunately you have lost to the computer!";
    if (computerBoard.areAllShipsSunk() === true) {
      endGame(winMsg);
      return true;
    }
    if (playerBoard.areAllShipsSunk() === true) {
      endGame(lossMsg);
      return true;
    }
    console.log("the game is not over");
    return false;
  };

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

  return { playRound };
}

export default Game;
