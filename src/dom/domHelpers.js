import gameFlow from "../components/gameFlow";
import { gameDisplay } from "./dom";
import capitalizeFirstLetter from "../components/helpers/capitalizeFirstLetter";

const startGameListener = (player, computer) => {
  // assigning event listener to start game
  const placeShipDisplay = document.querySelector(".place-ship-container");
  const startGameBtn = document.querySelector(".ready-btn");

  if (startGameBtn) {
    startGameBtn.addEventListener("click", function () {
      // removes position display and repopulates with game display
      removeContent(placeShipDisplay);
      gameDisplay(player, computer);

      // starts game flow
      gameFlow(player, computer);
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
              const shipNm = capitalizeFirstLetter(data);
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
              const shipNm = capitalizeFirstLetter(data);
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

export {
  dragAndDropDisplay,
  dragAndDropLogic,
  updateGridOnDrop,
  updateGridOnPlacement,
  startGameListener,
  autoPlacementListener,
  updateGameDisplay,
  turnDisplay,
  turnMsg,
  displayFleetsAndBoards,
  retrieveClickedBox,
  createListOfShips,
  pageTranstion,
  removeContent,
  endGame,
};
