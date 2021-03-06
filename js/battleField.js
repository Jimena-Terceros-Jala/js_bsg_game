/**
 * This class is to model field
 * @param {number} size This is the long for battle
 */
var BattleField = function (size) {
    this.size = size;
    this.field = [];
    this.ships = [];
    this.WATTER = 0;
    this.SHIPPART = 1;
    this.FAILED = -1;
    this.HIT = -2;

    /**
     * Initialize the battle field
     */
    this.initField = function () {
        for (var row = 0; row < this.size; row ++) {
            this.field.push([]);
            for (var col = 0; col < this.size; col ++) {
                this.field[row].push(0);
            }
        }
    };

    /**
     * Print changes for field
     */
    this.print = function() {
        var header = 'C:  ';
        for (var i = 0; i < this.size; i++) {
            header += i + ' ';
        }
        console.log(header);
        for (var i = 0; i < this.size; i++) {
            console.log('R' + i + ': ' + this.field[i].join(',').replace(/-1/g, 'F').replace(/-2/g,'H').replace(/1/g, 'S'));
        }
    };

    /**
     * draw the battle field
     * @param  {object} ship the object ship 
     * @return {boolean} Whether something occurred.
     */
    this.drawShip = function(ship) {
        if (this.fitIntoTheField(ship)) {
            if (this.validateAndDraw(ship, false)) {
                this.validateAndDraw(ship, true);
                return true;
            }
        }
        return false;
    };

    /**
     * validate and draw the ship
     * @param  {object} ship the battel
     * @param  {object} draw the map
     * @return {boolean} return true wether was set
     */
    this.validateAndDraw = function (ship, draw) {
        var isValid = true;
        if(ship.orientation == 'H') {
            for (var col = ship.position.c; col < (ship.position.c + ship.size); col ++) {
                if (this.field[ship.position.r][col] == 1) {
                    isValid = false;
                } else if (draw) {
                    this.field[ship.position.r][col] = 1;
                }
            }
        } else {
            for (var row = ship.position.r; row < (ship.position.r + ship.size); row ++) {
                if (this.field[row][ship.position.c] == 1) {
                    isValid = false;
                } else if (draw) {
                    this.field[row][ship.position.c] = 1;
                }
            }
        }
        return true;
    };

    /**
     * Validating if the ship fit bien in the battle field (considering only horizontal and vertical)
     * @param  {object} ship verify wether ship tle 
     */
    this.fitIntoTheField = function (ship) {
        return (((this.field[ship.position.r] != undefined) && (this.field[ship.position.r][ship.position.c] != undefined))
                && (((ship.orientation == 'H') && ((ship.position.c + (ship.size - 1)) < this.size))
                || ((ship.orientation == 'V') && ((ship.position.r + (ship.size - 1)) < this.size))));
    };

    /**
     * Add the ship
     * @param {object} ship add 
     * @return {boolean} return wether the shit was added
     */
    this.addShip = function (ship) {
        if(this.drawShip(ship)){
            this.ships.push(ship);
            return true;
        }
        return false;
    };

    /**
     * Perform the shot
     * @param  {number} row This is a position for row
     * @param  {number} col This is a position for column
     */
    this.performShot = function(row, col) {
        if ((this.field[row] != undefined) && (this.field[col] != undefined)) {
            positionValue = this.field[row][col];
            switch (positionValue) {
                case this.WATTER: {
                    this.field[row][col] = this.FAILED;
                };
                break;
                case this.SHIPPART: {
                    this.field[row][col] = this.HIT;
                    this.updateShipStatus(row, col);
                };
                break;
                case this.FAILED: {
                    console.log('Shot duplicated');
                };
                break;
                case this.HIT: {
                    console.log('Shot duplicated');
                };
            }
        } else {
            console.log('Unknown position');
        }
    };

    /**
     * update the ship status after shotting
     * @param  {number} row This is a position for row
     * @param  {number} col This is a position for column
     */
    this.updateShipStatus = function (row, col) {
    this.ships.forEach(function (ship) {
            if (ship.orientation == 'H') {
                if ((ship.position.r == row) && ((col >= ship.position.c) && (col < (ship.position.c + ship.size)))) {
                    ship.hit();
                }
            } else {
                if ((ship.position.c == col) && ((row >= ship.position.r) && (row < (ship.position.r + ship.size)))) {
                    ship.hit();
                }
            }
        });
    };

    /**
     * Validate if the ship is alive
     * @return {boolean} This returns if the ship is alive
     */
    this.hasShipsAlive = function() {
        var hasShipsAlive = false;
        this.ships.forEach(function (ship) {
            if (ship.isAlive()) {
                hasShipsAlive = true;
            }
        });
        return hasShipsAlive;
    };
};