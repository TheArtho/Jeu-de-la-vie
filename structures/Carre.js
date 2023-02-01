import {Structure} from "./Structure.js";

export class Carre extends Structure {
    constructor(graphics) {
        super(graphics);
        this.name = "Carré";
        this.composition = [
            [true, true],
            [true, true]
        ]
    }
}