/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/components/factories/gameBoardFactory.js":
/*!******************************************************!*\
  !*** ./src/components/factories/gameBoardFactory.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _shipFactory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./shipFactory */ "./src/components/factories/shipFactory.js");


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
    new _shipFactory__WEBPACK_IMPORTED_MODULE_0__["default"]("Carrier", 5),
    new _shipFactory__WEBPACK_IMPORTED_MODULE_0__["default"]("Battleship", 4),
    new _shipFactory__WEBPACK_IMPORTED_MODULE_0__["default"]("Cruiser", 3),
    new _shipFactory__WEBPACK_IMPORTED_MODULE_0__["default"]("Submarine", 3),
    new _shipFactory__WEBPACK_IMPORTED_MODULE_0__["default"]("Destroyer", 2),
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Gameboard);


/***/ }),

/***/ "./src/components/factories/gameFactory.js":
/*!*************************************************!*\
  !*** ./src/components/factories/gameFactory.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _dom_domHelpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../dom/domHelpers */ "./src/dom/domHelpers.js");


function Game(player, playerBoard, computer, computerBoard) {
  const playRound = () => {
    humanTurn();
  };

  const humanTurn = async () => {
    if (player.getTurnStatus()) {
      const coordinates = await (0,_dom_domHelpers__WEBPACK_IMPORTED_MODULE_0__.retrieveClickedBox)();
      computerBoard.receiveAttack(coordinates, player);
      changeTurn(player, computer);
      sunkShipBoardListener(playerBoard, computerBoard);
      (0,_dom_domHelpers__WEBPACK_IMPORTED_MODULE_0__.updateGameDisplay)(player, computer);
      isGameOver();
      setTimeout(() => {
        computerTurn();
      }, 1200);
    }
  };
  const computerTurn = () => {
    if (computer.getTurnStatus()) {
      computerPlay(player, computer);
      changeTurn(computer, player);
      sunkShipBoardListener(computerBoard, playerBoard);
      (0,_dom_domHelpers__WEBPACK_IMPORTED_MODULE_0__.updateGameDisplay)(player, computer);
      isGameOver();
      humanTurn();
    }
  };

  const isGameOver = () => {
    const winMsg = "Congrats, you beat the computer!";
    const lossMsg = "Unfortunately you have lost to the computer!";
    if (computerBoard.areAllShipsSunk() === true) {
      (0,_dom_domHelpers__WEBPACK_IMPORTED_MODULE_0__.endGame)(winMsg);
      return true;
    }
    if (playerBoard.areAllShipsSunk() === true) {
      (0,_dom_domHelpers__WEBPACK_IMPORTED_MODULE_0__.endGame)(lossMsg);
      return true;
    }
    console.log("the game is not over");
    return false;
  };

  const changeTurn = (player1, player2) => {
    player1.changeTurn();
    player2.changeTurn();
    console.log(`${player1.getName()}: ${player1.getTurnStatus()}`);
    console.log(`${player2.getName()}: ${player2.getTurnStatus()}`);
  };

  const sunkShipBoardListener = (player1Board, player2Board) => {
    player1Board.setShipSunkBoardProp();
    player2Board.setShipSunkBoardProp();
  };

  const computerPlay = (humanPlayer, computer) => {
    const humanBoardObj = humanPlayer.board;
    const humanBoardAccess = humanBoardObj.getBoardPieces();

    const eligibleBoard = humanBoardAccess.filter(
      (boardPiece) => boardPiece.status === null
    );

    const computerAttack = (coordinates) => {
      humanBoardObj.receiveAttack(coordinates, computer);
    };

    const generateRandomCoord = (() => {
      const randomBoardPiece =
        eligibleBoard[Math.floor(Math.random() * eligibleBoard.length)];
      const randomBoardPiecesCoord = randomBoardPiece.ID;
      computerAttack(randomBoardPiecesCoord);
    })();
  };

  return { playRound };
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Game);


/***/ }),

/***/ "./src/components/factories/playerFactory.js":
/*!***************************************************!*\
  !*** ./src/components/factories/playerFactory.js ***!
  \***************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _gameBoardFactory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./gameBoardFactory */ "./src/components/factories/gameBoardFactory.js");


function PlayerFactory(name, checkTurn) {
  let board = new _gameBoardFactory__WEBPACK_IMPORTED_MODULE_0__["default"]();
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
  };
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (PlayerFactory);


