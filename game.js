import { GameOfLife } from './GameOfLife.js';
import { Graphics } from './graphics.js';

let interval = null;

/* Paramètres à modifier sur l'interface */
let timeout = 100;  // Met à jour le jeu de la vie toutes les 500ms
let width = 160;    // Largeur de la grille
let height = 90;    // Hauteur de la grille
let startPopulation = 0.7;  // Pourcentage de population de départ
let cellColor = "green";        // Couleur des cellules vivantes
let backgroundColor = "black";  // Couleur des cellules mortes
let borderColor = "none";       // Couleur des contours des cellules

// Crée un objet GameOfLife avec une grille de X fois Y cellules
let game = new GameOfLife(width, height);
let graphics = new Graphics(game);

// Fonction qui met à jour le jeu de la vie et affiche la grille
function update() {
    game.update();
    display(game);
}

function display(game) {
    // Affiche la grille de cellules dans la console
    //let output = "";
    for (let y = 0; y < game.cells[0].length; y++) {
        for (let x = 0; x < game.cells.length; x++) {
            graphics.update(x, y, game.cells[x][y]);
        }
    }
}

function start() {
    if (interval == null) {
        interval = setInterval(update, timeout);
    }
}

function stop() {
    if (interval != null) {
        clearInterval(interval);
        interval = null;
    }
}

let startButton = document.getElementById("start-button");
let stopButton = document.getElementById("stop-button");
let resetButton = document.getElementById("reset-button");

game.setStartpopulation(startPopulation);
game.populate();

graphics.setCellColor(cellColor);
graphics.setBackgroundColor(backgroundColor);
graphics.setBorderColor(borderColor);

display(game);

startButton.addEventListener("click", start);
stopButton.addEventListener("click", stop);