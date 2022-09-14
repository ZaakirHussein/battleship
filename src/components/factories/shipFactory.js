function Ship(name, length, coordinates = []) {
  const shipType = name;
  let health = length;
  const hitMarkers = [];
  let sunk = false;

  //setCoordinates
  const shipCoordinates = coordinates;

  const hit = () => {
    if (health >= 1) {
      health--;
      hitMarkers.push("hit");
    }
  };

  const isSunk = () => {
    if (health === 0) {
      sunk = true;
      return true;
    } else return false;
  };

  const getShipCoordinates = () => {
    return coordinates;
  };

  const getHealth = () => {
    return health;
  };
  const getHitmarkers = () => {
    return hitMarkers;
  };

  const getSunkStatus = () => {
    return sunk;
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
    getSunkStatus,
  };
}

export default Ship;
