import { Box, Button, Flex, Spacer } from '@chakra-ui/react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Articles from './Articles';

export default function User() {
  return (
    <Box p={4}>
      <Flex mb={4}>
        <Spacer />
        <Link to="/edit">
          <Button colorScheme="blue">
            Create New
          </Button>
        </Link>
      </Flex>
      <Articles manage={true} />
    </Box>
  );
}