/***/ }),

/***/ "./src/components/factories/shipFactory.js":
/*!*************************************************!*\
  !*** ./src/components/factories/shipFactory.js ***!
  \*************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (Ship);


/***/ }),

/***/ "./src/components/gameFlow.js":
/*!************************************!*\
  !*** ./src/components/gameFlow.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _factories_gameFactory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./factories/gameFactory */ "./src/components/factories/gameFactory.js");
/* harmony import */ var _dom_domHelpers__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../dom/domHelpers */ "./src/dom/domHelpers.js");



const gameFlow = async (player, computer) => {
  const playerBoard = player.getPlayerBoard();
  const computerBoard = computer.getPlayerBoard();

  const playerBoardSunkStatus = playerBoard.areAllShipsSunk();
  const computerBoardSunkStatus = computerBoard.areAllShipsSunk();

  const game = new _factories_gameFactory__WEBPACK_IMPORTED_MODULE_0__["default"](player, playerBoard, computer, computerBoard);

  game.playRound();
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (gameFlow);


/***/ }),

/***/ "./src/components/helpers/capitalizeFirstLetter.js":
/*!*********************************************************!*\
  !*** ./src/components/helpers/capitalizeFirstLetter.js ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (capitalizeFirstLetter);


/***/ }),

/***/ "./src/components/helpers/handleForm.js":
/*!**********************************************!*\
  !*** ./src/components/helpers/handleForm.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _dom_domHelpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../dom/domHelpers */ "./src/dom/domHelpers.js");
/* harmony import */ var _retrievePlayerName__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./retrievePlayerName */ "./src/components/helpers/retrievePlayerName.js");
/* harmony import */ var _initializeGame__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../initializeGame */ "./src/components/initializeGame.js");




const handleForm = (e) => {
  e.preventDefault();
  (0,_retrievePlayerName__WEBPACK_IMPORTED_MODULE_1__.retrievePlayerName)();
  const homeDisplayContainer = document.querySelector(".home-display");
  (0,_dom_domHelpers__WEBPACK_IMPORTED_MODULE_0__.removeContent)(homeDisplayContainer);
  (0,_initializeGame__WEBPACK_IMPORTED_MODULE_2__["default"])();
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (handleForm);


/***/ }),

/***/ "./src/components/helpers/retrievePlayerName.js":
/*!******************************************************!*\
  !*** ./src/components/helpers/retrievePlayerName.js ***!
  \******************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "nameStorage": () => (/* binding */ nameStorage),
/* harmony export */   "retrievePlayerName": () => (/* binding */ retrievePlayerName)
/* harmony export */ });
let nameStorage;

const retrievePlayerName = () => {
  let playerName = document.getElementById("player-input").value;
  nameStorage = playerName;

  if (playerName === "") {
    console.log("You did not enter a value.");
  }
  console.log(playerName);
  return playerName;
};




/***/ }),

/***/ "./src/components/initializeGame.js":
/*!******************************************!*\
  !*** ./src/components/initializeGame.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _factories_playerFactory__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./factories/playerFactory */ "./src/components/factories/playerFactory.js");
/* harmony import */ var _helpers_retrievePlayerName__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./helpers/retrievePlayerName */ "./src/components/helpers/retrievePlayerName.js");
/* harmony import */ var _positionShips__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./positionShips */ "./src/components/positionShips.js");
/* harmony import */ var _dom_dom__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../dom/dom */ "./src/dom/dom.js");





const initializeGame = () => {
  const player = new _factories_playerFactory__WEBPACK_IMPORTED_MODULE_0__["default"](_helpers_retrievePlayerName__WEBPACK_IMPORTED_MODULE_1__.nameStorage, true);
  const computer = new _factories_playerFactory__WEBPACK_IMPORTED_MODULE_0__["default"]("AI", false);
  const computerBoard = computer.getPlayerBoard();
  computerBoard.randomShipPlacement();

  (0,_dom_dom__WEBPACK_IMPORTED_MODULE_3__.positionShipDisplay)(_helpers_retrievePlayerName__WEBPACK_IMPORTED_MODULE_1__.nameStorage);
  (0,_positionShips__WEBPACK_IMPORTED_MODULE_2__["default"])(player, computer);
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (initializeGame);


/***/ }),

