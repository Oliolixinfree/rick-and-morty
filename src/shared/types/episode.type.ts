import { ApiResponse } from './api.type'

export type Episode = {
	id: number
	name: string
	air_date: string
	episode: string
	characters: string[]
	url: string
	created: string
}

export type EpisodeResponse = {
	info: ApiResponse
	results: Episode[]
}
