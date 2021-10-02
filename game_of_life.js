let x_size = 10;
let y_size = 10;

class Tile {
	constructor(x, y, container, is_alive=false){
		this.x = x;
		this.y = y;
		this.container = container
		this.is_alive = is_alive;
	}
}


window.addEventListener("load", function(){
	init_field();
}, false)

function init_field(){
	let map = document.getElementById('map');
	let map_tracker = new Array();
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

	console.log(map_tracker);
}