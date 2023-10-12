import dayjs from 'dayjs';

export const formatDateTime = (timestamp) => {
  const dateTime = dayjs.unix(timestamp / 1000);
  return dateTime.format('HH:mm:A | MMM DD, YYYY');
};

export const sortUser = (users) => {
  return Object.values(users)
    .map(({ id, name, avatarURL, answers, questions }) => ({
      id,
      name,
      avatarURL,
      numOfAnswered: Object.keys(answers).length,
      numOfQuestions: questions.length,
    }))
    .sort(
      (a, b) =>
        b.numOfAnswered +
          b.numOfQuestions -
          (a.numOfAnswered + a.numOfQuestions) ||
        b.numOfAnswered - a.numOfAnswered ||
        b.numOfQuestions - a.numOfQuestions
    );
};
