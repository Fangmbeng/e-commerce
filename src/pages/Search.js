import React, {useState} from 'react'
import SearchBar from '../components/SearchBar'
import SearchBarList from '../components/SearchBarList'
import video5 from '../shopping video/video5.mp4'

export default function Search() {
  const[results, setResults]=useState([])
  return (
    <div className="main">
    <div className='overlay1'></div>
    <video src={video5} autoPlay loop muted/>
    <div className="content">
      <SearchBar setResults={setResults}/>
      <SearchBarList results={results}/>
    </div>
    </div>
  )
}