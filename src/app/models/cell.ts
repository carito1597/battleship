import { Ship } from "./ship";

export class Cell {
	ship: Ship | undefined;
	isShip: boolean;
	isShooted: boolean;
	constructor(){
		this.isShip = false;
		this.isShooted = false;
	}

	shot(){
		this.isShooted = true;
		this.ship?.shot();
	}
}
