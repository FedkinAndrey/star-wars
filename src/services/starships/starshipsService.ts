import { api } from '@/services/api.ts';
import qs from 'qs';
import { FetchArgs } from '@reduxjs/toolkit/query/react';
import { IApiResponse } from '@/types/api.ts';
import { Starship } from '@/services/starships/types.ts';

const extendedApi = api.injectEndpoints({
	endpoints: build => ({
		getStarships: build.query<IApiResponse<Starship>, FetchArgs['params']>({
			query: params => ({
				url: `starships/?${qs.stringify(params)}`,
				method: 'GET',
			}),
		}),
		getStarshipById: build.query<Starship, number>({
			query: id => ({
				url: `starships/${id}`,
				method: 'GET',
			}),
		}),
	}),
});

export const { useGetStarshipByIdQuery, useGetStarshipsQuery } = extendedApi;