/***/ "./src/components/positionShips.js":
/*!*****************************************!*\
  !*** ./src/components/positionShips.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _dom_domHelpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../dom/domHelpers */ "./src/dom/domHelpers.js");


const positionShips = (player, computer) => {
  const playerBoard = player.getPlayerBoard();
  const positionShipContainer = document.querySelector(".grid-container");
  playerBoard.renderBoard(positionShipContainer, true, "position");

  const dragAndDrop = (() => {
    (0,_dom_domHelpers__WEBPACK_IMPORTED_MODULE_0__.dragAndDropDisplay)(player);
    (0,_dom_domHelpers__WEBPACK_IMPORTED_MODULE_0__.dragAndDropLogic)(player, computer);
  })();

  (0,_dom_domHelpers__WEBPACK_IMPORTED_MODULE_0__.autoPlacementListener)(player, computer);
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (positionShips);


/***/ }),

/***/ "./src/dom/dom.js":
/*!************************!*\
  !*** ./src/dom/dom.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createHeader": () => (/* binding */ createHeader),
/* harmony export */   "gameDisplay": () => (/* binding */ gameDisplay),
/* harmony export */   "homeDisplay": () => (/* binding */ homeDisplay),
/* harmony export */   "positionShipDisplay": () => (/* binding */ positionShipDisplay)
/* harmony export */ });
/* harmony import */ var _domHelpers__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./domHelpers */ "./src/dom/domHelpers.js");
/* harmony import */ var _components_helpers_handleForm__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../components/helpers/handleForm */ "./src/components/helpers/handleForm.js");
/* harmony import */ var _components_helpers_retrievePlayerName__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/helpers/retrievePlayerName */ "./src/components/helpers/retrievePlayerName.js");




const createHeader = () => {
  const headerContainer = document.body.appendChild(
    document.createElement("nav")
  );
  headerContainer.classList.add("header-container-game");

  const headerLogo = headerContainer.appendChild(document.createElement("img"));
  headerLogo.classList.add("header-logo-game");
  headerLogo.src = "/src/styles/images/Battleship-1.png";
};

const homeDisplay = () => {
  const createHome = document.body.appendChild(document.createElement("div"));
  createHome.classList.add("home-display");

  const addToHomeDisplay = document.querySelector(".home-display");

  const headerContainer = addToHomeDisplay.appendChild(
    document.createElement("nav")
  );
  headerContainer.classList.add("navbar");

  const headerLogo = headerContainer.appendChild(document.createElement("img"));
  headerLogo.classList.add("header-logo");
  headerLogo.src = "/src/styles/images/Battleship-1.png";

  const homeContainer = addToHomeDisplay.appendChild(
    document.createElement("section")
  );
  homeContainer.classList.add("home-container");

  const createEnterNameInput = (() => {
    const enterNameContainer = homeContainer.appendChild(
      document.createElement("div")
    );
    enterNameContainer.classList.add("enter-name-container");

    const form = enterNameContainer.appendChild(document.createElement("form"));
    form.classList.add("form");
    form.addEventListener("submit", _components_helpers_handleForm__WEBPACK_IMPORTED_MODULE_1__["default"]);

    const input = form.appendChild(document.createElement("input"));
    input.classList.add("input");
    input.placeholder = "PLAYER NAME";
    input.setAttribute("id", "player-input");
    input.setAttribute("name", "player-input");
    input.setAttribute("type", "text");
    input.required = true;

    const startBtn = form.appendChild(document.createElement("button"));
    startBtn.textContent = "Start Game";
    startBtn.classList.add("start-btn");
    startBtn.setAttribute("type", "submit");
    startBtn.addEventListener("submit", _components_helpers_handleForm__WEBPACK_IMPORTED_MODULE_1__["default"]);
  })();
};

