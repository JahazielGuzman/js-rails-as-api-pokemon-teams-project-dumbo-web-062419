

class PokemonsController < ApplicationController

	def index
		@pokemon = Pokemon.all
		render json: @pokemon
	end

	def create
		trainer_id = params[:trainer_id]
		name = Faker::Name.first_name
		species = Faker::Games::Pokemon.name
		render json: Pokemon.create(nickname: name, species: species, trainer_id: trainer_id)
	end

	def destroy
		pokemon = Pokemon.find(params[:id])
		returned_poke = {id: pokemon.id, nickname: pokemon.nickname, species: pokemon.species, trainer_id: pokemon.trainer_id}
		pokemon.destroy
		render json: returned_poke
	end
end