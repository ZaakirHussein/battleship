import { removeContent } from "/src/dom/domHelpers.js";
import { retrievePlayerName } from "./retrievePlayerName";
import initializeGame from "../initializeGame";

const handleForm = (e) => {
  e.preventDefault();
  retrievePlayerName();
  const homeDisplayContainer = document.querySelector(".home-display");
  removeContent(homeDisplayContainer);
  initializeGame();
};

export default handleForm;
