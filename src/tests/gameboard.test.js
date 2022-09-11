import Gameboard from "../components/factories/gameboardFactory";
import PlayerFactory from "../components/factories/playerFactory";

test("check that board array contains 100 obects inside. 10 x 10 gameboard", () => {
  let game = new Gameboard();
  let testLength = game.getBoardPieces().length;
  expect(testLength).toBe(100);
});

test("gameboard contains 5 ship objects", () => {
  let game = new Gameboard();
  let totalShips = game.getShipStorage();
  expect(totalShips.length).toBe(5);
});

test("place ships at specific coordinates by calling the ship factory function", () => {
  let game = new Gameboard();
  game.setShipCoordinates("Carrier", ["B1", "B2", "B3", "B4", "B5"]);
  let ships = game.getShipStorage();
  let carrier = ships[0].coordinates;
  expect(carrier).toStrictEqual(["B1", "B2", "B3", "B4", "B5"]);
});

test("the coordinates have the objects property is not null", () => {
  let game = new Gameboard();
  game.setShipCoordinates("Cruiser", ["A1", "A2", "A3"]);
  let board = game.getBoardPieces();

  expect(board[0].ship).toBeTruthy();
  expect(board[1].ship).toBeTruthy();
  expect(board[2].ship).toBeTruthy();
});

test("receiveAttack() takes a pair of coordinates and determines whether or not the attack hit a ship and records the coordinates of the missed shot", () => {
  let game = new Gameboard();
  let player = new PlayerFactory("Lebron", true);

  game.setShipCoordinates("Submarine", ["A1", "B1", "C1"]);
  game.receiveAttack("A1", player);
  game.receiveAttack("C1", player);
  game.receiveAttack("A2", player);

  let board = game.getBoardPieces();

  expect(board[0].status).toBe("hit");
  expect(board[10].status).toBe(null);
  expect(board[20].status).toBe("hit");
  expect(board[1].status).toBe("missed");
});

test("receiveAttack() takes a pair of coordinates and sends the hit() to the correct ship", () => {
  let game = new Gameboard();
  let player = new PlayerFactory("Lebron", true);

  game.setShipCoordinates("Carrier", ["B1", "B2", "B3", "B4", "B5"]);
  game.receiveAttack("B1", player);
  game.receiveAttack("B3", player);
  game.receiveAttack("B5", player);

  let ships = game.getShipStorage();
  let carrier = ships[0];
  let carrierHealth = carrier.getHealth();

  expect(carrierHealth).toBe(2);
});

test("accuratley display health of fleet", () => {
  let player = new PlayerFactory("Lebron", true);
  let game = new Gameboard();
  game.setShipCoordinates("Carrier", ["E1", "E2", "E3", "E4", "E5"]);
  game.setShipCoordinates("Destroyer", ["A1", "A2"]);

  game.receiveAttack("A1", player);
  game.receiveAttack("E1", player);
  game.receiveAttack("E3", player);
  game.receiveAttack("E5", player);

  let fleetHealth = game.getFleetHealth();

  let carrier = fleetHealth.carrierHealth;
  let destroyer = fleetHealth.destroyerHealth;

  expect(carrier).toBe(2);
  expect(destroyer).toBe(1);
});

test("checking to see if all ships are sunk are all ships sunk", () => {
  let player = new PlayerFactory("Lebron", true);
  let game = new Gameboard();
  game.setShipCoordinates("Carrier", ["A1", "B1", "C1", "D1", "E1"]);
  game.setShipCoordinates("Battleship", ["A3", "B3", "C3", "D3"]);
  game.setShipCoordinates("Cruiser", ["C5", "D5", "E5"]);
  game.setShipCoordinates("Submarine", ["B7", "C7", "D7"]);
  game.setShipCoordinates("Destroyer", ["C10", "D10"]);

  game.receiveAttack("A1", player);
  game.receiveAttack("B1", player);
  game.receiveAttack("C1", player);
  game.receiveAttack("D1", player);
  game.receiveAttack("E1", player);

  game.receiveAttack("A3", player);
  game.receiveAttack("B3", player);
  game.receiveAttack("C3", player);
  game.receiveAttack("D3", player);

  game.receiveAttack("C5", player);
  game.receiveAttack("D5", player);
  game.receiveAttack("E5", player);

  game.receiveAttack("B7", player);
  game.receiveAttack("C7", player);
  game.receiveAttack("D7", player);

  game.receiveAttack("C10", player);
  game.receiveAttack("D10", player);

  expect(game.areAllShipsSunk()).toBe(true);
});
