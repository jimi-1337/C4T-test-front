export interface Genre {
  id: number
  name: string
}

export interface Movie {
  id: string,
  title: string,
  category: string,
  thumbnail: string,
  likes: number,
  dislikes: number
}

export interface Element {
  type:
    | 'Bloopers'
    | 'Featurette'
    | 'Behind the Scenes'
    | 'Clip'
    | 'Trailer'
    | 'Teaser'
}
