import { removeContent } from "../../dom/helpers/pageTransition";
import { retrievePlayerName, nameStorage } from "./retrievePlayerName";
import initializeGame from "../initializeGame";

const handleForm = (e) => {
  e.preventDefault();
  retrievePlayerName();
  const homeDisplayContainer = document.querySelector(".home-display");
  removeContent(homeDisplayContainer);
  initializeGame();
};

export default handleForm;
