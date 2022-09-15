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

  const boardPieces = createBoard();

  const shipStorage = [
    new Ship("Carrier", 5),
    new Ship("Battleship", 4),
    new Ship("Cruiser", 3),
    new Ship("Submarine", 3),
    new Ship("Destroyer", 2),
  ];

  const positionUserShips = () => {
    const listOfShips = getShipStorage();
    const cssShips = [
      "carrier",
      "battleship",
      "cruiser",
      "submarine",
      "destroyer",
    ];
    const positionShipContainer = document.querySelector(".grid-container");

    listOfShips.map((ship) => {
      cssShips.map((cssShip) => {
        positionShipContainer.addEventListener("mouseover", function (e) {
          console.log(e.target.dataset.info);
          if (ship.shipType === cssShip) {
          }
          document.createElement("div").classList.add(cssShip);
        });
      });
    });
  };

  const setShipCoordinates = (name, inputCoordinates) => {
    for (const ship of shipStorage) {
      if (ship.shipType === name) {
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
    const activeShip = shipStorage.find((ship) => ship.shipType === name);

    for (const boardPiece of approvedBoardPieces) {
      boardPiece.ship = activeShip;
    }
  };

  const hitActiveShip = (shipName, inputtedCoordinates) => {
    for (const shipObj of shipStorage) {
      if (shipObj.shipType === shipName) {
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
            boardPiece.sunk = sunkShip.getSunkStatus();
          }
        });
      }
    }
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
          cell.classList.toggle("box-ship-placed");
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
        let cellSunkStatus = compCellData.sunk;

        console.log(cellSunkStatus);

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
    let result = ships.map((ship) => ship.isSunk());
    return result.every((element) => element === true);
  };

  return {
    setShipCoordinates,
    setShipSunkBoardProp,
    getCompCells,
    getBoardPieces,
    getShipStorage,
    getFleetHealth,
    areAllShipsSunk,
    positionUserShips,
    receiveAttack,
    renderBoard,
  };
}

export default Gameboard;
