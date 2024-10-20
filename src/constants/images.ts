const IMAGE_BASE_URL = 'https://starwars-visualguide.com/assets/img';

export const IMAGE_URL = {
	FILMS: (id: number) => {
		return `${IMAGE_BASE_URL}/films/${id}.jpg`;
	},
	CHARACTERS: (id: number) => {
		return `${IMAGE_BASE_URL}/characters/${id}.jpg`;
	},
	SPECIES: (id: number) => {
		return `${IMAGE_BASE_URL}/species/${id}.jpg`;
	},
	STARSHIPS: (id: number) => {
		return `${IMAGE_BASE_URL}/starships/${id}.jpg`;
	},
	VEHICLES: (id: number) => {
		return `${IMAGE_BASE_URL}/vehicles/${id}.jpg`;
	},
	PLANETS: (id: number) => {
		return `${IMAGE_BASE_URL}/planets/${id}.jpg`;
	},

};