import React from 'react'
import './SearchBarList.css'
import SearchResults from './SearchResults'

export default function SearchBarList({results}) {
  return (
    <div className='results-list'>
        {results.map((result, idx)=><SearchResults result={result} key={idx}/>)}
    </div>
  )
}
