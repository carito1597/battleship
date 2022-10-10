import { Coordinate } from "./coordinate";

export class Ship {
	coordinates: Coordinate[] = [];
	width: number;
	direction: string | undefined;
	name: string;
	isSunken: boolean;
	partsIntact: number;

	constructor(name: string, width: number) {
		this.name = name;
		this.isSunken = false;
		this.width = width;
		this.partsIntact = width;
	}

	shot(){
		this.partsIntact --;
		if(this.partsIntact==0){
			this.isSunken = true;
		}
	}
}
