import {GameOfLife} from './GameOfLife.js';
import {Graphics} from './Graphics.js';
import {Settings} from './Settings.js';
import {jsonData} from './gameValues.js';

let startButton = document.getElementById('start-button');
let stopButton = document.getElementById('stop-button');
let resetButton = document.getElementById('reset-button');
let settingsButton = document.getElementById('settings-button');
let confirmParametersButton = document.getElementById('confirm-settings-button');
let cancelParametersButton = document.getElementById('cancel-settings-button');
let timeoutInput = document.getElementById('timeout');
let structureInput = document.getElementById('structure');

// On définit le min et le max de l'input
timeoutInput.setAttribute('min', jsonData.min_timeout.toString())
timeoutInput.setAttribute('max', jsonData.max_timeout.toString())

let settingsField = document.getElementById('settings');

let interval = null;
let colorList = jsonData.color_list;
let structureList = jsonData.structure_list;

let settings = new Settings(jsonData, colorList, structureList);
let game = new GameOfLife(settings);
let graphics = new Graphics(game, colorList);

timeoutInput.value = settings._timeout;

// Fonction qui met à jour le jeu de la vie et affiche la grille
function update() {
    game.update();
    graphics.display();
}

// Fonction qui démarre la simulation
function start() {
    if (interval == null) {
        interval = setInterval(update, settings._timeout);
    }
}

// Fonction qui met en pause
function stop() {
    if (interval != null) {
        clearInterval(interval);
        interval = null;
    }
}

// Fonction qui réinitialise la simulation
function reset() {
    game.reload(settings);
    graphics.reload();
    graphics.display();
}

// Fonction qui annule le changement de paramètres
function cancelParameters() {
    console.log("Cancel Settings");
    settingsField.hidden = true;
}

// Fonction qui confirme le changement de paramètres
function confirmParameters() {
    console.log("Confirm Settings");

    // Partie valeurs du jeu
    let previousWidth = settings._width;
    let previousHeight = settings._height;
    let previousStartPopulation = settings._startPopulation;
    let previousStartWithPopulation = settings._startWithPopulation;

    settings.width = parseInt(document.getElementById('width').value);
    settings.height = parseInt(document.getElementById('height').value);
    settings.startPopulation = parseInt(document.getElementById('startPopulation').value);
    settings.startWithPopulation = document.getElementById('startWithPopulation').checked;

    // Partie affichage
    let previousCellColor = settings._cellColor;
    let previousBackgroundColor = settings._backgroundColor;
    let previousBorderColor = settings._borderColor;

    settings.cellColor = document.getElementById("cell-color").value;
    settings.backgroundColor = document.getElementById("background-color").value;
    settings.borderColor = document.getElementById("border-color").value;

    let valueDifferent = previousWidth !== settings._width || previousHeight !== settings._height || previousStartPopulation !== settings._startPopulation || previousStartWithPopulation !== settings._startWithPopulation;
    let displayDifferent = settings._cellColor !== previousCellColor || settings._backgroundColor !== previousBackgroundColor || settings._borderColor !== previousBorderColor;

    if (valueDifferent) {
        console.log("Reloading...");
        reset();
        console.log("Game reloaded");
    }
    else if (displayDifferent) {
        graphics.display();
    }

    settingsField.hidden = true;
}

// Fonction qui s'active lorsque le bouton paramètre est cliqué
function settingsButtonClick() {
    if (settingsField.hidden) {
        settings.updateSettingsField();
        settingsField.hidden = false;
    }
}

// Fonction qui s'active lorsque la vitesse est modifiée
function updateTimeout() {
    settings.timeout = parseInt(this.value);
    this.value = settings._timeout;

    if (interval != null) {
        stop();
        start();
    }
}

// Fonction qui s'active lorsque le choix des structures est modifié
function updateStructure() {
    settings.structure = this.value;
}

settingsField.hidden = true;

game.populate(settings._startPopulation);

reset();

startButton.addEventListener("click", start);
stopButton.addEventListener("click", stop);
resetButton.addEventListener("click", reset);
settingsButton.addEventListener("click", settingsButtonClick);
confirmParametersButton.addEventListener("click", confirmParameters);
cancelParametersButton.addEventListener("click", cancelParameters);
timeoutInput.addEventListener("change", updateTimeout);
structureInput.addEventListener("change", updateStructure);