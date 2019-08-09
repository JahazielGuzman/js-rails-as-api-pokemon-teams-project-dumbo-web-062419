const BASE_URL = "http://localhost:3000";
const TRAINERS_URL = `${BASE_URL}/trainers`;
const POKEMONS_URL = `${BASE_URL}/pokemons`;

function addPokemon(trainer_id) {
	// fetch /pokemons/create POST
	return fetch(`${POKEMONS_URL}`, {
		method: "POST",
		headers: {'Content-Type': 'application/json'},
		body: JSON.stringify({"trainer_id": trainer_id})
	});
}

function delPokemon(poke_id) {
	return fetch(`${POKEMONS_URL}/${poke_id}`, {
		method: "DELETE",
		headers: {'Content-Type': 'application/json'}
	});
}

function slapPokemonOnDOM(poke) {

	const pokeLI = document.createElement("LI");
	pokeLI.innerHTML += `${poke.nickname} (${poke.species}) <button class="release" data-pokemon-id="${poke.id}">Release</button>`
	return pokeLI;
}

function slapTrainerOnDOM(json) {

	json.forEach(function (trainer, index) {
		const mainTag = document.querySelector('.poke-bowl')
		// create new div for the trainer
		const trainerTag = document.createElement('DIV');
		trainerTag.classList.add("card");
		trainerTag.dataset.id = index;
		trainerTag.innerHTML = `<p>${trainer.name}</p>
		  <button data-trainer-id="${trainer.id}" class="add-a-pokemon">Add Pokemon</button>
		  <ul>`
		trainer.pokemons.forEach(function(poke) {

		    trainerTag.append(slapPokemonOnDOM(poke))
		});
		trainerTag.innerHTML += "</ul>";
		mainTag.append(trainerTag);
		const addPokeButton = trainerTag.querySelector(".add-a-pokemon");
		const delPokeButtons = trainerTag.querySelectorAll(".release");
		addPokeButton.addEventListener("click", function() {
			addPokemon(trainer.id)
			.then(response => response.json())
			.then(json => trainerTag.append(slapPokemonOnDOM(json)))
			.catch(function () {
				trainerTag.innerHTML += ("<p>TOO MANY POKEMONS!!!</p")
			})
		});
		delPokeButtons.forEach(function(pokeButton) {
			pokeButton.addEventListener("click", function() {
				delPokemon(parseInt(pokeButton.dataset.pokemonId)).then(function () {
					pokeButton.parentElement.remove()
				});
			});
		});

	});
}

fetch(TRAINERS_URL)
.then(response => response.json())
.then(json => slapTrainerOnDOM(json));