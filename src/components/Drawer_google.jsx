import React from 'react'
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react'
import { Button, Wrap, WrapItem } from '@chakra-ui/react'
import { useDisclosure } from '@chakra-ui/react'
import { Avatar, FormControl, FormLabel, Switch } from '@chakra-ui/react'
import { Link } from 'react-router-dom'
import { AiOutlineMenu } from "react-icons/ai"
import AlertDialogExample from "./DeleteCustomer"

export default function DrawerGoogle(props) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = React.useRef()
  let email = localStorage.getItem("email")
  let avatar = localStorage.getItem('avatar')

  return (
    <div>
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
              <Avatar name={email} src={avatar} />
            </WrapItem>
          </Wrap>
            <Link to='/picture'>Edit avatar here</Link>
            <p>Welcome</p>
            <h4 className='text center'>{email}</h4>
          <DrawerBody>
            <FormControl display='flex' alignItems='center'>
              <FormLabel htmlFor='email-alerts' mb='0'>
                Theme Color
              </FormLabel>
              <Switch id='email-alerts' />
            </FormControl>
          </DrawerBody>

          <DrawerFooter>
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <AlertDialogExample deleteGoggle={props.deleteGoggle}/>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </div>
  )
}
