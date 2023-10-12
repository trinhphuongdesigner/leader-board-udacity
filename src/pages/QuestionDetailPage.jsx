import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { Avatar, Flex, Heading, Spinner, Stack } from '@chakra-ui/react';
import QuestionDetail from '../features/questions/QuestionDetail';

const QuestionDetailPage = () => {
  const navigate = useNavigate();

  const { questionList, loading } = useSelector((state) => state.questions);
  const { userInfo } = useSelector((state) => state.auth);

  const params = useParams();

  const question = Object.values(questionList).find(
    (item) => params.question_id === item.id
  );

  useEffect(() => {
    if (Object.values(questionList).length && !question) {
      navigate('/404');
    }
  }, [question, navigate, questionList]);

  return !question ? (
    <Spinner />
  ) : (
    <Stack width="60%" align="center" gap="8">
      <Heading size="lg">{`Poll by ${question.authedUser}`}</Heading>
      <Avatar size="2xl" src={userInfo.avatarURL} />
      <Heading size="lg">Would You Rather</Heading>
      <Flex justifyContent="space-around" width="100%" align="center">
        {loading ? (
          <Spinner />
        ) : (
          <>
            <QuestionDetail option="optionOne" />
            <Heading size="md">OR</Heading>
            <QuestionDetail option="optionTwo" />
          </>
        )}
      </Flex>
    </Stack>
  );
};

export default QuestionDetailPage;
