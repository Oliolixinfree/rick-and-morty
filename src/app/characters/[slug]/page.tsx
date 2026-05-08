import { Character } from '@/shared/types/character.type'
import { Episode } from '@/shared/types/episode.type'
import Image from 'next/image'
import Link from 'next/link'

async function getCharacterById(id: number | string): Promise<Character> {
	try {
		const resp = await fetch(`https://rickandmortyapi.com/api/character/${id}`)

		if (!resp.ok) throw new Error(`HTTP error! status: ${resp.status}`)

		return await resp.json()
	} catch (error) {
		console.error('Failed to fetch character:', error)
		throw error
	}
}

async function getEpisodesByIds(ids: string[]): Promise<Episode[]> {
	if (!ids.length) return []

	try {
		const idsString = ids.join(',')
		const resp = await fetch(
			`https://rickandmortyapi.com/api/episode/${idsString}`
		)

		if (!resp.ok) throw new Error(`HTTP error! status: ${resp.status}`)

		const data = await resp.json()
		return Array.isArray(data) ? data : [data]
	} catch (error) {
		console.error('Failed to fetch episodes:', error)
		throw error
	}
}

export default async function Page({
	params
}: {
	params: Promise<{ slug: string }>
}) {
	const { slug } = await params

	const character = await getCharacterById(slug)

	const episodeIds = character.episode
		.map(i => i.split('/').at(-1))
		.filter((id): id is string => id !== undefined)

	const episodes = await getEpisodesByIds(episodeIds)

	return (
		<div className="flex flex-col flex-1 min-h-svh">
			<div className="grid grid-cols-2 md:grid-cols-5 gap-6">
				<div>
					<div className="relative aspect-square rounded-full">
						<Image
							src={character.image}
							alt={character.name}
							loading="eager"
							sizes="(max-width: 768px) 50vw, 16vw"
							fill
							priority
							className="object-cover transition-transform duration-300 group-hover:scale-105"
						/>
					</div>

					<ul>
						<li>{character.id}</li>
						<li>{character.name}</li>
						<li>{character.status}</li>
					</ul>
				</div>
				<div>
					<h1>Episodes</h1>
					{episodes.map(i => (
						<span key={i.id}>
							<Link href={`/episodes/${i.id}`}>{i.name}</Link>
						</span>
					))}
				</div>
			</div>
		</div>
	)
}
