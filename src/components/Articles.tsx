import React, { useContext, useEffect, useState } from 'react';
import { Box, Button, Flex, Heading, Stack, Text } from '@chakra-ui/react';
import { AppContext } from '../App';
import { Link } from 'react-router-dom';

export interface Aritcle {
  abstract: string
  active: boolean
  article: string
  authors: string
  id: number
  title: string
}

function Article({ id, title, authors, article, active, onAgree, onDelete, manage, ...rest }: Aritcle & { onAgree: any, onDelete: any, manage: boolean }) {
  const auth = useContext(AppContext);

  return (
    <Box p={5} shadow='md' borderWidth='1px'>
      <Flex>
        <Box width="100%">
          <Heading fontSize='xl'>{title}</Heading>
          <Text>{authors}</Text>
          <Text mt={4}>{article}</Text>
        </Box>
        {manage && (
        <Box ml={4}>
          {(auth.isLoggedin && !auth.isAdmin) && (
            <>
              <Link to={`/edit/${id}`}><Button colorScheme="blue">Edit</Button></Link>
              <Button colorScheme="red" onClick={() => onDelete(id)}>Delete</Button>
            </>
          )}
          {auth.isAdmin && (!active ? (<Button colorScheme="red" onClick={() => onAgree(id, active)}>Agree</Button>) : (<Button colorScheme="green" onClick={() => onAgree(id, active)}>Disagree</Button>))}
        </Box>
        )}
      </Flex>
    </Box>
  )
}

export default function Articles({ manage = false }) {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetchArticles();
  }, [])
  
  const onAgree = async (id: number, active: boolean) => {
    await fetch(`http://localhost:3001/api/agree/${id}`, {
      method: 'PATCH', 
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }, 
      body: JSON.stringify({ active: !active }) })
    fetchArticles();
  }
  
  const onDelete = async (id: number, active: boolean) => {
    await fetch(`http://localhost:3001/api/articles/${id}`, {
      method: 'DELETE', 
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    fetchArticles();
  }

  const fetchArticles = async () => {
    const resp = await fetch(`http://localhost:3001/api/${manage ? 'articles' : 'search'}`, {
      headers: {
        'Accept': 'application/json'
      }
    });
    const { data } = await resp.json();
    setArticles(data);
  }

  return (
    <Stack spacing={4}>
      {articles.map((article: Aritcle) => (
        <Article key={article.id} {...article} manage={manage} onAgree={onAgree} onDelete={onDelete} />
      ))}
    </Stack>
  );
}