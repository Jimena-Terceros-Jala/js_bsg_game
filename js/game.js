// Game class is to play and this class all will be initialized

var Game = function(){
	this.player1 = null;
	this.player2 = null;
	this.options = {
		battleFieldSize: 0,
		shipQuantity: 0,
		ship1: 0,
		ship2: 0,
		ship3: 0
	};

	// Initialize the game with field and ships
	this.init = function() {
		this.options.battleFieldSize = 10;
		this.options.shipQuantity = 3;
		this.options.ship1 = 1;
		this.options.ship2 = 1;
		this.options.ship3 = 1;

		var battleFieldP1 = new BattleField(this.options.battleFieldSize);
		var battleFieldP2 = new BattleField(this.options.battleFieldSize);
		battleFieldP1.initField();
		battleFieldP2.initField();
		
		var p1Name = window.prompt('Player 1 Name:');
		var p2Name = window.prompt('Player 2 Name:');
		this.player1 = new Player(battleFieldP1, p1Name);
		this.player2 = new Player(battleFieldP2, p2Name);

		console.log('Player1: ', p1Name);
		console.log('Player2: ', p2Name);

		this.addShipsToBattleField(battleFieldP1);
		this.addShipsToBattleField(battleFieldP2);
	};

	this.play = function() {
		this.init();

		this.player1.printBattleField();
		this.player2.printBattleField();

		var currentPlayer = (parseInt((Math.random() * 2))) ? this.player1 : this.player2;
		while (this.player1.hasShipsAlive() && this.player2.hasShipsAlive()) {
			var secondPlayer = (currentPlayer == this.player1) ? this.player2 : this.player1;
			var positionStr = window.prompt(currentPlayer.name + '\n enter shot position, example 2,5: ');
			var position = positionStr.split(',');
			if (position.length == 2) {
				secondPlayer.shot(position[0], position[1]);
				secondPlayer.printBattleField();
				currentPlayer = secondPlayer;
			} else {
				console.log('Invalid shot position');
			}
		}

		var winner = (this.player1.hasShipsAlive()) ? this.player1: this.player2;

		window.alert('Congratullations ' + winner.name + '!!!');

	};

	//This method is to add ships to battle field taken account numbers of ships
	this.addShipsToBattleField = function (battleField) {
		var shipQuantity = this.options.shipQuantity;
		var ship1Qty = this.options.ship1;
		var ship2Qty = this.options.ship2;
		var ship3Qty = this.options.ship3;
		while (shipQuantity > 0) {
			if (ship1Qty > 0) {
				if (this.addShipToBattleField(1, battleField)) {
					ship1Qty --;
					shipQuantity--;
				}
			}
			if (ship2Qty > 0) {
				if (this.addShipToBattleField(2, battleField)) {
					ship2Qty --;
					shipQuantity--;
				}
			}
			if (ship3Qty > 0) {
				if (this.addShipToBattleField(3, battleField)) {
					ship3Qty --;
					shipQuantity--;
				}
			}
		}
	};

	//This method is adding one ship to battle field
	this.addShipToBattleField = function (size, battleField) {
		var row = parseInt((Math.random() * this.options.battleFieldSize));
		var col = parseInt((Math.random() * this.options.battleFieldSize));
		var orientation = (parseInt((Math.random() * 2))) ? 'H' : 'V';
		var ship = new Ship(size, orientation, {r:row, c: col});
		return battleField.addShip(ship);
	};

};
