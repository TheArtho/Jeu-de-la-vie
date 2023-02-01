import {Structure} from "./Structure.js";

export class Planeur extends Structure {
    constructor(graphics) {
        super(graphics);
        this.name = "Planeur";
        this.composition = [
            [true, true, false],
            [false, true, true],
            [true, false, false],
        ]
    }
}