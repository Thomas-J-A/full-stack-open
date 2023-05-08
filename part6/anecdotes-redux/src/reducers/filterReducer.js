export const doFilterSet = (filter) => ({
  type: 'FILTER_SET',
  payload: filter,
});

const reducer = (state = '', action) => {
  switch (action.type) {
    case 'FILTER_SET':
      return action.payload;
    default:
      return state;
  }
};

export default reducer;
