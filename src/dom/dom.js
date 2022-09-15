import handleForm from "/src/components/helpers/handleForm.js";
import { displayFleetsAndBoards, turnDisplay } from "/src/dom/domHelpers.js";
import { nameStorage } from "/src/components/helpers/retrievePlayerName.js";
import { retrievePlayerName } from "../components/helpers/retrievePlayerName";

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
    form.addEventListener("submit", handleForm);

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
    startBtn.addEventListener("submit", handleForm);
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
  headerText.textContent = `${nameStorage} place your ships!`;

  const placeShipContent = placeShip.appendChild(
    document.createElement("main")
  );
  placeShipContent.classList.add("place-ship");

  const gridContainer = placeShipContent.appendChild(
    document.createElement("section")
  );

  gridContainer.classList.add("grid-container");

  const startGameBtn = placeShipContent.appendChild(
    document.createElement("button")
  );

  startGameBtn.classList.add("ready-btn");
  startGameBtn.textContent = "I'm Ready";

  // const dragShipsContainer = placeShipContent.appendChild(
  //   document.createElement("div")
  // );
  // dragShipsContainer.classList.add("drag-ship-container");

  // const ships = ["carrier", "battleship", "cruiser", "submarine", "destroyer"];
  // const shipLength = [5, 4, 3, 3, 2];

  // for (let i = 0; i < ships.length; i++) {
  //   const dragShip = document.createElement("div");
  //   dragShipsContainer.appendChild(dragShip);
  //   dragShip.classList.add(`${ships[i]}`);
  //   for (let j = 0; j < shipLength.length; j++) {
  //     dragShip.appendChild(document.createElement("div"));
  //   }
  // }
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
  turnDisplay(player, computer);

  // Renders Player and Computer's gameboard and fleet
  displayFleetsAndBoards(player, computer);
};

export { createHeader, homeDisplay, positionShipDisplay, gameDisplay };
