import { ApiResponse } from './api.type'

export type Location = {
	id: number
	name: string
	type: string
	dimension: string
	residents: string[]
	url: string[]
	created: string
}

export type LocationResponse = {
	info: ApiResponse
	results: Location[]
}
