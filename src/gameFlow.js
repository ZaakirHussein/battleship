import playRound from "./components/playRound";

const gameFlow = (player, computer) => {
  const playerBoard = player.getPlayerBoard();
  const computerBoard = computer.getPlayerBoard();

  console.log(playerBoard.areAllShipsSunk());
  console.log(computerBoard.areAllShipsSunk());

  // condition that makes playRound run until someone's fleet is completely sunk
  while (
    playerBoard.areAllShipsSunk() === false &&
    computerBoard.areAllShipsSunk() === false
  ) {
    playRound(player, computer);
  }
};

export default gameFlow;
