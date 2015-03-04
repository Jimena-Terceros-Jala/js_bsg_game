//player class is to model to players

var Player = function(battleField, name){
	this.battleField = battleField;
	// this.name = window.prompt('Your name?');
	this.name = name;
	
	//model the shot that will be performed since player
	this.shot = function (row, col) {
		this.battleField.performShot(row, col);
	};

	//Verify if the field has ship alive
	this.hasShipsAlive = function() {
		return this.battleField.hasShipsAlive();
	}

	this.printBattleField = function() {
		console.log(this.name + '\'s battlefield:');
		this.battleField.print();
	}
};
