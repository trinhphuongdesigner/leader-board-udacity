import React from 'react';
import {
  Card,
  CardBody,
  CardHeader,
  Divider,
  Heading,
  SimpleGrid,
  Text,
} from '@chakra-ui/react';
import QuestionCard from './QuestionCard';

const QuestionShow = ({ status, questions }) => {
  return (
    <Card>
      <CardHeader>
        <Heading size="lg">{status}</Heading>
      </CardHeader>
      <Divider />
      <CardBody>
        {questions ? (
          <SimpleGrid columns={[1, 2, 3]} spacing={5}>
            {questions.map((question) => (
              <QuestionCard key={question.id} question={question} />
            ))}
          </SimpleGrid>
        ) : (
          <Text as="i" textColor="gray">
            No questions
          </Text>
        )}
      </CardBody>
    </Card>
  );
};

export default QuestionShow;
