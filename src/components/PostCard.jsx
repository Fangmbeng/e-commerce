import React from 'react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import ToastInfo from '../components/ToastInfo';
import Warning from '../components/Toastify';
import DeleteItem from './DeleteItem';

export default function PostCard(props) {
  const navigate = useNavigate();

  async function handleDelete(event){
      let id = event.id
      let brand = event.brand
      let name=event.name
      let size = event.size
      let price = event.price
  
      // Get the token from localStorage
      let token = localStorage.getItem('token');
  
      let myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json')
      myHeaders.append('Authorization', `Bearer ${token}`);
      myHeaders.append('Access-Control-Allow-Origin', '*')
      // Make the fetch request
      let requestBody = JSON.stringify({brand, name, size, price, id})
      let response = await fetch(`https://shopping-site-6amv.onrender.com/api/post/delete/${id}`, {
          method: 'POST',
          headers: myHeaders,
          body:requestBody,
      })
  
      if(response.ok){
        window.location.reload()
        let message = 'Your item has been deleted'
          return <ToastInfo message={message}/>
        }else{
          let message = "Try Again"
          return <Warning message={message}/>
        }
    }

    async function handleCart(event){
      let name = event.name
      let size = event.size
      let price = event.price
      let brand = event.brand
  
      // Get the token from localStorage
      let requestBody = JSON.stringify({brand, price, size, name});

      let myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json')
      myHeaders.append('Access-Control-Allow-Origin', '*')
      // Make the fetch request
      let response = await fetch(`https://shopping-site-6amv.onrender.com/api/chart/create`, {
          method: 'POST',
          headers: myHeaders,
          body:requestBody
      })
  
      if(response.ok){
        let message=`${brand} ${name} has been added to your cart`
        return <ToastInfo message={message}/>
        }
    }

    function handleEdit(){
      navigate("/edit");
      localStorage.setItem("id", props.post.id)
  }

  return (
    <div className="card mt-5 shadow p-3 mb-5 bg-body-tertiary opacity-75 rounded" style={{width: "40rem"}}>
    <img src="" className="card-img-top" alt="..."/>
    <div className="card-body">
        <h5 className="card-title">name: {props.post.name}</h5>
        <p>Brand: {props.post.brand}</p>
        <p>size: {props.post.size}</p>
        <p>price: {props.post.price}</p>
        <p className="card-text">date posted: {props.post.date_created}</p>
        <button className='btn btn-primary' onClick={()=>handleCart(props.post)}>Add to card</button>
          {props.loggedIn || props.value?(
                <>
                <button className='btn btn-success mr-3' onClick={handleEdit}>Edit Post</button>
                <DeleteItem handleDelete={handleDelete} post={props.post}/>
                </>
            ) : (
                <>
                <Link className='btn btn-success mr-3' to='/login'>Login to Edit Post </Link>
                </>
            )}
    </div>
    </div>
  )
}