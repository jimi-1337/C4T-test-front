import Image from 'next/legacy/image'
import { BellIcon, SearchIcon } from '@heroicons/react/solid'
// import useAuth from '../hooks/useAuth'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import BasicMenu from './BasicMenu'
import { useRecoilState } from 'recoil'
import { category, movieState, selectedCat } from '../atoms/modalAtom.'
import { useForm } from 'react-hook-form'
import { useAuth } from '../contexts/GlobalMovies'
import Search from './Search'
import DropDown from './dropDown'

function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [dropDown, setdropDown] = useState(false);
  const [Category, setCategory] = useRecoilState(category)
  const [selectedcat, setselectedCat] = useRecoilState(selectedCat)
  const refTwo = useRef(null);


  const SDropDown = () => {
    setdropDown(!dropDown);
  }

  const onChangeHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedOptions = event.currentTarget.selectedOptions;

    const newColors = [];
    for (let i = 0; i < selectedOptions.length; i++) {
      newColors.push(selectedOptions[i].value);
    }
    setselectedCat(newColors);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header className={`${isScrolled && 'bg-[#141414]'}`}>
      <div className="flex items-center space-x-2 md:space-x-10">
        <div
          className="cursor-pointer object-contain text-2xl text-red-700"
        ><span>C</span><span className='text-white'>4</span><span>T</span></div>

        <BasicMenu />

        <ul className="hidden space-x-4 md:flex">
          <li className="headerLink cursor-default font-semibold text-white hover:text-white">
            Home
          </li>
          <li className="headerLink">TV Shows</li>
          <li className="headerLink">Movies</li>
          <li className="headerLink">New & Popular</li>
          <li className="headerLink">My List</li>
        </ul>
      </div>
      <div className="flex items-center space-x-4 text-sm font-light">



      <section>
          <div className="flex">
              <DropDown />
              {/* <>
                  <button onClick={SDropDown} id="dropdown-button" className="flex-shrink-0 z-10 inline-flex items-center py-2.5 px-4 text-sm font-medium text-center text-gray-900 bg-transparent border border-gray-300 rounded-l-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-700 dark:bg-transparent dark:hover:bg-red-700 dark:focus:ring-red-700 dark:text-white dark:border-gray-700 focus:bg-red-700 hover:bg-red-700" type="button">All categories <svg aria-hidden="true" className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"></path></svg></button>
                  {
                    dropDown

                    &&

                    <>
                      <div  id="dropdown"  className="z-10 bg-white divide-y divide-gray-100 rounded shadow w-38 dark:bg-transparent bg-transparent" style={{position: "absolute", margin: "2.5rem 0px 0px 0px"}}>
                        <select multiple onChange={onChangeHandler} className="py-1 text-sm text-gray-700 dark:text-gray-200 bg-transparent w-38">
                          {
                            Category.map((result, index) => {
                                return (
                                    <option key={index} value={result} className="w-full px-4 py-2 dark:hover:bg-red-500 dark:hover:text-white bg-transparent">{result}</option>
                                )
                            })
                          }
                        </select>
                      </div>
                    </>
                  }
              </> */}
              <Search />
          </div>
      </section>



        <p className="hidden lg:inline">Kids</p>
        <BellIcon className="h-6 w-6" />
        <Link href="/account">
          <img
            src="https://rb.gy/g1pwyx"
            alt=""
            className="cursor-pointer rounded"
          />
        </Link>
      </div>
    </header>
  )
}

export default Header
