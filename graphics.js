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

        const parent = document.querySelector('#game-of-life');

        for (let x = 0; x < game.width; x++) {
            let line = document.createElement('div');
            this.cells[x] = new Array(game.height);

            line.setAttribute('class', "line")
            parent.append(line)

            for (let y = 0; y < game.height; y++) {
                this.cells[x][y] = document.createElement('div');
                this.cells[x][y].setAttribute('class', 'cell')

                this.cells[x][y].addEventListener("click", () => {
                    game.cells[x][y] = !game.cells[x][y];
                    if (game.cells[x][y]) game.currentPopulation++;
                    else  game.currentPopulation--;
                    this.update(x,y,game.cells[x][y]);
                });

                line.append(this.cells[x][y]);
            }
        }
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
}