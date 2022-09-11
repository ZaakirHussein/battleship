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
      shipDisplay.setAttribute("id", "ship" + [i + 1]);
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

export default createListOfShips;
