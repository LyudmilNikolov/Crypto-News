import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { CoinDetails, Coins } from '../models/coin';
import { History } from '../models/history';

const cryptoApiHeaders = {
  'X-RapidAPI-Host': import.meta.env.VITE_CRYPTO_RAPIDAPI_HOST  || '',
  'X-RapidAPI-Key': import.meta.env.VITE_APP_RAPIDAPI_KEY  || '',
}

const createRequest = (url: string) => ({ url, headers: cryptoApiHeaders });

export const cryptoApi = createApi({
  reducerPath: 'cryptoApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_CRYPTO_API_URL || '' }),
  endpoints: (builder) => ({
    getCryptos: builder.query<Coins, number>({
      query: (count) => createRequest(`/coins?limit=${count}`)
    }),
    getCryptoDetails: builder.query<CoinDetails, string >({
      query: (coinId) => createRequest(`/coin/${coinId}`),
    }),    
    getCryptoHistory: builder.query<History, { coinId: string; timePeriod: string }>({
      query: ({coinId, timePeriod}) => createRequest(`/coin/${coinId}/history?timePeriod=${timePeriod}`),
    })
  })
});

export const {
  useGetCryptosQuery, useGetCryptoDetailsQuery, useGetCryptoHistoryQuery
} = cryptoApi;