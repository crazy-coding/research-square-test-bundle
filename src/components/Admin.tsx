import { Box } from '@chakra-ui/react';
import React, { useState } from 'react';
import Articles from './Articles';

export default function Admin() {
  return (
    <Box p={4}>
      <Articles manage={true} />
    </Box>
  );
}