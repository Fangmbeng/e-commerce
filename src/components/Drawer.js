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
import { Switch, FormControl, FormLabel } from '@chakra-ui/react'
import { AiOutlineMenu } from "react-icons/ai"

export default function DrawerExample() {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()
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
            .then(data =>{setUser(data[0])
                  localStorage.setItem('user', data[0])
                  localStorage.setItem('username', data[0].username)
                  localStorage.setItem('id', data[0].id)})
        },[])

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
          <DrawerHeader>Profile Settings</DrawerHeader>
          <div className='content2'>
          <Wrap>
            <WrapItem>
              <Avatar name={user.username}/>
            </WrapItem>
          </Wrap>
            <Link className='text-info' to='/account'>Edit Account here</Link>
            <p>Welcome</p>
            <h4 className='text center'>{user.username}</h4>
            </div>
          <DrawerBody>

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
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}