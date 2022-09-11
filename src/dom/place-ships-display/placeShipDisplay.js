import createHeader from "../header";
import { nameStorage } from "../../components/helpers/retrievePlayerName";

const placeShipDisplay = () => {
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
};

export default placeShipDisplay;
