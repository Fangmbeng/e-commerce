import React, { useState, useEffect } from 'react'
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  useDisclosure
} from '@chakra-ui/react'
import { AiFillShopping } from "react-icons/ai"
import { Link } from 'react-router-dom'


export default function Chart({setCount, flashMessage}) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()
  const[items, setItems]=useState([])

  
  useEffect(() => {
         let myHeaders = new Headers();
         myHeaders.append('Content-Type', 'application/json')
         myHeaders.append('Access-Control-Allow-Origin', '*');
            fetch("https://shopping-site-6amv.onrender.com/api/cart", {
               method: 'GET',
               headers: myHeaders,
            })
               .then(res => res.json())
               .then(data => {
                  setItems(data)
                  let count1=setItems.length
                  console.log(data)
                  setCount(count1)})

     },[])

     async function handleDeleteAll(){
  
      let myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json')
      myHeaders.append('Access-Control-Allow-Origin', '*')
      // Make the fetch request
      let response = await fetch(`https://shopping-site-6amv.onrender.com/api/chart/empty`, {
          method: 'POST',
          headers: myHeaders,
      })
      if(response.ok){
        }
    }

    async function handleDeleteItem(event){
      let id = event.id
      let brand = event.brand
      let name = event.name
      let size = event.size
      let price = event.price

    // Get the token from localStorage
    //let token = localStorage.getItem('token');

    let myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json')
    myHeaders.append('Access-Control-Allow-Origin', '*')
    let requestBody = JSON.stringify({brand, name, size, price, id})
    // Make the fetch request
    let response = await fetch(`https://shopping-site-6amv.onrender.com/api/chart/delete/${id}`, {
        method: 'POST',
        headers: myHeaders,
        body:requestBody

    })

    if(response.ok){
      window.location.reload()
      let message = 'item has been deleted'
      flashMessage(message, 'warning')
      }
    }


  return (
    <>
      <AiFillShopping ref={btnRef} colorScheme='teal' onClick={onOpen}/>
      <Drawer
        isOpen={isOpen}
        placement='right'
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>My Cart!!</DrawerHeader>

          <DrawerBody>
            <div>
            {items.map((item)=>{return<div>{item.brand} {item.name}:$ {item.price}<br/><button className='btn btn-danger' onClick={()=>handleDeleteItem(item)}>Delete Item</button></div>})}
            </div>
          </DrawerBody>
          <Link className='btn btn-dark opacity-75' to='/payments'><em>Proceed to payments</em></Link>

          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='blue' onClick={handleDeleteAll}>Empty Cart</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  )
}