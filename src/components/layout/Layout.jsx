import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Outlet } from 'react-router-dom';
import { Flex, Stack } from '@chakra-ui/react';

import { fetchQuestions } from '@/features/questions/questionSlice';

import Header from './Header';

const Layout = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchQuestions());
  }, [dispatch]);

  return (
    <Stack width="100%" height="100%">
      <Header />

      <Flex justify="center" width="100%" height="100%">
        <Outlet />
      </Flex>
    </Stack>
  );
};

export default Layout;
