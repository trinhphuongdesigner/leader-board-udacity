import React from 'react';

import {
  Button,
  Card,
  CardBody,
  Flex,
  Heading,
  Input,
  Stack,
} from '@chakra-ui/react';
import { useQuestion } from './useQuestion';

const NewQuestionForm = () => {
  const { option1Ref, option2Ref, handleCreatePoll, userInfo } = useQuestion();

  return (
    <Stack width="60%" align="center" height="100%" justify="center" gap="8">
      <Heading size="lg">Would You Rather</Heading>
      <Flex justifyContent="space-around" width="100%" align="center">
        <Card align="center" width="40%">
          <CardBody width="100%">
            <Input ref={option1Ref} placeholder="Option 1" />
          </CardBody>
        </Card>
        <Heading size="md">OR</Heading>
        <Card align="center" width="40%">
          <CardBody width="100%">
            <Input ref={option2Ref} placeholder="Option 2" />
          </CardBody>
        </Card>
      </Flex>
      <Button
        colorScheme="teal"
        onClick={() => {
          handleCreatePoll({
            authedUser: userInfo.id,
            optionOneText: option1Ref.current.value,
            optionTwoText: option2Ref.current.value,
          });
        }}
      >
        Create poll
      </Button>
    </Stack>
  );
};

export default NewQuestionForm;
