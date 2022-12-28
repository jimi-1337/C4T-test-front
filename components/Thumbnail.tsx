import Image from 'next/legacy/image'
import { useRecoilState } from 'recoil'
import { modalState, movieState } from '../atoms/modalAtom.'
import { Movie } from '../contexts/GlobalMovies'

interface Props {
  movie: Movie
}

function Thumbnail({ movie }: Props) {
  const [currentMovie, setCurrentMovie] = useRecoilState(movieState)
  const [showModal, setShowModal] = useRecoilState(modalState)

  return (
    <div
      className={`relative thumbnailToclick h-28 min-w-[180px] cursor-pointer transition duration-200 ease-out md:h-36 md:min-w-[260px] md:hover:scale-105`}
      onClick={() => {
        setCurrentMovie(movie)
        setShowModal(true)
      }}
    >
      <Image
        src={movie.thumbnail}
        className="rounded-sm object-cover md:rounded"
        layout="fill"
        alt=''
      />
    </div>
  )
}

export default Thumbnail
