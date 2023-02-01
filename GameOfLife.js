export class GameOfLife {
    // Grille de cellules pour le jeu de la vie
    constructor(settings) {
        this.settings = settings;
        this.width = settings._width;
        this.height = settings._height;
        this.currentPopulation = 0;

        this.cells = new Array(this.height);
    }

    // Crée une population de cellules aléatoire
    populate(population) {
        for (let y = 0; y < this.height; y++) {
            this.cells[y] = new Array(this.width);
            for (let x = 0; x < this.width; x++) {
                this.cells[y][x] = Math.random() > 1 - population/100;
                if (this.cells[y][x]) this.currentPopulation++;
            }
        }
    }

    // Applique les règles du jeu de la vie à chaque cellule
    update() {
        let clonedMatrix = this.cells.map(arr => [...arr]);

        for (let y = 0; y < this.cells.length; y++) {
            for (let x = 0; x < this.cells[y].length; x++) {
                let aliveNeighbors = this.countAliveNeighbors(x, y);

                // Une cellule vivante avec moins de deux voisins vivants meurt
                if (this.cells[y][x] && aliveNeighbors < 2) {
                    clonedMatrix[y][x] = false;
                    this.currentPopulation--;
                }
                // Une cellule vivante avec plus de trois voisins vivants meurt
                else if (this.cells[y][x] && aliveNeighbors > 3) {
                    clonedMatrix[y][x] = false;
                    this.currentPopulation--;
                }
                // Une cellule morte avec exactement trois voisins vivants ressuscite
                else if (!this.cells[y][x] && aliveNeighbors === 3) {
                    clonedMatrix[y][x] = true;
                    this.currentPopulation++;
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
                // Ajout du modulo au calcul pour éviter quelconques sorties de tableau
                let neighborY = (y + (i < 0 ? i + this.cells.length : i)) % this.cells.length;
                let neighborX = (x + (j < 0 ? j + this.cells[0].length : j)) % this.cells[0].length;

                // Ignore la cellule elle-même
                if (i == 0 && j == 0) {
                    continue;
                }

                // Si la cellule voisine est active, on la compte
                if (this.cells[neighborY][neighborX]) {
                    count++;
                }
            }
        }
        return count;
    }

    reload() {
        this.width = this.settings._width;
        this.height = this.settings._height;
        this.currentPopulation = 0;

        this.cells = new Array(this.height);

        if (this.settings._startWithPopulation) {
            this.populate(this.settings._startPopulation);
        }
        else {
            this.populate(0);
        }

    }
}