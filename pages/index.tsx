import Head from 'next/head'
import { useEffect } from 'react';
import Banner from '../components/Banner'
import Header from '../components/Header'
import Modal from '../components/Modal'
import { useRecoilState, useRecoilValue } from 'recoil'
import Row from '../components/Row'
import { useAuth } from '../contexts/GlobalMovies';
import { Categories, category, modalState, movieList, movieState, selectedCat } from '../atoms/modalAtom.'
import { RotatingLines } from 'react-loader-spinner';

const Home = () => {
  const { movies, setMovies } = useAuth();
  const showModal = useRecoilValue(modalState);
  const [list, setList] = useRecoilState(movieList)
  const [Category, setCategory] = useRecoilState(category)
  const [selectedcat, setselectedCat] = useRecoilState(selectedCat);
  const [categories, setCategories] = useRecoilState(Categories);



  useEffect(() => {
    if (movies.length == 0)
      setMovies();
    else
    {
      {
        let arr : string[] = [];
        movies.map((result) => {
          if (!arr.includes(result.category))
            arr.push(result.category);
        })
        setCategory(arr);
      }

      {
        if (selectedcat.length == 0) {
          let obj = {}
          for (const k of movies) {
            if (k.category in obj)
              obj[k.category].push(k);
            else
            {
              obj[k.category] = [];
              obj[k.category].push(k);
            }
          }
          setCategories(obj);
        }
        else {
          let obj = {}
          for (const k of movies) {
            if (selectedcat.includes(k.category)) {
              if (k.category in obj)
                obj[k.category].push(k);
              else
              {
                obj[k.category] = [];
                obj[k.category].push(k);
              }
            }
          }
          setCategories(obj);          
        }
      }
    }
  } , [movies, selectedcat])

  return (
    // ${
    //   showModal && '!h-screen overflow-hidden'
    // }
    <div
      className={`relative h-screen bg-gradient-to-b from-gray-900/10 to-[#010511] lg:h-[140vh] `}
    >
      <Head>
        <title>
          Home - C4T
        </title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      {
        movies.length == 0 ? 
        <div className="grid h-screen place-items-center">
          <RotatingLines
            strokeColor="red"
            strokeWidth="5"
            animationDuration="0.75"
            width="96"
            visible={true}
          />
        </div> : 
        <main className="relative pl-4 pb-24 lg:space-y-24 lg:pl-16 ">
        <Banner netflixOriginals={movies} />

        <section className="md:space-y-24">
          {list?.length > 0 && <Row title="My List" movies={list} />}
          {
            categories 
            
            &&

            Object.keys(categories).map(function(key, index) {
              return <Row title={key} movies={categories[key]} />
            })
          }
        </section>
      </main>
      }
      {showModal && <Modal />}
    </div>
  )
}

export default Home

