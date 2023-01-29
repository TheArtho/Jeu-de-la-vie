export class GameOfLife {
    // Grille de cellules pour le jeu de la vie
    constructor(width, height) {
        this.width = width;
        this.height = height;
        this.cells = new Array(width);

        for (let x = 0; x < width; x++) {
            this.cells[x] = new Array(height);
            for (let y = 0; y < height; y++) {
                this.cells[x][y] = Math.random() > 0.7;
            }
        }
    }

    // Applique les règles du jeu de la vie à chaque cellule
    update() {
        let clonedMatrix = this.cells.map(arr => [...arr]);

        for (let x = 0; x < this.cells.length; x++) {
            for (let y = 0; y < this.cells[x].length; y++) {
                let aliveNeighbors = this.countAliveNeighbors(x, y);

                // Une cellule vivante avec moins de deux voisins vivants meurt
                if (this.cells[x][y] && aliveNeighbors < 2) {
                    clonedMatrix[x][y] = false;
                }
                // Une cellule vivante avec plus de trois voisins vivants meurt
                else if (this.cells[x][y] && aliveNeighbors > 3) {
                    clonedMatrix[x][y] = false;
                }
                // Une cellule morte avec exactement trois voisins vivants ressuscite
                else if (!this.cells[x][y] && aliveNeighbors == 3) {
                    clonedMatrix[x][y] = true;
                }
            }
        }

        this.cells = clonedMatrix;
    }

    // Compte le nombre de voisins vivants d'une cellule
    countAliveNeighbors(x, y) {
        let count = 0;
        for (let i = -1; i <= 1; i++) {
            for (let j = -1; j <= 1; j++) {
                let neighborX = (x + (i < 0 ? i + this.cells.length : i)) % this.cells.length;
                let neighborY = (y + (j < 0 ? j + this.cells[0].length : j)) % this.cells[0].length;

                // Ignore la cellule elle-même
                if (i == 0 && j == 0) {
                    continue;
                }
                // Ignore les cellules hors de la grille
                /*if (neighborX < 0 || neighborY < 0 || neighborX >= this.cells.length || neighborY >= this.cells[0].length) {
                    continue;
                }*/
                if (this.cells[neighborX][neighborY]) {
                    count++;
                }
            }
        }
        return count;
    }
}