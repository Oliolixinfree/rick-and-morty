import {
	CharactersResponse,
	CharacterType
} from '@/shared/types/character.type'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/components/ui/card'
import {
	Pagination,
	PaginationContent,
	PaginationEllipsis,
	PaginationItem,
	PaginationLink,
	PaginationNext,
	PaginationPrevious
} from '@/components/ui/pagination'
import { Badge } from '@/components/ui/badge'
import Link from 'next/link'

async function getAllCharacters(page: number = 1): Promise<CharactersResponse> {
	try {
		const resp = await fetch(
			`https://rickandmortyapi.com/api/character/?page=${page}`
		)

		if (!resp.ok) throw new Error(`HTTP error! status: ${resp.status}`)

		const data: CharactersResponse = await resp.json()
		return data
	} catch (error) {
		console.error('Failed to fetch characters:', error)
		throw error
	}
}

export default async function Page() {
	const { results } = await getAllCharacters(1)

	const getBadgeVariant = (
		status: CharacterType
	): 'default' | 'destructive' | 'secondary' => {
		switch (status) {
			case 'alive':
				return 'default'
			case 'dead':
				return 'destructive'
			case 'unknown':
				return 'secondary'
		}
	}

	return (
		<div className="flex flex-col flex-1 min-h-svh">
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 3xl gap-6">
				{results.map(character => (
					<Card
						key={character.id}
						className="pt-0"
					>
						<div className="relative aspect-square">
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
						<CardHeader>
							<CardAction>
								<Badge
									variant={getBadgeVariant(
										character.status.toLowerCase() as CharacterType
									)}
								>
									{character.status}
								</Badge>
							</CardAction>
							<CardTitle>{character.name}</CardTitle>
							<CardDescription>{character.species}</CardDescription>
						</CardHeader>
						<CardContent className="flex-1">
							Status: {character.status}
							<br /> Species: {character.species}
							<br /> Type: {character.type}
							<br /> Gender: {character.gender}
						</CardContent>
						<CardFooter>
							<Button
								className="w-full"
								asChild
							>
								<Link href={`/characters/${character.id}`}>View Character</Link>
							</Button>
						</CardFooter>
					</Card>
				))}
			</div>

			<Pagination>
				<PaginationContent>
					<PaginationItem>
						<PaginationPrevious href="#" />
					</PaginationItem>
					<PaginationItem>
						<PaginationLink href="#">1</PaginationLink>
					</PaginationItem>
					<PaginationItem>
						<PaginationLink
							href="#"
							isActive
						>
							2
						</PaginationLink>
					</PaginationItem>
					<PaginationItem>
						<PaginationLink href="#">3</PaginationLink>
					</PaginationItem>
					<PaginationItem>
						<PaginationEllipsis />
					</PaginationItem>
					<PaginationItem>
						<PaginationNext href="#" />
					</PaginationItem>
				</PaginationContent>
			</Pagination>
		</div>
	)
}
