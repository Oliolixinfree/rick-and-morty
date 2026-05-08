import { ApiResponse } from '@/shared/types/api.type'
import { Episode } from '@/shared/types/episode.type'
import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableFooter,
	TableHead,
	TableHeader,
	TableRow
} from '@/components/ui/table'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Link as LinkIcon } from 'lucide-react'

type Props = {
	info: ApiResponse
	results: Episode[]
}

async function getAllEpisodes(page: number = 1): Promise<Props> {
	try {
		const resp = await fetch(
			`https://rickandmortyapi.com/api/episode/?page=${page}`
		)

		if (!resp.ok) throw new Error(`HTTP error! status: ${resp.status}`)

		const data: Props = await resp.json()
		return data
	} catch (error) {
		console.error('Failed to fetch episodes:', error)
		throw error
	}
}

export default async function Page() {
	const { results, info } = await getAllEpisodes(1)

	return (
		<div className="flex flex-col flex-1 min-h-svh">
			<Table>
				<TableCaption>A list of episodes.</TableCaption>
				<TableHeader>
					<TableRow>
						<TableHead className="w-[100px]">№</TableHead>
						<TableHead>Name</TableHead>
						<TableHead>Episode</TableHead>
						<TableHead>Air date</TableHead>
						<TableHead className="text-right">Characters</TableHead>
					</TableRow>
				</TableHeader>
				<TableBody>
					{results.map(i => (
						<TableRow key={i.id}>
							<TableCell>{i.id}</TableCell>
							<TableCell>{i.name}</TableCell>
							<TableCell>
								<Button
									size={'sm'}
									variant={'link'}
									asChild
									className="p-0"
								>
									<Link href={`/episodes/${i.id}`}>
										{i.episode} <LinkIcon />
									</Link>
								</Button>
							</TableCell>
							<TableCell>{i.air_date}</TableCell>
							<TableCell className="text-right">
								{i.characters.length}
							</TableCell>
						</TableRow>
					))}
				</TableBody>
				<TableFooter>
					<TableRow>
						<TableCell colSpan={4}>Total episodes</TableCell>
						<TableCell className="text-right">{info.count}</TableCell>
					</TableRow>
				</TableFooter>
			</Table>
		</div>
	)
}
