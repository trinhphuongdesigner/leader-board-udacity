import React from 'react';
import { Flex, Heading, Stack } from '@chakra-ui/react';

const NotFoundPage = () => {
  return (
    <Stack width="100%" height="100%">
      <Flex width="100%" height="100%" justify="center" align="center">
        <Heading color="red" size="4xl">
          404 - PAGE NOT FOUND
        </Heading>
      </Flex>
    </Stack>
  );
};

export default NotFoundPage;
