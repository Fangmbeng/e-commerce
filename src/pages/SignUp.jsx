import React, { Component } from 'react';
import { Navigate } from 'react-router-dom';
import video2 from '../shopping video/video2.mp4'

export default class SignUp extends Component {
    constructor(props){
        super(props);
        this.state = {
            redirect: false
        }
    }

    handleRegister = event => {
        event.preventDefault();
        // console.log(event);
        let password = event.target.password.value;
        let confirmPass = event.target.confirmPass.value;
        if (password !== confirmPass){
            let message = 'Passwords do not match'
            this.props.flashMessage(message, 'warning')
        } else {

            // Set up the request
            let myHeaders = new Headers();
            myHeaders.append('Content-Type', 'application/json');
            myHeaders.append('Access-Control-Allow-Origin', '*');

            let formData = JSON.stringify({
                username: event.target.username.value,
                email: event.target.email.value,
                password
            })

            fetch("https://shopping-site-6amv.onrender.com/api/users", {
                method: 'POST',
                headers: myHeaders,
                body: formData
            })
                .then(res => res.json())
                .then(data => {
                    if (data.error){
                        let message = '😞Error, Please try again'
                        this.props.flashMessage(message, 'warning')
                    } else {
                        this.setState({
                            redirect: true
                        })
                        
                    }
                })
        }

    }


    render() {
        return (
            <> 
            <div className="main">
            <div className='overlay'></div>
            <video src={video2} autoPlay loop muted/>
            <div className="content">
                {this.state.redirect ? <Navigate to='/' /> :
                <>
                    <h3 className="text-center">Sign Up</h3>
                    <form action="" onSubmit={this.handleRegister}>
                        <div className="form-group">
                            <input type="text" className="form-control my-3" placeholder='Enter Email' name='email' />
                            <input type="text" className="form-control my-3" placeholder='Enter Username' name='username' />
                            <input type="password" className="form-control my-3" placeholder='Enter Password' name='password' />
                            <input type="password" className="form-control my-3" placeholder='Confirm Password' name='confirmPass' />

                            <input type="submit" value="Register" className="btn btn-success w-100" />
                        </div>
                    </form>
                </>
                }
                </div>     
                </div>
            </>
        )
    }
}