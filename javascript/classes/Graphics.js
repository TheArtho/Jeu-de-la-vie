import {Clignotant} from "./structures/Clignotant.js";
import {Planeur} from "./structures/Planeur.js";
import {Carre} from "./structures/Carre.js";

export class Graphics {
    constructor(game) {
        this.game = game;
        this.cells = new Array(game.height);
        this.currentPopulationField = document.getElementById("currentPopulation");
        this.reload(game);
    }

    update(x,y,isAlive) {
        // Recadre le pixel dans la zone opposée si elle dépasse de la grille
        if (y < 0) y = this.game.height - 1;
        if (x < 0) y = this.game.width - 1;
        if (y >= this.game.height) y = 0;
        if (x >= this.game.width) x = 0;

        this.cells[y][x].setAttribute('class', isAlive ? 'cell alive '+this.game.settings._cellColor+' '+this.game.settings._borderColor+'Border' : 'cell '+this.game.settings._backgroundColor+' '+this.game.settings._borderColor+'Border');
        this.currentPopulationField.innerHTML = this.game.currentPopulation;
    }

    preview(x,y,isAlive) {
        this.cells[y][x].setAttribute('class', (isAlive ? 'cell alive '+this.game.settings._cellColor : 'cell '+this.game.settings._backgroundColor)+' '+this.game.settings._borderColor+'Border'+' preview');
        this.currentPopulationField.innerHTML = this.game.currentPopulation;
    }

    display() {
        // Affiche la grille de cellules dans la console
        document.body.setAttribute('class', this.game.settings._backgroundColor)
        console.log("Background color : "+this.game.settings._backgroundColor)
        document.getElementById('game-of-life').setAttribute('class', this.game.settings._backgroundColor)
        for (let y = 0; y < this.game.cells.length; y++) {
            for (let x = 0; x < this.game.cells[0].length; x++) {
                this.update(x, y, this.game.cells[y][x]);
            }
        }
    }

    reload() {
        const parent = document.querySelector('#game-of-life');

        parent.innerHTML = "";

        for (let y = 0; y < this.game.height; y++) {
            let line = document.createElement('div');
            this.cells[y] = new Array(this.game.width);

            line.setAttribute('class', "line")
            parent.append(line)

            for (let x = 0; x < this.game.width; x++) {
                this.cells[y][x] = document.createElement('div');
                this.cells[y][x].setAttribute('class', 'cell')

                this.cells[y][x].addEventListener("click", () => {
                    let structure = getStructureObject(this.game.settings._structure, this);

                    if (structure == null) {
                        this.game.cells[y][x] = !this.game.cells[y][x];
                        if (this.game.cells[y][x]) this.game.currentPopulation++;
                        else this.game.currentPopulation--;
                        this.update(x, y, this.game.cells[y][x], this.game.settings);
                    }
                    else {
                        structure.draw(x,y);
                    }

                });

                /*this.cells[y][x].addEventListener('mouseover', () => {
                    new Planeur(this).preview(x,y);
                });*/

                line.append(this.cells[y][x]);
            }
        }
    }
}

function getStructureObject(structure, graphics) {
    switch(structure) {
        default:
            return null;
        case 'carre':
            return new Carre(graphics);
        case 'clignotant':
            return new Clignotant(graphics);
        case 'planeur':
            return new Planeur(graphics);
    }
}