const positionShipDisplay = () => {
  createHeader();

  const placeShip = document.body.appendChild(document.createElement("div"));
  placeShip.classList.add("place-ship-container");

  const headerContainer = placeShip.appendChild(
    document.createElement("header")
  );
  headerContainer.classList.add("place-ship-header");

  const headerText = headerContainer.appendChild(document.createElement("h1"));
  headerText.textContent = `${_components_helpers_retrievePlayerName__WEBPACK_IMPORTED_MODULE_2__.nameStorage} place your ships!`;

  const placeShipContent = placeShip.appendChild(
    document.createElement("main")
  );
  placeShipContent.classList.add("place-ship");

  const gridContainer = placeShipContent.appendChild(
    document.createElement("section")
  );

  gridContainer.classList.add("grid-container");

  const btnContainer = placeShipContent.appendChild(
    document.createElement("div")
  );

  btnContainer.classList.add("btn-container");

  const autoPlacement = btnContainer.appendChild(
    document.createElement("button")
  );

  autoPlacement.classList.add("auto-place");
  autoPlacement.textContent = "Auto Placement";
};

const gameDisplay = (player, computer) => {
  const turnContainer = document.body.appendChild(
    document.createElement("div")
  );
  turnContainer.classList.add("turn-container");
  const gameContainer = document.body.appendChild(
    document.createElement("div")
  );
  gameContainer.classList.add("game-container");

  // Display who's turn it is
  (0,_domHelpers__WEBPACK_IMPORTED_MODULE_0__.turnDisplay)(player, computer);

  // Renders Player and Computer's gameboard and fleet
  (0,_domHelpers__WEBPACK_IMPORTED_MODULE_0__.displayFleetsAndBoards)(player, computer);
};




/***/ }),

/***/ "./src/dom/domHelpers.js":
/*!*******************************!*\
  !*** ./src/dom/domHelpers.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "autoPlacementListener": () => (/* binding */ autoPlacementListener),
/* harmony export */   "createListOfShips": () => (/* binding */ createListOfShips),
/* harmony export */   "displayFleetsAndBoards": () => (/* binding */ displayFleetsAndBoards),
/* harmony export */   "dragAndDropDisplay": () => (/* binding */ dragAndDropDisplay),
/* harmony export */   "dragAndDropLogic": () => (/* binding */ dragAndDropLogic),
/* harmony export */   "endGame": () => (/* binding */ endGame),
/* harmony export */   "pageTranstion": () => (/* binding */ pageTranstion),
/* harmony export */   "removeContent": () => (/* binding */ removeContent),
/* harmony export */   "retrieveClickedBox": () => (/* binding */ retrieveClickedBox),
/* harmony export */   "startGameListener": () => (/* binding */ startGameListener),
/* harmony export */   "turnDisplay": () => (/* binding */ turnDisplay),
/* harmony export */   "turnMsg": () => (/* binding */ turnMsg),
/* harmony export */   "updateGameDisplay": () => (/* binding */ updateGameDisplay),
/* harmony export */   "updateGridOnDrop": () => (/* binding */ updateGridOnDrop),
/* harmony export */   "updateGridOnPlacement": () => (/* binding */ updateGridOnPlacement)
/* harmony export */ });
/* harmony import */ var _components_gameFlow__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../components/gameFlow */ "./src/components/gameFlow.js");
/* harmony import */ var _dom__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./dom */ "./src/dom/dom.js");
/* harmony import */ var _components_helpers_capitalizeFirstLetter__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/helpers/capitalizeFirstLetter */ "./src/components/helpers/capitalizeFirstLetter.js");




const startGameListener = (player, computer) => {
  // assigning event listener to start game
  const placeShipDisplay = document.querySelector(".place-ship-container");
  const startGameBtn = document.querySelector(".ready-btn");

  if (startGameBtn) {
    startGameBtn.addEventListener("click", function () {
      // removes position display and repopulates with game display
      removeContent(placeShipDisplay);
      (0,_dom__WEBPACK_IMPORTED_MODULE_1__.gameDisplay)(player, computer);

      // starts game flow
      (0,_components_gameFlow__WEBPACK_IMPORTED_MODULE_0__["default"])(player, computer);
    });
  }
};

const autoPlacementListener = (player, computer) => {
  const playerBoard = player.getPlayerBoard();
  const autoPlacementBtn = document.querySelector(".auto-place");
  const dragAndDrop = document.querySelector(".list-container");
  const btnContainer = document.querySelector(".btn-container");

  let startGameFlag = false;

  autoPlacementBtn.addEventListener("click", () => {
    playerBoard.resetShips();
    playerBoard.resetBoard();
    playerBoard.randomShipPlacement();
    updateGridOnPlacement(playerBoard);

    if (!startGameFlag) {
      const startGameBtn = btnContainer.appendChild(
        document.createElement("button")
      );

      startGameBtn.classList.add("ready-btn");
      startGameBtn.textContent = "Start Game";
      startGameFlag = true;
      startGameListener(player, computer);
    }

    if (dragAndDrop) {
      dragAndDrop.remove();
    }
  });
};

