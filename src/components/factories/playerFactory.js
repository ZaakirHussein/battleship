import Gameboard from "./gameBoardFactory";

function PlayerFactory(name, checkTurn) {
  let board = new Gameboard();
  let turn = checkTurn;
  let moves = [];
  let fleetHealth = board.getFleetHealth();

  const getName = () => {
    return name;
  };

  const getPlayerBoard = () => {
    return board;
  };

  const getTurnStatus = () => {
    return turn;
  };

  const changeTurn = () => {
    turn = !turn;
  };

  const getAttackCoord = () => {
    if (!moves.length) return;

    let output = [];
    for (let move of moves) {
      output.push(move.attackCoordinates);
    }
    return output;
  };

  const getMoves = () => {
    return moves;
  };

  const randomShipPlacement = (player) => {
    const playerBoardObj = player.board;
    const playerBoardAccess = playerBoardObj.getBoardPieces();

    const fiveCoordinates = [];

    for (let i = 0; i < 5; i++) {
      const randomBoardPiece =
        playerBoardAccess[Math.floor(Math.random() * playerBoardAccess.length)];
      fiveCoordinates.push(randomBoardPiece.ID);
    }

    return fiveCoordinates;
  };

  return {
    turn,
    moves,
    fleetHealth,
    board,
    changeTurn,
    getName,
    getTurnStatus,
    getPlayerBoard,
    getAttackCoord,
    getMoves,
    randomShipPlacement,
  };
}

export default PlayerFactory;
