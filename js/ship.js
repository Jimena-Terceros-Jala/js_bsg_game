/**
 * Ship class is to model the ship
 * @param {number} size        The size ship
 * @param {number} orientation The position vertical or horizontal
 * @param {number} shipPos     The position for the ship
 */
var Ship = function(size, orientation, shipPos){ // sipPost = {r:1, c:2}
	this.size = size;
	this.status = 'ALIVE';
	this.orientation = orientation;
	this.position = shipPos;
	this.hits = 0;

	/**
	 * Verify if the ship is alive
	 * @return {Boolean} return wether the ship is alive
	 */
	this.isAlive = function() {
		return this.hits < this.size;
	};

	/**
	 * Verify hit status
	 * @return {windows} display an alert messaje when the ship was destroyed.
	 */
	this.hit = function() {
		this.hits++;
		if (this.isAlive()) {
			this.status = 'HIT';
		} else {
			this.status = 'KILLED';
			alert('Ship destroyed!');
		}
	};
};