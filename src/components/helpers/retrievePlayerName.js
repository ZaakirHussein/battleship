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

export { retrievePlayerName, nameStorage };
