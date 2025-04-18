import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const apiSlice = createApi({
	reducerPath: 'api',
	baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/' }),
	tagTypes: ['Heroes'],
	endpoints: (builder) => ({
		getHeroes: builder.query({
			query: (element = 'all') => {
				const query = element === 'all' ? '' : `?element=${element}`
				return `heroes${query}`
			},
			providesTags: ['Heroes'],
		}),
		createHero: builder.mutation({
			query: (hero) => ({
				url: 'heroes',
				method: 'POST',
				body: hero,
			}),
			invalidatesTags: ['Heroes'],
		}),
		updateHero: builder.mutation({
			query: (hero) => ({
				url: `heroes/${hero.id}`,
				method: 'PUT',
				body: hero,
			}),
			invalidatesTags: ['Heroes'],
		}),
		deleteHero: builder.mutation({
			query: (id) => ({
				url: `heroes/${id}`,
				method: 'DELETE',
			}),
			invalidatesTags: ['Heroes'],
		}),
	}),
})

const {
	useGetHeroesQuery,
	useCreateHeroMutation,
	useUpdateHeroMutation,
	useDeleteHeroMutation,
} = apiSlice

export {
	apiSlice,
	useCreateHeroMutation,
	useDeleteHeroMutation,
	useGetHeroesQuery,
	useUpdateHeroMutation,
}
