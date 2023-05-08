import anecdotes from "../data/anecdotes.data";

import getId from '../utils/getId.util';

export const doVoteAdded = (id) => ({
  type: 'VOTE_ADDED',
  payload: { id },
});

export const doNewAnecdoteAdded = (content) => ({
  type: 'NEW_ANECDOTE_ADDED',
  payload: {
    content,
    id: getId(),
    votes: 0,
  },
});

const asObject = (anecdote) => ({
  content: anecdote,
  id: getId(),
  votes: 0,
});

const initialState = anecdotes.map(asObject);

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'VOTE_ADDED':
      return state.map((anecdote) => {
        if (anecdote.id === action.payload.id) {
          return {
            ...anecdote,
            votes: anecdote.votes + 1,
          };
        }

        return anecdote;
      });
    case 'NEW_ANECDOTE_ADDED':
      return [
        ...state,
        action.payload,
      ];
    default:
      return state;
  }
};

export default reducer;
