import PlayerFactory from "../components/factories/playerFactory";

test("player name is being stored", () => {
  const humanPlayer = new PlayerFactory("Zaak", true);

  const playerName = humanPlayer.getName();

  expect(playerName).toBe("Zaak");
});

test("player successfully attacks the enemy gameboard", () => {
  const humanPlayer = new PlayerFactory("Zaak", true);
  const computer = new PlayerFactory("AI", false);

  let computerBoardObj = computer.board;
  computerBoardObj.setShipCoordinates("Carrier", [
    "E1",
    "E2",
    "E3",
    "E4",
    "E5",
  ]);
  computerBoardObj.setShipCoordinates("Battleship", ["F1", "F2", "F3", "F4"]);
  computerBoardObj.setShipCoordinates("Cruiser", ["C1", "C2", "C3"]);
  computerBoardObj.setShipCoordinates("Submarine", ["A1", "A2", "A3"]);
  computerBoardObj.setShipCoordinates("Destroyer", ["B1", "B2"]);

  computerBoardObj.receiveAttack("A1", humanPlayer);

  let computerBoardPieces = computerBoardObj.getBoardPieces();

  let boardPieceA1 = computerBoardPieces[0];
  let whoAttackedA1 = boardPieceA1.attackedBy;
  let a1HitStatus = boardPieceA1.status;

  expect(whoAttackedA1).toBe("Zaak");
  expect(a1HitStatus).toBe("hit");

  let zaakFirstMove = humanPlayer.moves[0];

  expect(zaakFirstMove.attackCoordinates).toBe("A1");
  expect(zaakFirstMove.DidItHit).toBe("hit");
});

test("computer makes random attack only in LEGAL postions", () => {
  const humanPlayer = new PlayerFactory("Patrice", true);
  const mockPlayerAttack = new PlayerFactory("Mock Attack", true);
  const computer = new PlayerFactory("AI", false);

  let humanBoardObj = humanPlayer.getPlayerBoard();

  // Set Up for human players board
  humanBoardObj.setShipCoordinates("Battleship", ["F1", "F2", "F3", "F4"]);
  humanBoardObj.setShipCoordinates("Cruiser", ["C1", "C2", "C3"]);
  humanBoardObj.setShipCoordinates("Submarine", ["A1", "A2", "A3"]);
  humanBoardObj.setShipCoordinates("Destroyer", ["B1", "B2"]);

  // Place holders to ensure there are 5 illgal positions [A1, B1, C1, D1, E1]
  humanBoardObj.receiveAttack("A1", mockPlayerAttack);
  humanBoardObj.receiveAttack("B1", mockPlayerAttack);
  humanBoardObj.receiveAttack("C1", mockPlayerAttack);
  humanBoardObj.receiveAttack("D1", mockPlayerAttack);
  humanBoardObj.receiveAttack("E1", mockPlayerAttack);

  // Random Computer Attacks
  computer.computerPlay(humanPlayer, computer);
  computer.computerPlay(humanPlayer, computer);
  computer.computerPlay(humanPlayer, computer);
  computer.computerPlay(humanPlayer, computer);
  computer.computerPlay(humanPlayer, computer);
  computer.computerPlay(humanPlayer, computer);
  computer.computerPlay(humanPlayer, computer);
  computer.computerPlay(humanPlayer, computer);
  computer.computerPlay(humanPlayer, computer);
  computer.computerPlay(humanPlayer, computer);
  computer.computerPlay(humanPlayer, computer);
  computer.computerPlay(humanPlayer, computer);
  computer.computerPlay(humanPlayer, computer);
  computer.computerPlay(humanPlayer, computer);
  computer.computerPlay(humanPlayer, computer);
  computer.computerPlay(humanPlayer, computer);
  computer.computerPlay(humanPlayer, computer);
  computer.computerPlay(humanPlayer, computer);
  computer.computerPlay(humanPlayer, computer);
  computer.computerPlay(humanPlayer, computer);
  computer.computerPlay(humanPlayer, computer);
  computer.computerPlay(humanPlayer, computer);
  computer.computerPlay(humanPlayer, computer);
  computer.computerPlay(humanPlayer, computer);
  computer.computerPlay(humanPlayer, computer);
  computer.computerPlay(humanPlayer, computer);
  computer.computerPlay(humanPlayer, computer);
  computer.computerPlay(humanPlayer, computer);
  computer.computerPlay(humanPlayer, computer);
  computer.computerPlay(humanPlayer, computer);

  const computerMoveCoord = computer.getAttackCoord();

  const illegalPositions = ["A1", "B1", "C1", "D1", "E1"];

  expect(
    computerMoveCoord.some((coordinate) =>
      illegalPositions.includes(coordinate)
    )
  ).toBe(false);
});

test("generate five random coordinates in player's gameboard", () => {
  let computer = new PlayerFactory("AI", false);
  let five = computer.randomShipPlacement(computer);

  expect(five.length).toBe(5);
  console.log(five);
});

test("receive the correct turn status", () => {
  let player = new PlayerFactory("Tony", false);
  expect(player.getTurnStatus()).toBe(false);
});

test("player's turn will change flip from original input", () => {
  let player = new PlayerFactory("Gregg", true);
  player.changeTurn();
  expect(player.getTurnStatus()).toBe(false);
});
