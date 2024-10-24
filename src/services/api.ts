import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseUrl =
	import.meta.env.MODE === 'development' ? '/api' : import.meta.env.VITE_API_URL;

const baseQuery = fetchBaseQuery({
	baseUrl
});

export const api = createApi({
	reducerPath: 'api',
	tagTypes: [],
	baseQuery: baseQuery,
	endpoints: () => ({}),
});