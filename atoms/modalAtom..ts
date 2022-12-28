import { atom } from 'recoil'
import { Movie } from '../contexts/GlobalMovies'

export const modalState = atom({
  key: 'modalState',
  default: false,
})

export const movieState = atom<Movie | null>({
  key: 'movieState',
  default: null,
})

export const movieList = atom<Movie[] | null>({
  key: 'movieList',
  default: null,
})

export const category = atom<string[]>({
  key: 'category',
  default: [],
})

export const selectedCat = atom<String[]>({
  key: 'selectedCat',
  default: [],
})

export const Categories = atom<any>({
  key: 'Categories',
  default: null,
})
