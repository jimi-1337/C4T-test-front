import {
    CheckIcon,
    PlusIcon,
    ThumbDownIcon,
    ThumbUpIcon,
    TrashIcon,
    VolumeOffIcon,
    VolumeUpIcon,
    XIcon,
  } from '@heroicons/react/outline'
import MuiModal from '@mui/material/Modal'
import { FaPlay } from 'react-icons/fa';
import { useRecoilState } from 'recoil'
import { modalState, movieList, movieState } from '../atoms/modalAtom.'
import ReactPlayer from 'react-player/lazy'
import { useEffect, useState } from 'react';
import { Movie, useAuth } from '../contexts/GlobalMovies';



function Modal() {
  const { movies, setMovies } = useAuth();
  const [movie, setMovie] = useRecoilState(movieState);
  const [showModal, setShowModal] = useRecoilState(modalState)
  const [list, setList] = useRecoilState(movieList)
  const [muted, setMuted] = useState(true)
  const [addedToList, setAddedToList] = useState(false)

  const DeleteMovie = () => {
    const index = movies.findIndex((result) => result.id === movie?.id);
    let arr = JSON.parse(JSON.stringify(movies));
    arr.splice(index, 1);
    handleClose();
    removeFromList();
    setMovies(arr);
  }

  const addToList = () => {
    let arr : Movie[] = [];
    if (list)
    {
        arr = JSON.parse(JSON.stringify(list));
        if (movie)
            arr.push(movie);
        setList(arr);
    }
    else
    {
        if (movie)
            arr.push(movie)
        setList(arr);
    }
  }

  const removeFromList = () => {
    let index = -1;
    if (list)
    {
        index = list.findIndex((result) => result.id === movie?.id);
        let arr = JSON.parse(JSON.stringify(list));
        if (index !== -1)
            arr.splice(index, 1);
        setList(arr);
    }
  }

  const like = () => {
    const index = movies.findIndex((result) => result.id === movie?.id);
    let arr = JSON.parse(JSON.stringify(movies));
    if(arr[index].disliked) {
        arr[index].dislikes--;
        arr[index].disliked = false;
        arr[index].liked = true;
        arr[index].likes++;
        setMovie(arr[index]);
        setMovies(arr);
    }
    else if (!arr[index].liked)
    {
        arr[index].likes++;
        arr[index].liked = true;
        setMovie(arr[index]);
        setMovies(arr);
    }
    else {
        arr[index].likes--;
        arr[index].liked = false;
        setMovie(arr[index]);
        setMovies(arr);
    }
  }

  const dislike = () => {
    const index = movies.findIndex((result) => result.id === movie?.id);
    let arr = JSON.parse(JSON.stringify(movies));
    if (arr[index].liked)
    {
        arr[index].dislikes++;
        arr[index].likes--;
        arr[index].liked = false;
        arr[index].disliked = true;
        setMovie(arr[index]);
        setMovies(arr);
    }
    else if (arr[index].disliked) {
        arr[index].dislikes--;
        arr[index].disliked = false;
        setMovie(arr[index]);
        setMovies(arr);
    }
    else {
        arr[index].dislikes++;
        arr[index].disliked = true;
        setMovie(arr[index]);
        setMovies(arr);       
    }
  }

  const handleClose = () => {
    setShowModal(false)
    setMovie(null)
  }

  // Check if the movie is already in the user's list
  useEffect(
      () => {
          if (list) {
            setAddedToList(
                list.findIndex((result) => result.id === movie?.id) != -1
            )
        }
    },
    [list]
  )

    return (
        <MuiModal
        open={showModal}
        onClose={handleClose}
        className="fixed !top-7 left-0 right-0 z-50 mx-auto w-full max-w-5xl overflow-hidden overflow-y-scroll rounded-md scrollbar-hide"
        >
            {/* <InsideModal movie={movie} setMovie={setMovie} /> */}
            <>
                <button
                    className="modalButton absolute right-5 top-5 !z-40 h-9 w-9 border-none bg-[#181818] hover:bg-[#181818]"
                    onClick={handleClose}
                >
                    <XIcon className="h-6 w-6" />
                </button>
                <div className="relative pt-[56.25%]">
                    <ReactPlayer
                        url={`https://www.youtube.com/watch?v=${movie?.trailer}`}
                        width="100%"
                        height="100%"
                        style={{ position: 'absolute', top: '0', left: '0' }}
                        playing
                        muted={muted}
                    />
                    <div className="absolute bottom-10 flex w-full items-center justify-between px-10">
                        <div className="flex space-x-2">
                        <button className="flex items-center gap-x-2 rounded bg-white px-8 text-xl font-bold text-black transition hover:bg-[#e6e6e6]">
                            <FaPlay className="h-7 w-7 text-black" />
                            Play
                        </button>
                        <button className="modalButton">
                        {addedToList ? (
                                <CheckIcon className="h-7 w-7" onClick={removeFromList}/>
                            ) : (
                            <PlusIcon className="h-7 w-7" onClick={addToList} />
                        )}
                        </button>
                        <button data-testid="Like" id="Like" className={`modalButton ${movie?.liked && 'bg-red-700'}`} onClick={like}>
                            <>
                                <ThumbUpIcon className="h-6 w-6" />
                            </>
                        </button>
                        <button data-testid="Dislike" id="Dislike" className={`modalButton ${movie?.disliked && 'bg-red-700'}`} onClick={dislike}>
                            <>
                                <ThumbDownIcon className="h-6 w-6" />
                            </>
                        </button>
                        </div>
                        <button className="modalButton">
                            <TrashIcon className="h-6 w-6" onClick={DeleteMovie} />
                        </button>
                        <button className="modalButton" onClick={() => setMuted(!muted)}>
                        {muted ? (
                            <VolumeOffIcon className="h-6 w-6" />
                        ) : (
                            <VolumeUpIcon className="h-6 w-6" />
                        )}
                        </button>
                    </div>
                </div>
                <div className="flex space-x-16 rounded-b-md bg-[#181818] px-10 py-8">
                    <div className="space-y-6 text-lg">
                        <div className="flex items-center space-x-2 text-sm">
                        <p className="font-semibold text-green-400">
                            {movie?.title}
                        </p>
                        <div className="flex h-4 items-center justify-center rounded border border-white/40 px-1.5 text-xs">
                            HD
                        </div>
                        </div>
                        <div className="flex flex-col gap-x-10 gap-y-4 font-light md:flex-row">
                        <p className="w-5/6">{movie?.category}</p>
                        <div className="flex flex-col space-y-3 text-sm">

                            <div className='whitespace-nowrap' >
                            <span className="text-[gray]">Number of likes :</span>{' '}
                            <span id="numlike">{movie?.likes}</span>
                            </div>

                            <div className='whitespace-nowrap'>
                            <span className="text-[gray]">Number of dislikes :</span>{' '}
                            <span id="numdislike">
                                {movie?.dislikes}
                            </span>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </>

        </MuiModal>
    )
}

export default Modal