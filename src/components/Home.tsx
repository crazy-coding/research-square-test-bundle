import { Box, Flex, Spacer, Link as CLink } from '@chakra-ui/react';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AppContext } from '../App';
import Articles from './Articles';

export default function Home() {
  const auth = useContext(AppContext);

  return (
    <Box p={4}>
      <Flex mb={4}>
        <Spacer />
        {auth.isAdmin && <Link to="/admin"><CLink>go to Admin page</CLink></Link>}
        {(auth.isLoggedin && !auth.isAdmin) && <Link to="/articles"><CLink>go to User page</CLink></Link>}
      </Flex>
      <Articles />
    </Box>
  );
}