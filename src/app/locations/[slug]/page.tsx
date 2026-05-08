import { Character } from '@/shared/types/character.type'
import { Location } from '@/shared/types/location.type'
import Link from 'next/link'

async function getLocationById(id: number | string): Promise<Location> {
	try {
		const resp = await fetch(`https://rickandmortyapi.com/api/location/${id}`)

		if (!resp.ok) throw new Error(`HTTP error! status: ${resp.status}`)

		return await resp.json()
	} catch (error) {
		console.error('Failed to fetch location:', error)
		throw error
	}
}

async function getResidentsByIds(ids: string[]): Promise<Character[]> {
	if (!ids.length) return []

	try {
		const idsString = ids.join(',')
		const resp = await fetch(
			`https://rickandmortyapi.com/api/character/${idsString}`
		)

		if (!resp.ok) throw new Error(`HTTP error! status: ${resp.status}`)

		const data = await resp.json()
		return Array.isArray(data) ? data : [data]
	} catch (error) {
		console.error('Failed to fetch residents:', error)
		throw error
	}
}

export default async function Page({
	params
}: {
	params: Promise<{ slug: string }>
}) {
	const { slug } = await params
	const location = await getLocationById(slug)

	const residentIds = location.residents
		.map(i => i.split('/').at(-1))
		.filter((id): id is string => id !== undefined)

	const residents = await getResidentsByIds(residentIds)

	return (
		<div className="flex flex-col flex-1 min-h-svh">
			<div className="grid grid-cols-2 md:grid-cols-5 gap-6">
				<div>
					<ul>
						<li>{location.id}</li>
						<li>{location.name}</li>
						<li>{location.type}</li>
					</ul>
				</div>
			</div>
			<div>
				<h1>Characters</h1>
				{residents.map(i => (
					<span key={i.id}>
						<Link href={`/characters/${i.id}`}>{i.name}</Link>
					</span>
				))}
			</div>
		</div>
	)
}
