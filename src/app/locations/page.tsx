import { ApiResponse } from '@/shared/types/api.type'
import { Location } from '@/shared/types/location.type'
import Link from 'next/link'

type Props = {
	info: ApiResponse
	results: Location[]
}

async function getAllLocations(page: number = 1): Promise<Props> {
	try {
		const resp = await fetch(
			`https://rickandmortyapi.com/api/location/?page=${page}`
		)

		if (!resp.ok) throw new Error(`HTTP error! status: ${resp.status}`)

		const data: Props = await resp.json()
		return data
	} catch (error) {
		console.error('Failed to fetch locations:', error)
		throw error
	}
}

export default async function Page() {
	const { results } = await getAllLocations(1)

	return (
		<div className="flex flex-col flex-1 min-h-svh">
			<div className="grid grid-cols-2 md:grid-cols-5 gap-6">
				{results.map(location => (
					<div key={location.id}>
						<ul>
							<li>{location.id}</li>
							<li>
								<Link href={`/locations/${location.id}`}>{location.name}</Link>
							</li>
							<li>{location.type}</li>
							<li>{new Date(location.created).toLocaleString()}</li>
						</ul>
					</div>
				))}
			</div>
		</div>
	)
}
