import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { News } from '../models/news';

const cryptoNewsHeaders = {
    'X-RapidAPI-Key': import.meta.env.VITE_RAPIDAPI_KEY  || '',
    'X-RapidAPI-Host': import.meta.env.VITE_NEWS_RAPIDAPI_HOST  || '',
}

const createRequest = (url: string) => ({ url, headers: cryptoNewsHeaders });

export const cryptoNewsApi = createApi({
    reducerPath: 'cryptoNewsApi',
    baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_NEWS_API_URL || '' }),
    endpoints: (builder) => ({
      getCryptoNews: builder.query<News, string>({
        query: (newsProvider) => createRequest(`/v1/${newsProvider}`)
      })
    })
});
export const { useGetCryptoNewsQuery } = cryptoNewsApi;