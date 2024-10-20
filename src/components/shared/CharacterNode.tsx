import React from 'react';
import { Handle, Position, NodeProps, Node } from '@xyflow/react';
import { Character } from '@/services/people/types.ts';
import { IMAGE_URL } from '@/constants/images.ts';

type CharacterNode = Node<{
	character: Character
}>

export const CharacterNode: React.FC<NodeProps<CharacterNode>> = ({ data, isConnectable }) => {
	const { character } = data;

	return (
		<div className="flex flex-col items-center w-[200px] gap-8 border rounded-lg p-4">
			<div className="flex flex-col items-center gap-4">
				<p>{character.name}</p>
				<div className="flex rounded-xl overflow-hidden">
					<img src={IMAGE_URL.CHARACTERS(character.id)} alt={character.name} />
				</div>
			</div>
			<Handle
				type="source"
				position={Position.Bottom}
				isConnectable={isConnectable}
			/>
		</div>
	);
};

