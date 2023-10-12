import { useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { handleSaveQuestion } from './questionSlice';

export const useQuestion = () => {
  const option1Ref = useRef();
  const option2Ref = useRef();
  const { questionList, loading } = useSelector((state) => state.questions);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.auth);

  const questionFilteredByStatus = useMemo(() => {
    const answered = [];
    const unAnswered = [];

    Object.values(questionList).forEach((question) => {
      if (
        question.optionOne.votes.includes(userInfo.id) ||
        question.optionTwo.votes.includes(userInfo.id)
      ) {
        answered.push(question);
      } else {
        unAnswered.push(question);
      }
    });
    unAnswered.sort((a, b) => b.timestamp - a.timestamp);
    answered.sort((a, b) => b.timestamp - a.timestamp);
    return {
      answered,
      unAnswered,
    };
  }, [questionList, userInfo.id]);

  const handleCreatePoll = (question) => {
    if (!option1Ref.current.value.length || !option2Ref.current.value.length) {
      return;
    }

    dispatch(handleSaveQuestion(question));
    option1Ref.current.value = '';
    option2Ref.current.value = '';
    navigate('/questions');
  };

  return {
    loading,
    questionFilteredByStatus,
    handleCreatePoll,
    option1Ref,
    option2Ref,
    userInfo,
  };
};
