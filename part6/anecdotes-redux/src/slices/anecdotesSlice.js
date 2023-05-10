import { createSlice } from '@reduxjs/toolkit';

import anecdotesService from '../services/anecdotes.service';

export const anecdotesSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers: {
    addVote: (state, action) => {
      return state.map((anecdote) => {
        if (anecdote.id === action.payload.id) {
          return {
            ...anecdote,
            votes: anecdote.votes + 1,
          };
        }

        return anecdote;
      });
    },
    addAnecdote: {
      reducer: (state, action) => void state.push(action.payload),
    },
    setAnecdotes: (state, action) => action.payload,
  },
});

export const { addVote, addAnecdote, setAnecdotes } = anecdotesSlice.actions;

export const addVoteAsync = (id, newAnecdote) => async (dispatch) => {
  await anecdotesService.updateVotes(id, newAnecdote);
  dispatch(addVote({ id }));
};

export const addAnecdoteAsync = (anecdoteData) => async (dispatch) => {
  const newAnecdote = await anecdotesService.create(anecdoteData);
  dispatch(addAnecdote(newAnecdote));
};

export const setAnecdotesAsync = () => async (dispatch) => {
  const anecdotes = await anecdotesService.getAll();
  dispatch(setAnecdotes(anecdotes));
};

export default anecdotesSlice.reducer;
