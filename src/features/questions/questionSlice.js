import { toast } from 'react-toastify';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import {
  getAllQuestionsApi,
  saveQuestionApi,
  saveQuestionAnswerApi,
} from '../../apis/questionAPI';

const initialState = {
  questionList: {},
  loading: false,
};

// THUNK ACTION

export const fetchQuestions = createAsyncThunk('questions/all', async () => {
  const response = await getAllQuestionsApi();
  return response;
});

export const handleSaveQuestion = createAsyncThunk(
  'questions/save',
  async (question) => {
    const response = await saveQuestionApi(question);
    return response;
  }
);

export const handleSaveQuestionAnswer = createAsyncThunk(
  'questions/saveAnswer',
  async ({ authedUser, qid, answer }) => {
    const response = await saveQuestionAnswerApi(authedUser, qid, answer);
    return response;
  }
);

export const questionSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(fetchQuestions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchQuestions.fulfilled, (state, action) => {
        state.loading = false;
        state.questionList = action.payload;
      })
      .addCase(fetchQuestions.rejected, (state) => {
        toast.error('Get question list errors');
        state.loading = false;
      })
      .addCase(handleSaveQuestion.pending, (state) => {
        state.loading = true;
      })
      .addCase(handleSaveQuestion.fulfilled, (state, action) => {
        state.loading = false;

        state.questionList[action.payload.id] = action.payload;
      })
      .addCase(handleSaveQuestion.rejected, (state) => {
        toast.error('Get question list errors');
        state.loading = false;
      })
      .addCase(handleSaveQuestionAnswer.pending, (state) => {
        state.loading = true;
      })
      .addCase(handleSaveQuestionAnswer.fulfilled, (state, action) => {
        state.loading = false;
        const { authedUser, qid, answer } = action.meta.arg;
        const question = state.questionList[qid];

        state.questionList = {
          ...state.questionList,
          [qid]: {
            ...question,
            [answer]: {
              ...question[answer],
              votes: [...question[answer].votes, authedUser],
            },
          },
        };
      });
  },
});

export const questionReducer = questionSlice.reducer;
