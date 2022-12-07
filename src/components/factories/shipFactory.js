function Ship(name, length, coordinates = []) {
  const shipType = name;
  let health = length;
  const hitMarkers = [];
  let sunk = false;
  let placed = false;
  let orientation = "horizontal";

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
    }
    return false;
  };

  const changeOrientation = () => {
    if (orientation === "horizontal") {
      return (orientation = "vertical");
    }
    return (orientation = "horizontal");
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

  const getShipType = () => {
    return shipType;
  };

  const getIsShipPlaced = () => {
    return placed;
  };

  const getOrientation = () => {
    return orientation;
  };
  return {
    shipType,
    length,
    coordinates,
    sunk,
    orientation,
    placed,
    hit,
    isSunk,
    changeOrientation,
    getShipCoordinates,
    getHealth,
    getHitmarkers,
    getSunkStatus,
    getShipType,
    getIsShipPlaced,
    getOrientation,
  };
}

export default Ship;
