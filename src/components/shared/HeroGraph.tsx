import React, { useCallback, useState } from 'react';
import {
	addEdge,
	applyEdgeChanges,
	applyNodeChanges,
	Controls,
	type Edge,
	type Node,
	type NodeTypes,
	type OnConnect,
	type OnEdgesChange,
	type OnNodesChange,
	ReactFlow,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { Character } from '@/services/people/types.ts';
import { Button } from '@/components/ui/button.tsx';
import { CharacterNode } from '@/components/shared/CharacterNode.tsx';
import { FilmNode } from '@/components/shared/FilmNode.tsx';
import { StarshipNode } from '@/components/shared/StarshipNode.tsx';
import { Film } from '@/services/films/types.ts';
import { getHeroFilms } from '@/lib/utils.ts';

interface HeroGraphProps {
	hero: Character;
	onClose: () => void;
	allFilms: Film[];
}

const nodeTypes: NodeTypes = { character: CharacterNode, film: FilmNode, starship: StarshipNode };

export const HeroGraph: React.FC<HeroGraphProps> = ({ hero, onClose, allFilms }) => {
	const entireHeroFilms = getHeroFilms(hero.films, allFilms);

	// Create nodes and edges
	const initialNodes: Node[] = [
		{
			id: `hero-${hero.id}`,
			data: { character: hero },
			position: { x: 250, y: 0 },
			type: 'character',
		},
		// Add film nodes
		...hero.films.map((filmId, index) => ({
			id: `film-${filmId}`,
			data: { id: filmId },
			position: { x: index * 230, y: 400 },
			type: 'film',
		})),
		// Add starship nodes
		...hero.starships.map((starshipId, index) => ({
			id: `starship-${starshipId}`,
			data: { id: starshipId },
			position: { x: index * 250, y: 800 },
			type: 'starship',
		})),
	];

	const initialEdges: Edge[] = [
		// Edges from hero to films
		...hero.films.map((filmId) => ({
			id: `edge-hero-film-${filmId}`,
			source: `hero-${hero.id}`,
			target: `film-${filmId}`,
		})),
		// Edges from films to starships
		...entireHeroFilms.flatMap((film) =>
			film.starships
				.filter((filmStarshipId) => hero.starships.includes(filmStarshipId))
				.map((filmStarshipId) => ({
					id: `edge-film-${film.id}-starship-${filmStarshipId}`,
					source: `film-${film.id}`,
					target: `starship-${filmStarshipId}`,
				}))
		),
	];

	const [nodes, setNodes] = useState(initialNodes);
	const [edges, setEdges] = useState(initialEdges);


	const onNodesChange: OnNodesChange = useCallback(
		(changes) => setNodes((nds) => applyNodeChanges(changes, nds)),
		[setNodes],
	);
	const onEdgesChange: OnEdgesChange = useCallback(
		(changes) => setEdges((eds) => applyEdgeChanges(changes, eds)),
		[setEdges],
	);
	const onConnect: OnConnect = useCallback(
		(connection) => setEdges((eds) => addEdge(connection, eds)),
		[setEdges],
	);

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
			<div className="relative bg-white w-full h-full">
				<Button
					className="absolute z-10 top-2 right-2"
					onClick={onClose}
				>
					Close
				</Button>
				<ReactFlow
					nodes={nodes}
					edges={edges}
					onNodesChange={onNodesChange}
					onEdgesChange={onEdgesChange}
					onConnect={onConnect}
					nodeTypes={nodeTypes}
				>
					<Controls />
				</ReactFlow>
			</div>
		</div>
	);
};
