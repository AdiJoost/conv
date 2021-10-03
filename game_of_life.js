let x_size = 50;
let y_size = 10;
let map_tracker = new Array();

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

	resurrect(){
		this.is_alive = true;
		this.container.classList.add("isAlive");
	}

	die(){
		this.container.classList.remove("isAlive");
	}

	activate_new_state(){
		console.log(this);
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

	get_new_state(){
		if (this.is_border == true){
			this.will_be_alive = false;
			return false;
		}

		let neighbours = 0
		for (let y = this.y - 1; y < this.y + 2; y++){
			for (let x = this.x - 1; x < this.x + 2; x++){
				if (map_tracker[y][x].is_alive == true){
					neighbours += 1;
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
}


window.addEventListener("load", function(){
	init_field();
	shuffle_alive(spawn_rate=30);
	let next_gen = document.getElementById('next_gen');
	next_gen.addEventListener("click", function(){
		get_next_state();
	}, false)
}, false)

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