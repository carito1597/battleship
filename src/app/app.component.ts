import { Component } from '@angular/core';
import { Board } from './models/board';
import { Cell } from './models/cell';
import { Player } from './models/player';
import { Ship } from './models/ship';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'battleship';
  board1: Board;
  board2: Board;
  gameTurn: Board;
  oponent: Board;

  constructor() {
    alert('Los barcos seran ordenados aleatoriamente')
    const player1 = new Player('Jugador 1');
    const player2 = new Player('Jugador 2');
    const width = 10;
    this.board1 = new Board(player1, width);
    this.board2 = new Board(player2, width);
    this.board1.randomizeShips(this.createShips());
    this.board2.randomizeShips(this.createShips());
    this.gameTurn = this.board1;
    this.oponent = this.board2;
  }

  shotCell(cell: Cell, x: number, y: number) {
    console.log(x, y)
    cell.shot();
    if (this.IsSunkenShips())
      this.winner();
    else {
      alert('siguiente turno')
      this.changeTurn();
    }
  }

  winner() {
    alert(this.gameTurn.player.name + ' es el ganador. Al aceptar el juego se reiniciara.')
    window.location.reload()
  }

  IsSunkenShips() {
    let isSunken = true;
    this.gameTurn.ships.forEach((s: Ship) => {
      if (!s.isSunken) {
        isSunken = false;
      }
    })
    return isSunken;
  }

  changeTurn() {
    if (this.gameTurn == this.board1) {
      this.gameTurn = this.board2;
      this.oponent = this.board1;
    } else {
      this.oponent = this.board2
      this.gameTurn = this.board1;
    }
  }

  createShips() {
    let ships: Ship[] = [];
    ships.push(new Ship('portaaviones', 5));
    ships.push(new Ship('acorazado', 4));
    ships.push(new Ship('crucero', 3));
    ships.push(new Ship('submarino', 3));
    ships.push(new Ship('destructor', 2));
    return ships;
  }

  getASCII(x: number) {
    return String.fromCharCode(x + 65)
  }
}
