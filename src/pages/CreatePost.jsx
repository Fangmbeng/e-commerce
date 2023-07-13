import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import video7 from '../shopping video/video7.mp4'

export default function CreatePost(props) {

    const navigate = useNavigate();
    useEffect(() => {
        if (!(props.loggedIn || props.value)){
            props.flashMessage('You must be logged in to view this page', 'danger');
            navigate('/*/login');
        }
    })

    const handleSubmit = async event => {
        event.preventDefault();
        console.log(event);

        // Get the data from the form
        let brand = event.target.brand.value;
        let name = event.target.name.value;
        let size = event.target.size.value;
        let price = event.target.price.value

        // Get the token from localStorage
        let token = localStorage.getItem('token');

        // Set up the request headers
        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json')
        myHeaders.append('Authorization', `Bearer ${token}`);
        myHeaders.append('Access-Control-Allow-Origin', '*');

        // Set up the request body
        let requestBody = JSON.stringify({brand, name, size, price})

        // Make the fetch request
        let response = await fetch("https://shopping-site-6amv.onrender.com/api/posts", {
            method: 'POST',
            headers: myHeaders,
            body: requestBody,
        })


        if (response.ok){
            let data = await response.json();
            props.flashMessage(`${data.brand} has been created`, 'primary');
            navigate('/rooms')
            window.location.reload()
        } else {
            props.flashMessage("There was an issue, please try again", 'warning');
        }
    }

    return (
        <> 
        <div className="main">
        <div className='overlay'></div>
        <video src={video7} autoPlay loop muted/>
        <div className="content">
            <h3 className="text-center">Post item for sale</h3>
            <form action="" onSubmit={handleSubmit}>
                <div className="form-group">
                    <input type="text" className="form-control my-3" placeholder='Please add brand' name='brand'/>
                    <input type="text" className="form-control my-3" placeholder='Please add name' name='name'/>
                    <input type="text" className="form-control my-3" placeholder='Please add size if available' name='size'/>
                    <input type="text" className="form-control my-3" placeholder='Please add price' name='price'/>
                    <input type="submit" value="Post item" className="btn btn-success w-100" />
                </div>
            </form>
        </div>
        </div>
        </>
    )
}
