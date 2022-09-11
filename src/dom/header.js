const createHeader = () => {
  const headerContainer = document.body.appendChild(
    document.createElement("nav")
  );
  headerContainer.classList.add("header-container-game");

  const headerLogo = headerContainer.appendChild(document.createElement("img"));
  headerLogo.classList.add("header-logo-game");
  headerLogo.src = "/src/styles/images/Battleship-1.png";
};

export default createHeader;
