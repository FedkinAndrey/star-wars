import React from 'react';
import { Handle, Node, NodeProps, Position } from '@xyflow/react';
import { IMAGE_URL } from '@/constants/images.ts';
import { useGetStarshipByIdQuery } from '@/services/starships/starshipsService.ts';

type StarshipNode = Node<{
	id: number;
}>

export const StarshipNode: React.FC<NodeProps<StarshipNode>> = ({ data, isConnectable }) => {
	const { id } = data;
	const {data: starship} = useGetStarshipByIdQuery(id)

	return (
		<>
			{starship && (
				<div className="flex flex-col items-center w-[200px] gap-8 border rounded-lg p-4">
					<Handle
						type="target"
						position={Position.Top}
						isConnectable={isConnectable}
					/>
					<div className="flex flex-col items-center gap-4">
						<p>{starship.name}</p>
						<p>{starship.cargo_capacity}</p>
						<div className="flex rounded-xl overflow-hidden">
							<img src={IMAGE_URL.STARSHIPS(starship.id)} alt={starship.name} />
						</div>
					</div>
					<Handle
						type="source"
						position={Position.Bottom}
						isConnectable={isConnectable}
					/>
				</div>
			)}
		</>

	);
};
