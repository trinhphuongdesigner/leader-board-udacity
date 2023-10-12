import { toast } from 'react-toastify';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  handleSaveQuestion,
  handleSaveQuestionAnswer,
} from '../questions/questionSlice';
import { getAllUsers } from '../../apis/userApi';

const initialState = {
  userList: [],
  loading: false,
};

// THUNK ACTION

export const fetchAllUsers = createAsyncThunk('users/fetchAll', async () => {
  const response = await getAllUsers();
  return response;
});

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Add reducers for additional action types here, and handle loading state as needed
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.userList = action.payload;
      })
      .addCase(fetchAllUsers.rejected, (state) => {
        toast.error('Get user list errors');
        state.loading = false;
      })
      .addCase(handleSaveQuestionAnswer.pending, (state) => {
        state.loading = true;
      })
      .addCase(handleSaveQuestionAnswer.fulfilled, (state, action) => {
        state.loading = false;
        const { authedUser, qid, answer } = action.meta.arg;
        const currentUserList = state.userList;

        state.userList = {
          ...currentUserList,
          [authedUser]: {
            ...currentUserList[authedUser],
            answers: {
              ...currentUserList[authedUser].answers,
              [qid]: answer,
            },
          },
        };
      })
      .addCase(handleSaveQuestion.pending, (state) => {
        state.loading = true;
      })
      .addCase(handleSaveQuestion.fulfilled, (state, action) => {
        state.loading = false;
        const currentUserId = action.payload.authedUser;
        const { userList } = state;

        state.userList = {
          ...userList,
          [currentUserId]: {
            ...userList[currentUserId],
            questions: [
              ...userList[currentUserId].questions,
              action.payload.id,
            ],
          },
        };
      });
  },
});

export const userReducer = userSlice.reducer;
