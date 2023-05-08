import { useDispatch } from 'react-redux';

import { doFilterSet } from '../../reducers/filterReducer';

const Filter = () => {
  const dispatch = useDispatch();

  const handleChange = (e) => dispatch(doFilterSet(e.target.value));

  return (
    <div>
      <label>
        Filter:
        <input type="text" onChange={handleChange} />
      </label>
    </div>
  );
};

export default Filter;
