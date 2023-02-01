import {Structure} from "./Structure.js";

export class Clignotant extends Structure {
    constructor(graphics) {
        super(graphics);
        this.name = "Planeur";
        this.composition = [
            [true, true, true],
        ]
    }
}