// Ship class is to model the ship

var Ship = function(size, orientation, shipPos){ // sipPost = {r:1, c:2}
	this.size = size;
	this.status = 'ALIVE';
	this.orientation = orientation;
	this.position = shipPos;
	this.hits = 0;

	//verify if the ship is alive
	this.isAlive = function() {
		return this.hits < this.size;
	};

	//verify hit status
	this.hit = function() {
		this.hits++;
		this.status = this.isAlive() ? 'HIT' : 'KILLED';
	};
};
