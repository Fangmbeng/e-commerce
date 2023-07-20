import React, { useState } from 'react'
import './SearchResults.css'


export default function SearchResults({result, key}) {

    function handleSelect(e){
      e.preventDefault()
    }

  return (
    <div className='search-result' onClick={(e)=>handleSelect}>{result.name}
    </div>
  )
}
