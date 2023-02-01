import { GameOfLife } from './GameOfLife.js';
import { Graphics } from './Graphics.js';
import {Settings} from './Settings.js';
import {jsonData} from './gameValues.js';

let startButton = document.getElementById("start-button");
let stopButton = document.getElementById("stop-button");
let resetButton = document.getElementById("reset-button");
let settingsButton = document.getElementById("settings-button");
let confirmParametersButton = document.getElementById("confirm-settings-button");
let cancelParametersButton = document.getElementById("cancel-settings-button");

let settingsField = document.getElementById("settings");

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
let settings = new Settings(jsonData);
let game = new GameOfLife(settings._width, settings._height);
let graphics = new Graphics(game);
let backUpSettings = new Settings(jsonData);

// Fonction qui met à jour le jeu de la vie et affiche la grille
function update() {
    game.update();
    graphics.display();
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

function reset() {
    game.reload(settings);
    graphics.reload();
    graphics.display();
}

function cancelParameters() {
    console.log("Cancel Settings");
    settingsField.hidden = true;
}

function confirmParameters() {
    console.log("Confirm Settings");
    let previousWidth = settings._width;
    let previousHeight = settings._height;
    let previousStartPopulation = settings._startPopulation;
    let previousStartWithPopulation = settings._startWithPopulation;

    settings.width = parseInt(document.getElementById('width').value);
    settings.height = parseInt(document.getElementById('height').value);
    settings.startPopulation = parseInt(document.getElementById('startPopulation').value);
    settings.startWithPopulation = document.getElementById('startWithPopulation').checked;

    settingsField.hidden = true;

    if (previousWidth != settings._width || previousHeight != settings._height || previousStartPopulation != settings._startPopulation ||
        previousStartWithPopulation != settings._startWithPopulation) {
        console.log("Reloading...");
        reset();
        console.log("Game reloaded");
    }
}

function settingsButtonClick() {
    if (settingsField.hidden) {
        console.log("Click")
        settings.updateSettingsField();
        settingsField.hidden = false;
    }
}

settingsField.hidden = true;

game.populate(settings._startPopulation);

graphics.setCellColor(cellColor);
graphics.setBackgroundColor(backgroundColor);
graphics.setBorderColor(borderColor);

graphics.display();

startButton.addEventListener("click", start);
stopButton.addEventListener("click", stop);
resetButton.addEventListener("click", reset);
settingsButton.addEventListener("click", settingsButtonClick);
confirmParametersButton.addEventListener("click", confirmParameters);
cancelParametersButton.addEventListener("click", cancelParameters);