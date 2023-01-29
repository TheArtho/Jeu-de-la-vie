export class Graphics {
    constructor(game) {
        this.game = game;
        this.cells = new Array(game.width);

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
                    this.update(x,y,game.cells[x][y]);
                });

                line.append(this.cells[x][y]);
            }
        }
    }

    update(x,y,isAlive) {
        this.cells[x][y].setAttribute('class', isAlive ? 'cell alive' : 'cell')
    }
}