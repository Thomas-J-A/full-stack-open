import deepFreeze from "deep-freeze";

import counterReducer from "../../../reducers/counter.reducer";

describe('counterReducer', () => {
  const initialState = {
    good: 0,
    ok: 0,
    bad: 0,
  };

  it('should initialize state when called with undefined state', () => {
    const action = {
      type: 'INIT',
    };

    const newState = counterReducer(undefined, action);

    expect(newState).toEqual(initialState);
  });

  it('should increment good count', () => {
    const action = {
      type: 'GOOD',
    };

    const state = { ...initialState };
    deepFreeze(state);
    
    const newState = counterReducer(state, action);

    expect(newState).toEqual({
      good: 1,
      ok: 0,
      bad: 0,
    });
  });

  it('should increment ok count', () => {
    const action = {
      type: 'OK',
    };

    const state = { ...initialState };
    deepFreeze(state);

    const newState = counterReducer(state, action);

    expect(newState).toEqual({
      good: 0,
      ok: 1,
      bad: 0,
    });
  })

  it('should increment bad count', () => {
    const action = {
      type: 'BAD',
    };

    const state = { ...initialState };
    deepFreeze(state);

    const newState = counterReducer(state, action);

    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 1,
    });
  })

  it('should reset all counts to zero', () => {
    const action = {
      type: 'RESET',
    };

    const state = {
      good: 2,
      ok: 1,
      bad: 4,
    };
    
    deepFreeze(state);

    const newState = counterReducer(state, action);

    expect(newState).toEqual({
      good: 0,
      ok: 0,
      bad: 0,
    });
  });
});
