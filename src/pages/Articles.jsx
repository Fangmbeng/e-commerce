import React, {useState, useEffect} from 'react'
import PostCard from '../components/PostCard';

function Articles(props) {
    const [posts, setPosts] = useState([]);


    useEffect(() => {
         let myHeaders = new Headers();
         myHeaders.append('Content-Type', 'application/json')
         myHeaders.append('Access-Control-Allow-Origin', '*');
 
            fetch("https://shopping-site-6amv.onrender.com/api/posts", {
               method: 'GET',
               headers: myHeaders,
            })
               .then(res => res.json())
               .then(data => setPosts(data))
     },[])


     
  return (
    <div>
       {posts.map((post, idx) => <PostCard flashMessage={props.flashMessage} value={props.value} loggedIn={props.loggedIn} post={post} key={idx}/>)}
    </div>
  )
  }

export default Articles
