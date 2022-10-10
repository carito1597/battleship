import { Cell } from "./cell";
import { Coordinate } from "./coordinate";
import { Player } from "./player";
import { Ship } from "./ship";

export class Board {
	ships: Ship[] = [];
	player: Player;
	battlefield: Cell[][] = [];
	width: number;

	constructor(player: Player, width: number) {
		this.player = player;
		this.width = width;
		this.createBattlefield(width);
	}

	createBattlefield(width: number) {

		for (let x = 0; x < width; x++) {
			let cells: Cell[] = [];
			for (let y = 0; y < width; y++) {
				cells.push(new Cell())
			}
			this.battlefield.push(cells);
		}
	}

	randomizeShips(ships: Ship[]) {
		ships.forEach((ship: Ship) => {
			let directions = ['horizontal', 'vertical'];
			let index = this.randomNumber(directions.length);
			if (directions[index] == 'horizontal') {
				this.createShipHorizontal(ship);
			} else {
				this.createShipVertical(ship);
			}
		});
	}

	randomNumber(max: number) {
		return Math.floor(Math.random() * max);
	}

	createShipHorizontal(ship: Ship) {
		let existShip = false;
		let shipAuxiliar = new Ship(ship.name, ship.width);
		shipAuxiliar.direction = 'horizontal';
		let coordinateInitShip = this.randomCoordinate(this.width - ship.width, this.width);
		if (coordinateInitShip.positionX != undefined && coordinateInitShip.positionY != undefined) {
			for (let x = coordinateInitShip.positionX; x < (coordinateInitShip.positionX + ship.width); x++) {
				let coordinate: Coordinate = {
					positionY: coordinateInitShip.positionY,
					positionX: x
				}
				shipAuxiliar.coordinates.push(coordinate);
				if (this.battlefield[coordinate.positionX][coordinate.positionY].isShip) {
					existShip = true;
				}
			}
			if (existShip) {
				this.createShipHorizontal(ship);
			} else {
				this.ships.push(shipAuxiliar);
				this.setIsShip(shipAuxiliar.coordinates, true);
			}

		}
	}

	createShipVertical(ship: Ship) {
		let existShip = false;
		let shipAuxiliar = new Ship(ship.name, ship.width);
		shipAuxiliar.direction = 'vertical';
		let coordinateInitShip = this.randomCoordinate(this.width, this.width - ship.width);
		if (coordinateInitShip.positionX != undefined && coordinateInitShip.positionY != undefined) {
			for (let y = coordinateInitShip.positionY; y < (coordinateInitShip.positionY + ship.width); y++) {
				let coordinate: Coordinate = {
					positionX: coordinateInitShip.positionX,
					positionY: y
				}

				shipAuxiliar.coordinates.push(coordinate);
				if (this.battlefield[coordinate.positionX][coordinate.positionY].isShip) {
					existShip = true;
				}
			}
			if (existShip) {
				this.createShipVertical(ship);
			} else {
				this.ships.push(shipAuxiliar);
				this.setIsShip(shipAuxiliar.coordinates, true);
			}
		}
	}

	setIsShip(coordinates: Coordinate[], condition: boolean) {
		coordinates.forEach((coordinate: Coordinate) => {
			if (coordinate.positionX != undefined && coordinate.positionY != undefined) {
				this.battlefield[coordinate.positionX][coordinate.positionY].isShip = condition;
				this.battlefield[coordinate.positionX][coordinate.positionY].ship = this.ships[this.ships.length - 1]
			}

		})
	}

	randomCoordinate(x: number, y: number) {
		return new Coordinate(Math.floor(Math.random() * x),Math.floor(Math.random() * y));
	}
}