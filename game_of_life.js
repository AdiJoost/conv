let x_size = 50;
let y_size = 10;
let map_tracker = new Array();

class Tile {
	constructor(x, y, container, is_alive=false){
		this.x = x;
		this.y = y;
		this.container = container
		this.is_alive = is_alive;
	}

	resurrect(){
		this.is_alive = true;
		this.container.classList.add("isAlive");
	}
}


window.addEventListener("load", function(){
	init_field();
	shuffle_alive(spawn_rate=30);
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