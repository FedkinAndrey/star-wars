import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({
	baseUrl: import.meta.env.VITE_API_URL,
});

export const api = createApi({
	reducerPath: 'api',
	tagTypes: [],
	baseQuery: baseQuery,
	endpoints: () => ({}),
});