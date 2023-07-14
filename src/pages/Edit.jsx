import React from 'react'
import { useNavigate } from 'react-router-dom';
import video6 from '../shopping video/video6.mp4'
import ToastInfo from '../components/ToastInfo';
import Warning from '../components/Toastify';

export default function Edit(props) {
    const navigate = useNavigate();
    
    const handleBrand = async event => {
        event.preventDefault();
        console.log(event);

        // Get the data from the form
        let brand = event.target.brand.value;
        let name = event.target.name.value;
        let size = event.target.size.value;
        let price = event.target.price.value;

        let id = localStorage.getItem('id')

        // Set up the request headers
        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json')
        myHeaders.append('Access-Control-Allow-Origin', '*');

        console.log(typeof id)
        
        let requestBody = JSON.stringify({brand, name, size, price})

        // Make the fetch request
        let response = await fetch(`https://shopping-site-6amv.onrender.com/api/post/edit/${id}`, {
            method: 'POST',
            headers: myHeaders,
            body: requestBody
        })

        if (response.ok){
            //let data = await response.json();
            let message = `👌Your article has been edited`
            navigate('/rooms')
            return <ToastInfo message={message}/>

        } else {
            let message = "👎There was an issue, please try again"
            return <Warning message={message}/>

        }
    }


    return (
        <>
        <div className="main">
        <div className='overlay'></div>
        <video src={video6} autoPlay loop muted/>
        <div className="content">
        <form action="" onSubmit={handleBrand}>
            <div className="form-group">
                <h1 className='text-white text-center'><strong>Edit item for sale</strong></h1>
                <input type="text" className="form-control my-3" placeholder='Enter brand' name='brand' />
                <input type="text" className="form-control my-3" placeholder='Enter name' name='name' />
                <input type="text" className="form-control my-3" placeholder='Enter size' name='size' />
                <input type="text" className="form-control my-3" placeholder='Enter price' name='price' />

                <input type="submit" value="Edit Product" className="btn btn-success w-100" />
            </div>
        </form>
        </div>
        </div>
        </>
        )
    }
