import { displayFleetsAndBoards, turnDisplay } from "./domHelpers";
import handleForm from "../components/helpers/handleForm";
import { nameStorage } from "../components/helpers/retrievePlayerName";

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
  turnDisplay(player, computer);

  // Renders Player and Computer's gameboard and fleet
  displayFleetsAndBoards(player, computer);
};

export { createHeader, homeDisplay, positionShipDisplay, gameDisplay };
