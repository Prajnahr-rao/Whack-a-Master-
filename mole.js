let currMoleTile;
let currPlantTile;
let score = 0;
let gameOver = false;

window.onload = function () {
  setGame();
};

function setGame() {
  // Create 9 grid tiles for a 3x3 board
  for (let i = 0; i < 9; i++) {
    const tile = document.createElement("div");
    tile.id = i.toString();
    tile.addEventListener("click", selectTile);
    document.getElementById("board").appendChild(tile);
  }
  setInterval(setMole, 1000);  // spawn mole every 1 second
  setInterval(setPlant, 2000); // spawn plant every 2 seconds
}

function getRandomTile() {
  return Math.floor(Math.random() * 9).toString();
}

function setMole() {
  if (gameOver) return;
  // Remove previous mole
  if (currMoleTile) {
    currMoleTile.innerHTML = "";
  }
  const mole = document.createElement("img");
  mole.src = "./monty-mole.png";
  
  let num = getRandomTile();
  // If the randomly selected tile already has a plant, try again next interval.
  if (currPlantTile && currPlantTile.id === num) return;
  
  currMoleTile = document.getElementById(num);
  currMoleTile.appendChild(mole);
}

function setPlant() {
  if (gameOver) return;
  // Remove previous plant
  if (currPlantTile) {
    currPlantTile.innerHTML = "";
  }
  const plant = document.createElement("img");
  plant.src = "./piranha-plant.png";
  
  let num = getRandomTile();
  // If the tile already has a mole, skip placing a plant.
  if (currMoleTile && currMoleTile.id === num) return;
  
  currPlantTile = document.getElementById(num);
  currPlantTile.appendChild(plant);
}

function selectTile() {
  if (gameOver) return;
  
  if (this === currMoleTile) {
    score += 10;
    document.getElementById("score").innerText = score.toString();
  } else if (this === currPlantTile) {
    document.getElementById("score").innerText = "GAME OVER: " + score.toString();
    gameOver = true;
  }
}