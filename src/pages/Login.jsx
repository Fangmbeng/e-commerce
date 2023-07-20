import React from 'react';
import { useNavigate } from 'react-router-dom';
import video4 from '../shopping video/video4.mp4'



export default function Login(props) {

    const navigate = useNavigate();

    const handleSubmit = async event => {
        event.preventDefault();
        // Get the data from the form
        let username = event.target.username.value;
        let password = event.target.password.value;
        let stringToEncode = `${username}:${password}`


        let myHeaders = new Headers();
        myHeaders.append('Authorization', `Basic ${btoa(stringToEncode)}`);
        myHeaders.append('Access-Control-Allow-Origin', '*');

        let response = await fetch("https://shopping-site-6amv.onrender.com/api/token", {
            headers: myHeaders
        })

        if (response.ok){
            let data = await response.json();
            // Get the token and token expiration from the response
            let token = data.token;
            let expiration = data.token_expiration;

            // Store the value in local storage on the browser
            localStorage.setItem('token', token);
            localStorage.setItem('tokenExp', expiration);
            props.logUserIn();
            navigate('/rooms')
            let message ='😎 You have successfully logged in'
            props.flashMessage(message, 'success')
        } else {
            let message ='😞 Your username and/or password are incorrect'
            localStorage.removeItem('username')
            props.flashMessage(message, 'warning')
        }
    }

    return (
        <>
            <div className="main">
                <div className='overlay1'></div>
                <video src={video4} autoPlay loop muted/>
                <div className="content">
                    <h3 className="text-center text-white">Login</h3>
                    <form action="" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <input type="text" className="form-control my-3" placeholder='Enter Username' name='username' />
                            <input type="password" className="form-control my-3" placeholder='Enter Password' name='password' />
                            <a href="/sign_up"  className='text-white'>forgot password ?</a>
                            <br />
                            <input type="submit" value="Log In" className="btn btn-success" />
                            <br />
                            <a href="/sign_up" className='text-white'>Click here if you are new</a>
                        </div>
                        <button className='btn btn-primary mt-3' onClick={props.handleClick}>Sign In with Google</button>
                    </form>
                </div>     
            </div>
        </>
    )
}