const createListOfShips = (container, player) => {
  const listContainer = container.appendChild(document.createElement("div"));
  listContainer.classList.add("list-container");
  const shipListHeader = listContainer.appendChild(
    document.createElement("h2")
  );

  const listOfShips = listContainer.appendChild(document.createElement("ul"));
  listOfShips.classList.add("ships-list");

  const playerName = player.getName();
  const playerBoard = player.getPlayerBoard();
  const fleetInfo = playerBoard.getShipStorage();

  if (playerName === "AI") {
    shipListHeader.textContent = "Computer's Fleet";
    for (let i = 0; i < 5; i++) {
      const shipDisplay = document.createElement("li");
      listOfShips.appendChild(shipDisplay);
      shipDisplay.classList.add("individual-ships");
      shipDisplay.textContent = `${fleetInfo[i].getShipType()} (${
        fleetInfo[i].length
      })`;
      shipDisplay.setAttribute("id", "ship" + [i + 6]);
      if (fleetInfo[i].isSunk()) {
        // let sunkShip = fleetInfo[i];
        let sunkId = [i + 6];
        const editShipDisplay = (() => {
          let stringId = `ship${sunkId}`;
          let editThisShip = document.getElementById(`ship${sunkId}`);
          editThisShip.textContent = `${fleetInfo[i].getShipType()}'s sunk!`;
          editThisShip.classList.toggle("sunk-ship-list");
        })();
      }
    }
  } else {
    shipListHeader.textContent = `${playerName}'s Fleet`;
    for (let i = 0; i < 5; i++) {
      const shipDisplay = document.createElement("li");
      listOfShips.appendChild(shipDisplay);
      shipDisplay.classList.add("individual-ships");
      shipDisplay.textContent = `${fleetInfo[
        i
      ].getShipType()} Health: ${fleetInfo[i].getHealth()}/${
        fleetInfo[i].length
      }`;
      shipDisplay.setAttribute("id", "ship" + [i + 1]);
    }
  }
};

const rotateShip = (playerBoard, img) => {
  const fleetInfo = playerBoard.getShipStorage();

  const matchingShip = fleetInfo.find(
    (ship) => ship.getShipType().toLowerCase() === img.id
  );

  const currentOrientation = matchingShip.getOrientation();

  if (currentOrientation === "vertical") {
    img.style.transform = "rotate(90deg)";
  }

  if (currentOrientation === "horizontal") {
    img.style.transform = "rotate(0)";
  }
};

const dragAndDropDisplay = (player) => {
  const placeShipContent = document.querySelector(".place-ship");
  const listContainer = placeShipContent.appendChild(
    document.createElement("div")
  );
  listContainer.classList.add("list-container");

  const shipListHeader = listContainer.appendChild(
    document.createElement("h2")
  );

  const playerBoard = player.getPlayerBoard();
  const fleetInfo = playerBoard.getShipStorage();

  shipListHeader.textContent = `Drag'n Drop`;

  const displayOfShipIcons = (() => {
    const listOfShips = listContainer.appendChild(document.createElement("ul"));
    listOfShips.classList.add("ships-list");
    for (let i = 0; i < 5; i++) {
      const shipDisplay = listOfShips.appendChild(document.createElement("li"));
      shipDisplay.classList.add("ship-list-item");

      const shipName = fleetInfo[i].getShipType().toLowerCase();

      const shipImg = shipDisplay.appendChild(document.createElement("img"));
      shipImg.src = `/src/styles/images/ships/${shipName}.png`;
      shipImg.classList.add("ship-img");
      shipImg.setAttribute("id", shipName);
      shipImg.addEventListener("dragstart", (e) => {
        e.dataTransfer.setData("text/plain", e.target.id);
      });
      shipImg.addEventListener("dblclick", () => {
        const matchingShip = fleetInfo.find(
          (ship) => ship.getShipType().toLowerCase() === shipImg.id
        );
        matchingShip.changeOrientation();
        console.log(matchingShip.getOrientation());
        rotateShip(playerBoard, shipImg);
      });
    }
  })();
};

