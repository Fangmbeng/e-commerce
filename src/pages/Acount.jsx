import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import AlertDialogExample2 from '../components/DeleteCustomer2'
import BackgroundSlider from '../components/Background_slider1'
import ToastInfo from '../components/ToastInfo';
import Warning from '../components/Toastify';


function Acount(props) {
    const navigate = useNavigate();

    const handleEdit = async event => {
        event.preventDefault();
        console.log(event);

        // Get the data from the form
        let new_username = event.target.username.value;
        let email = event.target.email.value;
        let password = event.target.password.value;
        let confir_password = event.target.confirmPassword.value;
        if(password===confir_password){


        let token = localStorage.getItem('token');
        let id = localStorage.getItem('id')

        // Set up the request headers
        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json')
        myHeaders.append('Authorization', `Bearer ${token}`)
        //myHeaders.append('Access-Control-Allow-Origin', '*');

        console.log(typeof id)
        
        let requestBody = JSON.stringify({new_username, email, password})

        // Make the fetch request
        let response = await fetch(`https://shopping-site-6amv.onrender.com/api/user/edit/${id}`, {
            method: 'POST',
            headers: myHeaders,
            body: requestBody
        })

        if (response.ok){
            let message =`Your profile has been edited`
            return <ToastInfo message={message}/>
        } else {
            let message = "There was an issue, please try again"
            return <Warning message={message}/>
        }
    }
  }

    async function handleDelete(){
      let id = localStorage.getItem('id')
      console.log(typeof id)
  
      // Get the token from localStorage
      let token = localStorage.getItem('token');
  
      let myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json')
      myHeaders.append('Authorization', `Bearer ${token}`);
      myHeaders.append('Access-Control-Allow-Origin', '*')
      // Make the fetch request
      let response = await fetch(`https://shopping-site-6amv.onrender.com/api/user/delete/${id}`, {
          method: 'POST',
          headers: myHeaders,
      })
  
      if(response.ok){
        props.logUserOut()
        navigate('/login')
        let message = 'Account has been deleted'
        return <ToastInfo message={message}/>
        }
    }
  return (
    <>
    <div className="main">
        <div className='overlay1'></div>
            <BackgroundSlider />
        <div className="content3">
        <form action="" onSubmit={handleEdit}>
          <div className="form-group">
            <h1 className='text-white'><strong>Modify Account</strong></h1>
              <input type="text" className="form-control my-3" placeholder='Enter Username' name='username' />
              <input type="password" className="form-control my-3" placeholder='Enter email' name='email' />
              <input type="text" className="form-control my-3" placeholder='Enter password' name='password' />
              <input type="text" className="form-control my-3" placeholder='Re-Enter password' name='confirmPassword' />
              <input type="submit" value="save" className="btn btn-success m-auto" />
              <Link to='/' className='btn btn-info mr-auto ml-auto'>
                  Cancel
              </Link>
              <AlertDialogExample2 handleDelete={handleDelete} />
          </div>
      </form>
      </div>
    </div>
    </>
  )
}

export default Acount