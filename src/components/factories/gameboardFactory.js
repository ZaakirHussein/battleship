import Ship from "./shipFactory";

function Gameboard() {
  const createBoard = () => {
    const x = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"];
    const y = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];
    let board = [];

    for (let i = 0; i < x.length; i++) {
      for (let j = 0; j < y.length; j++) {
        board.push({
          ID: x[i] + y[j],
          ship: null,
          status: null,
          attackedBy: null,
          sunk: false,
        });
      }
    }

    return board;
  };

  let boardPieces = createBoard();

  const shipStorage = [
    new Ship("Carrier", 5),
    new Ship("Battleship", 4),
    new Ship("Cruiser", 3),
    new Ship("Submarine", 3),
    new Ship("Destroyer", 2),
  ];

  const setShipCoordinates = (name, inputCoordinates) => {
    console.log(`Ship: ${name} Coordinates:${inputCoordinates}`);
    for (const ship of shipStorage) {
      if (ship.getShipType() === name) {
        ship.coordinates = inputCoordinates;
      }
    }
    addShipToBoardProp(name, inputCoordinates);
  };

  const addShipToBoardProp = (name, submittedCoordinates) => {
    // loop through array of board pieces ex. [{ID: A1, ship: null}, ...]
    // if boardPiece.ID matches inputed coordinates
    // set boardPiece.ship property to activeShip object

    const approvedBoardPieces = submittedCoordinates.map(
      (indivdiualCoordinate) => {
        const matchingBoardPieces = boardPieces.find((boardPiece) => {
          return boardPiece.ID === indivdiualCoordinate;
        });

        return matchingBoardPieces;
      }
    );

    // Sets the active ship's coordindate property to the inputed coordinates
    const activeShip = shipStorage.find((ship) => ship.getShipType() === name);

    for (const boardPiece of approvedBoardPieces) {
      boardPiece.ship = activeShip;
    }
  };

  const areShipsPlaced = () => {
    return shipStorage.every((ship) => ship.placed === true);
  };

  const hitActiveShip = (shipName, inputtedCoordinates) => {
    for (const shipObj of shipStorage) {
      if (shipObj.getShipType() === shipName) {
        shipObj.hit(inputtedCoordinates);
      }
    }
  };

  const recordOfAttack = (attacker, coordinates, hitStatus) => {
    const attackerStorage = attacker.moves;
    const movObj = { attackCoordinates: coordinates, DidItHit: hitStatus };

    attackerStorage.push(movObj);
  };

  const receiveAttack = (coordinates, attacker) => {
    const activeBoardPiece = boardPieces.find(
      (boardPiece) => boardPiece.ID === coordinates
    );

    if (activeBoardPiece.status !== null) return;

    if (activeBoardPiece.ship !== null) {
      activeBoardPiece.status = "hit";
      activeBoardPiece.attackedBy = attacker.getName();

      let shipID = activeBoardPiece.ship.shipType;
      hitActiveShip(shipID, coordinates);
      recordOfAttack(attacker, coordinates, activeBoardPiece.status);
    } else {
      activeBoardPiece.status = "missed";
      activeBoardPiece.attackedBy = attacker.getName();
      recordOfAttack(attacker, coordinates, activeBoardPiece.status);
    }
  };

  const setShipSunkBoardProp = () => {
    // this function iterates through the a player's ships and updates the grid boardpieces sunk property
    // this is used to change the colour of a sunk ship

    const sunkShips = [];

    for (const ship of shipStorage) {
      if (ship.getSunkStatus() == true) {
        sunkShips.push(ship);

        // Here find the sunk ship's coordinates and update the board pieces that contain the sunk ship
        sunkShips.forEach((sunkShip) => {
          const approvedBoardPieces = sunkShip.coordinates.map(
            (indivdiualCoordinate) => {
              const matchingBoardPieces = boardPieces.find((boardPiece) => {
                return boardPiece.ID === indivdiualCoordinate;
              });

              return matchingBoardPieces;
            }
          );

          for (const boardPiece of approvedBoardPieces) {
            // if the coordinate belongs to a sunk ship, we set the boardpiece's sunk property to
            boardPiece.sunk = sunkShip.getSunkStatus();
          }
        });
      }
    }
  };

  const checkCoordinatesAvailability = (arr, data, userType) => {
    const checkTheseGridBoxes = arr.map((indivdiualCoordinate) => {
      const matchingBoardPieces = boardPieces.find((boardPiece) => {
        return boardPiece.ID === indivdiualCoordinate;
      });

      return matchingBoardPieces;
    });

    const areCoordinatesAvailable = () => {
      return checkTheseGridBoxes.every((gridBox) => gridBox.ship === null);
    };

    const testCondition = areCoordinatesAvailable();

    if (userType === "human" && !testCondition) {
      console.log("the coordinates submitted NOT are available");
      const shipImg = document.getElementById(data);
      shipImg.classList.add("shake");
      shipImg.addEventListener("animationend", () => {
        shipImg.classList.remove("shake");
      });
    }

    return testCondition;
  };

  const randomShipPlacement = () => {
    shipStorage.forEach((ship) => {
      while (ship.coordinates.length < ship.length) {
        let coordinatesArr = [];

        const random = Math.floor(Math.random() * boardPieces.length);

        const shipLength = ship.length - 1;
        const shipStartObj = boardPieces[random];
        const shipStart = shipStartObj.ID;

        const shipStartLetterCoord = shipStart.charAt(0);
        let shipStartnNumberCoord;

        if (shipStart.length < 3) {
          shipStartnNumberCoord = parseInt(shipStart.charAt(1));
        } else {
          shipStartnNumberCoord = parseInt(shipStart.substring(1, 3));
        }

        const verticalOrHorizonal = (() => {
          let num = Math.random();
          if (num < 0.5) {
            return "horizontal";
          } else {
            return "vertical";
          }
        })();

        if (verticalOrHorizonal === "vertical") {
          ship.orientation = "vertical";
          console.log(ship.orientation);

          const verticalShipPlacement = (() => {
            const boardLetters = [
              "A",
              "B",
              "C",
              "D",
              "E",
              "F",
              "G",
              "H",
              "I",
              "J",
              "K",
            ];

            const returnIndex = boardLetters.indexOf(shipStartLetterCoord);
            const shipEndLetter = boardLetters[returnIndex + shipLength];
            const shipEndLetterIndex = boardLetters.indexOf(shipEndLetter);

            // if the last last coorindates letter coordinate index is lessan than 10

            if (shipEndLetterIndex > 0 && shipEndLetterIndex < 10) {
              const dropCoordinates = (() => {
                for (let i = returnIndex; i <= shipEndLetterIndex; i++) {
                  let coordinate = `${boardLetters[i]}${shipStartnNumberCoord}`;
                  coordinatesArr.push(coordinate);
                }
              })();

              const areCoordinatesAvailable = checkCoordinatesAvailability(
                coordinatesArr,
                shipStart
              );

              if (areCoordinatesAvailable) {
                const shipNm = ship.getShipType();
                setShipCoordinates(shipNm, coordinatesArr);
              } else if (!areCoordinatesAvailable) {
                console.log("coordinates were NOT Available");
                return (coordinatesArr = []);
              }
            }
          })();
        }

        if (verticalOrHorizonal === "horizontal") {
          ship.orientation = "horizontal";
          console.log(ship.orientation);

          const horizontalShipPlacement = (() => {
            const shipEndNum = shipStartnNumberCoord + shipLength;

            if (shipStart.length === 2 && shipEndNum <= 10) {
              const dropCoordinates = (() => {
                for (let i = shipStartnNumberCoord; i <= shipEndNum; i++) {
                  let coordinate = `${shipStartLetterCoord}${i}`;
                  coordinatesArr.push(coordinate);
                }
              })();

              const checkTheseGridBoxes = coordinatesArr.map(
                (indivdiualCoordinate) => {
                  const matchingBoardPieces = boardPieces.find((boardPiece) => {
                    return boardPiece.ID === indivdiualCoordinate;
                  });

                  return matchingBoardPieces;
                }
              );

              const areCoordinatesAvailable = (() => {
                return checkTheseGridBoxes.every(
                  (gridBox) => gridBox.ship === null
                );
              })();

              if (areCoordinatesAvailable) {
                const shipNm = ship.getShipType();
                setShipCoordinates(shipNm, coordinatesArr);
              } else if (!areCoordinatesAvailable) {
                console.log("coordinates were NOT Available");
                return (coordinatesArr = []);
              }
            }
          })();
        }

        console.log(
          `${ship.getShipType()}, coordinates.length: ${
            ship.coordinates.length
          }`
        );
        console.log(ship.length);
      }
    });

    console.log(shipStorage);
  };

  const renderBoard = (container, user, mode) => {
    if (user === true) {
      const grid = container.appendChild(document.createElement("div"));
      if (mode === "position") {
        grid.classList.add("grid-position");
      } else {
        grid.classList.add("grid");
      }

      for (let i = 0; i < 100; i++) {
        let cell = grid.appendChild(document.createElement("div"));
        cell.setAttribute("id", `${boardPieces[i].ID}`);
        cell.classList.add("grid-box");
        cell.dataset.info = JSON.stringify(boardPieces[i]);
        let cellData = boardPieces[i];
        let cellShipData = cellData.ship;
        let cellHitData = cellData.status;
        let cellSunkStatus = cellData.sunk;

        if (cellShipData !== null) {
          cell.classList.toggle(`${cellShipData.getShipType()}`);
        }

        if (cellSunkStatus === true) {
          cell.classList.toggle("box-sunk");
        }

        switch (cellHitData) {
          case "hit":
            // toggle a class
            cell.classList.toggle("box-hit");
            cell.textContent = "X";
            break;
          case "missed":
            // toggle a class
            cell.classList.toggle("box-missed");
            cell.textContent = "O";
            break;
        }
      }
    } else {
      const computerGrid = container.appendChild(document.createElement("div"));
      computerGrid.classList.add("computer-grid");

      for (let i = 0; i < boardPieces.length; i++) {
        let compCell = computerGrid.appendChild(document.createElement("div"));
        compCell.classList.add("grid-box-computer");
        compCell.dataset.info = boardPieces[i].ID;
        const compCellData = boardPieces[i];
        const cellStatus = compCellData.status;
        compCell.dataset.clicked = cellStatus;

        let cellSunkStatus = compCellData.sunk;

        if (cellSunkStatus == true) {
          compCell.classList.toggle("box-sunk");
        }

        switch (cellStatus) {
          case "hit":
            // toggle a class/add class
            compCell.classList.toggle("box-hit");
            compCell.textContent = "X";
            break;
          case "missed":
            compCell.classList.toggle("box-missed");
            compCell.textContent = "O";
            break;
        }
      }
    }
  };

  const getCompCells = () => {
    return document.querySelectorAll(".grid-box-computer");
  };

  const getBoardPieces = () => {
    return boardPieces;
  };
  const getShipStorage = () => {
    return shipStorage;
  };

  const getFleetHealth = () => {
    const ships = getShipStorage();

    const carrierHealth = ships[0].getHealth();
    const battleshipHealth = ships[1].getHealth();
    const cruiserHealth = ships[2].getHealth();
    const submarineHealth = ships[3].getHealth();
    const destroyerHealth = ships[4].getHealth();
    return {
      carrierHealth,
      battleshipHealth,
      cruiserHealth,
      submarineHealth,
      destroyerHealth,
    };
  };

  const areAllShipsSunk = () => {
    const ships = getShipStorage();
    const result = ships.map((ship) => ship.isSunk());
    return result.every((element) => element === true);
  };

  const resetShips = () => {
    shipStorage.forEach((ship) => {
      ship.placed = false;
      ship.orientation = "horizontal";
      ship.coordinates = [];
    });
  };

  const resetBoard = () => {
    boardPieces = createBoard();
  };

  return {
    setShipCoordinates,
    setShipSunkBoardProp,
    getCompCells,
    getBoardPieces,
    getShipStorage,
    getFleetHealth,
    areAllShipsSunk,
    areShipsPlaced,
    checkCoordinatesAvailability,
    resetShips,
    resetBoard,
    randomShipPlacement,
    receiveAttack,
    renderBoard,
    createBoard,
  };
}

export default Gameboard;
