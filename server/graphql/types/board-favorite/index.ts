import { FavoriteBoardList } from './favorite-board-list'
import { Board } from './board'

export const Mutation = `
`

export const Query = /* GraphQL */ `
  favoriteBoards(filters: [Filter], pagination: Pagination, sortings: [Sorting]): FavoriteBoardList
`

export const Types = [FavoriteBoardList, Board]
