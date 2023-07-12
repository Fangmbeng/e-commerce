import React from 'react'
import './SearchResults.css'

export default function SearchResults({result, key}) {

    function handleSelect(e){}

  return (
    <div className='search-result' onClick={(e)=>handleSelect}>{result.name}</div>
  )
}
