import { cn } from '@/lib/utils.ts';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card.tsx';
import { IMAGE_URL } from '@/constants/images.ts';
import { Character } from '@/services/people/types.ts';
import { FC } from 'react';

interface CharacterCardItemProps {
	character: Character;
	onClick: (character: Character) => void;
	className?: string;
}

export const CharacterCardItem: FC<CharacterCardItemProps> = ({ character, onClick, className }) => {
	return (
		<Card
			className={cn('flex flex-col justify-between w-[250px] cursor-pointer hover:shadow-gray-300 shadow-xl', className)}
			onClick={() => onClick(character)}>
			<CardHeader>
				<CardTitle>{character.name}</CardTitle>
				<CardDescription>Birth Year: {character.birth_year}</CardDescription>
				<CardDescription>Eye Color: {character.eye_color}</CardDescription>
			</CardHeader>
			<CardContent className="grid gap-4">
				<div className=" flex items-center space-x-4 rounded-xl overflow-hidden">
					<div className="flex-1 space-y-1">
						<img src={IMAGE_URL.CHARACTERS(character.id)} alt={character.name}
						/>
					</div>
				</div>
			</CardContent>
		</Card>
	);
};

