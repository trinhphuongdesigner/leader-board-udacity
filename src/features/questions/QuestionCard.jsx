import React from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Card,
  CardBody,
  Divider,
  Heading,
  Stack,
  Text,
} from '@chakra-ui/react';
import { formatDateTime } from '@/helper';

const QuestionCard = ({ question }) => {
  return (
    <Card padding="0 40px">
      <CardBody>
        <Stack>
          <Heading size="md">{question.authedUser}</Heading>
          <Text as="i" fontSize="sm">
            {formatDateTime(question.timestamp)}
          </Text>
          <Divider />
          <Link to={`/questions/${question.id}`}>
            <Button colorScheme="teal" variant="outline">
              show
            </Button>
          </Link>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default QuestionCard;
