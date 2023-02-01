export class Structure {
    constructor(graphics) {
        this.graphics = graphics;
        this.composition = [];
        this.name = "";
    }

    draw(posX,posY) {
        for(let y = 0; y < this.composition.length; ++y) {
            for(let x = 0; x < this.composition[y].length; ++x) {
                let newX = (posX + (x < 0 ? x + this.graphics.game.width : x)) % this.graphics.game.width;
                let newY = (posY + (y < 0 ? y + this.graphics.game.height : y)) % this.graphics.game.height;

                if (newY < 0) newY = this.graphics.game.height - 1;
                if (newX < 0) newX = this.graphics.game.width - 1;
                if (newY >= this.graphics.game.height) newY = 0;
                if (newX >= this.graphics.game.width) newX = 0;

                if (this.graphics.game.cells[newY][newX] && !this.composition[y][x]) {
                    console.log("moins")
                    this.graphics.game.currentPopulation--;
                }
                else if (!this.graphics.game.cells[newY][newX] && this.composition[y][x]) {
                    console.log("plus")
                    this.graphics.game.currentPopulation++;
                }
                this.graphics.game.cells[newY][newX] = this.composition[y][x];
                this.graphics.update(newX, newY, this.composition[y][x]);
            }
        }
    }

    preview(posX,posY) {
        for(let y = 0; y < this.composition.length; ++y) {
            for(let x = 0; x < this.composition[y].length; ++x) {
                let newX = (posX + (x < 0 ? x + this.graphics.game.width : x)) % this.graphics.game.width;
                let newY = (posY + (y < 0 ? y + this.graphics.game.height : y)) % this.graphics.game.height;

                this.graphics.preview(newX, newY, this.composition[y][x]);
            }
        }
    }
}