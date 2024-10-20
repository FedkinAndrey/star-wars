import { api } from '@/services/api.ts';
import qs from 'qs';
import { FetchArgs } from '@reduxjs/toolkit/query/react';
import { Character } from '@/services/people/types.ts';
import { IApiResponse } from '@/types/api.ts';

const extendedApi = api.injectEndpoints({
	endpoints: build => ({
		getPeople: build.query<IApiResponse<Character>, FetchArgs['params']>({
			query: params => ({
				url: `people/?${qs.stringify(params)}`,
				method: 'GET',
			}),
		}),
		getPeopleById: build.query<Character, number>({
			query: id => ({
				url: `people/${id}`,
				method: 'GET',
			}),
		}),
	}),
});

export const { useGetPeopleQuery, useGetPeopleByIdQuery, useLazyGetPeopleQuery } = extendedApi;