import {
  _getQuestions,
  _saveQuestion,
  _saveQuestionAnswer,
} from '@/helper/fakeData';

export async function getAllQuestionsApi() {
  const questions = await _getQuestions();
  return questions;
}

export function saveQuestionApi(question) {
  return _saveQuestion(question);
}

export function saveQuestionAnswerApi(authedUser, qid, answer) {
  return _saveQuestionAnswer({ authedUser, qid, answer });
}
