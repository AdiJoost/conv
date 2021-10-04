/*params that decide the size of the map*/
let x_size = 50;
let y_size = 10;
/*Holds all Tiles in a two-dimensional Array [rows][columns]*/
let map_tracker = new Array();

/*Tile holds information for a single cell. x and y are it's coordinates on the map
container is a reference to the div in the html document. The tile will turn the div 
green, if the cell is alive*/
class Tile {
	constructor(x, y, container, is_alive=false){
		this.x = x;
		this.y = y;
		this.container = container
		this.is_alive = is_alive;
		this.will_be_alive = is_alive;
		if(x == 0 || y == 0 || x == x_size - 1 || y == y_size - 1){
			this.is_border = true;
		} else {
			this.is_border = false;
		}
	}

	/*will resurrect the cell.*/
	resurrect(){
		this.is_alive = true;
		this.container.classList.add("isAlive");
	}
	/*will kill the cell*/
	die(){
		this.is_alive = false;
		this.container.classList.remove("isAlive");
	}

	/*sets the state of will_be_alive as the current state of is_alive.
	If they are both the same state, this function does nothing*/
	activate_new_state(){
		if (this.is_alive == this.will_be_alive){
			return;
		}
		this.is_alive = !this.is_alive;
		if(this.is_alive == true){
			this.resurrect();
		} else {
			this.die();
		}
	}

	/*Calculates, if the cell will be alive in the next generation
	Stores the result in will_be_alive*/
	get_new_state(){
		let neighbours = 0;
		if (this.is_border == true){
			neighbours = this.get_neighbours_for_border();
		} else {
			for (let y = this.y - 1; y < this.y + 2; y++){
				for (let x = this.x - 1; x < this.x + 2; x++){
					if (map_tracker[y][x].is_alive == true){
						neighbours += 1;
					}
				}
			}
		}

		/*Checks if neighbours = 2 or 3 and sets will_be_alive for next generation*/
		if (this.is_alive == true){
			neighbours -= 1;
			if (neighbours > 1 && neighbours < 4){
				this.will_be_alive = true;
			} else {
				this.will_be_alive = false;
			}
		} else {
			if (neighbours == 3){
				this.will_be_alive = true;
			}else{
				this.will_be_alive = false;
			}
		}
	}
	/*gets alive cells in 3*3 field around a cell*/
	get_neighbours_for_border (){
		let neighbours = 0
		for (let y = this.y - 1; y < this.y + 2; y++){
			for (let x = this.x - 1; x < this.x + 2; x++){
				let true_x = x;
				let true_y = y;
				if (x < 0){
					true_x = x_size - 1;
				} else if (x == x_size){
					true_x = 0;
				}

				if(y < 0){
					true_y = y_size - 1;
				} else if (y == y_size){
					true_y = 0;
				}

				if (map_tracker[true_y][true_x].is_alive == true){
					neighbours += 1;
				}
			}
		}
		return neighbours;
	}
}

/*Inits the Field as soon as the window is loaded*/
window.addEventListener("load", function(){
	init_field();
	shuffle_alive(spawn_rate=30);
	let next_gen = document.getElementById('next_gen');
	next_gen.addEventListener("click", function(){
		get_next_state();
	}, false)
}, false)

/*Spawns all Tiles in the html and stores their references in map_tracker*/
function init_field(){
	let map = document.getElementById('map');
	for (let y = 0; y < y_size; y++){

		let row = document.createElement("div");
		row.classList.add("row");
		map_row = new Array();

		for (let x = 0; x < x_size; x++){
			let container = document.createElement("div");
			container.classList.add("block");
			row.appendChild(container);
			let tile = new Tile(x, y, container, is_alive=false);
			map_row.push(tile);
		}


		map.appendChild(row);
		map_tracker.push(map_row);
	}
}

/*Randomly resurrects cells on map.
Spawn_rate is an int between 0 - 100
(0 = 0%, 100 = 100% chance of resurrection)*/
function shuffle_alive(spawn_rate = 30){
	for (let y = 0; y < y_size; y++){
		for (let x = 0; x < x_size; x++){
			let randInt = Math.floor(Math.random() * 100);
			if (spawn_rate > randInt){
				map_tracker[y][x].resurrect();
			}
		}
	}
}

/*Calculates for each cell, whether it will be alive in the next gen and then activates the next gen*/
function get_next_state(){
	for (let y = 0; y < y_size; y++){
		for(let x = 0; x < x_size; x++){
			map_tracker[y][x].get_new_state();
		}
	}
	for (let y = 0; y < y_size; y++){
		for(let x = 0; x < x_size; x++){
			map_tracker[y][x].activate_new_state();
		}
	}
}