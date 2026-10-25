import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { withApiErrors } from "./withApiErrors";

const API_KEY = import.meta.env.VITE_API_KEY;
const EMPTY_GOODS_ID = "00000000-0000-0000-0000-000000000000";

// Ошибки API приходят как JSON {error} с кодами 200 и 403:
// приводим их к единому виду API_ERROR
const baseQuery = withApiErrors(
  fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_URL }),
);

// Если ничего не найдено, API возвращает один «пустой» товар
const withoutEmpty = (response) =>
  (response.goods ?? []).filter((item) => item.goodsID !== EMPTY_GOODS_ID);

export const partsApi = createApi({
  reducerPath: "partsApi",
  baseQuery,
  endpoints: (builder) => ({
    // Этап 1: производители по артикулу
    getBrands: builder.query({
      query: (number) => ({
        url: "",
        params: { key: API_KEY, number },
      }),
      transformResponse: withoutEmpty,
    }),

    // Этап 2: аналоги и предложения по артикулу и бренду
    getAnalogues: builder.query({
      query: ({ number, brand }) => ({
        url: "",
        params: { key: API_KEY, number, brand, analogues: "on" },
      }),
      transformResponse: withoutEmpty,
    }),
  }),
});

export const { useGetBrandsQuery, useGetAnaloguesQuery } = partsApi;
