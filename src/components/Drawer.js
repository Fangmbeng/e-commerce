import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react'
import React, {useEffect, useState} from 'react'
import { Button, Wrap, WrapItem } from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import { Avatar } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom';
import { Switch, FormControl, FormLabel } from '@chakra-ui/react'
import { AiOutlineMenu } from "react-icons/ai"
import AlertDialogExample2 from './DeleteCustomer2'

export default function DrawerExample(props) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()
  const navigate = useNavigate();
  const[user, setUser]=useState("")
  
  useEffect(() => {
        let token = localStorage.getItem('token')
        let myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json')
        myHeaders.append('Authorization', `Bearer ${token}`);
        myHeaders.append('Access-Control-Allow-Origin', '*');

        fetch("https://shopping-site-6amv.onrender.com/api/users", {
            method: 'GET',
            headers: myHeaders,
        })
            .then(res => res.json())
            .then(data =>{setUser(data)
                  console.log(data)})
        },[])

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
            props.flashMessage(`Your profile has been edited`, 'primary')

        } else {
            props.flashMessage("There was an issue, please try again", 'warning');
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
        }
    }
  return (
    <>
      <AiOutlineMenu ref={btnRef} colorScheme='teal' onClick={onOpen}/>
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
        >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Modify your account</DrawerHeader>
          <Wrap>
            <WrapItem>
              <Avatar name={user.username}/>
            </WrapItem>
          </Wrap>
            <Link to='/picture'>Edit avatar here</Link>
            <p>Welcome</p>
            <h4 className='text center'>{user.username}</h4>
          <DrawerBody>
          <form action="" onSubmit={handleEdit}>
                <div className="form-group">
                    <input type="text" className="form-control my-3" placeholder='Enter Username' name='username' />
                    <input type="password" className="form-control my-3" placeholder='Enter email' name='email' />
                    <input type="text" className="form-control my-3" placeholder='Enter password' name='password' />
                    <input type="text" className="form-control my-3" placeholder='Confirm password' name='confirmPassword' />
                    <input type="submit" value="save" className="btn btn-success" />
                </div>
            </form>
            <FormControl display='flex' alignItems='center'>
              <FormLabel htmlFor='email-alerts' mb='0'>
                Change theme
              </FormLabel>
              <Switch id='email-alerts' />
            </FormControl>
          </DrawerBody>

          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
              <AlertDialogExample2 handleDelete={handleDelete}/>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}