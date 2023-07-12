import React, {useState} from 'react'
import { AiOutlineSearch } from 'react-icons/ai'

export default function SearchBar({setResults}) {
  const[input, setInput]= useState('')

  const fetchData=(value)=>{

    let token = localStorage.getItem('token')
    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json')
    myHeaders.append('Authorization', `Bearer ${token}`);
    
    fetch("https://shopping-site-6amv.onrender.com/api/posts",{
        method: 'GET',
        headers: myHeaders,
    })
      .then((response)=>response.json())
      .then((json)=>{
        const results = json.filter((post)=>{
          return value && post && post.id && post.name && post.name.toLowerCase().includes(value)
        });
        setResults(results)
      })
  }

  const handleSearch=(value)=>{
    fetchData(value)
    setInput(value)
  }
  
  
  return (
    <div className='input-wrapper align-items-center'>
    <h3 className='text-white text-center'>Search <AiOutlineSearch id='search-icon'/></h3>
      <form className='container' style={{display:'inline'}}>
        <input className='form-control' placeholder='Type name of article here ex Pants'
        value={input} 
        onChange={(e)=>handleSearch(e.target.value)}/>
        <button className='btn btn-success'>Search </button>
      </form>
    </div>
  )
}