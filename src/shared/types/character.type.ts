import { ApiResponse } from './api.type'

export type CharacterType = 'alive' | 'dead' | 'unknown'
export type CharacterGender = 'female' | 'male' | 'genderless' | 'unknown'

export type Character = {
	id: number
	name: string
	status: CharacterType
	species: string
	type: string
	gender: CharacterGender
	origin: {
		name: string
		url: string
	}
	location: {
		name: string
		url: string
	}
	image: string
	episode: string[]
	url: string
	created: string
}

export type CharactersResponse = {
	info: ApiResponse
	results: Character[]
}
