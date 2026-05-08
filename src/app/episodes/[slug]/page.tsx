import { Character } from '@/shared/types/character.type'
import { Episode } from '@/shared/types/episode.type'
import Link from 'next/link'

async function getEpisodeById(id: number | string): Promise<Episode> {
	try {
		const resp = await fetch(`https://rickandmortyapi.com/api/episode/${id}`)

		if (!resp.ok) throw new Error(`HTTP error! status: ${resp.status}`)

		return await resp.json()
	} catch (error) {
		console.error('Failed to fetch episode:', error)
		throw error
	}
}

async function getCharactersByIds(ids: string[]): Promise<Character[]> {
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
		console.error('Failed to fetch characters:', error)
		throw error
	}
}

export default async function Page({
	params
}: {
	params: Promise<{ slug: string }>
}) {
	const { slug } = await params
	const episode = await getEpisodeById(slug)

	const characterIds = episode.characters
		.map(i => i.split('/').at(-1))
		.filter((id): id is string => id !== undefined)

	const characters = await getCharactersByIds(characterIds)

	return (
		<div className="flex flex-col flex-1 min-h-svh">
			<div className="grid grid-cols-2 md:grid-cols-5 gap-6">
				<div>
					<ul>
						<li>{episode.id}</li>
						<li>{episode.name}</li>
						<li>{episode.characters.length}</li>
					</ul>
				</div>
				<div>
					<h1>Characters</h1>
					{characters.map(i => (
						<span key={i.id}>
							<Link href={`/characters/${i.id}`}>{i.name}</Link>
						</span>
					))}
				</div>
			</div>
		</div>
	)
}
