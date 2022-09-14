import gameFlow from "../components/gameFlow";
import { gameDisplay } from "./dom";

const startGameListener = (player, computer) => {
  // assigning event listener to start game
  const ListenerBtn = document.querySelector(".ready-btn");
  const placeShipDisplay = document.querySelector(".place-ship-container");
  const startGameBtn = document.querySelector(".ready-btn");

  startGameBtn.addEventListener("click", function () {
    // removes position display and repopulates with game display
    removeContent(placeShipDisplay);
    gameDisplay(player, computer);

    // starts game flow
    gameFlow(player, computer);
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
      shipDisplay.textContent = `${fleetInfo[i].shipType} (${fleetInfo[i].length})`;
      shipDisplay.setAttribute("id", "ship" + [i + 6]);
      if (fleetInfo[i].isSunk()) {
        // let sunkShip = fleetInfo[i];
        let sunkId = [i + 6];
        const editShipDisplay = (() => {
          let stringId = `ship${sunkId}`;
          let editThisShip = document.getElementById(`ship${sunkId}`);
          editThisShip.textContent = `${fleetInfo[i].shipType}'s sunk!`;
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
      shipDisplay.textContent = `${fleetInfo[i].shipType} Health: ${fleetInfo[
        i
      ].getHealth()}/${fleetInfo[i].length}`;
      shipDisplay.setAttribute("id", "ship" + [i + 1]);
    }
  }
};

const sunkShipDisplay = (fleet) => {
  if (fleet[i].isSunk()) {
    // let sunkShip = fleet[i];
    let sunkId = [i + 1];
    const editShipDisplay = (() => {
      let stringId = `ship${sunkId}`;
      let editThisShip = document.getElementById(`ship${sunkId}`);
      editThisShip.textContent = `${fleet[i].shipType} has been sunk!`;
      console.log(stringId);
    })();
  }
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

const retrieveClicked = () => {
  return new Promise((resolve) => {
    let computerCells = document.querySelectorAll(".grid-box-computer");
    computerCells.forEach((cell) =>
      cell.addEventListener("click", function (e) {
        resolve(e.target.dataset.info);
      })
    );
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
  startGameListener,
  updateGameDisplay,
  turnDisplay,
  turnMsg,
  displayFleetsAndBoards,
  retrieveClicked,
  createListOfShips,
  pageTranstion,
  removeContent,
};
