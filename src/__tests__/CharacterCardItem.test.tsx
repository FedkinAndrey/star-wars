import { render, screen, fireEvent } from '@testing-library/react';
import { CharacterCardItem } from '../components/shared/CharacterCardItem.tsx';
import { Character } from '@/services/people/types';
import { expect, test, vi } from 'vitest';

const mockCharacter: Character = {
	id: 1,
	name: 'Luke Skywalker',
	height: '172',
	mass: '77',
	hair_color: 'blond',
	skin_color: 'fair',
	eye_color: 'blue',
	birth_year: '19BBY',
	gender: 'male',
	homeworld: 1,
	films: [1, 2],
	species: [],
	vehicles: [],
	starships: [],
	created: '',
	edited: '',
	url: '',
};

test('renders CharacterCardItem with character details', () => {
	const handleClick = vi.fn();
	render(<CharacterCardItem character={mockCharacter} onClick={handleClick} />);

	expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
	expect(screen.getByText('Birth Year: 19BBY')).toBeInTheDocument();
	expect(screen.getByText('Eye Color: blue')).toBeInTheDocument();
});

test('calls onClick when the card is clicked', () => {
	const handleClick = vi.fn();
	render(<CharacterCardItem character={mockCharacter} onClick={handleClick} />);

	fireEvent.click(screen.getByText('Luke Skywalker'));
	expect(handleClick).toHaveBeenCalledWith(mockCharacter);
});
