import { StaticImageData } from "next/legacy/image";
import { createContext, useContext, ReactNode, useState } from "react";
import img1 from "../images/1.jpg";
import img2 from "../images/2.jpg";
import img3 from "../images/3.jpg";
import img4 from "../images/4.jpg";
import img5 from "../images/5.jpg";
import img6 from "../images/6.jpg";
import img7 from "../images/7.jpg";
import img8 from "../images/8.jpg";
import img9 from "../images/9.jpg";
import { values } from "./movie"


type Movies = {
    movies: Movie[];
    setMovies: (vals?: Movie[]) => void;
};

export type Movie = {
    id: string,
    title: string,
    category: string,
    thumbnail: StaticImageData,
    likes: number,
    dislikes: number,
    trailer: string,
    liked: boolean,
    disliked: boolean
};

// const values: Movie[] = [
//     {
//       id: '1',
//       title: 'Oceans 8',
//       category: 'Comedy',
//       thumbnail: img1,
//       likes: 4,
//       dislikes: 1,
//       trailer: 'MFWF9dU5Zc0',
//       liked: false,
//       disliked: false,
//     }, {
//       id: '2',
//       title: 'Midnight Sun',
//       category: 'Comedy',
//       thumbnail: img2,
//       likes: 2,
//       dislikes: 0,
//       trailer: 'fEskVQgtwaI',
//       liked: false,
//       disliked: false,
//     }, {
//       id: '3',
//       title: 'Les indestructibles 2',
//       category: 'Animation',
//       thumbnail: img3,
//       likes: 3,
//       dislikes: 1,
//       trailer: 'sXsr_7Una_A',
//       liked: false,
//       disliked: false,
//     }, {
//       id: '4',
//       title: 'Sans un bruit',
//       category: 'Comedy',
//       thumbnail: img4,
//       likes: 6,
//       dislikes: 6,
//       trailer: 'GzFz9Y6Zkos',
//       liked: false,
//       disliked: false,
//     }, {
//       id: '23',
//       title: 'Sans un bruit',
//       category: 'Comedy',
//       thumbnail: img4,
//       likes: 6,
//       dislikes: 6,
//       trailer: 'GzFz9Y6Zkos',
//       liked: false,
//       disliked: false,
//     }, {
//       id: '22',
//       title: 'Sans un bruit',
//       category: 'Comedy',
//       thumbnail: img4,
//       likes: 6,
//       dislikes: 6,
//       trailer: 'GzFz9Y6Zkos',
//       liked: false,
//       disliked: false,
//     }, {
//       id: '20',
//       title: 'Sans un bruit',
//       category: 'Comedy',
//       thumbnail: img4,
//       likes: 6,
//       dislikes: 6,
//       trailer: 'GzFz9Y6Zkos',
//       liked: false,
//       disliked: false,
//     }, {
//       id: '21',
//       title: 'Sans un bruit',
//       category: 'Comedy',
//       thumbnail: img4,
//       likes: 6,
//       dislikes: 6,
//       trailer: 'GzFz9Y6Zkos',
//       liked: false,
//       disliked: false,
//     }, {
//       id: '25',
//       title: 'Sans un bruit',
//       category: 'Comedy',
//       thumbnail: img4,
//       likes: 6,
//       dislikes: 6,
//       trailer: 'GzFz9Y6Zkos',
//       liked: false,
//       disliked: false,
//     }, {
//       id: '26',
//       title: 'Sans un bruit',
//       category: 'Comedy',
//       thumbnail: img4,
//       likes: 6,
//       dislikes: 6,
//       trailer: 'GzFz9Y6Zkos',
//       liked: false,
//       disliked: false,
//     }, {
//       id: '5',
//       title: 'Creed II',
//       category: 'Drame',
//       thumbnail: img5,
//       likes: 16,
//       dislikes: 2,
//       trailer: 'u22BXhMu4tI',
//       liked: false,
//       disliked: false,
//     }, {
//       id: '6',
//       title: 'Gone Girl',
//       category: 'Comedy',
//       thumbnail: img6,
//       likes: 22,
//       dislikes: 1,
//       trailer: '2-_-1nJf8Vg',
//       liked: false,
//       disliked: false,
//     }, {
//       id: '7',
//       title: 'Pulp Fiction',
//       category: 'Comedy',
//       thumbnail: img7,
//       likes: 1233,
//       dislikes: 3,
//       trailer: 's7EdQ4FqbhY',
//       liked: false,
//       disliked: false,
//     }, {
//       id: '8',
//       title: 'Seven',
//       category: 'Comedy',
//       thumbnail: img8,
//       likes: 2,
//       dislikes: 1,
//       trailer: 'znmZoVkCjpI',
//       liked: false,
//       disliked: false,
//     }, {
//       id: '9',
//       title: 'Inception',
//       category: 'Comedy',
//       thumbnail: img9,
//       likes: 2,
//       dislikes: 1,
//       trailer: 'YoHD9XEInc0',
//       liked: false,
//       disliked: false,
//     },
// ];

async function example() {
  const result = await Promise.resolve(values);
  return result;
}

const GlobalMovies: Movies = {
    movies: [],
    setMovies: () => {},
};

const AuthContext = createContext<Movies>(GlobalMovies);

export function useAuth() {
  return useContext(AuthContext);
}

type Props = {
  children: ReactNode;
};

export function AuthProvider({ children }: Props) {
  const [movies, setmovies] = useState<Movie[]>([]);

  const setMovies = (vals: Movie[] = []) => {
    if(vals.length == 0){
      example().then((value) => {
        const tmp: Movie[] = value;
        setmovies(tmp);
      })
    }
    setmovies(vals);
  };

  const value = {
      movies,
      setMovies
  };

  return (
      <>
          <AuthContext.Provider value={value}>
              {children}
          </AuthContext.Provider>
      </>
  );
}


