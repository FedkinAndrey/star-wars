import React from 'react';
import { Handle, Node, NodeProps, Position } from '@xyflow/react';
import { IMAGE_URL } from '@/constants/images.ts';
import { useGetFilmByIdQuery } from '@/services/films/filmsService.ts';

type FilmNode = Node<{
	id: number;
}>

export const FilmNode: React.FC<NodeProps<FilmNode>> = ({ data, isConnectable }) => {
	const { id } = data;
	const {data: film} = useGetFilmByIdQuery(id)

	return (
		<>
			{film && (
				<div className="flex flex-col items-center w-[200px] gap-8 border rounded-lg p-4">
					<Handle
						type="target"
						position={Position.Top}
						isConnectable={isConnectable}
					/>
					<div className="flex flex-col items-center gap-4">
						<p>{film.title}</p>
						<div className="flex rounded-xl overflow-hidden">
							<img src={IMAGE_URL.FILMS(film.id)} alt={film.title} />
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
