import {api} from "@/services/api.ts";
import {FetchArgs} from "@reduxjs/toolkit/query/react";
import qs from "qs";
import { Film } from '@/services/films/types.ts';
import { IApiResponse } from '@/types/api.ts';

const extendedApi = api.injectEndpoints({
    endpoints: build => ({
        getFilms: build.query<IApiResponse<Film>, FetchArgs['params']>({
            query: params => ({
                url: `films?${qs.stringify(params)}`,
                method: 'GET',
            }),
        }),
        getFilmById: build.query<Film, number>({
            query: id => ({
                url: `films/${id}`,
                method: 'GET',
            }),
        }),
    }),
});

export const { useGetFilmsQuery, useGetFilmByIdQuery } = extendedApi;