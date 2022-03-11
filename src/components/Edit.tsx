import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import { Textarea, Text, Input, Box, Stack, Button } from '@chakra-ui/react'
import { Aritcle } from './Articles';

export default function Edit() {
  const { id } = useParams();
  const [error, setError] = useState('');
  const [article, setAritcle] = useState<Aritcle>({
    abstract: '',
    active: false,
    article: '',
    authors: '',
    id: 0,
    title: '',
  });
  const navigate = useNavigate();

  useEffect(() => {
    if (id) fetchArticle();
  }, [])

  const fetchArticle = async () => {
    const resp = await fetch(`http://localhost:3001/api/articles/${id}`, {
      headers: {
        'Accept': 'application/json'
      }
    });
    const { data } = await resp.json();
    setAritcle(data);
  }

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const data = {
      title: e.target.title.value,
      authors: e.target.authors.value,
      abstract: e.target.abstract.value,
      article: e.target.article.value,
    }
    if (id) {
      updateArticle(data);
    } else {
      createArticle(data);
    }
  }

  const updateArticle = async (data: any) => {
    try {
      const resp = await fetch(`http://localhost:3001/api/articles/${id}`, {
        method: 'PATCH', 
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(data) })
      if (resp.ok) {
        navigate('/articles');
      } else {
        const data = await resp.json();
        setError(data.join(", "));
      }
    } catch (err: any) {
      setError(err.message);
    }
  }

  const createArticle = async (data: any) => {
    try {
      const resp = await fetch(`http://localhost:3001/api/articles`, {
        method: 'POST', 
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }, 
        body: JSON.stringify(data) })
      if (resp.ok) {
        navigate('/articles');
      } else {
        const data = await resp.json();
        setError(data.join(", "));
      }
    } catch (err: any) {
      setError(err.message);
    }
  }

  return (
    <Box p={4}>
      <form onSubmit={handleSubmit}>
        <Stack gap={4}>
          <Text color="red">{error}</Text>
          <Input placeholder='Title' defaultValue={article.title} name="title" />
          <Input placeholder='Authors' defaultValue={article.authors} name="authors" />
          <Input placeholder='Abstract' defaultValue={article.abstract} name="abstract" />
          <Textarea placeholder='Article' defaultValue={article.article} name="article" />
          <Button type='submit' colorScheme="blue">Submit</Button>
        </Stack>
      </form>
    </Box>
  );
}