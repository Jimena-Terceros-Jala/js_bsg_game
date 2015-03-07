/**
 * Player class is to model to players
 * @param {object} battleField the object battle field
 * @param {string} name the name the player
 */
var Player = function(battleField, name){
	this.battleField = battleField;
	// this.name = window.prompt('Your name?');
	this.name = name;
	
	/**
	 * Model the shot that will be performed since player
	 * @param  {[type]} row row This is a position for row
	 * @param  {[type]} col col This is a position for rcolumn
	 */
	this.shot = function (row, col) {
		this.battleField.performShot(row, col);
	};

	/**
	 * Verify if the field has ship alive
	 * @return {Boolean} return true wether the ship alive
	 */
	this.hasShipsAlive = function() {
		return this.battleField.hasShipsAlive();
	}

	/**
	 * Print the Battle field
	 */
	this.printBattleField = function() {
		console.log(this.name + '\'s battlefield:');
		this.battleField.print();
	}
};
