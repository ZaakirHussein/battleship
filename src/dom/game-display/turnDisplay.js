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

export default turnDisplay;
