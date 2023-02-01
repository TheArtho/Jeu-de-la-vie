export class Graphics {
    constructor(game) {
        this.game = game;
        this.cells = new Array(game.width);
        this.currentPopulationField = document.getElementById("currentPopulation");

        this.colorList = [
            "white",
            "black",
            "gray",
            "lightgray",
            "blue",
            "lightblue",
            "green",
            "red",
            "pink"
        ]

        this.backgroundColor = "white";
        this.cellColor = "black";
        this.borderColor = "none";

        this.reload();
    }

    getColorList() {
        return this.colorList;
    }

    setCellColor(value) {
        this.cellColor = value;
    }

    setBackgroundColor(value) {
        this.backgroundColor = value;
    }

    setBorderColor(value) {
        this.borderColor = value;
    }

    update(x,y,isAlive) {
        this.cells[x][y].setAttribute('class', isAlive ? 'cell alive '+this.cellColor+' '+this.borderColor+'Border' : 'cell '+this.backgroundColor+' '+this.borderColor+'Border');
        this.currentPopulationField.innerHTML = this.game.getCurrentPopulation();
    }

    display() {
        // Affiche la grille de cellules dans la console
        for (let y = 0; y < this.game.cells[0].length; y++) {
            for (let x = 0; x < this.game.cells.length; x++) {
                this.update(x, y, this.game.cells[x][y]);
            }
        }
    }

    reload() {
        const parent = document.querySelector('#game-of-life');

        parent.innerHTML = "";

        for (let x = 0; x < this.game.width; x++) {
            let line = document.createElement('div');
            this.cells[x] = new Array(this.game.height);

            line.setAttribute('class', "line")
            parent.append(line)

            for (let y = 0; y < this.game.height; y++) {
                this.cells[x][y] = document.createElement('div');
                this.cells[x][y].setAttribute('class', 'cell')

                this.cells[x][y].addEventListener("click", () => {
                    this.game.cells[x][y] = !this.game.cells[x][y];
                    if (this.game.cells[x][y]) this.game.currentPopulation++;
                    else this.game.currentPopulation--;
                    this.update(x, y, this.game.cells[x][y]);
                });

                line.append(this.cells[x][y]);
            }
        }
    }
}