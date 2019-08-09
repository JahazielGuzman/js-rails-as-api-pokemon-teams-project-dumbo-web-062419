class TrainersController < ApplicationController

	def index
		@trainers = Trainer.all
		render json: @trainers.map{|trainer| {id: trainer.id, name: trainer.name, pokemons: trainer.pokemons}}
	end
end
