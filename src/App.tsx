import { useState, useEffect, useRef } from 'react';
import { useLazyGetPeopleQuery } from '@/services/people/peopleService.ts';
import { CharacterCardItem, CardItemSkeleton, HeroGraph } from '@/components/shared';
import { useIntersection } from 'react-use';
import { Character } from '@/services/people/types.ts';
import { useGetFilmsQuery } from '@/services/films/filmsService.ts';

function App() {
	const [page, setPage] = useState(1);
	const [peopleList, setPeopleList] = useState<Array<Character>>([]);
	const [isFetchingMore, setIsFetchingMore] = useState(false);
	const [selectedHero, setSelectedHero] = useState<Character | null>(null);

	const loadMoreRef = useRef(null);

	const [trigger, { data: peopleData, isFetching, isError }] = useLazyGetPeopleQuery();
	const { data: filmsData, error: filmsError } = useGetFilmsQuery({});

	useEffect(() => {
		trigger({ page: 1 });
	}, [trigger]);

	useEffect(() => {
		if (peopleData && peopleData.results) {
			setPeopleList((prevPeople) => [...prevPeople, ...peopleData.results]);
			setIsFetchingMore(false);
		}
	}, [peopleData]);

	const intersection = useIntersection(loadMoreRef, {
		root: null,
		rootMargin: '0px',
		threshold: 1.0,
	});

	useEffect(() => {
		if (
			intersection &&
			intersection.isIntersecting &&
			!isFetching &&
			!isFetchingMore &&
			peopleData?.next &&
			!isError
		) {
			setIsFetchingMore(true);
			setPage((prevPage) => prevPage + 1);
		}
	}, [intersection, isFetching, isFetchingMore, peopleData, isError]);

	useEffect(() => {
		if (page > 1) {
			trigger({ page });
		}
	}, [page, trigger]);

	if (isFetching && page === 1) {
		return (
			<div className="flex flex-wrap justify-center items-start w-full gap-8">
				{[...Array(8)].map((_, index) => (
					<CardItemSkeleton key={index} />
				))}
			</div>
		);
	}

	if (isError || filmsError) {
		return <div>Error loading data.</div>;
	}

	const handleHeroClick = (person: Character) => {
		setSelectedHero(person);
	};

	const closeGraph = () => {
		setSelectedHero(null);
	};

	return (
		<div className="relative">
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full gap-8 justify-items-center">
				{peopleList.map((character) => (
					<CharacterCardItem character={character} key={character.id} onClick={handleHeroClick} />
				))}
				{isFetchingMore &&
					[...Array(8)].map((_, index) => <CardItemSkeleton key={index} />)}
				<div ref={loadMoreRef} style={{ height: '1px' }} />
			</div>
			{selectedHero && <HeroGraph hero={selectedHero} allFilms={filmsData?.results || []} onClose={closeGraph} />}
		</div>
	);
}

export default App;

