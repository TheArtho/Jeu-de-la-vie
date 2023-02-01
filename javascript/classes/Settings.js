export class Settings {
    constructor(json, colorList, structureList) {
        // Valeurs par défaut des paramètres
        this._timeout = 110;  // Met à jour le jeu de la vie toutes les 500ms
        this._width = 50;    // Largeur de la grille
        this._height = 50;    // Hauteur de la grille
        this._startWithPopulation = true;
        this._startPopulation = 70;  // Pourcentage de population de départ
        this._cellColor = "black";        // Couleur des cellules vivantes
        this._backgroundColor = "white";  // Couleur des cellules mortes
        this._borderColor = "lightgray";         // Couleur des contours des cellules
        this._structure = "none";

        this.json = json;
        this.colorList = colorList;
        this.structureList = structureList;
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
        if (!Number.isInteger(value)) return;
        this._startPopulation = Math.min(Math.max(value, 0), 100);
    }

    set cellColor(value) {
        if (typeof value !== 'string') return;
        if (this.colorList.includes(value)) {
            this._cellColor = value;
        }
    }

    set backgroundColor(value) {
        if (typeof value !== 'string') return;
        if (this.colorList.includes(value)) {
            this._backgroundColor = value;
        }
    }

    set borderColor(value) {
        if (typeof value !== 'string') return;
        if (this.colorList.includes(value) || value === 'none') {
            this._borderColor = value;
        }
    }

    set structure(value) {
        if (typeof value !== 'string') return;
        if (this.structureList.includes(value) || value === 'none') {
            this._structure = value;
        }
    }

    updateSettingsField() {
        document.getElementById('startWithPopulation').checked = this._startWithPopulation;
        document.getElementById('startPopulation').value = this._startPopulation;
        document.getElementById('width').value =  this._width;
        document.getElementById('height').value = this._height;
    }
}