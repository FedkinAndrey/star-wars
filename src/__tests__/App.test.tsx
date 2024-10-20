import { render, screen } from '@testing-library/react';
import { describe, test, expect, vi, Mock } from 'vitest';

// Mock the RTK Query hooks
vi.mock('@/services/people/peopleService', () => ({
	useLazyGetPeopleQuery: vi.fn(),
}));

vi.mock('@/services/films/filmsService', () => ({
	useGetFilmsQuery: vi.fn(),
}));

// Import the mocked hooks after they are mocked
import { useLazyGetPeopleQuery } from '@/services/people/peopleService';
import { useGetFilmsQuery } from '@/services/films/filmsService';
import App from '@/App.tsx';

describe('App Component', () => {
	test('renders skeletons while fetching data', () => {
		// Mock initial fetching state
		(useLazyGetPeopleQuery as Mock).mockReturnValue([vi.fn(), { data: null, isFetching: true, isError: false }]);
		(useGetFilmsQuery as Mock).mockReturnValue({ data: null, isLoading: true, error: null });

		render(<App />);

		// Check if the loading skeletons are rendered
		expect(screen.getAllByTestId('skeleton')).toHaveLength(8);
	});

	test('renders character cards when data is fetched', () => {
		// Mock successful data fetching
		(useLazyGetPeopleQuery as Mock).mockReturnValue([
			vi.fn(),
			{
				data: {
					results: [{ id: 1, name: 'Luke Skywalker', birth_year: '19BBY', eye_color: 'blue' }],
				},
				isFetching: false,
				isError: false,
			},
		]);
		(useGetFilmsQuery as Mock).mockReturnValue({
			data: { results: [{ id: 1, title: 'A New Hope', starships: [10] }] },
			isLoading: false,
			error: null,
		});

		render(<App />);

		// Check if the character card is rendered
		expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
	});

	test('renders error message when data fetching fails', () => {
		// Mock error state
		(useLazyGetPeopleQuery as Mock).mockReturnValue([
			vi.fn(),
			{ data: null, isFetching: false, isError: true },
		]);
		(useGetFilmsQuery as Mock).mockReturnValue({
			data: null,
			isLoading: false,
			error: true,
		});

		render(<App />);

		// Check if the error message is rendered
		expect(screen.getByText('Error loading data.')).toBeInTheDocument();
	});
});
