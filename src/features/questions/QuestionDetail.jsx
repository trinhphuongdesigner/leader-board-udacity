import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { CheckCircleIcon } from '@chakra-ui/icons';
import {
  Button,
  Card,
  CardBody,
  Flex,
  Progress,
  ProgressLabel,
  Stack,
  Text,
} from '@chakra-ui/react';
import { handleSaveQuestionAnswer } from '@/features/questions/questionSlice';

const QuestionDetail = ({ option }) => {
  const { questionList } = useSelector((state) => state.questions);
  const { question_id: questionId } = useParams();
  const { userInfo } = useSelector((state) => state.auth);
  const { userList } = useSelector((state) => state.users);
  const dispatch = useDispatch();

  const currentQuestion = useMemo(() => {
    return questionList[questionId];
  }, [questionId, questionList]);

  const questionAnswer = useMemo(() => {
    if (!currentQuestion) {
      return undefined;
    }
    const currentUser =
      userList && userInfo.id ? userList[userInfo.id] : undefined;

    const answer = currentUser.answers[questionId];

    if (!answer) {
      return undefined;
    }
    const numOfOptionOne = currentQuestion.optionOne.votes.length;
    const numOfOptionTwo = currentQuestion.optionTwo.votes.length;
    const totalVotes = numOfOptionOne + numOfOptionTwo;

    return {
      answer,
      percent: {
        optionOne: ((numOfOptionOne / totalVotes) * 100).toFixed(2),
        optionTwo: ((numOfOptionTwo / totalVotes) * 100).toFixed(2),
      },
      options: {
        optionOne: numOfOptionOne,
        optionTwo: numOfOptionTwo,
      },
      total: totalVotes,
    };
  }, [currentQuestion, questionId, userInfo.id, userList]);

  return (
    <Card align="center" width="40%">
      <CardBody width="80%">
        <Stack gap={4}>
          {currentQuestion && <Text>{currentQuestion[option].text}</Text>}
          {questionAnswer ? (
            <Stack gap={2}>
              <Progress
                value={questionAnswer.percent[option]}
                height="32px"
                colorScheme="teal"
              >
                <ProgressLabel fontSize="1rem">{`${questionAnswer.percent[option]}%`}</ProgressLabel>
              </Progress>
              <Flex justifyContent="space-between">
                <Text textColor="tomato">{`${questionAnswer.options[option]} out of ${questionAnswer.total} votes`}</Text>
                {questionAnswer.answer === option && (
                  <Text textColor="teal">
                    Your vote <CheckCircleIcon />
                  </Text>
                )}
              </Flex>
            </Stack>
          ) : (
            <Button
              colorScheme="teal"
              onClick={() => {
                dispatch(
                  handleSaveQuestionAnswer({
                    authedUser: userInfo.id,
                    qid: questionId,
                    answer: option,
                  })
                );
              }}
            >
              Click
            </Button>
          )}
        </Stack>
      </CardBody>
    </Card>
  );
};

export default QuestionDetail;