const dragAndDropLogic = (player, computer) => {
  const playerBoard = player.getPlayerBoard();
  const gridBoxes = document.querySelectorAll(".grid-box");
  const fleetInfo = playerBoard.getShipStorage();
  const btnContainer = document.querySelector(".btn-container");

  gridBoxes.forEach((box) => {
    box.addEventListener("dragover", (e) => {
      e.preventDefault();
      box.classList.add("over");
    });

    box.addEventListener("dragleave", () => {
      box.classList.remove("over");
    });

    box.addEventListener("drop", (e) => {
      e.preventDefault();

      box.classList.remove("over");

      const listContainer = document.querySelector(".list-container");

      const data = e.dataTransfer.getData("text");

      const matchingShip = fleetInfo.find(
        (ship) => ship.getShipType().toLowerCase() === data
      );
      const shipLength = matchingShip.length - 1;
      const shipStart = box.id;

      const shipStartLetterCoord = shipStart.charAt(0);
      let shipStartnNumberCoord;

      if (shipStart.length < 3) {
        shipStartnNumberCoord = parseInt(shipStart.charAt(1));
      } else {
        shipStartnNumberCoord = parseInt(shipStart.substring(1, 3));
      }

      console.log(shipStartnNumberCoord);

      const coordinatesArr = [];

      if (matchingShip.getOrientation() === "horizontal") {
        const horizontalShipPlacement = (() => {
          const shipEnd = `${shipStartLetterCoord}${
            shipStartnNumberCoord + shipLength
          }`;
          const shipEndNum = shipStartnNumberCoord + shipLength;

          if (shipStart.length === 2 && shipEndNum <= 10) {
            const dropCoordinates = (() => {
              for (let i = shipStartnNumberCoord; i <= shipEndNum; i++) {
                let coordinate = `${shipStartLetterCoord}${i}`;
                coordinatesArr.push(coordinate);
              }
            })();

            const areCoordinatesAvailable =
              playerBoard.checkCoordinatesAvailability(
                coordinatesArr,
                data,
                "human"
              );

            if (areCoordinatesAvailable) {
              console.log("the coordinates submitted are available");
              const shipNm = (0,_components_helpers_capitalizeFirstLetter__WEBPACK_IMPORTED_MODULE_2__["default"])(data);
              playerBoard.setShipCoordinates(shipNm, coordinatesArr);
              matchingShip.placed = true;
              document.querySelector(`#${data}`).remove();
              updateGridOnDrop(player, computer);
              const doneDroppingShips = playerBoard.areShipsPlaced();

              if (doneDroppingShips) {
                console.log("ships are all placed");
                const startGameBtn = btnContainer.appendChild(
                  document.createElement("button")
                );

                startGameBtn.classList.add("ready-btn");
                startGameBtn.textContent = "Start Game";
                startGameListener(player, computer);
                listContainer.remove();
              }
            }
          } else {
            const shipImg = document.getElementById(data);
            shipImg.classList.add("shake");
            shipImg.addEventListener("animationend", () => {
              shipImg.classList.remove("shake");
            });
          }
        })();
      }

      if (matchingShip.getOrientation() === "vertical") {
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
          const shipEnd = `${shipEndLetter}${shipStartnNumberCoord}`;

          // if the last last coorindates letter coordinate index is lessan than 10

          if (shipEndLetterIndex > 0 && shipEndLetterIndex < 10) {
            const dropCoordinates = (() => {
              for (let i = returnIndex; i <= shipEndLetterIndex; i++) {
                let coordinate = `${boardLetters[i]}${shipStartnNumberCoord}`;
                coordinatesArr.push(coordinate);
              }
            })();

            const areCoordinatesAvailable =
              playerBoard.checkCoordinatesAvailability(
                coordinatesArr,
                data,
                "human"
              );

            if (areCoordinatesAvailable) {
              const shipNm = (0,_components_helpers_capitalizeFirstLetter__WEBPACK_IMPORTED_MODULE_2__["default"])(data);
              playerBoard.setShipCoordinates(shipNm, coordinatesArr);
              matchingShip.placed = true;
              document.querySelector(`#${data}`).remove();
              updateGridOnDrop(playerBoard, computer);

              const doneDroppingShips = playerBoard.areShipsPlaced();
              console.log(doneDroppingShips);
              console.log(playerBoard.getShipStorage());

              if (doneDroppingShips) {
                console.log("ships are all placed");
                const startGameBtn = btnContainer.appendChild(
                  document.createElement("button")
                );

                startGameBtn.classList.add("ready-btn");
                startGameBtn.textContent = "Start Game";
                startGameListener(player, computer);
                listContainer.remove();
              }
            }
          } else {
            const shipImg = document.getElementById(data);
            shipImg.classList.add("shake");
            shipImg.addEventListener("animationend", () => {
              shipImg.classList.remove("shake");
            });
          }
        })();
      }
    });
  });
};

