function Ship(name, length, coordinates = [], sunk = false) {
  const shipType = name;
  let health = length;
  const hitMarkers = [];

  //setCoordinates
  const shipCoordinates = coordinates;

  const hit = () => {
    if (health >= 1) {
      health--;
      hitMarkers.push("hit");
    }
  };

  const isSunk = () => {
    if (health === 0) return true;
    else return false;
  };

  const getShipCoordinates = () => {
    return shipCoordinates;
  };

  const getHealth = () => {
    return health;
  };
  const getHitmarkers = () => {
    return hitMarkers;
  };

  return {
    shipType,
    length,
    coordinates,
    sunk,
    health,
    hit,
    isSunk,
    getShipCoordinates,
    getHealth,
    getHitmarkers,
  };
}

export default Ship;
