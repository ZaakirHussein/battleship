import Ship from "../components/factories/shipFactory";

test("creating a ship with a length of 3", () => {
  let battleship = new Ship("Boat", 3);
  expect(battleship.length).toBe(3);
});

test("hit() function takes a number then marks that position as hit", () => {
  let boat = new Ship("Boat", 3, ["A1", "A2", "A3"]);
  boat.hit("A2");
  boat.hit("A3");

  let hitmarkers = boat.getHitmarkers();

  expect(hitmarkers[0]).toBe("hit");
  expect(hitmarkers[1]).toBe("hit");
});

test("sunk is ship object's default value", () => {
  let yacht = new Ship("Yacht", 3, ["D1", "D2", "D3"]);
  expect(yacht.sunk).toBe(false);
});

test("isSunk() will return true if health is 0", () => {
  let destroyer = new Ship("Destroyer", 2, ["A3", "A4"]);
  destroyer.hit("A3");
  destroyer.hit("A4");
  let mock = destroyer.isSunk();
  let mock2 = destroyer.getSunkStatus();
  expect(mock).toBe(true);
  expect(mock2).toBe(true);
});

test("isSunk() will return false if health is above 0", () => {
  let kayak = new Ship("Kayak", 2, ["E8", "E9"]);
  kayak.hit("E8");
  let mock = kayak.isSunk();
  expect(mock).toBe(false);
});

test("get ship coordinates", () => {
  let carrier = new Ship("Carrier", 5, ["A1", "A2", "A3", "A4", "A5"]);
  expect(carrier.getShipCoordinates()).toStrictEqual([
    "A1",
    "A2",
    "A3",
    "A4",
    "A5",
  ]);
});
