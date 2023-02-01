export class Settings {
    constructor(json) {
        // Valeurs par défaut
        this._timeout = 100;  // Met à jour le jeu de la vie toutes les 500ms
        this._width = 200;    // Largeur de la grille
        this._height = 120;    // Hauteur de la grille
        this._startWithPopulation = true;
        this._startPopulation = 0.3;  // Pourcentage de population de départ
        this._cellColor = "green";        // Couleur des cellules vivantes
        this._backgroundColor = "black";  // Couleur des cellules mortes
        this._borderColor = "none";         // Couleur des contours des cellules

        this.json = json;
    }

    set timeout(value) {
        if (!Number.isInteger(value)) return;
        this._timeout = Math.min(Math.max(value, this.json.min_timeout), this.json.max_timeout);
    }

    set width(value) {
        if (!Number.isInteger(value)) return;
        this._width = Math.min(Math.max(value, this.json.min_width), this.json.max_width);
    }

    set height(value) {
        if (!Number.isInteger(value)) return;
        this._height = Math.min(Math.max(value, this.json.min_height), this.json.max_height);
    }

    set startWithPopulation(value) {
        if (typeof value !== 'boolean') return;
        this._startWithPopulation = value;
    }

    set startPopulation(value) {
        if (isNaN(value)) return;
        this._startPopulation = Math.min(Math.max(value, 0), 1);
    }

    set cellColor(value) {
        this._cellColor = value;
    }

    set backgroundColor(value) {
        this._backgroundColor = value;
    }

    set borderColor(value) {
        this._borderColor = value;
    }

    updateSettingsField() {
        document.getElementById('startWithPopulation').checked = this._startWithPopulation;
        document.getElementById('startPopulation').value = this._startPopulation;
        document.getElementById('width').value =  this._width;
        document.getElementById('height').value = this._height;
    }
}