const updateGridOnDrop = (player, computer) => {
  const playerBoard = player.getPlayerBoard();
  const positionShipContainer = document.querySelector(".grid-container");
  positionShipContainer.firstChild.remove();

  playerBoard.renderBoard(positionShipContainer, true, "position");
  dragAndDropLogic(player, computer);
};

const updateGridOnPlacement = (playerBoard) => {
  const positionShipContainer = document.querySelector(".grid-container");
  positionShipContainer.firstChild.remove();

  playerBoard.renderBoard(positionShipContainer, true, "position");
  console.log(playerBoard.getBoardPieces());
};

const displayFleetsAndBoards = (player, computer) => {
  const gameContainer = document.querySelector(".game-container");

  while (gameContainer.hasChildNodes()) {
    gameContainer.firstChild.remove();
  }

  const leftGame = gameContainer.appendChild(document.createElement("div"));
  leftGame.classList.add("left-game");
  const playerFleetDisplay = createListOfShips(leftGame, player);
  const playerBoard = player.getPlayerBoard();
  playerBoard.renderBoard(leftGame, true);

  const rightGame = gameContainer.appendChild(document.createElement("div"));
  rightGame.classList.add("right-game");
  const computerBoard = computer.getPlayerBoard();
  computerBoard.renderBoard(rightGame);
  const computerFleetDisplay = createListOfShips(rightGame, computer);
};

const retrieveClickedBox = () => {
  return new Promise((resolve) => {
    let computerCells = document.querySelectorAll(".grid-box-computer");
    computerCells.forEach((cell) => {
      if (cell.dataset.clicked === "null") {
        cell.addEventListener("click", function handleClick(e) {
          console.log(e.target.dataset);
          resolve(e.target.dataset.info);
        });
      }
    });
  });
};

const endGame = (msg) => {
  turnMsg(msg);
  let computerCells = document.querySelectorAll(".grid-box-computer");
  computerCells.forEach((cell) => {
    cell.removeEventListener("click", handleClick);
  });
};

const displaySunkShips = (playerBoard, computerBoard) => {
  const playerFleet = playerBoard.getFleetHealth();
  const compFleet = computerBoard.getFleetHealth();

  const playerBoardPieces = playerBoard.getBoardPieces();
  const compBoardPieces = computerBoard.getBoardPieces();

  playerFleet.map((ship) => {
    if (ship === 0) {
    }
  });

  const sunkPlayer = [];
  const sunkComp = [];
};

const turnDisplay = (player, computer) => {
  const container = document.querySelector(".turn-container");

  while (container.hasChildNodes()) {
    container.firstChild.remove();
  }

  const turnTitle = container.appendChild(document.createElement("h2"));
  turnTitle.classList.add("turn-title");

  const playerTurn = player.getTurnStatus();
  const computerTurn = computer.getTurnStatus();

  if (playerTurn === true) {
    turnTitle.textContent = `It's  your turn ${player.getName()}, attack the computer's board!`;
  } else if (computerTurn === true) {
    turnTitle.textContent = `It's the computer's turn, brace for impact!`;
  }
};

const turnMsg = (string) => {
  const turnText = document.querySelector(".turn-title");
  turnText.textContent = string;
};

const updateGameDisplay = (player, computer) => {
  turnDisplay(player, computer);
  displayFleetsAndBoards(player, computer);
};

const pageTranstion = (content) => {
  removeContent(content);
};

const removeContent = (content) => {
  content.remove();
};




/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _dom_dom__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./dom/dom */ "./src/dom/dom.js");


(0,_dom_dom__WEBPACK_IMPORTED_MODULE_0__.homeDisplay)();

})();

/******/ })()
;
//# sourceMappingURL=main.js.map