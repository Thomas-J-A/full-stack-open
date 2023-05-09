import { createSlice } from '@reduxjs/toolkit';

// import anecdotes from "../data/anecdotes.data";
import getId from '../utils/getId.util';

// const asObject = (anecdote) => ({
//   content: anecdote,
//   id: getId(),
//   votes: 0,
// });

// const initialState = anecdotes.map(asObject);

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
      prepare: (content) => ({
        payload: {
          content,
          id: getId(),
          votes: 0,
        },
      }),
    },
    setAnecdotes: (state, action) => action.payload,
  },
});

export const { addVote, addAnecdote, setAnecdotes } = anecdotesSlice.actions;

export default anecdotesSlice.reducer;
