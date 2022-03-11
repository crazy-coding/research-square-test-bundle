import React, { useContext } from 'react';
import { Divider, Image, Text } from '@chakra-ui/react'
import { Flex, Spacer } from '@chakra-ui/react'
import { Button } from '@chakra-ui/react'
import { Stack } from '@chakra-ui/react'
import { Link } from "react-router-dom"
import Logo from './../logo.svg'
import { AppContext, initialState } from '../App'

export default function Header({ onUpdateAuth }: any) {
  const state = useContext(AppContext)

  const onLogin = (role: string) => {
    const auth = {
      user: role,
      isLoggedin: true,
      isAdmin: role === 'Admin'
    }
    onUpdateAuth(auth)
  }

  const onLogout = () => {
    onUpdateAuth(initialState)
  }

  return (
    <>
      <Flex padding={5} alignItems="center">
        <Link to="/">
          <Flex alignItems="center">
            <Image src={Logo} height={10} />
            <Text fontSize='lg' fontWeight="bold">Home</Text>
          </Flex>
        </Link>
        <Spacer />
        {!state.isLoggedin && (
          <Stack direction='row' spacing={4} align='center'>
            <Button colorScheme='teal' variant='outline' onClick={() => onLogin('Admin')}>Login As Admin</Button>
            <Button colorScheme='teal' variant='outline' onClick={() => onLogin('User')}>Login As User</Button>
          </Stack>
        )}
        {state.isLoggedin && (
          <Stack direction='row' spacing={4} align='center'>
            <Text fontSize='lg'>Logged in <b>{state.user}</b></Text>
            <Button colorScheme='teal' variant='outline' onClick={() => onLogout()}>Logout</Button>
          </Stack>
        )}
      </Flex>
      <Divider />
    </>
  )
}
